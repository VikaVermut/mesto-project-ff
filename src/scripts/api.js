const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: '9a72e160-d048-4d7c-be37-e3e7178de60e',
    'Content-Type': 'application/json'
  }
}

export const getUser = () => {
  return fetch(config.baseUrl + '/users/me', {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

export const editUser = (name, about) => {
  return fetch(config.baseUrl +'/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

export const changeAvatar = (link) => {
  return fetch(config.baseUrl +'/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

export const getInitialCards = () => {
  return fetch(config.baseUrl + '/cards', {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

export const addCard = (name, link) => {
  return fetch(config.baseUrl +'/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

export const removeCard = (cardId) => {
  return fetch(config.baseUrl +'/cards/' + cardId, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

export const like = (cardId) => {
  return fetch(config.baseUrl +'/cards/likes/' + cardId, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

export const dislike = (cardId) => {
  return fetch(config.baseUrl +'/cards/likes/' + cardId, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}