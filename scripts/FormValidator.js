class FormValidator {
    constructor(options) {
        this._options = options;
        this._inputs = document.querySelectorAll(`${this._options.inputSelector}`);
    }

    enableValidation() {
        this._validationEvents();
    }

    _validationEvents() {
        for (const input of this._inputs) {
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
        const form = input.closest(this._options.formSelector);
        const inputName = input.name;
        if (message !== '') {
            input.classList.add(this._options.inputErrorClass);
            form.querySelector(`span[data-message-for="${inputName}"]`).classList.add(this._options.errorClass);
            form.querySelector(`span[data-message-for="${inputName}"]`).innerHTML = message;
        } else {
            input.classList.remove(this._options.inputErrorClass);
            form.querySelector(`span[data-message-for="${inputName}"]`).classList.remove(this._options.errorClass);
        }
        if (form.querySelector(`.${this._options.inputErrorClass}`) !== null) {
            form.querySelector(this._options.submitButtonSelector).disabled = true;
            form.querySelector(this._options.submitButtonSelector).classList.add(this._options.inactiveButtonClass);
        } else {
            form.querySelector(this._options.submitButtonSelector).disabled = false;
            form.querySelector(this._options.submitButtonSelector).classList.remove(this._options.inactiveButtonClass);
        }
    }
}

export default FormValidator;