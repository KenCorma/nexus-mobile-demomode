import configureStore from './configureStore';

let store = null;

export function getStore(initialState) {
  if (!store) {
    store = configureStore(initialState);
  }
  return store;
}

export function observeStore(select, onChange) {
  if (!store) throw new Error('Store has not been initialized');
  let currentState = undefined;

  function handleChange() {
    const nextState = select(store.getState());
    if (currentState !== nextState) {
      const oldState = currentState;
      currentState = nextState;
      onChange(currentState, oldState);
    }
  }

  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}
