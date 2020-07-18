/* eslint-disable prettier/prettier */
export const currencyFormat = (num) =>
  num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

export const Request = (url, method, body = null) => {
  const headers = {'Content-Type': 'application/json'};
  const req = {
    method,
    headers,
  };

  if (body !== null) req.body = JSON.stringify(body);

  return fetch(url, req).then((data) => data.json());
};

export const url = 'https://pos-be.herokuapp.com/api';
