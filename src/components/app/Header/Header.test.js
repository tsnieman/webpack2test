// Header.js
import React from 'react';
import Header from './Header.js';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router'

test('Header is tested', () => {
  const component = renderer.create(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
