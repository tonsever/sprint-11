import {Popup} from './popup.js';
export class PopupImage extends Popup {
  open(url) {
    super.open();
    this.container.querySelector('#big_picture').setAttribute('src', url);
  }
}