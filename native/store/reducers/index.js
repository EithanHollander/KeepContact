import { combineReducers } from 'redux';
import connectionsReducer from './connectionsReducer';
import contactsReducer from './contactsReducer';

export default combineReducers({
  connections: connectionsReducer,
  contacts: contactsReducer
})
