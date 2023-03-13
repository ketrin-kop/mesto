const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".edit-button");
const saveProfileForm = document.querySelector(".js-save-profile");
const likeClick = document.querySelectorAll(".element__group-like");

const openPopup = function () {
    popupElement.classList.add("popup_opened");
};

const closePopup = function () {
    popupElement.classList.remove("popup_opened");
};

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

saveProfileForm.addEventListener("submit", e => {
    e.preventDefault();
    document.querySelector(".profile-info__name").innerHTML = saveProfileForm.querySelector('[name="firstname"]').value;
    document.querySelector(".profile-info__description").innerHTML = saveProfileForm.querySelector('[name="description"]').value;
    closePopup();
});

function makelike(event) {
    event.currentTarget.classList.toggle('element__group-like_active');
}

for (const element of likeClick) {
    element.addEventListener('click', makelike);
}

saveProfileForm.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});