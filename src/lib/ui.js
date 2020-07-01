import { LayoutAnimation, Keyboard } from 'react-native';

import * as TYPE from 'consts/actionTypes';
import { getStore } from 'store';
import newUID from 'utils/newUID';

export function toggleTransactionsFilter() {
  LayoutAnimation.easeInEaseOut();
  Keyboard.dismiss();
  getStore().dispatch({
    type: TYPE.TOGGLE_TRANSACTIONS_FILTER,
  });
}

export function showNotification(content, options) {
  const store = getStore();
  const id = newUID();
  store.dispatch({
    type: TYPE.SHOW_NOTIFICATION,
    payload: {
      id,
      content,
      options,
    },
  });
}

export function dismissNotification(id) {
  const store = getStore();
  store.dispatch({
    type: TYPE.DISMISS_NOTIFICATION,
    payload: id,
  });
}

export function showError(message) {
  const store = getStore();
  const id = newUID();
  store.dispatch({
    type: TYPE.OPEN_DIALOG,
    payload: {
      id,
      type: 'error',
      message,
    },
  });
}

export function closeDialog(id) {
  const store = getStore();
  store.dispatch({
    type: TYPE.CLOSE_DIALOG,
    payload: id,
  });
}
