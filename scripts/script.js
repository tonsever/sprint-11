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

const config = {
  urlUser: 'https://praktikum.tk/cohort11/users/me',
  urlCards: 'https://praktikum.tk/cohort11/cards',
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
//const userInfo = new UserInfo(jobInfo, nameInfo, formEdit, api);
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
  //userInfo.setUserInfo();
  formEdit.elements.name.value = nameInfo.textContent;
  formEdit.elements.job.value = jobInfo.textContent;
}
/*
function setUserInfo(event) {
  event.preventDefault();
  userInfo.updateUserInfo();
  createPopupEdit.close();
}
*/
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


/**
 * Привет! У вас получилась очень хорошая и аккуратная работа, обязательный функционал реализован и
 * работает в соответствии с проектным заданием без очевидных багов.
 *
 * Что понравилось:
 *  - Порядок в коде.
 *  - Корректная работа с асинхронным кодом.
 *
 * Что надо исправить для того, чтобы работа была принята:
 *  - Добавляйте catch в конец цепочки промисов для обработки непредвиденных ошибок, например, выводите
 *    текст ошибки в консоль. +++
 *
 * Что можно сделать лучше:
 *  - По-моему, в данный момент класс UserInfo несколько перегружен ответственностями, и лучше бы его
 *    немного упростить, подробнее см. комментарий в userInfo.js
 */

/**
 * 9-ый спринт, 2-ая итерация.
 * Отлично, основная часть комментариев проработана и исправлена, осталось совсем немного.
 * Чтобы работа была принята, исправьте, пожалуйста, все замечания в коде, отмеченные как "Надо исправить".
 * Также обратите внимание на обновленный комментарий "Можно лучше" в файле userInfo.js
 */

/**
 * 9-ый спринт, 3-я итерация.
 * Все критичные замечания исправлены - отличная работа!
 * Успехов на следущих спринтах ;)
 */