import checkResponse from "./checkResponse";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: '9a72e160-d048-4d7c-be37-e3e7178de60e',
    'Content-Type': 'application/json'
  }
}

export default function request(endpoint, method = 'GET', data = undefined) {
  const options = {
    method,
    headers: config.headers,
    body: (data) ? JSON.stringify(data) : undefined
  }
  return fetch(config.baseUrl + endpoint, options)
  .then(checkResponse)
  .then(res => res.json());
}