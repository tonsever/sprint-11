export class Popup {
  constructor(container) {
    this.container = container;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.container.querySelector('.popup__close').addEventListener('click', this.close); 
  }
  close() {
    this.container.classList.remove('popup_is-opened');
  }
  open() {
    this.container.classList.add('popup_is-opened');
  }
}