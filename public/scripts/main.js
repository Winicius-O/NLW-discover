import Modal from './modal.js'

const modal = Modal();
const h2Elem = document.querySelector(".modal h2");
const pElem = document.querySelector(".modal p");
const modalConfirmButton = document.querySelector(".modal .btn-actions .button.red");

function modalEventListener(className, trash = false){
    const newTitle = trash ? 'Marcar como lido' : 'Excluir essa pergunta';
    const newDescription = trash ? 'marcar esta pergunta como lida?' : 'excluir esta pergunta?'

    const buttons = document.querySelectorAll(className);
    const form = document.querySelector('.modal form');

    buttons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault(); // ancora para de se comportar como ancora
            h2Elem.innerHTML = newTitle;
            pElem.innerHTML = `Tem certeza que você deseja ${newDescription}`;

            const roomID = document.querySelector('#room-id').dataset.id;
            const questionID = event.target.dataset.id;
            const action = trash  ? 'delete':'check';

            form.setAttribute('action', `/question/${roomID}/${questionID}/${action}`);

            trash ? modalConfirmButton.classList.add('red') : modalConfirmButton.classList.remove('red');
            modal.open();
        });
    });
}

const roomCodeButton = document.querySelector('header .buttons-container .button.outlined');
const clipboardTarget = document.querySelector('#clipboard');
roomCodeButton.addEventListener('click', event => {
    clipboardTarget.select()
    clipboardTarget.setSelectionRange(0,5);
    document.execCommand('copy');

    roomCodeButton.innerHTML = 'Copiado! <img src="/images/copy-icon.svg" alt="copy">'
});
roomCodeButton.addEventListener('mouseout', event => {
    const roomID = clipboardTarget.getAttribute("value");
    roomCodeButton.innerHTML = `${roomID} <img src="/images/copy-icon.svg" alt="copy">`
});

modalEventListener('.actions a.option.check', false);
modalEventListener('.actions a.option.trash', true);

// const checkButtons = document.querySelectorAll('.actions a.option.check');

// checkButtons.forEach(button => {
//     button.addEventListener('click', event => {
//         modal.open();
//     })
// })

// const trashButtons = document.querySelectorAll('.actions a.option.trash');

// trashButtons.forEach(button => {
//     button.addEventListener('click', event => {
//         modal.open();
//     })
// })