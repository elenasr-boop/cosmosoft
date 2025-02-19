// начало работы в 19:00

const maxHeight = 10000;
const progress = document.getElementById("progress");

window.addEventListener('scroll', () => {
    currentHeight = scrollY;
    progress.style.width = `${(currentHeight/maxHeight) * 100}%`;
});