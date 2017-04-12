/* global fetch */
// jest.dontMock('isomorphic-fetch');
import fetch from 'isomorphic-fetch';

export default function fetchHelper(endpoint, options = {}) {
  return fetch(endpoint, options).then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }

    return response.json();
  });
}
