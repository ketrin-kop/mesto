import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupEditBtn = document.querySelector(".popup_type_edit-profile");
const popupAddBtn = document.querySelector(".popup_type_add-image");
const popupImage = document.querySelector(".popup_type_show-image");
const editProfileCloseButton = popupEditBtn.querySelector(".popup__close");
const editProfileOpenButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".form-profile");
const addPlacePopup = document.querySelector('.form-place');
const editProfileNameInput = document.querySelector('.popup__input_text_name');
const editProfileDescriptionInput = document.querySelector('.popup__input_text_description');
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");
const cardTemplate = document.querySelector("#card").content;
const imgPopup = document.querySelector(".popup__image");
const nameImgPopup = document.querySelector(".popup__image-name");
const addCardPlaceInput = document.querySelector(".popup__input_text_place");
const addCardLinkInput = document.querySelector(".popup__input_text_link");


let editFormValidator = null;
let addFormValidator = null;


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsField = document.querySelector(".elements");

function createCard(item) {
  const cardElement = new Card(item, cardTemplate, handleCardClick).createCard();
  return cardElement;
}

/**
 * Отрисовка всех карточек по заданному массиву
 */
function renderAllPlaceCards() {
  initialCards.forEach(item => {
    const newCard = createCard(item);
    cardsField.append(newCard);
  });
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

function openPopupEdit() {
  openPopup(popupEditBtn);
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  editFormValidator.resetValidation();
}

function openPopupAdd() {
  addFormValidator.resetValidation();
  openPopup(popupAddBtn);
  // const saveBtn = popupAddBtn.querySelector('.popup__save');
  // saveBtn.classList.add('popup__save_disabled');
  // saveBtn.disabled = true;
}

function handleCardClick(evt) {
  openPopup(popupImage);
  imgPopup.src = evt.target.src;
  imgPopup.alt = evt.target.name;
  imgPopup.alt = evt.target.alt;
  nameImgPopup.textContent = evt.target.alt;
}

/**
 * Обработчик события сабмита формы редактирования профиля
 * @param {*} evt 
 */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
  closePopup(popupEditBtn);
}


function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Навешивание событий на элементы
const initFormPlaceEventListeners = () => {
  document.querySelector('.form-place').addEventListener('submit', e => {
    e.preventDefault();
    const newCard = createCard({
      name: addCardPlaceInput.value,
      link: addCardLinkInput.value
    });
    closePopup(popupAddBtn);
    cardsField.prepend(newCard);
    e.target.reset();
  })
}

const initEditPopupLogic = () => {
  editProfileOpenButton.addEventListener("click", openPopupEdit);
  editProfileCloseButton.addEventListener("click", () => closePopup(popupEditBtn));
  editProfilePopup.addEventListener('submit', handleProfileFormSubmit);
  const form = editProfilePopup;
  editFormValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }, form);
  editFormValidator.enableValidation();
}

const initAddPopupLogic = () => {
  popupAddBtn.querySelector(".popup__close").addEventListener("click", () => closePopup(popupAddBtn));
  document.querySelector(".profile__add-button").addEventListener("click", openPopupAdd);
  const form = addPlacePopup;
  addFormValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }, form);
  addFormValidator.enableValidation();
}

document.addEventListener('DOMContentLoaded', () => {
  renderAllPlaceCards();
  initFormPlaceEventListeners();
  initEditPopupLogic();
  initAddPopupLogic();

  popupImage.querySelector(".popup__close").addEventListener("click", () => closePopup(popupImage));
  const allPopups = document.querySelectorAll('.popup');
  for (const overlay of allPopups) {
    overlay.addEventListener('click', e => {
      if (e.target.classList.contains('popup')) {
        closePopup(e.currentTarget);
      }
    })
  }
})
