import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';

export default function ContactNameField(props) {

  const [nameValue, setNameForContact] = props.nameState;
  const [validName, setValidName, {necessary}] = props.validState; // invalid only if the user entered a number and it was invalid

  function isNameValid(text) {
    return (text !== "" || (text === "" && !necessary));
  }

  function setName(text) {
    setValidName(isNameValid(text));
    setNameForContact(text);
  }

  useEffect(() => {
    setValidName(isNameValid(nameValue));
  },[])

  return (
    <TextInput
      style={[styles.NameInput, (validName ? styles.valid : styles.invalid)]}
      placeholder="Contact's name"
      onChangeText={setName}
      value={nameValue}
    />
  )
}

const styles = StyleSheet.create({
  NameInput: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    padding: 10,
  },
  valid: {
    borderColor: '#5af'
  },
  invalid: {
    borderColor: 'rgb(255,100,100)'
  }
});
