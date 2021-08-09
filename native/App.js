import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Modal } from 'react-native';

export default function App() {

  return (
    <View style={styles.App}>
      <StatusBar style="light"/>
      <View>
        <Text>Hello</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  App: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
    backgroundColor: '#5af',
  }
});
