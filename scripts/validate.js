/**
 * Функция устанавливает обработку поведения формы на основе валидации
 * @param {HTMLFormElement} form 
 * @param {string} inputName 
 * @param {string} message 
 * @param {object} options
 * @returns {void}
 */
const postValidation = (input, message, options) => {
    const form = input.closest(options.formSelector);
    const inputName = input.name;
    if (message !== '') {
        input.classList.add(options.inputErrorClass);
        form.querySelector(`span[data-message-for="${inputName}"]`).classList.add(options.errorClass);
        form.querySelector(`span[data-message-for="${inputName}"]`).innerHTML = message;
    } else {
        input.classList.remove(options.inputErrorClass);
        form.querySelector(`span[data-message-for="${inputName}"]`).classList.remove(options.errorClass);
    }
    if (form.querySelector(`.${options.inputErrorClass}`) !== null) {
        form.querySelector(options.submitButtonSelector).disabled = true;
        form.querySelector(options.submitButtonSelector).classList.add(options.inactiveButtonClass);
    } else {
        form.querySelector(options.submitButtonSelector).disabled = false;
        form.querySelector(options.submitButtonSelector).classList.remove(options.inactiveButtonClass);
    }
}

/**
 * 
 * @param {object} options
 * @param {string} options.formSelector
 * @param {string} options.inputSelector
 * @param {string} options.submitButtonSelector
 * @param {string} options.inactiveButtonClass
 * @param {string} options.inputErrorClass
 * @param {string} options.inputErrorClass
 */
const enableValidation = (options) => {
    const inputs = document.querySelectorAll(`${options.inputSelector}`);
    for (const input of inputs) {
        input.addEventListener('input', e => {
            errMessage = e.currentTarget.validity.valid ? '' : e.currentTarget.validationMessage;
            postValidation(e.currentTarget, errMessage, options);
        })
    }
}
