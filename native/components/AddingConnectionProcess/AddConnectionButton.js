import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import AddConnectionModal from '@sit/AddingConnectionProcess/AddConnectionModal';

export default function AddConnectionButton ({style}) {

  const [modalVisible, setModalVisible] = useState(false);

  async function handlePress() {
    setModalVisible(true);
  }
  return (
    <View style={style}>
      <TouchableOpacity
        style={[styles.AddConnectionButton]}
        onPress={handlePress}
      >
        <Text>Add Connection</Text>
      </TouchableOpacity>
      <AddConnectionModal
        visibleState={[modalVisible, setModalVisible]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  AddConnectionButton: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: 'white'
  }
});
