// Basics
import { cancelled, put, takeEvery } from 'redux-saga/effects';
// import actions from 'actions';
// import services from 'services';

// Constants
import { ACTIONS as ENTITIES_ACTIONS } from 'constants/entities';

// Helpers
import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';

// normalizeEntity is a "delegated saga" usually; it's
// not triggered by watching for actions (at this
// time); other sagas use this via delegation,
// i.e. `yield* call normalizeEntity(...)`.
export function* normalizeEntity(action = {}) {
  try {
    // Let's re-shape the (plain JSON) response a bit
    // so it can be stored in `state.entities.*` flatly
    // and predictably.
    // First, let's camelize any snake_case keys:
    const camelizedData = camelizeKeys(action.rawData);
    // Then normalize the response with a schema:
    const normalizedData = normalize(camelizedData, action.schema);

    // TODO make an action (creator)? seems excessive since this is the only
    // place it should happen.
    yield put({
      type: ENTITIES_ACTIONS.SET_ENTITIES,
      entities: normalizedData.entities,
    });

    // Send the basic data back to the original saga
    // which delegated to this saga.
    return {
      camelizedData,
      normalizedData,
    };
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
      console.log('cancelled normalizeEntity'); // eslint-disable-line no-console
    }
  }
}

// TODO will "watching" ever be a case?
// or will i mostly use this saga via delegation
// from another saga? i.e. `yield* normalizeEntity(...)`
export default function* watchNormalizeEntity() {
  yield takeEvery(ENTITIES_ACTIONS.NORMALIZE_ENTITY, normalizeEntity);
}
