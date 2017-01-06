import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line import/no-extraneous-dependencies
import { MemoryRouter } from 'react-router';
import Root from './Root';

test('Root is tested', () => {
  const component = renderer.create(
    <MemoryRouter>
      <Root />
    </MemoryRouter>,
  );

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
