import {GET_CONTACTS, CONTACTS_ERROR} from '../types';
import * as Contacts from 'expo-contacts';

export const getContacts = () => async dispatch => {
  try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
        });

        dispatch( {
            type: GET_CONTACTS,
            payload: data
        })
      }
      else {
        throw "Didn't get Contacts Permissions from user!";
      }
  }
  catch(e){
      dispatch( {
          type: CONTACTS_ERROR,
          payload: console.log(e)
      })
  }
}
