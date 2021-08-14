// WOC:
// - whatsapp
// - call
// - meet
// - email

import React, { useState } from 'react';
import { StyleeSheet, TouchableOpacity, Linking, Platform, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import EditContactPhoneModal from '@sit/ContactFieldsEditing/EditContactPhoneModal';
import EditContactEmailModal from '@sit/ContactFieldsEditing/EditContactEmailModal';


function EmailWOC({contactDetails}) {
  const [modalVisible, setModalVisible] = useState(false);
  function handlePress() {
    if (contactDetails.email) {
      Linking.openURL('mailto: ' + contactDetails.email);
    } else {
      setModalVisible(true);
    }
  }
  function handleLongPress() {
    setModalVisible(true);
  }
  return (
    <View>
      <TouchableOpacity onPress={handlePress} onLongPress={handleLongPress}>
        <MaterialCommunityIcons name='email-outline' size={30} color={contactDetails.email ? '#5af' : 'rgba(85,170,255,0.4)'}/>
      </TouchableOpacity>

      <EditContactEmailModal
        visibleState={[modalVisible, setModalVisible]}
        contactDetails={contactDetails}
      />
    </View>
  );
}
export {EmailWOC};


function WhatsappWOC({contactDetails}) {
  const [modalVisible, setModalVisible] = useState(false);
  const phoneValue = contactDetails.phone.fullFormat;

  function handlePress() {
    if (phoneValue) {
      Linking.openURL('whatsapp://send?text=היי, מה קורה?&phone=' + phoneValue)
    } else {
      setModalVisible(true);
    }
  }
  function handleLongPress() {
    setModalVisible(true);
  }
  return (
    <View>
      <TouchableOpacity onPress={handlePress} onLongPress={handleLongPress}>
        <MaterialCommunityIcons name='whatsapp' size={30} color={phoneValue ? '#5af' : 'rgba(85,170,255,0.4)'}/>
      </TouchableOpacity>

      <EditContactPhoneModal
        visibleState={[modalVisible, setModalVisible]}
        contactDetails={contactDetails}
      />

    </View>
  );
}
export {WhatsappWOC};


function PhoneCallWOC({contactDetails}) {
  const [modalVisible, setModalVisible] = useState(false);
  const phoneValue = contactDetails.phone.fullFormat;

  function handlePress() {
    if (phoneValue) {
      if (Platform.OS !== 'android') {
        Linking.openURL('telprompt:' + phoneValue);
      }
      else {
        Linking.openURL('tel:' + phoneValue);
      }
    } else {
      setModalVisible(true);
    }
  }
  function handleLongPress() {
    setModalVisible(true);
  }
  return (
    <View>
      <TouchableOpacity onPress={handlePress} onLongPress={handleLongPress}>
        <MaterialIcons name='call' size={30} color={phoneValue ? '#5af' : 'rgba(85,170,255,0.4)'}/>
      </TouchableOpacity>

      <EditContactPhoneModal
        visibleState={[modalVisible, setModalVisible]}
        contactDetails={contactDetails}
      />
    </View>
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
