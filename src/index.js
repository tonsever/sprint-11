import { Api } from './scripts/api.js';
import { Card } from './scripts/card.js';
import { CardList } from './scripts/cardList.js';
import { Popup } from './scripts/popup.js';
import { PopupForm } from './scripts/popupForm.js';
import { PopupImage } from './scripts/popupImage.js';
import { UserInfo } from './scripts/userInfo.js';
import { FormValidator } from './scripts/formValidator.js';
import { FormValidatorWithError } from './scripts/formValidatorWithErrors.js';
import "./pages/index.css";

const root = document.querySelector('.root');
const placesList = root.querySelector('.places-list');
const popupNew = root.querySelector('.popup_new');
const userInfoButton = root.querySelector('.user-info__button');
const popupEdit = root.querySelector('.popup_edit');
const editInfoButton = root.querySelector('.edit-info__button');
const popupPicture = root.querySelector('.popup_picture');
const formNew = document.forms.new;
const formEdit = document.forms.edit;
const nameInfo = root.querySelector('.user-info__name');
const jobInfo = root.querySelector('.user-info__job');
const photoInfo = root.querySelector('.user-info__photo');

const API_URL = NODE_ENV === 'production' ? 'https://praktikum.tk' : 'http://praktikum.tk';

const config = {
  urlUser: `${API_URL}/cohort11/users/me`,
  urlCards: `${API_URL}/cohort11/cards`,
  headers: {
    authorization: '19913bd6-c98f-45a1-ae54-95f6284f3235',
    'Content-Type': 'application/json'
  }
};

const sendPicture = function (picture) {
  const bg = picture.getAttribute('style');
  const url = bg.slice((bg.indexOf('(')) + 1, (bg.length) - 1);
  createPopupImage.open(url);
};

const createCard = function (link, name, sendPicture) {
  return new Card(link, name, sendPicture).createCard();
};

const api = new Api(config);
const cardList = new CardList(placesList, createCard, sendPicture);
const createPopupNew = new PopupForm(popupNew, formNew);
const createPopupEdit = new PopupForm(popupEdit, formEdit);
const createPopupImage = new PopupImage(popupPicture);
const userInfo = new UserInfo(jobInfo, nameInfo, jobInfo.textContent, nameInfo.textContent);
const formValidator = new FormValidator(formNew);
const formValidatorWithError = new FormValidatorWithError(formEdit);

api.getUserInfo().then(res => {
  nameInfo.textContent = res.name;
  jobInfo.textContent = res.about;
  photoInfo.setAttribute('style', `background-image: url(${res.avatar})`);
});

function openUserInfo() {
  createPopupEdit.open();
  formEdit.elements.name.value = nameInfo.textContent;
  formEdit.elements.job.value = jobInfo.textContent;
}

function setUserInfo(event) {
  event.preventDefault();
  api.updateUserInfo(formEdit.name.value, formEdit.job.value)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
      userInfo.updateUserInfo();
      createPopupEdit.close();
    });
}

function addNewCard(event) {
  event.preventDefault();
  const name = formNew.elements.name.value;
  const link = formNew.elements.link.value;
  cardList.addCardInList(link, name);
  createPopupNew.close();
}

userInfoButton.addEventListener('click', createPopupNew.open);
editInfoButton.addEventListener('click', openUserInfo);
formNew.addEventListener('submit', addNewCard);
formEdit.addEventListener('submit', setUserInfo);

api.getCards().then(res => {
  cardList.loadCards(res.slice(0, 10));
});