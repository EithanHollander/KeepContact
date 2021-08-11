
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux'
import { getContacts } from 'sitapp/store/actions/contactsActions';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { wocIcon } from '@sita/woc';
import TimeDiff from 'js-time-diff';

import axios from 'axios';
import SERVER_IP_ADDRESS from '@sita/ips';

function Contact (props) {
  const {style, contactDetails, getContacts} = props;
  function updateComm() {
    var now = new Date();
    axios.put(SERVER_IP_ADDRESS + "/comm", {id: contactDetails._id, date: now.toJSON()}).then((res) => {
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
      <View style={styles.ContactDetails}>
        <View style={styles.ContactDetailRow}>
            {wocIcon(contactDetails)}
          <Text> {contactDetails.name}</Text>
        </View>
        <View style={styles.ContactDetailRow}>
          <MaterialIcons name='schedule' size={30} color='#5af' />
          <Text> {timeToDisplay(contactDetails.nextComm)}</Text>
        </View>
      </View>
      <View style={styles.ContactActions}>
        <TouchableOpacity onPress={() => {updateComm();}}>
          <MaterialIcons name='done' size={30} color='#5af'/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Contact: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
