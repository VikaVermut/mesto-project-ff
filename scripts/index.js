const cardTemplete = document.querySelector('#card-template').content;
const placesListElement = document.querySelector('.places__list');

function createCard(title, image, deleteHandler) {
  const cardElement = cardTemplete.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = image;
  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteHandler);

  return cardElement;
}

function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}

for (const item of initialCards) {
  const card = createCard(item.name, item.link, deleteCard);
  placesListElement.append(card);
}