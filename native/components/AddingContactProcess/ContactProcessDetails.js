import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import ContactPhoneField from '@sit/ContactFields/ContactPhoneField';
import ContactEmailField from '@sit/ContactFields/ContactEmailField';


export default function ContactProcessDetails (props) {

  const [stageValidity, setStageValidity, {phoneNecessary, emailNecessary}] = props.stageState;

  const [validPhone, setValidPhone] = useState(!phoneNecessary);
  const [validEmail, setValidEmail] = useState(!emailNecessary);

  useEffect(() =>{
    setStageValidity(validPhone && validEmail);
  }, [validPhone, validEmail])

  return (
    <View style={styles.ContactProcessDetails}>
      <ContactPhoneField validState={[validPhone, setValidPhone, {necessary: phoneNecessary}]} phoneState={props.phoneState}/>
      <ContactEmailField validState={[validEmail, setValidEmail, {necessary: emailNecessary}]} emailState={props.emailState}/>
    </View>
  );
};

const styles = StyleSheet.create({
  ContactProcessDetails: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-evenly'
  }
});
