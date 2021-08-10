import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import Contact from '@sit/Contact';
import Stack from '@sit/Stack';
import AddContactButton from '@sit/AddContactButton';

export default function App() {

  return (
    <View style={styles.App}>
      <StatusBar style="light"/>
      <View>
        <AddContactButton style={styles.AddContactButtonExternalStyle} />
        <Stack/>
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
