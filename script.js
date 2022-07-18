let drawingContainer = document.querySelector(".drawing-container");

let gridSize = 16;
let color = [0, 0, 0];

function createGrid(){
    const qridSizeSquared = gridSize*gridSize;
    drawingContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    drawingContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    for(let i = 0; i < qridSizeSquared; i++){
        let pixel = document.createElement('div');
        pStyle = pixel.style;

        pStyle.width = "100%";
        pStyle.height = "100%";
        pStyle.backgroundColor = "white"
        pStyle.boxSizing = "border-box";

        pixel.addEventListener("mouseover", (event) => {pixel.style.opacity = "0.5";})
        pixel.addEventListener("mouseout", (event) => {pixel.style.opacity = "1";})

        drawingContainer.appendChild(pixel);
    }
}

function setup(){
    createGrid();
}

setup();