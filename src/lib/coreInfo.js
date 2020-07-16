import * as TYPE from 'consts/actionTypes';
import { sendAPI } from 'lib/api';
import { getStore } from 'store';

export const selectConnected = (state) => !!state.core.info;

async function getInfo() {
  const store = getStore();
  try {
    const coreInfo = await sendAPI('system/get/info');
    store.dispatch({ type: TYPE.SET_CORE_INFO, payload: coreInfo });
  } catch (err) {
    store.dispatch({ type: TYPE.CLEAR_CORE_INFO });
    throw err;
  }
}

const maxTime = 10000;
const incStep = 1000;
let waitTime = 0;
let timerId = null;
export async function refreshCoreInfo() {
  const connected = selectConnected(getStore().getState());
  try {
    clearTimeout(timerId);
    await getInfo();
    waitTime = maxTime;
  } catch (err) {
    if (connected) waitTime = incStep;
    else if (waitTime < maxTime) waitTime += incStep;
    else waitTime = maxTime;
  } finally {
    timerId = setTimeout(refreshCoreInfo, waitTime);
  }
}
