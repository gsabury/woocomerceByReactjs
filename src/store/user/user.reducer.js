import USER_ACTION_TYPES from './user.types';

const INITIAL_STATE = {
    currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, currentUser } = action;
    switch (type) {
      case USER_ACTION_TYPES.SET_CURRENT_USER:
        return {...state, currentUser: currentUser };
      default:
        return state;
    }
  };