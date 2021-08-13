import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import ContactNameField from '@sit/ContactFields/ContactNameField';

export default function ContactProcessName (props) {

  const [stageValidity, setStageValidity, {nameNecessary}] = props.stageState;
  const [validName, setValidName] = useState(!nameNecessary);

  useEffect(() =>{
    setStageValidity(validName);
  }, [validName])

  return (
    <View style={styles.ContactProcessName}>
      <ContactNameField
        nameState={props.nameState}
        validState={[validName, setValidName, {necessary: nameNecessary}]}/>
    </View>
  );
};

const styles = StyleSheet.create({
  ContactProcessName: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
