import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

import Contact from '@sit/Contact/Contact';

export default function App() {

  return (
    <View style={styles.App}>
      <StatusBar style="light"/>
      <View>
        <Contact/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  App: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5af',
  }
});
