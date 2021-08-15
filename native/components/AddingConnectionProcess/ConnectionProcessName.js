import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import ConnectionNameField from '@sit/ConnectionFields/ConnectionNameField';

export default function ConnectionProcessName (props) {

  const [stageValidity, setStageValidity, {nameNecessary}] = props.stageState;
  const [validName, setValidName] = useState(!nameNecessary);

  useEffect(() =>{
    setStageValidity(validName);
  }, [validName])

  return (
    <View style={styles.ConnectionProcessName}>
      <ConnectionNameField
        nameState={props.nameState}
        validState={[validName, setValidName, {necessary: nameNecessary}]}/>
    </View>
  );
};

const styles = StyleSheet.create({
  ConnectionProcessName: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
