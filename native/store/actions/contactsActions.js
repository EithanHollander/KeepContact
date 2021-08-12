import {GET_CONTACTS, CONTACTS_ERROR} from '../types';
import SERVER_IP_ADDRESS from '@sita/ips';
import axios from 'axios';

export const getContacts = () => async dispatch => {
  try {
      const res = await axios.get(SERVER_IP_ADDRESS + "/contacts");
      dispatch( {
          type: GET_CONTACTS,
          payload: res.data
      })
  }
  catch(e){
      dispatch( {
          type: CONTACTS_ERROR,
          payload: console.log(e)
      })
  }
}
