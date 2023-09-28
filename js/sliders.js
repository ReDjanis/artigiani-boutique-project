'use strict'

const imagesPresent = document.querySelectorAll('.present__item'),
    sliderLinePresent = document.querySelector('#sliderLinePresent'),
    sliderDotsPresent = document.querySelectorAll('.present__dot'),
    imagesCollection = document.querySelectorAll('.collection__item'),
    sliderLineCollection = document.querySelector('#sliderLineCollection'),
    sliderDotsCollection = document.querySelectorAll('.collection__dot'),
    imagesShoppers = document.querySelectorAll('.shoppers__item'),
    sliderLineShoppers = document.querySelector('#sliderLineShoppers'),
    sliderDotsShoppers = document.querySelectorAll('.shoppers__dot'),
    sliderTouch = document.querySelectorAll('.slider__touch'),
    subtitlePresent = document.querySelector('#subtitlePresent');

let countPresent = 0,
    widthPresent,
    nameSectionPresent = 'present',
    countCollection = 0,
    widthCollection,
    nameSectionCollection = 'collection',
    countShoppers = 0,
    widthShoppers,
    nameSectionShoppers = 'shoppers';

let widthImgPresentArr = [0],
    lineWidthPresent = 0,
    sliderLinePresentStyle = getComputedStyle(sliderLinePresent),
    sliderLineColumnGap = parseInt(sliderLinePresentStyle.getPropertyValue('column-gap'));

widthCollection = showSlide(countCollection, nameSectionCollection, sliderLineCollection, imagesCollection);
widthShoppers = showSlide(countShoppers, nameSectionShoppers, sliderLineShoppers, imagesShoppers);

lineWidthPresent = calcLineWidthPresent();

if (document.documentElement.clientWidth < 1570) {
    sliderLinePresent.style.width = lineWidthPresent + 'px';
} else {
    sliderLinePresent.style.width = '';
}
// замена текста подзаголовка
if (document.documentElement.clientWidth < 1550) {
    subtitlePresent.textContent = '13 лет одеваем людей с хорошим вкусом!';
} else {
    subtitlePresent.textContent = 'Ведущие бренды люкс и премиум-класса';
}

if (document.documentElement.clientWidth < 1155) {
    widthPresent = document.querySelector('.present__slider').offsetWidth;
} else {
    widthPresent = lineWidthPresent;
}
// показать/скрыть 4 dot
if (document.documentElement.clientWidth < 460) {
    document.querySelector('.present__dot:last-child').style.display = 'block';
} else {
    document.querySelector('.present__dot:last-child').style.display = '';
}
// событие клика на dot present
sliderDotsPresent.forEach((elem, index) => {
    elem.addEventListener('click', () => {
        countPresent = index;

        if (!sliderDotsPresent[index].classList.value.includes('active__dot')) {
            rollSlider(sliderLinePresent, countPresent, widthPresent, nameSectionPresent);
            thisSlide(countPresent, sliderDotsPresent);
        }
    })
})
// событие клика на dot collection
sliderDotsCollection.forEach((elem, index) => {
    elem.addEventListener('click', () => {
        countCollection = index;
        rollSlider(sliderLineCollection, countCollection, widthCollection, nameSectionCollection);
        thisSlide(countCollection, sliderDotsCollection);
    })
})
// событие клика на dot shoppers
sliderDotsShoppers.forEach((elem, index) => {
    elem.addEventListener('click', () => {
        countShoppers = index;
        rollSlider(sliderLineShoppers, countShoppers, widthShoppers, nameSectionShoppers);
        thisSlide(countShoppers, sliderDotsShoppers);
    })
})
// показ слайдов
function showSlide(count, nameSection, sliderLine, images) {
    let width = document.querySelector(`.${nameSection}__slider`).offsetWidth;
    console.log(width, 'width');
    sliderLine.style.width = width * images.length + 'px';
    console.log('sliderLine.style.width', sliderLine.style.width);
    images.forEach(item => {
        item.style.width = width + 'px';
        item.style.height = 'auto';
    });
    rollSlider(sliderLine, count, width, nameSection);

    return width;
}
// функция вычисления lineWidthPresent
function calcLineWidthPresent() {
    lineWidthPresent = 0;
    for (let i = 0; i < imagesPresent.length; i++) {
        let imagesPresentStyle = getComputedStyle(imagesPresent[i]);
        widthImgPresentArr.push(parseInt(imagesPresentStyle.getPropertyValue('max-width')));
        lineWidthPresent += parseInt(imagesPresentStyle.getPropertyValue('max-width'));
    }

    return (lineWidthPresent + sliderLineColumnGap * (imagesPresent.length - 1));
}
// задает шаг смещения слайдов
function rollSlider(sliderLine, count, width, nameSection) {

    let offset = widthImgPresentArr.reduce((accum, item, index) => {

        if (count >= index) {
            return accum + item + sliderLineColumnGap;
        }
        return accum;
    })

    if (nameSection === 'present') {

        let rest = lineWidthPresent - width - offset;

        if (rest >= 0) {
            sliderLine.style.left = -offset + 'px';
        } else {
            sliderLine.style.left = -(lineWidthPresent - width) + 'px';
        }

    } else {
        sliderLine.style.transform = 'translate(-' + count * width + 'px)';
    }
}
// показывает активный слайд
function thisSlide(index, sliderDots) {
    sliderDots.forEach(item => item.classList.remove('active__dot'));
    sliderDots[index].classList.add('active__dot');
}

