class Api {
  constructor(config) {
    this.urlUser = config.urlUser;
    this.urlCards = config.urlCards;
    this.headers = config.headers;
  }

  getUserInfo() {
    return fetch(this.urlUser, {
        headers: this.headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Произошла ошибка");
      })
    .catch(err => console.log(err));
  }

  updateUserInfo(name, about) {
    return fetch(this.urlUser, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({ name, about })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Произошла ошибка");
      })
    .catch(err => console.log(err));
  }

  getCards() {
    return fetch(this.urlCards, {
        headers: this.headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Произошла ошибка");
      })
    .catch(err => console.log(err));
  }
}