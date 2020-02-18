import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';

import Button from './Button';

describe('<Button/>', async assert => {
  const $ = render(<Button />);
  // eslint-disable-next-line no-console
  console.log($.html());
  assert({
    given: 'no children',
    should: 'render without children',
    actual: render(<Button />)('button').text(),
    expected: '',
  });
});
