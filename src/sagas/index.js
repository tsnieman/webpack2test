// Basics
import { fork } from 'redux-saga/effects';

import entitiesSagas from './entities';
import errorsSagas from './errors';
import githubSagas from './github';

const sagas = [
  ...entitiesSagas,
  ...errorsSagas,
  ...githubSagas,
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}
