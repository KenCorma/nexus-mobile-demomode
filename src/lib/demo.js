import * as TYPE from 'consts/actionTypes';
import { callAPI } from 'lib/api';
import { getStore } from 'store';

export async function loadInvoices() {
  const store = getStore();
  try {
    const coreInfo = await callAPI('users/list/invoices');
    store.dispatch({ type: TYPE.DEMO_LOAD_INVOICES, payload: coreInfo });
  } catch (err) {
    throw err;
  }
}
