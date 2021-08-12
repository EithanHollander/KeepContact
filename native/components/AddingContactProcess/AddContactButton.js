import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import AddContactModal from '@sit/AddingContactProcess/AddContactModal';

export default function AddContactButton ({style}) {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={style}>
      <TouchableOpacity
        style={[styles.AddContactButton]}
        onPress={() => setModalVisible(true)}
      >
        <Text>Add Contact</Text>
      </TouchableOpacity>
      <AddContactModal
        visibilty={[modalVisible, setModalVisible]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  AddContactButton: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: 'white'
  }
});
