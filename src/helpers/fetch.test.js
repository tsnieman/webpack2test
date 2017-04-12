/* global jest */
jest.dontMock('./fetch');
import fetch from './fetch';

test('Fetch: 400 throws error', () => {
  // this "reqres" URL fetches a "not found" user (HTTP status > 400)
  fetch('https://reqres.in/api/users/23').then((response) => {
    expect(response).toEqual('should have been an error');
  }).catch((err) => {
    // TODO "good enough", not the best test
    expect(err).toBeInstanceOf(Error);

    // TODO These don't seem to work:
    // .toMatchSnapshot(optionalString)
    // .toThrow(error)
    // .toThrowErrorMatchingSnapshot()
  });
});

// TODO: successful fetches return content
test('Fetch: successful requests load JSON', () => {
  // this "reqres" URL fetches a json blob of users
  fetch('https://reqres.in/api/users?page=2').then((response) => {
    expect(response).toEqual({
      page: '2',
      per_page: 3,
      total: 12,
      total_pages: 4,
      data: [
        {
          id: 4,
          first_name: 'eve',
          last_name: 'holt',
          avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg',
        },
        {
          id: 5,
          first_name: 'gob',
          last_name: 'bluth',
          avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg',
        },
        {
          id: 6,
          first_name: 'tracey',
          last_name: 'bluth',
          avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg',
        },
      ],
    });
  }).catch((err) => {
    expect(err).toEqual('should have been a JSON response');
  });
});
