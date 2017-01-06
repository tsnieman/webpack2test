import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line import/no-extraneous-dependencies
import { MemoryRouter } from 'react-router';
import RootRouter from './RootRouter';

test('RootRouter is tested', () => {
  const component = renderer.create(
    <MemoryRouter>
      <RootRouter />
    </MemoryRouter>,
  );

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
