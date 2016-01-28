import { compose, createStore } from 'redux';
import { createEffectCapableStore } from 'redux-side-effects';

const elmEnhancer = storeFactory => (reducer, initialState) => {
  const store = storeFactory(reducer, initialState);

  return {
    ...store,
    dispatch: (type, payload = {}) => store.dispatch({type, payload})
  };
};

export default (updater, initialState) => {
  const storeFactory = compose(
    createEffectCapableStore,
    elmEnhancer
  )(createStore);

  return storeFactory(updater, initialState);
};
