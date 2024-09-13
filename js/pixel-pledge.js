const pngFiles = [
    'Dioram-0+58.png',
    'Glenn_Essex-31+31.png',
    'galactical-59+28.png',
    'Megan_Farmer-61+60.png',
    'ScottN-18+3.png',
    'Moon_and_Moss-0+0.png',
    'Jared_Cordray-55+0.png',
    'Eric_Lathrop-33+0.png',
    'Eve-14+12.png',
    'SeeToo-30+30.png',
    'Eve-50+55.png',
    'Iron135-45+02.png',
    'Nick_La_Tona-7+35.png'
];

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
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadPngFiles(pngFiles);
});
