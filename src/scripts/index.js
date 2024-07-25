import '../pages/index.css';
window.user = null;

import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal, closePopupByOverlay} from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUser, editUser, getInitialCards, addCard, changeAvatar} from './api.js';

const placesListElement = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditFormElement = document.forms['edit-profile'];
const popupEditNameInput = popupEditFormElement.querySelector('input[name="name"]');
const popupEditJobInput = popupEditFormElement.querySelector('input[name="description"]');

const popupChangeAvatar = document.querySelector('.popup_type_change_avatar');
const popupChangeAvatarFormElement = document.forms['edit-avatar'];
const popupChangeAvatarLinkInput = popupChangeAvatarFormElement.querySelector('input[name="link"]');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardFormElement = document.forms['new-place'];
const popupNewCardNameInput = popupNewCardFormElement.querySelector('input[name="place-name"]');
const popupNewCardLinkInput = popupNewCardFormElement.querySelector('input[name="link"]');

const popupImage = document.querySelector('.popup_type_image');
const popupImageImgElem = popupImage.querySelector('img')
const popupImageCaptionElem = popupImage.querySelector('.popup__caption')

const profileTitleElem = document.querySelector('.profile__title');
const profileDescElem = document.querySelector('.profile__description');
const profileImgElem = document.querySelector('.profile__image');


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorElemClass: 'popup__error',
  errorClass: 'popup__error_visible'
};

function setPageUserData(name, about, avatarUrl) {
  profileTitleElem.textContent = name;
  profileDescElem.textContent = about;
  profileImgElem.style.backgroundImage = `url(${avatarUrl})`;
}

Promise.all([getUser(), getInitialCards()])
  .then(([userData, cards]) => {
    window.user = userData;
    setPageUserData(userData.name, userData.about, userData.avatar);

    for (const item of cards) {
      const isUserCardOwner = item.owner._id === userData._id;
      const card = createCard(item._id, item.name, item.link, item.likes, isUserCardOwner ? deleteCard : null, likeCard, openImagePopup);
      placesListElement.append(card);
    }
  })
  .catch(err => {
    console.log(err);
  });

function openImagePopup(imgUrl, alt) {
  popupImageImgElem.src = imgUrl;
  popupImageImgElem.alt = alt;
  popupImageCaptionElem.textContent = alt;
  openModal(popupImage);
}

function popupEditPreOpen() {
  const currentName = profileTitleElem.textContent;
  const currentDesc = profileDescElem.textContent;

  popupEditNameInput.value = currentName;
  popupEditJobInput.value = currentDesc;

  clearValidation(popupEditFormElement, validationConfig);
}

function popupEditFormHandler(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';
  
  editUser(popupEditNameInput.value, popupEditJobInput.value)
  .then(data => {
    setPageUserData(data.name, data.about, data.avatar);
    closeModal(popupEdit);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    evt.submitter.textContent = 'Сохранить';
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
  evt.submitter.textContent = 'Сохранение...';

  addCard(popupNewCardNameInput.value, popupNewCardLinkInput.value)
  .then(data => {
    const card = createCard(data._id, data.name, data.link, data.likes, deleteCard, likeCard, openImagePopup);
    placesListElement.prepend(card);
    closeModal(popupNewCard);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    evt.submitter.textContent = 'Сохранить';
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

profileImgElem.addEventListener('click', () => {
  popupChangeAvatarPreOpen();
  openModal(popupChangeAvatar);
});

function popupChangeAvatarHandler(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';
  changeAvatar(popupChangeAvatarLinkInput.value)
  .then(data => {
    setPageUserData(data.name, data.about, data.avatar);
    closeModal(popupChangeAvatar);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    evt.submitter.textContent = 'Сохранить';
  });
}
popupChangeAvatarFormElement.addEventListener('submit', popupChangeAvatarHandler);

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
  popup.querySelector('.popup__close').addEventListener('click', (event) => {
    closeModal(popup);
  });
  popup.addEventListener('click', closePopupByOverlay)
});

enableValidation(validationConfig); 