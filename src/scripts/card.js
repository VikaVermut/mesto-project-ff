import { like, dislike, removeCard } from "./api";

const cardTemplete = document.querySelector('#card-template').content;

export function createCard(id, title, image, likes, deleteHandler, likeHandler, openImagePopup) {
  const cardElement = cardTemplete.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  cardElement.id = id;
  cardImage.src = image;
  cardElement.querySelector('.card__title').textContent = title;
  cardImage.alt = title;
  if (deleteHandler) {
    cardDeleteBtn.classList.add('card__delete-button_visable');
    cardDeleteBtn.addEventListener('click', () => deleteHandler(cardElement));
  }

  cardImage.addEventListener('click', () => openImagePopup(image, title));
  cardLikeBtn.addEventListener('click', () => likeHandler(cardElement));
  cardElement.querySelector('.card__like-count').textContent = likes.length;

  const isLiked = Boolean(likes.find((item) => item._id === window.user._id));
  if (isLiked) {
    cardLikeBtn.classList.add('card__like-button_is-active');
  } else {
    cardLikeBtn.classList.remove('card__like-button_is-active');
  }

  return cardElement;
}

export function deleteCard(card) {
  removeCard(card.id)
  .then(data => {
    card.remove();
  })
  .catch((err) => {
    console.log(err);
  })
}
function cardLikeHandler(card, cardData) {
  const cardLikeBtn = card.querySelector('.card__like-button');
  const likeCount = cardData.likes.length;
  const isLiked = Boolean(cardData.likes.find((item) => item._id === window.user._id));
  if (isLiked) {
    cardLikeBtn.classList.add('card__like-button_is-active');
  } else {
    cardLikeBtn.classList.remove('card__like-button_is-active');
  }
  card.querySelector('.card__like-count').textContent = likeCount;
}

export function likeCard(card) {
  const isLiked = card.querySelector('.card__like-button').classList.contains('card__like-button_is-active');
  if (isLiked) {
    dislike(card.id)
    .then(data => cardLikeHandler(card, data))
    .catch((err) => {
      console.log(err);
    });
  } else {
    like(card.id)
    .then(data => cardLikeHandler(card, data))
    .catch((err) => {
      console.log(err);
    });
  }
}