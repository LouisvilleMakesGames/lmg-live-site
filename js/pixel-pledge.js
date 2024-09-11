const pngFiles = [
    'Dioram-0+58.png',
    'Glenn_Essex-31+31.png',
    'galactical-59+28.png',
    'Megan_Farmer-61+60.png',
    'ScottN-18+3.png',
    'Moon_and_Moss-0+0.png'
];

let filledGridCells = new Set();

function loadPngFiles(fileList) {
    fileList.forEach(file => {
        let fileName = file.replace('.png', '');
        let [userName, coordinates] = fileName.split('-');
        let [startX, startY] = coordinates.split('+').map(Number);

        let img = new Image();
        img.src = `/js/pixels/${encodeURIComponent(file)}`;

        img.onload = function() {
            drawImageOnGrid(img, startX, startY, userName);
        };

        img.onerror = function() {
            console.log(`7 Error: Failed to load image file ${file}`);
        };
    });
}

function drawImageOnGrid(img, startX, startY, userName) {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    let imageData = context.getImageData(0, 0, img.width, img.height).data;

    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let index = (y * img.width + x) * 4;
            let r = imageData[index];
            let g = imageData[index + 1];
            let b = imageData[index + 2];
            let a = imageData[index + 3];

            if (a > 0) {
                let cellId = `cell-${startY + y}-${startX + x}`;
                let cellElement = document.getElementById(cellId);
                if (cellElement) {
                    cellElement.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
                    cellElement.setAttribute('data-owner', userName);
                    filledGridCells.add(cellId); // Mark this cell as filled
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gridCells = document.querySelectorAll('td');
    
    gridCells.forEach(cell => {
        cell.addEventListener('mouseenter', (event) => {
            const cellId = event.target.id;
            const [row, col] = cellId.replace('cell-', '').split('-');
            const owner = event.target.getAttribute('data-owner');
            const tooltipText = owner ? `${row},${col} ${owner}` : `${row},${col}`;
            event.target.title = tooltipText;
        });
    });

    loadPngFiles(pngFiles);
});

function fetchDonationDataAndFillUnclaimed() {
    fetch('https://g4g.lmg.giving/donation-data')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch donation data');
            return response.json();
        })
        .then(donationData => {
            console.log('Donation data:', donationData); 
            const totalRaised = donationData.raised;
            const totalDonors = donationData.donors;

            console.log('Total raised:', totalRaised);
            console.log('Total donors:', totalDonors);

            const claimedDonors = pngFiles.length;
            const unclaimedDonors = totalDonors - claimedDonors;
            const unclaimedPixels = totalRaised - countColoredPixels();

            console.log('Claimed donors:', claimedDonors);
            console.log('Unclaimed donors:', unclaimedDonors);
            console.log('Unclaimed pixels:', unclaimedPixels);

            if (unclaimedDonors > 0 && unclaimedPixels > 0) {
                const pixelsPerDonor = Math.floor(unclaimedPixels / unclaimedDonors);
                distributeUnclaimedPixels(unclaimedDonors, pixelsPerDonor);
            }
        })
        .catch(error => console.error('Error fetching donation data or calculating unclaimed pixels:', error));
}

function countColoredPixels() {
    let totalColoredPixels = 0;
    pngFiles.forEach(file => {
        let img = new Image();
        img.src = `/js/pixels/${encodeURIComponent(file)}`;
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            const imageData = context.getImageData(0, 0, img.width, img.height).data;
            for (let i = 0; i < imageData.length; i += 4) {
                if (imageData[i + 3] > 0) {
                    totalColoredPixels++;
                }
            }
            console.log(`Colored pixels for ${file}:`, totalColoredPixels);
        };
    });
    return totalColoredPixels;
}

function distributeUnclaimedPixels(unclaimedDonors, pixelsPerDonor) {
    let unclaimedPixelCoords = getUnfilledGridCoords();
    
    for (let i = 0; i < unclaimedDonors; i++) {
        let pixelsToPlace = pixelsPerDonor;
        while (pixelsToPlace > 0 && unclaimedPixelCoords.length > 0) {
            const randomIndex = Math.floor(Math.random() * unclaimedPixelCoords.length);
            const cellId = unclaimedPixelCoords[randomIndex];
            const cellElement = document.getElementById(cellId);

            if (cellElement) {
                cellElement.style.backgroundColor = 'rgba(50, 50, 50, 1)';
                cellElement.setAttribute('data-owner', 'unclaimed pixels from donor');
                filledGridCells.add(cellId); // Mark this cell as filled
                pixelsToPlace--;
            }

            unclaimedPixelCoords.splice(randomIndex, 1); // Remove the chosen cell from available slots
        }

        console.log(`Assigned ${pixelsPerDonor} pixels for unclaimed donor ${i + 1}`);
    }
}

function getUnfilledGridCoords() {
    let coords = [];
    const gridCells = document.querySelectorAll('td');
    
    gridCells.forEach(cell => {
        const cellId = cell.id;
        if (!filledGridCells.has(cellId)) {
            coords.push(cellId);
        }
    });

    return coords;
}

window.onload = function() {
    setTimeout(() => {
        fetchDonationDataAndFillUnclaimed();
    }, 0);
};
