import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Alert} from 'react-native';

export const SET_SERIES = 'SET_SERIES';
const setSeries = series => ({
    type: SET_SERIES,
    series: series
})

export const watchSeries = () => {
    const { currentUser } = firebase.auth();

    const db = firebase
    .app()
    .database('https://minhasseries-42e1e-default-rtdb.firebaseio.com/')
    .ref(`/users/${currentUser.uid}/series`);

    return dispatch => {
      db
      .on('value', snapshot => {
          const series = snapshot.val();
          const action = setSeries(series);
          dispatch(action);
      })
    }   
}

export const deleteSerie = serie => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Exclusão',
        `Deseja realmente excluir a série ${serie.title}? `,
        [{
          text: 'Não',
          onPress: () => {
            resolve(false);
          },
          style: 'cancel' //IOS
        }, {
          text: 'Sim',
          onPress: async () => {
            const {currentUser} = firebase.auth();

            const db = firebase
            .app()
            .database('https://minhasseries-42e1e-default-rtdb.firebaseio.com/');

            try{
              await db.ref(`/users/${currentUser.uid}/series/${serie.id}`).remove();

              resolve(true);
            }
            catch (e) {
              reject(e);
            }

          }
        }],
        {cancelable: false}
      )
    })
  }
}
