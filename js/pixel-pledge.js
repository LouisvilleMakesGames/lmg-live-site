// Function to load PNG files and place them on the grid
function loadPngFiles(fileList) {
    fileList.forEach(file => {
        // Extract the user name and coordinates from the filename
        let fileName = file.replace('.png', '');
        let [userName, coordinates] = fileName.split('-');
        let [startX, startY] = coordinates.split('x').map(Number);

        // Create an image element to load the PNG file
        let img = new Image();
        img.src = `/js/pixels/${file}`;
        img.onload = function() {
            // When the image loads, draw its pixels on the grid
            drawImageOnGrid(img, startX, startY, userName);
        };
    });
}

// Function to draw the image on the grid
function drawImageOnGrid(img, startX, startY, userName) {
    // Create a temporary canvas to read the PNG file's pixel data
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    // Set the canvas size to the image size
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image onto the canvas
    context.drawImage(img, 0, 0);

    // Get the pixel data from the image
    let imageData = context.getImageData(0, 0, img.width, img.height).data;

    // Loop through each pixel in the image
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            // Calculate the index in the image data array
            let index = (y * img.width + x) * 4;

            // Extract the RGBA values
            let r = imageData[index];
            let g = imageData[index + 1];
            let b = imageData[index + 2];
            let a = imageData[index + 3]; // Alpha (transparency)

            // If the pixel is not fully transparent, apply it to the grid
            if (a > 0) {
                let cellId = `cell-${startY + y}-${startX + x}`;
                let cellElement = document.getElementById(cellId);
                if (cellElement) {
                    // Set the background color of the cell
                    cellElement.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
                    // Set the tooltip to show location and user's name
                    cellElement.setAttribute('data-owner', userName); // Save the owner name for hover
                }
            }
        }
    }
}

// Add a hover effect to display the cell location and, if applicable, the donor's name
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

    // Load the PNG files (adjust the list as needed)
    const pngFiles = ['phil p-0x0.png'];
    loadPngFiles(pngFiles);
});
