import Modal from './modal.js'

const modal = Modal();

const checkButtons = document.querySelectorAll('.actions a.option.check');

checkButtons.forEach(button => {
    button.addEventListener('click', event => {
        modal.open();
    })
})

const trashButtons = document.querySelectorAll('.actions a.option.trash');

trashButtons.forEach(button => {
    button.addEventListener('click', event => {
        modal.open();
    })
})