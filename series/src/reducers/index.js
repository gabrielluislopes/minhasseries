import { combineReducers } from 'redux';
import userReducer from './userReducer';
import newSerieForm from './newSerieForm';
import serieReducer from './serieReducer';

export default combineReducers({
  user: userReducer,
  serieForm: newSerieForm,
  listaSeries: serieReducer,
});