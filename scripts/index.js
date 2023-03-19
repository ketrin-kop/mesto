let popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector('.popup__input_text_name');
let jobInput = document.querySelector('.popup__input_text_description');
let profileName = document.querySelector(".profile__info-name");
let profileDescription = document.querySelector(".profile__info-description");

function openPopup() {
    popupElement.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
};

function closePopup() {
    popupElement.classList.remove("popup_opened");
};

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
