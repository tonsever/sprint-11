import {Popup} from './popup.js';
export class PopupForm extends Popup {
    constructor(container, form) {
      super(container);
      this.form = form;
    }
    close() {
      super.close();
      const popupButton = this.form.querySelector('.popup__button');
      if (!popupButton.classList.contains('save__button')) {
        popupButton.classList.remove('button_active');
        popupButton.setAttribute('disabled', true);
      }
      this.form.reset();
    }
    open() {
      super.open();
      const popupButton = this.form.querySelector('.popup__button');
      if (popupButton.classList.contains('save__button')) {
        popupButton.classList.add('button_active');
        popupButton.removeAttribute('disabled');
      }
    }
  }