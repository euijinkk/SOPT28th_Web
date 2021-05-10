'use strict';

const openBtn = document.querySelector('.button--open');
const closeBtn = document.querySelector('.button--close');
const modal = document.querySelector('.modal--bg');
console.log(openBtn);

openBtn.addEventListener('click', showModal);
closeBtn.addEventListener('click', closeModal);

function showModal() {
    modal.style.visibility = 'visible';
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.style.visibility = 'hidden';
    modal.classList.add('hidden');
}

// const showModal = () => {
//     modal.style.visibility = "visible"
// }
