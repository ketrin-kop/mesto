class FormValidator {
    constructor(options, form) {
        this._options = options;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._options.inputSelector));
        this._buttonElement = this._form.querySelector(this._options.submitButtonSelector);
    }

    _toggleButtonState() {
        const isValid = this._inputList.every((input) => input.validity.valid);
        if (isValid) {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._options.inactiveButtonClass);
        } else {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._options.inactiveButtonClass);
        }
    }

    enableValidation() {
        this._validationEvents();
    }

    _validationEvents() {
        for (const input of this._inputList) {
            input.addEventListener('input', e => {
                let errMessage = e.currentTarget.validity.valid ? '' : e.currentTarget.validationMessage;
                this._postValidation(e.currentTarget, errMessage);
            })
        }
    }

    /**
     * Функция устанавливает обработку поведения формы на основе валидации
     * @param message
     * @param {Element} input
     * @private
     */
    _postValidation(input, message) {
        const inputName = input.name;
        if (message !== '') {
            input.classList.add(this._options.inputErrorClass);
            this._form.querySelector(`span[data-message-for="${inputName}"]`).classList.add(this._options.errorClass);
            this._form.querySelector(`span[data-message-for="${inputName}"]`).innerHTML = message;
        } else {
            input.classList.remove(this._options.inputErrorClass);
            this._form.querySelector(`span[data-message-for="${inputName}"]`).classList.remove(this._options.errorClass);
        }
        if (this._form.querySelector(`.${this._options.inputErrorClass}`) !== null) {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._options.inactiveButtonClass);
        } else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._options.inactiveButtonClass);
        }
        this._toggleButtonState();

    }

    resetValidation() {
        this._inputList.forEach(input => {
            input.classList.remove(this._options.inputErrorClass);
            this._form.querySelectorAll(`.${this._options.errorClass}`).forEach(span => {
                span.classList.remove(this._options.errorClass);
                span.innerHTML = '';
            });
            this._toggleButtonState();
        })
    }
}

export default FormValidator;