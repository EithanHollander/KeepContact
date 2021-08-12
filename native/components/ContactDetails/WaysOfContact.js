// WOC:
// - whatsapp
// - call
// - meet
// - email

import React from 'react';
import { StyleeSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function EmailWOC({contactDetails}) {
  function handlePress() {
    if (contactDetails.email) {
      Linking.openURL('mailto: ' + contactDetails.email);
    } else {
      alert("need to set email!");
    }
  }
  return (
    <TouchableOpacity onPress={handlePress}>
      <MaterialCommunityIcons name='email-outline' size={30} color={contactDetails.email ? '#5af' : 'rgba(85,170,255,0.4)'}/>
    </TouchableOpacity>
  );
}
export {EmailWOC};


function WhatsappWOC({contactDetails}) {
  function handlePress() {
    if (contactDetails.phone) {
      Linking.openURL('whatsapp://send?text=היי, מה קורה?&phone=' + contactDetails.phone)
    } else {
      alert("need to set phone number!");
    }
  }
  return (
    <TouchableOpacity onPress={handlePress}>
      <MaterialCommunityIcons name='whatsapp' size={30} color={contactDetails.phone ? '#5af' : 'rgba(85,170,255,0.4)'}/>
    </TouchableOpacity>
  );
}
export {WhatsappWOC};


function PhoneCallWOC({contactDetails}) {
  function handlePress() {
    if (contactDetails.phone) {
      if (Platform.OS !== 'android') {
        Linking.openURL(`telprompt:${contactDetails.phone}`);
      }
      else {
        Linking.openURL(`tel:${contactDetails.phone}`);
      }
    } else {
      alert("need to set phone number!");
    }
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <MaterialIcons name='call' size={30} color={contactDetails.phone ? '#5af' : 'rgba(85,170,255,0.4)'}/>
    </TouchableOpacity>
  );
}
export {PhoneCallWOC};


function MeetUpWOC({contactDetails}) {
  function handlePress() {
    if(Platform.OS === 'ios') {
      Linking.openURL('calshow:');
    } else if(Platform.OS === 'android') {
      Linking.openURL('content://com.android.calendar/time/');
    }
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <MaterialIcons name='location-on' size={30} color='#5af'/>
    </TouchableOpacity>
  );
}
export {MeetUpWOC};
