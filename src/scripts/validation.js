const showInputError = (formInput, config, errorMessage) => {
  formInput.classList.add(config.inputErrorClass);
  const errorMessageElement = formInput.nextElementSibling;
  console.log(errorMessageElement);
  if (!errorMessageElement.classList.contains('popup__error')) return;

  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add(config.errorClass)
};
const hideInputError = (formInput, config ) => {
  formInput.classList.remove(config.inputErrorClass);
  const errorMessageElement = formInput.nextElementSibling;
  errorMessageElement.classList.remove(config.errorClass);
  errorMessageElement.textContent = '';
};

function getInputErrorText(input) {
  if (input.required && input.value.length === 0 && input.dataset.errorEmpty) return input.dataset.errorEmpty;
  if (input.minLength && input.value.length < input.minLength && input.dataset.errorMinLength) return input.dataset.errorMinLength
  if (input.pattern && !new RegExp(input.pattern).test(input.value) && input.dataset.errorPattern) return input.dataset.errorPattern
  if (input.validationMessage) return input.validationMessage;
}

function checkFormValidity(form, config) {
  const isFormValid = form.checkValidity();
  const formBtn = form.querySelector(config.submitButtonSelector);
  formBtn.disabled = !isFormValid;
  !isFormValid ? formBtn.classList.add(config.inactiveButtonClass) : formBtn.classList.remove(config.inactiveButtonClass);
}

const isValid = (event, config) => {
  const formInput = event.target;
  if (!formInput.validity.valid) {
    const errorMessage = getInputErrorText(formInput);
    showInputError(formInput, config, errorMessage);
  } else {
    hideInputError(formInput, config);
  }

  checkFormValidity(formInput.closest(config.formSelector), config);
};

export function clearValidation(form, config) {
  const formBtn = form.querySelector(config.submitButtonSelector);
  formBtn.disabled = true;
  formBtn.classList.add(config.inactiveButtonClass);
  const errorMessageElements = form.querySelectorAll('.popup__error')
  errorMessageElements.forEach((errorMessageElement) => {
    errorMessageElement.textContent = '';
    errorMessageElement.classList.remove(config.errorClass);
  });
}

export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  for (const form of forms) {
    const formInputs = form.querySelectorAll(config.inputSelector);
    formInputs.forEach(formInput => formInput.addEventListener('input', (event) => isValid(event, config)));
  }
}