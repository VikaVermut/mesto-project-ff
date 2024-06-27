function escHandler(event) {
  const popup = document.querySelector('.popup_is-opened');
  if (event.key === 'Escape') closeModal(popup);
}

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escHandler);
};

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escHandler);
}