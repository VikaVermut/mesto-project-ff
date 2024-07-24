import { like, dislike, removeCard } from "./api";

const cardTemplete = document.querySelector('#card-template').content;

export function createCard(id, title, image, likes, deleteHandler, likeHandler, openImagePopup) {
  const cardElement = cardTemplete.querySelector('.card').cloneNode(true);
  cardElement.id = id;
  cardElement.querySelector('.card__image').src = image;
  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__image').alt = title;
  if (deleteHandler) {
    cardElement.querySelector('.card__delete-button').classList.add('card__delete-button_visable');
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteHandler(cardElement));
  }

  cardElement.querySelector('.card__image').addEventListener('click', () => openImagePopup(image, title));
  cardElement.querySelector('.card__like-button').addEventListener('click', () => likeHandler(cardElement));
  cardElement.querySelector('.card__like-count').textContent = likes.length;

  const isLiked = Boolean(likes.find((item) => item._id === user._id));
  if (isLiked) {
    cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active');
  } else {
    cardElement.querySelector('.card__like-button').classList.remove('card__like-button_is-active');
  }

  return cardElement;
}

export function deleteCard(card) {
  removeCard(card.id).then(data => {
    card.remove();
  })
}
function cardLikeHandler(card, cardData) {
    const likeCount = cardData.likes.length;
    const isLiked = Boolean(cardData.likes.find((item) => item._id === user._id));
    if (isLiked) {
      card.querySelector('.card__like-button').classList.add('card__like-button_is-active');
    } else {
      card.querySelector('.card__like-button').classList.remove('card__like-button_is-active');
    }
    card.querySelector('.card__like-count').textContent = likeCount;
}

export function likeCard(card) {
  const isLiked = card.querySelector('.card__like-button').classList.contains('card__like-button_is-active');
  if (isLiked) {
    dislike(card.id).then(data => cardLikeHandler(card, data));
  } else {
    like(card.id).then(data => cardLikeHandler(card, data));
  }
}