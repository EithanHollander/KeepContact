import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View, Text} from 'react-native';

export default function ConnectionRecurrenceField(props) {

  const [recurrence, setRecurrenceForConnection] = props.recurrenceState;
  const [validRecurrence, setValidRecurrence, {necessary}] = props.validState;

  function isRecurrenceValid(amountText) {
    const textAsNumber = parseInt(amountText);
    return (textAsNumber >= 1 && textAsNumber <= 1000) || (amountText === "" && !necessary);
  }

  function setAmount(text) {
    setValidRecurrence(isRecurrenceValid(text));
    setRecurrenceForConnection({...recurrence, amount: text});
  }

  function setJump(jump) {
    setRecurrenceForConnection({...recurrence, jump: jump});
  }

  useEffect(() => {
    setValidRecurrence(isRecurrenceValid(recurrence.amount));
  },[])

  return (
    <View style={styles.RecurrenceInput}>
      <View style={styles.ChooseAmountContainer}>
        <View style={styles.chooseAmountRow}>
          <Text>Every</Text>
          <TextInput
            style={[styles.NumberInput, (validRecurrence ? styles.valid : styles.invalid)]}
            keyboardType='numeric'
            value={recurrence.amount}
            onChangeText={setAmount}
          >
          </TextInput>
        </View>
        <Text style={styles.hint}>{validRecurrence ? "" : "must be between 1-1000"}</Text>
      </View>
      <View style={styles.chooseJumpRow}>
        <TouchableOpacity onPress={() => setJump("day")} style={[styles.jumpButton, styles.left, (recurrence.jump === "day"? styles.chosen : styles.unchosen)]}>
          <Text>{(parseInt(recurrence.amount) <= 1 || !recurrence.amount) ? 'day' : 'days'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setJump("week")} style={[styles.jumpButton, (recurrence.jump === "week"? styles.chosen : styles.unchosen)]}>
          <Text>{(parseInt(recurrence.amount) <= 1 || !recurrence.amount) ? 'week' : 'weeks'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setJump("month")} style={[styles.jumpButton, (recurrence.jump === "month"? styles.chosen : styles.unchosen)]}>
          <Text>{(parseInt(recurrence.amount) <= 1 || !recurrence.amount) ? 'month' : 'months'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setJump("year")} style={[styles.jumpButton, styles.right, (recurrence.jump === "year"? styles.chosen : styles.unchosen)]}>
          <Text>{(parseInt(recurrence.amount) <= 1 || !recurrence.amount) ? 'year' : 'years'}</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  RecurrenceInput: {
    width: '100%',
    justifyContent: 'space-between'
  },
  chooseAmountRow: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  },
  chooseJumpRow: {
    height: 50,
    overflow: 'hidden',
    flexWrap: 'wrap',
    marginTop: 10
  },
  NumberInput: {
    height: 40,
    width: 55,
    borderWidth: 1,
    padding: 10,
    display: 'flex'
  },
  valid: {
    borderColor: '#5af'
  },
  invalid: {
    borderColor: 'rgb(255,100,100)'
  },
  hint: {
    fontSize: 10,
    textAlign: 'center'
  },
  jumpButton: {
    borderWidth: 1,
    borderColor: 'white',
    width: '25%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chosen: {
    backgroundColor: 'rgba(85,170,255,1)',
  },
  unchosen: {
    backgroundColor: 'rgba(85,170,255,0.5)',
  },
  left: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  right: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  }
});
