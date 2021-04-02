import * as TYPE from 'consts/actionTypes';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.DEMO_ADD_ASSETS:
      return { ...state, assets: action.payload };

    default:
      return state;
  }
};
