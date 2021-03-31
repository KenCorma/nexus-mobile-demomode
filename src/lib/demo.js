import * as TYPE from 'consts/actionTypes';
import { callAPI } from 'lib/api';
import { getStore } from 'store';

export async function loadInvoices() {
  const store = getStore();
  try {
    const invoices = await callAPI('users/list/invoices');
    store.dispatch({ type: TYPE.DEMO_LOAD_INVOICES, payload: invoices });
    return invoices;
  } catch (err) {
    throw err;
  }
}

export function fakeAddInvoice() {
  const store = getStore();
  store.dispatch({
    type: TYPE.DEMO_LOAD_INVOICES,
    payload: [
      {
        name: 'DSsds',
        total: 10,
        sender: "Bob's Burger Shop",
        items: [{ object: 'items1', unitcost: 1, units: 10 }],
      },
    ],
  });
}
