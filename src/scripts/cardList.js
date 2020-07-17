export class CardList {
  constructor(placesList, callbackCard, sendPicture) {
    this.placesList = placesList;
    this.callbackCard = callbackCard;
    this.sendPicture = sendPicture;
  }

  addCardInList(link, name) {
    const instance = this.callbackCard(link, name, this.sendPicture);
    this.placesList.appendChild(instance);
  }

  loadCards(arrCards) {
    for (let i = 0; i < arrCards.length; i += 1) {
      this.addCardInList(arrCards[i].link, arrCards[i].name);
    }
  }
}