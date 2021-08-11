import {GET_CONTACTS} from '../types';

const initialState = {
    contacts:[],
    loading:true
}

export default function(state = initialState, action){

    switch(action.type){
        case GET_CONTACTS:
          return {
              ...state,
              contacts:action.payload,
              loading:false

          }
        default:
          return state
    }

}
