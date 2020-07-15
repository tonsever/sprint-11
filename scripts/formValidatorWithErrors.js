class FormValidatorWithError extends FormValidator {
  constructor(form) {
    super(form);
    this.switchError = this.switchError.bind(this);
    this.errorsReset = this.errorsReset.bind(this);
    this.form.closest('.popup').querySelector('.popup__close').addEventListener('click', this.errorsReset);
  }
  
  inputValidate() {
    super.inputValidate();
    const inputs = Array.from(this.form.querySelectorAll('.popup__input'));
    inputs.forEach(input => this.switchError(input));
  }

  switchError(input) {
    const spanError = this.form.querySelector(`#${input.name}-error`);
    const popupButton = this.form.querySelector('.popup__button');
    switch (true) {
      case (input.value.length === 0 || input.value.replace(/\s/g, '') === ''): 
        spanError.textContent = 'Это обязательное поле';
        break;
      case !(2 <= input.value.length && input.value.length <= 30):
        popupButton.classList.remove('button_active');
        popupButton.setAttribute('disabled', true);
        spanError.textContent = 'Должно быть от 2 до 30 символов';
        break;
      case (2 <= input.value.length && input.value.length <= 30):
        spanError.textContent = '';
        break;
    }
  }

  errorsReset() {
    const spans = Array.from(this.form.querySelectorAll('.popup__error'));
    spans.forEach(span => span.textContent = '');
  }
}