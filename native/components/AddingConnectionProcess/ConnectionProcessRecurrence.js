import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import ConnectionRecurrenceField from '@sit/ConnectionFields/ConnectionRecurrenceField';

export default function ConnectionProcessRecurrence(props) {

  const [stageValidity, setStageValidity, {recurrenceNecessary}] = props.stageState;
  const [validRecurrence, setValidRecurrence] = useState(!recurrenceNecessary);

  useEffect(() =>{
    setStageValidity(validRecurrence);
  }, [validRecurrence])

  return (
    <View style={styles.ConnectionProcessRecurrence}>
      <ConnectionRecurrenceField
        recurrenceState={props.recurrenceState}
        validState={[validRecurrence, setValidRecurrence, {necessary: recurrenceNecessary}]}/>
    </View>
  );
};

const styles = StyleSheet.create({
  ConnectionProcessRecurrence: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
