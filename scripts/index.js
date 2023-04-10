const popupEditBtn = document.querySelector(".popup_edit_btn");
const popupAddBtn = document.querySelector(".popup_add_btn");
const popupImage = document.querySelector(".image-popup");
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

//создание галереии
const placeCard = document.querySelector(".elements");
const placeInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link,
    toStart: false
  };
});

function render() {
  placeInfo.forEach(renderCard);
}

function renderCard({ name, link, toStart }) {
  const placeElement = allCard.cloneNode(true);
  placeElement.querySelector(".element__group-name").textContent = name;
  placeElement.querySelector(".element__img").src = link;
  placeElement.querySelector(".element__img").alt = name;
  setEventListeners(placeElement);

  placeCard.prepend(placeElement);
}

function setEventListeners(placeElement) {
  placeElement.querySelector(".element__img").addEventListener('click', openBigImg);
  placeElement.querySelector(".element__delete").addEventListener('click', deleteCard);
  placeElement.querySelector(".element__group-like").addEventListener('click', likeActiv);
}

render();

//создание новой карточки
const addPlacePopup = document.querySelector('.form-place');
addPlacePopup.addEventListener('submit', e => {
  e.preventDefault();
  const nameCard = e.currentTarget.querySelector(".popup__input_text_place");
  const linkCard = e.currentTarget.querySelector(".popup__input_text_link");
  renderCard({ name: nameCard.value, link: linkCard.value, toStart: true });
  closePopup(popupAddBtn);
  placeCard.append(placeElement);
})

//открыиме и закрытие popup
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

editProfileOpenButton.addEventListener("click", openPopupEdit);
editProfileCloseButton.addEventListener("click", () => closePopup(popupEditBtn));
document.querySelector(".profile__add-button").addEventListener("click", () => openPopup(popupAddBtn));
popupAddBtn.querySelector(".popup__close").addEventListener("click", () => closePopup(popupAddBtn));

function openPopupEdit() {
  openPopup(popupEditBtn);
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
}

function openBigImg(evt) {
  openPopup(popupImage);
  const imgPopup = document.querySelector(".image-popup__img");
  const nameImgPopup = document.querySelector(".image-popup__name");
  imgPopup.src = evt.target.src;
  imgPopup.alt = evt.target.name;
  imgPopup.alt = evt.target.alt;
  nameImgPopup.textContent = evt.target.alt;
}

popupImage.querySelector(".popup__close").addEventListener("click", () => closePopup(popupImage));

//редактор профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
  closePopup(popupEditBtn);
}

editProfilePopup.addEventListener('submit', handleFormSubmit);

//удаление карточки
function deleteCard(event) {
  const card = event.target.closest(".element");
  card.remove();
}

//Лайк
function likeActiv(event) {
  event.currentTarget.classList.toggle('element__group-like_active');
}
