export default function Modal() {

    const modalWrapper = document.querySelector('.modal-wrapper');
    const cancelButton = document.querySelector('.button.grey.cancel');

    cancelButton.addEventListener('click', close);

    function open(){
        modalWrapper.classList.remove('hidden');
    }

    function close(){
        modalWrapper.classList.add('hidden');
    }

    return{
        open,
        close
    }
}