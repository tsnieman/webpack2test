import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line import/no-extraneous-dependencies
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

test('Header is tested', () => {
  const component = renderer.create(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
