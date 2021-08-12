import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { validate } from 'validate.js';

import PhoneInput from "react-native-phone-number-input";

export default function ContactProcessDetails (props) {

  const [stageValidity, setStageValidity] = props.validState;

  const [phoneValue, setPhoneValue] = useState("");
  const [phoneFormattedValue, setNewContactPhone] = props.phoneState;
  const [validPhone, setValidPhone] = useState(true); // invalid only if the user entered a number and it was invalid
  const phoneInput = useRef(null);

  const [emailValue, setNewContactEmail] = props.emailState;
  const [validEmail, setValidEmail] = useState(true); // invalid only if the user entered an email and it was invalid
  const constraints = {email: {email: true}};

  function setPhoneNumber(text) {
    const isValid = phoneInput.current.isValidNumber(text) || text === "";
    setValidPhone(isValid);
    setPhoneValue(text);
  }
  function setFullPhoneNumber(text) {
    setNewContactPhone(prev => ({
      ...prev,
      phone: text
    }));
  }

  function setEmail(text) {
    const validationResult = validate({email: text}, constraints);
    const isValid = !validationResult || text===""; // validationResult will be undefined if no error occured
    setValidEmail(isValid);

    setNewContactEmail(prev => ({
      ...prev,
      email: text
    }));
  }

  useEffect(() =>{
    setStageValidity(validPhone && validEmail);
  }, [validPhone, validEmail])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.ContactProcessDetails}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneValue}
          defaultCode="IL"
          layout="first"
          onChangeText={setPhoneNumber}
          onChangeFormattedText={setFullPhoneNumber}
          containerStyle={{width: '100%', height: 40, elevation: 3}}
          countryPickerButtonStyle={{width: 60}}
          codeTextStyle={{fontSize: 14, marginLeft: -13}}
          textInputStyle={{fontSize: 14, height: 40, marginTop: 1}}
        />
        <TextInput
          style={[styles.emailInput, (validEmail ? styles.valid : styles.invalid)]}
          onChangeText={setEmail}
          placeholder={"example@gmail.com"}
          value={emailValue}
        >
        </TextInput>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  ContactProcessDetails: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'space-evenly'
  },
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
