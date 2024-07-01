const cardTemplete = document.querySelector('#card-template').content;

export function createCard(title, image, deleteHandler, likeHandler, openImagePopup) {
  const cardElement = cardTemplete.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = image;
  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__image').alt = title;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteHandler(cardElement));
  cardElement.querySelector('.card__image').addEventListener('click', () => openImagePopup(image, title));
  cardElement.querySelector('.card__like-button').addEventListener('click', () => likeHandler(cardElement));

  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}
export function likeCard(card) {
  card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
}