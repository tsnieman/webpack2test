// Basics
import { takeEvery } from 'redux-saga';
import { call, cancelled } from 'redux-saga/effects';
// import actions from 'actions';
// import services from 'services';

// Constants
import { ACTIONS as ENTITIES_ACTIONS } from 'constants/entities';

import { normalizeEntity } from 'sagas/entities/normalizeEntity';

// fetchEntity is a "delegated saga" usually; it's
// not triggered by watching for actions (at this
// time); other sagas use this via delegation,
// i.e. `yield* call fetchEntity(...)`.
export function* fetchEntity(action = {}) {
  try {
    const response = yield call(action.service);

    // Normalize the entity (and return whatever normalization process normally spits out)
    return yield* normalizeEntity({
      rawData: response,
      schema: action.schema,
    });
  } catch (err) {
    console.log({ err }); // eslint-disable-line no-console
    // Pass the error back to the `catch` of
    // the saga which spawned this.
    throw err;
    // TODO
  } finally {
    // console.log('this runs after try (including/regardless of if the error was caught)');

    if (yield cancelled()) {
      // Action was cancelled.
      console.log('cancelled fetchEntity'); // eslint-disable-line no-console
    }
  }
}

// TODO will "watching" ever be a case?
// or will i mostly use this saga via delegation
// from another saga? i.e. `yield* fetchEntity(...)`
export default function* watchFetchEntity() {
  yield* takeEvery(ENTITIES_ACTIONS.FETCH_ENTITY, fetchEntity);
}
