// import { Modal } from 'bootstrap';

export const hideModal = () => {
  const modalElement = document.getElementById('modal'); 
console.log('modalElement:', modalElement); 
// Выводим элемент в консоль 
if(modalElement) {
  modalElement.classList.remove('show'); 
  modalElement.style.display = 'none';
  console.log('Modal instance is hidden'); 

    // Сообщение о скрытии модального окна 
  } else { 
    console.log('Modal instance not found or already hidden'); 
    // Сообщение, если экземпляр модального окна не найден или уже скрыт 
  }
}