// WOC:
// - empty
// - WhatsApp
// - call
// - meet

import React from 'react';
import {TouchableOpacity, Linking, Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function wocIcon(contactDetails) {
  var icon;
  switch (contactDetails.woc) {
    case "empty":
      icon = (
        <TouchableOpacity onPress={() => alert("person")}>
          <MaterialIcons name='person-outline' size={30} color='#5af'/>
        </TouchableOpacity>
      )
      break;
    case "whatsapp":
      icon = (
        <TouchableOpacity onPress={() => wocWhatsapp("+972585656123")}>
          <MaterialCommunityIcons name='whatsapp' size={30} color='#5af'/>
        </TouchableOpacity>
      )
      break;
    case "call":
      icon = (
        <TouchableOpacity onPress={() => wocCall("+972526162222")}>
          <MaterialIcons name='call' size={30} color='#5af'/>
        </TouchableOpacity>
      )
      break;
    case "meet":
      icon = (
        <TouchableOpacity onPress={() => alert("meet up")}>
          <MaterialIcons name='location-on' size={30} color='#5af'/>
        </TouchableOpacity>
      )
      break;
    default:
      icon = (
        <TouchableOpacity onPress={() => alert("person")}>
          <MaterialIcons name='person-outline' size={30} color='#5af'/>
        </TouchableOpacity>
      )
  }
  return icon;
}
export { wocIcon };

function wocCall(phoneNumber) {
  if (Platform.OS !== 'android') {
    Linking.openURL(`telprompt:${phoneNumber}`);
  }
  else {
    Linking.openURL(`tel:${phoneNumber}`);
  }
}

function wocWhatsapp (phoneNumber) {
  Linking.openURL('whatsapp://send?text=היי, מה קורה?&phone=' + phoneNumber)
}
