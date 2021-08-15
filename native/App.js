import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import store from 'sitapp/store/store';
import { Provider } from 'react-redux';

import AppContent from '@sit/AppContent'

export default function App() {

  return (
    <View style={styles.App}>
      <StatusBar style="light"/>
      <View>
        <Provider store={store}>
          <AppContent/>
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
  }
});
