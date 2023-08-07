class Api {
    constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
      this._authorization = options.headers.authorization;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject;
      }
    }
  
    getInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: {
          authorization: this._authorization,
        },
      }).then((res) => this._checkResponse(res));
    }
  
    getCards() {
      return fetch(`${this._url}/cards`, {
        headers: {
          authorization: this._authorization,
        },
      }).then(this._checkResponse);
    }
  
    editUserInfo(formData) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          about: formData.job,
        }),
      }).then(this._checkResponse);
    }
  
    editUserAvatar(formData) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: formData,
        }),
      }).then(this._checkResponse);
    }
  
    addCard(formData) {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.place,
          link: formData.link,
        }),
      }).then(this._checkResponse);
    }
  
    addLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          authorization: this._authorization,
        },
      }).then(this._checkResponse);
    }
  
    deleteLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          authorization: this._authorization,
        },
      }).then(this._checkResponse);
    }
  
    //Удаление карточки
    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers: { authorization: this._authorization },
      }).then(this._checkResponse);
    }
  }

  const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-69",
    headers: {
      authorization: "35294db3-72ed-4381-957a-6db1f54d4026",
      "Content-Type": "application/json",
    },
  });

  export default api;