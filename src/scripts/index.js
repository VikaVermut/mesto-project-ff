import '../pages/index.css';

import initialCards from './cards.js';
import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js';

const placesListElement = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditFormElement = popupEdit.querySelector('.popup__form');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardFormElement = popupNewCard.querySelector('.popup__form');


for (const item of initialCards) {
  const card = createCard(item.name, item.link, deleteCard, likeCard);
  placesListElement.append(card);
}

export function openImagePopup(imgUrl, alt) {
  const popup = document.querySelector('.popup_type_image');
  const imgEl = popup.querySelector('img');
  imgEl.src = imgUrl;
  imgEl.alt = alt;
  popup.querySelector('.popup__caption').textContent = alt;
  openModal(popup);
}

function popupEditPreOpen() {
  const nameInput = popupEditFormElement.querySelector('.popup__input_type_name');
  const jobInput = popupEditFormElement.querySelector('.popup__input_type_description');

  const currentName = document.querySelector('.profile__title').textContent;
  const currentDesc = document.querySelector('.profile__description').textContent;

  nameInput.value = currentName;
  jobInput.value = currentDesc;
}

function popupEditFormHandler(evt) {
  evt.preventDefault();
  const nameInput = popupEditFormElement.querySelector('input[name="name"]');
  const jobInput = popupEditFormElement.querySelector('input[name="description"]');

  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closeModal(popupEdit);
}
popupEditFormElement.addEventListener('submit', popupEditFormHandler);
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  popupEditPreOpen();
  openModal(popupEdit);
});

function popupNewCardHandler(evt) {
  evt.preventDefault();
  const nameInput = popupNewCardFormElement.querySelector('input[name="place-name"]');
  const linkInput = popupNewCardFormElement.querySelector('input[name="link"]');

  const card = createCard(nameInput.value, linkInput.value, deleteCard, likeCard);
  document.querySelector('.places__list').prepend(card);
  closeModal(popupNewCard);
  nameInput.value = '';
  linkInput.value = '';
}
popupNewCardFormElement.addEventListener('submit', popupNewCardHandler);
document.querySelector('.profile__add-button').addEventListener('click', () => {
  openModal(popupNewCard);
});

const popups = document.querySelectorAll('.popup');
popups.forEach(el => {
  el.querySelector('.popup__close').addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closeModal(popup);
  });
  el.addEventListener('click', (event) => {
    if (!event.target.classList.contains('popup')) return;
    const popup = event.target
    closeModal(popup);
  })
});