// назад
function nextSlide(count, width, sliderLine, images, sliderDots, nameSection) {
    count++;

    if (count >= images.length) {
        count = 0;
    }

    rollSlider(sliderLine, count, width, nameSection);
    thisSlide(count, sliderDots);

    return count;
}
// вперед
function prewSlide(count, width, sliderLine, images, sliderDots, nameSection) {
    count--;

    if (count < 0) {
        count = images.length - 1;
    }

    rollSlider(sliderLine, count, width, nameSection);
    thisSlide(count, sliderDots);

    return count;
}

// АДАПТИВ ПРИ РЕСАЙЗ ОКНА
window.addEventListener('resize', () => {
    console.log(document.documentElement.clientWidth, 'ПРОВЕРКА РЕСАЙЗ');
    if (document.documentElement.clientWidth < 460) {
        document.querySelector('.present__dot:last-child').style.display = 'block';
        widthPresent = document.querySelector('.present__slider').offsetWidth;
        rollSlider(sliderLinePresent, countPresent, widthPresent, nameSectionPresent);
        thisSlide(countPresent, sliderDotsPresent);
    } else {
        document.querySelector('.present__dot:last-child').style.display = '';

        if (document.documentElement.clientWidth < 1130) {
            widthPresent = document.querySelector('.present__slider').offsetWidth;
            rollSlider(sliderLinePresent, countPresent, widthPresent, nameSectionPresent);
            thisSlide(countPresent, sliderDotsPresent);
        } else {
            widthPresent = lineWidthPresent;
            sliderLinePresent.style.left = '';
        }
    }

    if (document.documentElement.clientWidth < 1570) {
        lineWidthPresent = calcLineWidthPresent();
        sliderLinePresent.style.width = lineWidthPresent + 'px';
        subtitlePresent.textContent = '13 лет одеваем людей с хорошим вкусом!';
    } else {
        sliderLinePresent.style.width = '';
        subtitlePresent.textContent = 'Ведущие бренды люкс и премиум-класса';
    }

    if (document.documentElement.clientWidth >= 1280) {
        sliderLineCollection.style.width = document.querySelector('.collection__slider').offsetWidth + 'px';
    } else {
        widthCollection = showSlide(countCollection, nameSectionCollection, sliderLineCollection, imagesCollection, nameSectionCollection);
        widthShoppers = showSlide(countShoppers, nameSectionShoppers, sliderLineShoppers, imagesShoppers, nameSectionShoppers);
    }

});

// ___________________________________________________________________
// Responsive Touch Slider | Swipe Slider
let start, change;
console.log(sliderTouch, 'sliderTouch');
sliderTouch.forEach((item) => {
    console.log(item);
    item.addEventListener('dragstart', (e) => {
        start = e.clientX;
    })

    item.addEventListener('dragover', (e) => {
        e.preventDefault();
        let touch = e.clientX;
        change = start - touch;
    })

    item.addEventListener('dragend', checkVarChange);

    item.addEventListener('touchstart', (e) => {
        start = e.touches[0].clientX;
    })

    item.addEventListener('touchmove', (e) => {
        e.preventDefault();
        let touch = e.touches[0];
        change = start - touch.clientX;
    })

    item.addEventListener('touchend', checkVarChange);

    function checkVarChange() {

        if (change > 0) {

            if (item.id === 'touchCollection') {
                countCollection = nextSlide(countCollection, widthCollection, sliderLineCollection, imagesCollection, sliderDotsCollection, nameSectionCollection);
            } else if (item.id === 'touchShoppers') {
                countShoppers = nextSlide(countShoppers, widthShoppers, sliderLineShoppers, imagesShoppers, sliderDotsShoppers, nameSectionShoppers);
            } else {
                countPresent = nextSlide(countPresent, widthPresent, sliderLinePresent, imagesPresent, sliderDotsPresent, nameSectionPresent);
            }

        } else {

            if (item.id === 'touchCollection') {
                countCollection = prewSlide(countCollection, widthCollection, sliderLineCollection, imagesCollection, sliderDotsCollection, nameSectionCollection);
            } else if (item.id === 'touchShoppers') {
                countShoppers = prewSlide(countShoppers, widthShoppers, sliderLineShoppers, imagesShoppers, sliderDotsShoppers, nameSectionShoppers);
            } else {
                countPresent = prewSlide(countPresent, widthPresent, sliderLinePresent, imagesPresent, sliderDotsPresent, nameSectionPresent);
            }
        }
    }
})







