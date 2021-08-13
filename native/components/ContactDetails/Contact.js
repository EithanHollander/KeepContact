
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {CONTACT_COMPONENT_WIDTH, CONTACT_COMPONENT_HEIGHT} from '@sita/dimensions';

import { connect } from 'react-redux'
import { getContacts } from 'sitapp/store/actions/contactsActions';
import axios from 'axios';
import SERVER_IP_ADDRESS from '@sita/ips';

import SwipeActions from '@sit/ContactDetails/SwipeActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { EmailWOC, WhatsappWOC, PhoneCallWOC, MeetUpWOC } from '@sit/ContactDetails/WaysOfContact';
import TimeDiff from 'js-time-diff';



function Contact (props) {
  const {style, contactDetails, getContacts} = props;
  function updateComm() {
    var now = new Date();
    axios.put(SERVER_IP_ADDRESS + "/contacts/comm", {id: contactDetails._id, date: now.toJSON()}).then((res) => {
      getContacts();
    });
  }

  function timeToDisplay(nextComm) {
    var timeDiff = TimeDiff(nextComm).toString();
    if (timeDiff.includes('after')) {
      timeDiff = 'in ' + timeDiff.replace('after', '');
    }
    else {
      timeDiff = timeDiff.replace('ago', 'late');
    }
    return timeDiff;
  }

  return (
    <View style={[styles.Contact, style]}>

      <SwipeActions swipeRightAction={updateComm}/>

      <View style={styles.ContactNameContainer}>
        <Text style={styles.ContactNameText}>{contactDetails.name}</Text>
      </View>

      <View style={styles.ContactDetails}>
        <View style={styles.ContactWocRow}>
          <WhatsappWOC contactDetails={contactDetails}/>
          <PhoneCallWOC contactDetails={contactDetails}/>
          <MeetUpWOC contactDetails={contactDetails}/>
          <EmailWOC contactDetails={contactDetails}/>
        </View>

        <View style={styles.ContactDetailRow}>
          <MaterialIcons name='schedule' size={30} color='#5af' />
          <Text> {timeToDisplay(contactDetails.nextComm)}</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  Contact: {
    width: CONTACT_COMPONENT_WIDTH,
    height: CONTACT_COMPONENT_HEIGHT,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  ContactDetails: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flex: 1
  },
  ContactNameContainer: {
    alignItems: 'center'
  },
  ContactNameText: {
    fontSize: 22
  },
  ContactWocRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  ContactDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  }
});

Contact.defaultProps = {
  style: {}
}

const mapStateToProps  = (state) => ({})

export default connect(mapStateToProps, {getContacts})(Contact);
