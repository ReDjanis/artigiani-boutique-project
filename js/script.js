'use strict'

// модальное окно
const modalWindow = document.querySelector('.modal');
const buttonsMap = document.querySelectorAll('.map');

buttonsMap.forEach(item => {
    item.addEventListener('click', (e) => {
        modalWindow.style.display = 'flex';
        modalWindow.showModal();
        document.body.classList.add("scroll-lock");
    })
})

modalWindow.addEventListener('click', closeOnBackDropClick);

function closeOnBackDropClick({ currentTarget, target }) {

    const isClickedOnBackDrop = target === currentTarget;

    if (isClickedOnBackDrop) {
        modalWindow.style.display = 'none';
        modalWindow.close();
        document.body.classList.remove("scroll-lock");
    }
}

// бургер-меню
const buttonBurgerMenu = document.querySelector('#check-menu');
const background = document.querySelector('.background');
const areaBurgerMenu = document.querySelector('.burger-nav');

buttonBurgerMenu.addEventListener('click', () => {

    if (buttonBurgerMenu.checked) {
        background.style.display = 'block';
        document.body.classList.add("scroll-lock");
    } else {
        background.style.display = 'none';
        document.body.classList.remove("scroll-lock");
    }
})

background.addEventListener('click', () => {
    buttonBurgerMenu.checked = false;
    background.style.display = 'none';
    document.body.classList.remove("scroll-lock");
})

areaBurgerMenu.addEventListener('click', () => {
    buttonBurgerMenu.checked = false;
    background.style.display = 'none';
    document.body.classList.remove("scroll-lock");
})

