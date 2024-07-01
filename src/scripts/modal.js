function escHandler(event) {
  if (event.key !== 'Escape') return; 
  const popup = document.querySelector('.popup_is-opened');
  closeModal(popup);
}

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escHandler);
};

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escHandler);
}

export function closePopupByOverlay(event) {
  if (!event.target.classList.contains('popup')) return;
  const popup = event.target
  closeModal(popup);
}