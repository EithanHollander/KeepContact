import {GET_CONNECTIONS, CONNECTIONS_ERROR} from '../types';
import SERVER_IP_ADDRESS from '@sita/ips';
import axios from 'axios';

export const getConnections = () => async dispatch => {
  try {
      const res = await axios.get(SERVER_IP_ADDRESS + "/connections");
      dispatch( {
          type: GET_CONNECTIONS,
          payload: res.data
      })
  }
  catch(e){
      dispatch( {
          type: CONNECTIONS_ERROR,
          payload: console.log(e)
      })
  }
}
