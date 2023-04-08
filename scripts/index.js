let popupEditBtn = document.querySelector(".popup_edit_btn");
let popupAddBtn = document.querySelector(".popup_add_btn");
let popupImage = document.querySelector(".image-popup");
const popupCloseButtonElement = popupEditBtn.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector('.popup__input_text_name');
let jobInput = document.querySelector('.popup__input_text_description');
let profileName = document.querySelector(".profile__info-name");
let profileDescription = document.querySelector(".profile__info-description");
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

  if (toStart) {
    placeElement.querySelector(".element__img").addEventListener('click', openBigImg);
    placeElement.querySelector(".element__delete").addEventListener('click', cardDelete);
    placeElement.querySelector(".element__group-like").addEventListener('click', likeActiv);
    placeCard.prepend(placeElement);

  } else {
    placeCard.append(placeElement);
  }
}

render();

//создание новой карточки
const myForm = document.querySelector('.form-place');
myForm.addEventListener('submit', e => {
  e.preventDefault();
  const nameCard = e.currentTarget.querySelector(".popup__input_text_place");
  const linkCard = e.currentTarget.querySelector(".popup__input_text_link");
  renderCard({ name: nameCard.value, link: linkCard.value, toStart: true });
  closePopup();
})

//открыиме и закрытие popup
function openPopupEdit() {
  popupEditBtn.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function openPopupAdd() {
  popupAddBtn.classList.add("popup_opened");
}

function openBigImg(evt) {
  popupImage.classList.add('popup_opened');
  const popupImg = document.querySelector(".image-popup__img");
  const popupImgName = document.querySelector(".image-popup__name");
  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.name;
  popupImg.alt = evt.target.alt;
  popupImgName.textContent = evt.target.alt;
}

function closePopup() {
  popupEditBtn.classList.remove("popup_opened");
  popupAddBtn.classList.remove("popup_opened");
  popupImage.classList.remove("popup_opened");
}


const imgs = document.querySelectorAll(".element__img");
for (const img of imgs) {
  img.addEventListener("click", openBigImg);
}

document.querySelector(".image-popup__close").addEventListener("click", closePopup);

popupOpenButtonElement.addEventListener("click", openPopupEdit);
popupCloseButtonElement.addEventListener("click", closePopup);
document.querySelector(".profile__add-button").addEventListener("click", openPopupAdd);
popupAddBtn.querySelector(".popup__close").addEventListener("click", closePopup);

//редактор профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);

//удаление карточки
function cardDelete(event) {
  const card = event.target.closest(".element");
  card.remove();
}

const deleteBtns = document.querySelectorAll(".element__delete");

for (const deleteBtn of deleteBtns) {
  deleteBtn.addEventListener('click', cardDelete);
}

//Лайк
function likeActiv(event) {
  event.currentTarget.classList.toggle('element__group-like_active');
}

const likes = document.querySelectorAll(".element__group-like");

for (const like of likes) {
  like.addEventListener('click', likeActiv);
}

