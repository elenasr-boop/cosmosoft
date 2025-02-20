// начало работы в 12:20

const maxHeight = 10000;
const progress = document.getElementById("progress");

function getMaxHeight () {
    return maxHeight - window.innerHeight;
}

function progressRender () {
    currentHeight = scrollY;
    progress.style.width = `${(currentHeight/getMaxHeight()) * 100}%`;
}

window.addEventListener('scroll', progressRender);
window.addEventListener('resize', progressRender);

progressRender();