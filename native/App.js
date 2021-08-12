import React, { useState, useEffect } from 'react';

import store from 'sitapp/store/store';
import { Provider } from 'react-redux';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import AddContactButton from '@sit/AddingContactProcess/AddContactButton';
import Stack from '@sit/Stack';

export default function App() {

  return (
    <View style={styles.App}>
      <StatusBar style="light"/>
      <View>
        <Provider store={store}>
          <AddContactButton style={styles.AddContactButtonExternalStyle} />
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
  AddContactButtonExternalStyle : {
    marginBottom: 20
  }
});
