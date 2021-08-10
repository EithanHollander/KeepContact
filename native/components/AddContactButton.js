import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import ContactDetailsModal from '@sit/ContactDetailsModal';

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
      <ContactDetailsModal
        visibilty={[modalVisible, setModalVisible]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  AddContactButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: 'white'
  }
});
