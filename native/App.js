import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import store from 'sitapp/store/store';
import { Provider } from 'react-redux';
import * as Contacts from 'expo-contacts';

import AddConnectionButton from '@sit/AddingConnectionProcess/AddConnectionButton';
import Stack from '@sit/Stack';

export default function App() {

  async function getContacts() {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });

      if (data.length > 0) {
        console.log(data);
      }
    }
  }

  useEffect(() => {
    getContacts();
  },[])

  return (
    <View style={styles.App}>
      <StatusBar style="light"/>
      <View>
        <Provider store={store}>
          <AddConnectionButton style={styles.AddConnectionButtonExternalStyle} />
          <Stack/>
        </Provider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  App: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#5af',
    paddingBottom: 60
  },
  AddConnectionButtonExternalStyle : {
    marginBottom: 20
  }
});
