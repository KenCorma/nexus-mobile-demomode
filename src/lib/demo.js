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

export async function sendInvoice(invoiceData) {
  const store = getStore();
  try {
    const result = await callAPI('invoices/create/invoice', invoiceData);
  } catch (err) {
    throw err;
  }
}

export async function loadAssets() {
  const store = getStore();
  try {
    const assets = await callAPI('users/list/assets');
    store.dispatch({
      type: TYPE.DEMO_ADD_ASSETS,
      payload: assets,
    });
  } catch (err) {
    throw err;
  }
}

export async function fakeAddAsset() {
  const store = getStore();
  store.dispatch({
    type: TYPE.DEMO_ADD_ASSETS,
    payload: [
      {
        address: '8B7SMKmECgYU1ydBQbzp5FCSe4AnkU2EwLE59D7eQDBpixmLZ2c',
        timestamp: '1553227128',
        owner:
          'bf501d4f3d81c31f62038984e923ad01546ff678e305a7cc11b1931742524ce1',
        json: [
          {
            name: 'name',
            type: 'string',
            value: 'Program',
            mutable: false,
          },
          {
            name: 'version',
            type: 'string',
            value: 'v1.0.1',
            mutable: true,
          },
          {
            name: 'hash',
            type: 'string',
            value: 'JDSHKASHDFKJNEIEWINLSDNBFLSHFUIPESNFLKSJDNL',
            mutable: true,
          },
          {
            name: 'url',
            type: 'string',
            value: 'https://foo.bar',
            mutable: true,
          },
        ],
      },
    ],
  });
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
