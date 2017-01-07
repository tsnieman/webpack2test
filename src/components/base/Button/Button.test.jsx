import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line import/no-extraneous-dependencies
import Button from './Button';

test('Button is tested', () => {
  const component = renderer.create(
    <Button />,
  );

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
