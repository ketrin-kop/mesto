class Card {
    constructor(item, cardTemplate, handleCardClick) {
        this.name = item.name;
        this.link = item.link;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
    }

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".element__img").src = this.link;
        this._element.querySelector(".element__img").alt = this.name;
        this._element.querySelector(".element__group-name").textContent = this.name;
        return this._element;
    }

    _getTemplate() {
        return this._cardTemplate.cloneNode(true);
    }

    _setEventListeners() {
        this._element.querySelector(".element__group-like").addEventListener("click", this._like);
        this._element.querySelector(".element__delete").addEventListener("click", this._remove);
        this._element.querySelector(".element__img").addEventListener("click", this._handleCardClick);
    }

    _like = (e) => {
        e.target.classList.toggle("element__group-like_active");
    }

    _remove = (e) => {
        e.target.closest(".element").remove();
    }

}

export default Card;