import {GET_CONNECTIONS} from '../types';

const initialState = {
    connections:[],
    loading:true
}

export default function(state = initialState, action){

    switch(action.type){
        case GET_CONNECTIONS:
          return {
              ...state,
              connections:action.payload,
              loading:false

          }
        default:
          return state
    }

}
