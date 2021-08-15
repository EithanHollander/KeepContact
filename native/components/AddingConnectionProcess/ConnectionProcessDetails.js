import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import ConnectionPhoneField from '@sit/ConnectionFields/ConnectionPhoneField';
import ConnectionEmailField from '@sit/ConnectionFields/ConnectionEmailField';


export default function ConnectionProcessDetails (props) {

  const [stageValidity, setStageValidity, {phoneNecessary, emailNecessary}] = props.stageState;

  const [validPhone, setValidPhone] = useState(!phoneNecessary);
  const [validEmail, setValidEmail] = useState(!emailNecessary);

  useEffect(() =>{
    setStageValidity(validPhone && validEmail);
  }, [validPhone, validEmail])

  return (
    <View style={styles.ConnectionProcessDetails}>
      <ConnectionPhoneField validState={[validPhone, setValidPhone, {necessary: phoneNecessary}]} phoneState={props.phoneState}/>
      <ConnectionEmailField validState={[validEmail, setValidEmail, {necessary: emailNecessary}]} emailState={props.emailState}/>
    </View>
  );
};

const styles = StyleSheet.create({
  ConnectionProcessDetails: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-evenly'
  }
});
