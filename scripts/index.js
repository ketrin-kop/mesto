let popupEditBtn = document.querySelector(".popup_edit_btn");
let popupAddBtn = document.querySelector(".popup_add_btn");
const popupCloseButtonElement = popupEditBtn.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector('.popup__input_text_name');
let jobInput = document.querySelector('.popup__input_text_description');
let profileName = document.querySelector(".profile__info-name");
let profileDescription = document.querySelector(".profile__info-description");

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
const placeInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

function render() {
  placeInfo.forEach(renderCard);
}

function renderCard({ name, link }) {
  const placeElement = placeCard.querySelector(".element").cloneNode(true);
  placeElement.querySelector(".element__group-name").textContent = name;
  placeElement.querySelector(".element__img").src = link;

  placeCard.prepend(placeElement);
}

render();


function openPopupEdit() {
  popupEditBtn.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

function openPopupAdd() {
  popupAddBtn.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

function closePopup() {
  popupEditBtn.classList.remove("popup_opened");
  popupAddBtn.classList.remove("popup_opened");
};

popupOpenButtonElement.addEventListener("click", openPopupEdit);
popupCloseButtonElement.addEventListener("click", closePopup);
document.querySelector(".profile__add-button").addEventListener("click", openPopupAdd);
popupAddBtn.querySelector(".popup__close").addEventListener("click", closePopup);


function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
