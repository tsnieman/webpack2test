// Redux
import { createStore, applyMiddleware, compose } from 'redux';

// Redux devtools

// Redux middleware
import createSagaMiddleware from 'redux-saga';

// Reducers
import rootReducer from '../reducers';

// Sagas
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
