'use strict'

console.log('Hello! I came back');
/*

// автопрокрутка
let intervalSlide = setInterval(() => {
    nextSlide();
}, 5000);
// обнуление автопрокрутки
function restartIntervalSlide() {

    clearInterval(intervalSlide);
    intervalSlide = setInterval(() => {
        nextSlide();
    }, 5000);
}

document.querySelector('.slider__btn-prew').addEventListener('click', prewSlide);
document.querySelector('.slider__btn-next').addEventListener('click', nextSlide);

*/

const imagesShoppers = document.querySelectorAll('.shoppers__item'),
    sliderLineShoppers = document.querySelector('.slider__line'),
    sliderDots = document.querySelectorAll('.slider__dot'),
    sliderShoppers = document.querySelector('.slider');

let countShoppers = 0,
    widthShoppers = sliderShoppers.offsetWidth;

showSlide();

// событие клика на dot
sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        countShoppers = index;
        rollSlider();
        thisSlide(countShoppers);

        // restartIntervalSlide();
    })
})
// показ слайдов
function showSlide() {
    sliderLineShoppers.style.width = widthShoppers * imagesShoppers.length + 'px';
    imagesShoppers.forEach(item => {
        item.style.width = widthShoppers + 'px';
        item.style.height = 'auto';
    });

    rollSlider();
}
// назад
function nextSlide() {
    countShoppers++;

    if (countShoppers >= imagesShoppers.length) {
        countShoppers = 0;
    }

    rollSlider();
    thisSlide(countShoppers);
    // restartIntervalSlide();
}
// вперед
function prewSlide() {
    countShoppers--;

    if (countShoppers < 0) {
        countShoppers = imagesShoppers.length - 1;
    }

    rollSlider();
    thisSlide(countShoppers);
    // restartIntervalSlide();
}
// задает шаг смещения слайдов
function rollSlider() {
    sliderLineShoppers.style.transform = 'translate(-' + countShoppers * widthShoppers + 'px)';
}
// показывает активный слайд
function thisSlide(index) {
    sliderDots.forEach(item => item.classList.remove('active__dot'));
    sliderDots[index].classList.add('active__dot');
}

// Responsive Touch Slider | Swipe Slider
let start,
    change;

sliderShoppers.addEventListener('dragstart', (e) => {
    start = e.clientX;
});

sliderShoppers.addEventListener('dragover', (e) => {
    e.preventDefault();
    let touch = e.clientX;
    change = start - touch;
});

sliderShoppers.addEventListener('dragend', showSlideDrag);

sliderShoppers.addEventListener('touchstart', (e) => {
    start = e.touches[0].clientX;
    console.log(e.touches[0], 'e.touches[0]');
});

sliderShoppers.addEventListener('touchmove', (e) => {
    e.preventDefault();
    let touch = e.touches[0];
    change = start - touch.clientX;
});

sliderShoppers.addEventListener('touchend', showSlideDrag);

function showSlideDrag() {
    if (change > 0) {
        nextSlide();
    } else {
        prewSlide();
    }
}

// слайдер для окон менее 1280px
window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth < 1280) {
        showSlide();
    }
});

