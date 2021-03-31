import * as TYPE from 'consts/actionTypes';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.DEMO_LOAD_INVOICES:
      return { ...state, invoices: action.payload };

    default:
      return state;
  }
};
