import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function ContactProcessName (props) {

  const [name, setNewContact] = props.nameState;
  const [stageValidity, setStageValidity] = props.validState;
  const [validAfterWriting, setValidAfterWriting] = useState(true);

  function setName(text) {
    let isValid = (text !== "");
    setValidAfterWriting(isValid);
    setStageValidity(isValid);
    setNewContact(prev => ({
      ...prev,
      name: text
    }));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.ContactProcessName}>
            <TextInput
              style={[styles.NameInput, (validAfterWriting ? styles.valid : styles.invalid)]}
              placeholder="Contact's name"
              onChangeText={setName}
              value={name}
              autoFocus={true}
            />
      </View>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  ContactProcessName: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  NameInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    flex: 1
  },
  valid: {
    borderColor: '#5af'
  },
  invalid: {
    borderColor: 'rgb(255,100,100)'
  }
});
