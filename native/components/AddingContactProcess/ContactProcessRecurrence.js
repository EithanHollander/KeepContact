import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import ContactRecurrenceField from '@sit/ContactFields/ContactRecurrenceField';

export default function ContactProcessRecurrence(props) {

  const [stageValidity, setStageValidity, {recurrenceNecessary}] = props.stageState;
  const [validRecurrence, setValidRecurrence] = useState(!recurrenceNecessary);

  useEffect(() =>{
    setStageValidity(validRecurrence);
  }, [validRecurrence])

  return (
    <View style={styles.ContactProcessRecurrence}>
      <ContactRecurrenceField
        recurrenceState={props.recurrenceState}
        validState={[validRecurrence, setValidRecurrence, {necessary: recurrenceNecessary}]}/>
    </View>
  );
};

const styles = StyleSheet.create({
  ContactProcessRecurrence: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
