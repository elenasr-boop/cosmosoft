// начало работы в 12:20

const maxHeight = 10000;
const progress = document.getElementById("progress");
let prevHeight = 0;

function getMaxHeight () {
    return maxHeight - window.innerHeight;
}

function progressRender () {
    currentHeight = scrollY;
    if (currentHeight > prevHeight) {
        progress.style.width = `${(currentHeight / getMaxHeight()) * 100}%`;
        prevHeight = currentHeight;
    }
}

window.addEventListener('scroll', progressRender);
window.addEventListener('resize', progressRender);

progressRender();