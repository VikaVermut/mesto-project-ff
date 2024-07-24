import '../pages/index.css';

import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal, closePopupByOverlay} from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUser, editUser, getInitialCards, addCard, changeAvatar} from './api.js';

const placesListElement = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditFormElement = popupEdit.querySelector('.popup__form');
const popupChangeAvatar = document.querySelector('.popup_type_change_avatar');
const popupChangeAvatarFormElement = popupChangeAvatar.querySelector('.popup__form');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardFormElement = popupNewCard.querySelector('.popup__form');
const popupImage = document.querySelector('.popup_type_image');


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function setPageUserData(name, about, avatarUrl) {
  document.querySelector('.profile__title').textContent = name;
  document.querySelector('.profile__description').textContent = about;
  document.querySelector('.profile__image').style.backgroundImage = `url(${avatarUrl})`;
}

const [user, cards] = await Promise.all([getUser(), getInitialCards()]);
window.user = user; // Иначе вебпак ругается, но работает и без этого

setPageUserData(user.name, user.about, user.avatar);

for (const item of cards) {
  const isUserCardOwner = item.owner._id === user._id;
  const card = createCard(item._id, item.name, item.link, item.likes, isUserCardOwner ? deleteCard : null, likeCard, openImagePopup);
  placesListElement.append(card);
}

function openImagePopup(imgUrl, alt) {
  const imgEl = popupImage.querySelector('img');
  imgEl.src = imgUrl;
  imgEl.alt = alt;
  popupImage.querySelector('.popup__caption').textContent = alt;
  openModal(popupImage);
}

function popupEditPreOpen() {
  const nameInput = popupEditFormElement.querySelector('.popup__input_type_name');
  const jobInput = popupEditFormElement.querySelector('.popup__input_type_description');

  const currentName = document.querySelector('.profile__title').textContent;
  const currentDesc = document.querySelector('.profile__description').textContent;

  nameInput.value = currentName;
  jobInput.value = currentDesc;

  clearValidation(popupEditFormElement, validationConfig);
}

function popupEditFormHandler(evt) {
  evt.preventDefault();
  popupEditFormElement.querySelector('.popup__button').textContent = 'Сохранение...';
  const nameInput = popupEditFormElement.querySelector('input[name="name"]');
  const jobInput = popupEditFormElement.querySelector('input[name="description"]');

  
  editUser(nameInput.value, jobInput.value).then(data => {
    setPageUserData(data.name, data.about, data.avatar);
    closeModal(popupEdit);
    popupEditFormElement.querySelector('.popup__button').textContent = 'Сохранить';
  }); 
}
popupEditFormElement.addEventListener('submit', popupEditFormHandler);
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  popupEditPreOpen();
  openModal(popupEdit);
});

function popupNewCardPreOpen() {
  popupNewCardFormElement.reset();
  clearValidation(popupNewCardFormElement, validationConfig);
}

function popupNewCardHandler(evt) {
  evt.preventDefault();
  popupNewCardFormElement.querySelector('.popup__button').textContent = 'Сохранение...';
  const nameInput = popupNewCardFormElement.querySelector('input[name="place-name"]');
  const linkInput = popupNewCardFormElement.querySelector('input[name="link"]');

  addCard(nameInput.value, linkInput.value)
  .then(data => {
    const card = createCard(data._id, data.name, data.link, data.likes, deleteCard, likeCard, openImagePopup);
    placesListElement.prepend(card);
    closeModal(popupNewCard);
    popupNewCardFormElement.querySelector('.popup__button').textContent = 'Сохранить';
  })
}
popupNewCardFormElement.addEventListener('submit', popupNewCardHandler);

document.querySelector('.profile__add-button').addEventListener('click', () => {
  popupNewCardPreOpen();
  openModal(popupNewCard);
});

function popupChangeAvatarPreOpen() {
  popupChangeAvatarFormElement.reset();
  clearValidation(popupChangeAvatarFormElement, validationConfig);
}

document.querySelector('.profile__image').addEventListener('click', () => {
  popupChangeAvatarPreOpen();
  openModal(popupChangeAvatar);
});

function popupChangeAvatarHandler(evt) {
  evt.preventDefault();
  popupChangeAvatarFormElement.querySelector('.popup__button').textContent = 'Сохранение...';
  const linkInput = popupChangeAvatarFormElement.querySelector('input[name="link"]');
  changeAvatar(linkInput.value)
  .then(data => {
    setPageUserData(data.name, data.about, data.avatar);
    closeModal(popupChangeAvatar);
    popupChangeAvatarFormElement.querySelector('.popup__button').textContent = 'Сохранить';
  });
}
popupChangeAvatarFormElement.addEventListener('submit', popupChangeAvatarHandler);

const popups = document.querySelectorAll('.popup');
popups.forEach(el => {
  el.querySelector('.popup__close').addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closeModal(popup);
  });
  el.addEventListener('click', closePopupByOverlay)
});

enableValidation(validationConfig); 