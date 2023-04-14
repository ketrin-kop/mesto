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
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

function openPopupEdit() {
  openPopup(popupEditBtn);
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
}

function openBigImg(evt) {
  openPopup(popupImage);
  const imgPopup = document.querySelector(".popup__image");
  const nameImgPopup = document.querySelector(".popup__image-name");
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

/**
 * Функция устанавливает обработку поведения формы на основе валидации
 * @param {HTMLFormElement} form 
 * @param {string} inputName 
 * @param {string} message 
 * @returns 
 */
const postValidation = (form, inputName, message) => {
  if(message !== '') {
    form.querySelector(`input[name="${inputName}"]`).classList.add('error');
    form.querySelector(`span[data-message-for="${inputName}"]`).classList.add('active');
    form.querySelector(`span[data-message-for="${inputName}"]`).innerHTML = message;
  } else {
    form.querySelector(`input[name="${inputName}"]`).classList.remove('error');
    form.querySelector(`span[data-message-for="${inputName}"]`).classList.remove('active');
  }
  if(form.querySelector('.error') !== null) {
    form.querySelector('button').disabled = true;
    form.querySelector('button').classList.add('disabled');
  } else {
    form.querySelector('button').disabled = false;
    form.querySelector('button').classList.remove('disabled');
  }
}

const newPlaceFormValidation = () => {
  const form = document.querySelector('.form-place');
  form.querySelector('input[name="place"]').addEventListener('input', e => {
    errMessage = e.currentTarget.validity.valid ? '' : e.currentTarget.validationMessage;
    postValidation(form, e.currentTarget.name, errMessage);
  })
  form.querySelector('input[name="link"]').addEventListener('input', e => {
    errMessage = e.currentTarget.validity.valid ? '' : e.currentTarget.validationMessage;
    postValidation(form, e.currentTarget.name, errMessage);
  })
}

const editProfileFormValidation = () => {
  editProfilePopup.querySelector('input[name="firstname"]').addEventListener('input', e => {
    errMessage = e.currentTarget.validity.valid ? '' : e.currentTarget.validationMessage;
    postValidation(editProfilePopup, e.currentTarget.name, errMessage)
  })
  editProfilePopup.querySelector('input[name="description"]').addEventListener('input', e => {
    errMessage = e.currentTarget.validity.valid ? '' : e.currentTarget.validationMessage;
    postValidation(editProfilePopup, e.currentTarget.name, errMessage);
  })
}

// Навешивание событий на элементы

document.addEventListener('DOMContentLoaded', () => {
  renderAllPlaceCards();
  newPlaceFormValidation();
  editProfileFormValidation();

  document.querySelector('.form-place').addEventListener('submit', e => {
    e.preventDefault();
    const nameCard = e.currentTarget.querySelector(".popup__input_text_place");
    const linkCard = e.currentTarget.querySelector(".popup__input_text_link");
    newCard = createPlaceCard({name: nameCard.value, link: linkCard.value});
    closePopup(popupAddBtn);
    placeCard.prepend(newCard);
  })
  editProfilePopup.addEventListener('submit', handleProfileFormSubmit);

  popupImage.querySelector(".popup__close").addEventListener("click", () => closePopup(popupImage));
  editProfileOpenButton.addEventListener("click", openPopupEdit);
  editProfileCloseButton.addEventListener("click", () => closePopup(popupEditBtn));
  document.querySelector(".profile__add-button").addEventListener("click", () => openPopup(popupAddBtn));
  popupAddBtn.querySelector(".popup__close").addEventListener("click", () => closePopup(popupAddBtn));

  document.addEventListener('keydown', function (e) {
    if(e.keyCode === 27) {
      closePopup(document.querySelector('.popup_opened'))
    };
  });

  const overlays = document.querySelectorAll('.popup');
  for (const overlay of overlays) {
    overlay.addEventListener('click', e => {
      if(e.target.classList.contains('popup')) {
        closePopup(e.currentTarget);
      }
    })
  }
})
