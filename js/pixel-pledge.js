document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('pixelCanvas');
    const context = canvas.getContext('2d');
    const rows = 64;
    const cols = 64;
    let squareSize;
    const borderSize = 1;
    const borderColor = "#666666"; // Mid-grey for the grid lines and canvas border
    const hoverColor = "#EDDE44"; // Yellow for hover effect

    // Function to resize canvas and maintain square aspect ratio
    function resizeCanvas() {
        const container = canvas.parentElement;
        const size = Math.min(container.offsetWidth, container.offsetHeight);
        canvas.width = size;
        canvas.height = size;
        squareSize = (size / rows) - (borderSize * (rows - 1) / rows); // Recalculate square size
        drawGrid();
    }

    // Function to draw the grid
    function drawGrid() {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * (squareSize + borderSize);
                const y = row * (squareSize + borderSize);
                context.fillStyle = "black"; // Default square color
                context.fillRect(x, y, squareSize, squareSize); // Draw square

                // Only draw vertical grid lines except the last column
                if (col < cols - 1) {
                    context.strokeStyle = borderColor; // Border color
                    context.strokeRect(x, y, squareSize, squareSize); // Draw vertical grid line
                }

                // Only draw horizontal grid lines except the last row
                if (row < rows - 1) {
                    context.strokeStyle = borderColor; // Border color
                    context.strokeRect(x, y, squareSize, squareSize); // Draw horizontal grid line
                }
            }
        }
    }

    // Function to highlight square on hover
    function getMousePosition(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const col = Math.floor(x / (squareSize + borderSize));
        const row = Math.floor(y / (squareSize + borderSize));
        return { col, row };
    }

    function highlightSquare(event) {
        const { col, row } = getMousePosition(event);
        const x = col * (squareSize + borderSize);
        const y = row * (squareSize + borderSize);

        // Redraw the grid and highlight the hovered square
        drawGrid();
        context.fillStyle = hoverColor;
        context.fillRect(x, y, squareSize, squareSize);
        context.strokeStyle = borderColor; // Keep the border
        context.strokeRect(x, y, squareSize, squareSize);
    }

    // Resize the canvas initially
    resizeCanvas();

    // Resize canvas when window is resized
    window.addEventListener('resize', resizeCanvas);

    // Add hover effect on squares
    canvas.addEventListener('mousemove', highlightSquare);

    // Redraw the grid when the canvas is clicked
    canvas.addEventListener('click', drawGrid);
});
