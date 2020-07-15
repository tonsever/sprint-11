class FormValidator {
  constructor(form) {
    this.form = form;
    this.inputValidate = this.inputValidate.bind(this);
    this.form.addEventListener('input', this.inputValidate);
  }

  inputValidate() {
    const inputs = Array.from(this.form.querySelectorAll('.popup__input'));
    const popupButton = this.form.querySelector('.popup__button');
    const isValid = inputs.every(function (input) {
      return (!(input.value.length === 0) && !(input.value.replace(/\s/g, '') === ''));
    });
    if (isValid) {
      popupButton.classList.add('button_active');
      popupButton.removeAttribute('disabled');
    } else {
      popupButton.classList.remove('button_active');
      popupButton.setAttribute('disabled', true);
    }
  }
}