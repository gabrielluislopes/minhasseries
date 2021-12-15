import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const SET_FIELD = 'SET_FIELD';

export const setField = (field, value) => {
 return {
    type: SET_FIELD,
    field,
    value
  }
}

export const SERIE_SAVED_SUCCESS = 'SERIE_SAVED_SUCCESS';
export const serieSavedSuccess = () => {
  return {
    type: SERIE_SAVED_SUCCESS
  }
}

export const SET_ALL_FIELDS = 'SET_ALL_FIELDS';
export const setAllFields = serie => ({
  type: SET_ALL_FIELDS,
  serie: serie
});

export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => ({
  type: RESET_FORM
})

export const saveSerie = serie => {
  const { currentUser } = firebase.auth();

  const db = firebase
  .app()
  .database('https://minhasseries-42e1e-default-rtdb.firebaseio.com/');

  return async dispatch => {
    if (serie.id) {
      await db.ref(`/users/${currentUser.uid}/series/${serie.id}`).set(serie);
    }
    else {
      await db.ref(`/users/${currentUser.uid}/series`).push().set(serie);
    }

    dispatch(serieSavedSuccess());
  }

}
