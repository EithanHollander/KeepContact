import {GET_CONTACTS} from '../types';

const initialState = {
    contacts:[],
    done: false
}

export default function(state = initialState, action){

    switch(action.type){
        case GET_CONTACTS:
          return {
              ...state,
              contacts:action.payload,
              done:true
          }
        default:
          return state
    }

}
