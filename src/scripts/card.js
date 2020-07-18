export class Card {
  constructor(link, name, sendToPopup) {
    this.link = link;
    this.name = name;
    this.sendToPopup = sendToPopup;
  }

  createCard = () => {
    const placeCard = document.createElement('div');
    const placeCardImage = document.createElement('div');
    const placeCardDel = document.createElement('button');
    const placeCardDesc = document.createElement('div');
    const placeCardName = document.createElement('h3');
    const placeCardLike = document.createElement('button');

    placeCard.classList.add('place-card');
    placeCardImage.classList.add('place-card__image');
    placeCardImage.setAttribute('style', `background-image: url(${this.link})`);
    placeCardDel.classList.add('place-card__delete-icon');
    placeCardDesc.classList.add('place-card__description');
    placeCardName.classList.add('place-card__name');
    placeCardName.textContent = this.name;
    placeCardLike.classList.add('place-card__like-icon');

    placeCardImage.appendChild(placeCardDel);
    placeCardDesc.appendChild(placeCardName);
    placeCardDesc.appendChild(placeCardLike);
    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDesc);
    this.placeCard = placeCard;
    //this.placeCard.querySelector('.place-card__like-icon').addEventListener('click', this.cardLike.bind(this));
    //this.placeCard.querySelector('.place-card__delete-icon').addEventListener('click', this.cardDelete.bind(this));
    //this.placeCard.querySelector('.place-card__image').addEventListener('click', this.sendPicture.bind(this));
    this.placeCard.querySelector('.place-card__like-icon').addEventListener('click', this.cardLike);
    this.placeCard.querySelector('.place-card__delete-icon').addEventListener('click', this.cardDelete);
    this.placeCard.querySelector('.place-card__image').addEventListener('click', this.sendPicture);
    return placeCard;
  }

  cardLike= () => {
    this.placeCard.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
  }

  sendPicture = () => {
    this.sendToPopup(this.placeCard.querySelector('.place-card__image'));
  }

  cardDelete = (event) => {
    event.stopPropagation();
    this.placeCard.querySelector('.place-card__like-icon').removeEventListener('click', this.cardLike);
    this.placeCard.querySelector('.place-card__delete-icon').removeEventListener('click', this.cardDelete);
    this.placeCard.querySelector('.place-card__image').removeEventListener('click', this.sendPicture);
    this.placeCard.remove();
    this.placeCard = null;
  }

}