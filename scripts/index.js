const popupEditBtn = document.querySelector(".popup_type_edit-profile");
const popupAddBtn = document.querySelector(".popup_type_add-image");
const popupImage = document.querySelector(".popup_type_show-image");
const editProfileCloseButton = popupEditBtn.querySelector(".popup__close");
const editProfileOpenButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".form-profile");
const editProfileNameInput = document.querySelector('.popup__input_text_name');
const editProfileDescriptionInput = document.querySelector('.popup__input_text_description');
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");
const allCard = document.querySelector("#card").content;
const imgPopup = document.querySelector(".popup__image");
const nameImgPopup = document.querySelector(".popup__image-name");

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

const placeCard = document.querySelector(".elements");

/**
 * Отрисовка всех карточек по заданному массиву
 */
function renderAllPlaceCards() {
  initialCards.forEach(item => {
    newCard = createPlaceCard(item);
    placeCard.append(newCard);
  });
}

/**
 * Определить события для карточки локации
 * @param {HTMLElement} placeElement 
 * @returns void
 */
function setCardEventListeners(placeElement) {
  placeElement.querySelector(".element__img").addEventListener('click', openBigImg);
  placeElement.querySelector(".element__delete").addEventListener('click', deleteCard);
  placeElement.querySelector(".element__group-like").addEventListener('click', likeActiv);
}

/**
 * Creates a new card element based on the provided item data
 * @param {object} item - The data for the item
 * @param {string} item.name - The name of the item
 * @param {string} item.link - The URL for the item's image
 * @returns {HTMLElement}
 */
function createPlaceCard(item) {
  const placeElement = allCard.cloneNode(true);
  placeElement.querySelector(".element__group-name").textContent = item.name;
  placeElement.querySelector(".element__img").src = item.link;
  placeElement.querySelector(".element__img").alt = item.name;
  setCardEventListeners(placeElement);
  return placeElement;
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
}

function openPopupAdd() {
  openPopup(popupAddBtn);
  const saveBtn = popupAddBtn.querySelector('.popup__save');
  saveBtn.classList.add('popup__save_disabled');
  saveBtn.disabled = true;
}

function openBigImg(evt) {
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

//Удаление карточки
function deleteCard(event) {
  const card = event.target.closest(".element");
  card.remove();
}

//Лайк
function likeActiv(event) {
  event.currentTarget.classList.toggle('element__group-like_active');
}

function closeByEscape(evt) {
  console.log(evt.key)
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Навешивание событий на элементы

document.addEventListener('DOMContentLoaded', () => {
  renderAllPlaceCards();
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  document.querySelector('.form-place').addEventListener('submit', e => {
    e.preventDefault();
    const newCard = createPlaceCard({
      name: e.currentTarget.querySelector(".popup__input_text_place").value,
      link: e.currentTarget.querySelector(".popup__input_text_link").value
    });
    closePopup(popupAddBtn);
    placeCard.prepend(newCard);
    e.target.reset();
  })
  editProfilePopup.addEventListener('submit', handleProfileFormSubmit);

  popupImage.querySelector(".popup__close").addEventListener("click", () => closePopup(popupImage));
  editProfileOpenButton.addEventListener("click", openPopupEdit);
  editProfileCloseButton.addEventListener("click", () => closePopup(popupEditBtn));
  document.querySelector(".profile__add-button").addEventListener("click", openPopupAdd);
  popupAddBtn.querySelector(".popup__close").addEventListener("click", () => closePopup(popupAddBtn));

  const allPopups = document.querySelectorAll('.popup');
  for (const overlay of allPopups) {
    overlay.addEventListener('click', e => {
      if (e.target.classList.contains('popup')) {
        closePopup(e.currentTarget);
      }
    })
  }
})
