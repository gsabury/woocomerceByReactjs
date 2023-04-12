import { takeLatest, put, all, call } from 'redux-saga/effects';

import  USER_ACTION_TYPES  from './user.types';

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
} from './user.action';

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from '../../utils/firebase/firebase.utils';

// Get Data of Authenticated User
export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// When User logins with Google
export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}
// Google Sign In Starts
export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}


// When user logins with email and password
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}
// Email Sign In Starts
export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

// Check whether uses is authenticated or not
export function* isUserAuthenticated() {
  try {
      const userAuth = yield call(getCurrentUser);
      if (!userAuth) return;
      yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
      yield put(signInFailed(error));
  }
}
// Check User Session
export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

// When user signs up 
export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}
// Sign Up Starts
export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}


// When user signs out
export function* signOut() {
  try {
      yield call(signOutUser);
      yield put(signOutSuccess());
  } catch (error) {
      yield put(signOutFailed(error));
  }
}
// Sign Out Start
export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}


// Sign in user after successful sign up
export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}
// Sign Up Success
export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}


export function* userSagas() {
  yield all([
      call(onGoogleSignInStart),
      call(onEmailSignInStart),
      call(onCheckUserSession),
      call(onSignUpStart),
      call(onSignUpSuccess),
      call(onSignOutStart),
  ]);
}