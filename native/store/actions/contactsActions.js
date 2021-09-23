import {GET_CONTACTS, CONTACTS_ERROR} from '../types';
import * as Contacts from 'expo-contacts';
import {isLegalPhoneNumber} from '@sita/validity';

export const getContacts = () => async dispatch => {
  try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
        });

        var finalData = data
        .filter(item => item.name !== "null null")
        .filter(item => item.phoneNumbers || item.emails)
        .filter(item => {
          if (item.phoneNumbers) {
            const [first, ...rest] = item.phoneNumbers;
            return isLegalPhoneNumber(first.number) || item.emails;
            // it could be illegal and we save it thanks to emails. that's why we need to check again in ChooseContactModal
          } else { return true; }
        })
        .map(item => {
          if (item.phoneNumbers) {
            const [first, ...rest] = item.phoneNumbers;
            // doesn't support formats which don't begin with +972, sorry not sorry
            const numberWithZone = first.number.startsWith("0") ? first.number.replace("0", "+972") : first.number;
            return { ...item, phoneNumbers: [{...first,number: numberWithZone.replace(/-/g, "").replace(/\s/g, "")},...rest]}
          } else { return item; }
        })

        dispatch( {
            type: GET_CONTACTS,
            payload: finalData
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
