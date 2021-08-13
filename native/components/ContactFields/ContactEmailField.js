import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';

import { validate } from 'validate.js';

export default function ContactEmailField(props) {
  const constraints = {email: {email: true}};

  const [emailValue, setEmailForContact] = props.emailState;
  const [validEmail, setValidEmail, {necessary}] = props.validState; // invalid only if the user entered a number and it was invalid

  function isEmailValid(text) {
    return !validate({email: text}, constraints) || (text === "" && !necessary);  // validationResult will be undefined if no error occured
  }

  function setEmail(text) {
    setValidEmail(isEmailValid(text));
    setEmailForContact(text);
  }

  useEffect(() => {
    setValidEmail(isEmailValid(emailValue));
  },[])

  return (
    <TextInput
      style={[styles.emailInput, (validEmail ? styles.valid : styles.invalid)]}
      onChangeText={setEmail}
      placeholder={"example@gmail.com"}
      value={emailValue}
    >
    </TextInput>
  )
}

const styles = StyleSheet.create({
  emailInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: '#5af'
  },
  valid: {
    borderColor: '#5af'
  },
  invalid: {
    borderColor: 'rgb(255,100,100)'
  }
});
