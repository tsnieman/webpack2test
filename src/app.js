'use strict';
import moment from 'moment';
var rightNow = moment().format('MMMM Do YYYY, h:mm:ss a');
console.log( rightNow );
// "October 23rd 2016, 9:30:24 pm"

// Testing babel
const test = { test: { thing: 'x' } };
console.log({ ...test })

import React from 'react';
import { render } from 'react-dom';

render(
  <h1>Hello, World!</h1>,
  document.getElementById('root')
);
