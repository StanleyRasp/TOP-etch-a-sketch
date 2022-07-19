let drawingContainer = document.querySelector(".drawing-container");

let redSlider = document.getElementById("red-slider");
let greenSlider = document.getElementById("green-slider");
let blueSlider = document.getElementById("blue-slider");
let sizeSlider = document.getElementById("size-slider");

let redText = document.querySelector(".slide-container.red > p");
let greenText = document.querySelector(".slide-container.green > p");
let blueText = document.querySelector(".slide-container.blue > p");
let sizeText = document.querySelector(".slide-container.size > p");

let clearButton = document.querySelector(".clear-button");
let rainbowButton = document.querySelector(".rainbow-button");

let colorDisplay = document.querySelector(".color-display");

console.log(colorDisplay);

let gridSize = 16;
let color = [0, 0, 0];
let rainbowMode = false;
let mouseDown = false;

function turnOffRainbow(){
    rainbowMode = false;
    colorDisplay.classList.remove("rainbow-mode");
    rainbowButton.classList.remove("button-active");
}

function clearGrid(){
    drawingContainer.innerHTML = '';
}

function colorize(pixel){
    if (rainbowMode) {
        pixel.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    } else {
        pixel.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    }
}

function createGrid(){
    const qridSizeSquared = gridSize*gridSize;
    drawingContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    drawingContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    for(let i = 0; i < qridSizeSquared; i++){
        let pixel = document.createElement('div');
        pixel.classList.add("pixel");

        pixel.addEventListener("mouseover", (event) => {
            if (mouseDown) {colorize(pixel);}
            pixel.style.opacity = "0.5";
        })
        pixel.addEventListener("mousedown", (event) => {colorize(pixel)})
        pixel.addEventListener("mouseout", (event) => {pixel.style.opacity = "1";})

        drawingContainer.appendChild(pixel);
    }
}

function updateColorDisplay(){
    colorDisplay.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

function setup(){
    redSlider.oninput = () => {
        redText.textContent = `Red: ${redSlider.value}`;
        color[0] = redSlider.value;
        turnOffRainbow();
        updateColorDisplay();
    }

    greenSlider.oninput = () => {
        greenText.textContent = `Green: ${greenSlider.value}`;
        color[1] = greenSlider.value;
        turnOffRainbow();
        updateColorDisplay();
    }

    blueSlider.oninput = () => {
        blueText.textContent = `Blue: ${blueSlider.value}`;
        color[2] = blueSlider.value;
        turnOffRainbow();
        updateColorDisplay();
    }

    sizeSlider.oninput = () => {
        sizeText.textContent = `Size: ${sizeSlider.value}x${sizeSlider.value}`;
        gridSize = sizeSlider.value;
    }
    
    sizeSlider.onchange = () => {
        clearGrid();
        createGrid();
    }

    clearButton.onclick = () => {
        clearGrid();
        createGrid();
    }

    rainbowButton.onclick = () => {
        rainbowMode = (rainbowMode + 1) % 2;
        colorDisplay.classList.toggle("rainbow-mode");
        rainbowButton.classList.toggle("button-active");
    }

    document.querySelector("body").addEventListener("mousedown", (event) => {mouseDown = true; console.log(event)})
    document.querySelector("body").addEventListener("mouseup", (event) => {mouseDown = false;})
    createGrid();
}

setup();