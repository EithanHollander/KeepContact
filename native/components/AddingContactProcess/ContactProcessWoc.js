import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function ContactProcessWoc (props) {

  const [woc, setNewContact] = props.wocState;

  function chooseWOC(text) {
    var newWoc = "";
    if (text !== woc) {
      newWoc = text;
    }
    setNewContact(prev => ({
      ...prev,
      woc: newWoc
    }));
  }

  return (
    <View style={styles.ContactProcessWoc}>
      <Text style={{fontSize: 10, textAlign: 'center'}}>hint: you can leave it empty if you want to</Text>

      <View style={styles.wocButtonsContainer}>
        <TouchableOpacity onPress={() => chooseWOC("whatsapp")} style={[styles.wocButton, (woc === "whatsapp"? styles.chosen : styles.unchosen)]}>
          <Text>Whatsapp</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => chooseWOC("meet")} style={[styles.wocButton, (woc === "meet"? styles.chosen : styles.unchosen)]}>
          <Text>Meet Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => chooseWOC("email")} style={[styles.wocButton, (woc === "email"? styles.chosen : styles.unchosen)]}>
          <Text>E-Mail</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => chooseWOC("call")} style={[styles.wocButton, (woc === "call"? styles.chosen : styles.unchosen)]}>
          <Text>Phone Call</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => chooseWOC("")} style={styles.clearWocButton}>
        <Text>Clear Selection</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ContactProcessWoc: {
    width: '100%',
    height: '100%',
    alignItems: 'center',

  },
  wocButtonsContainer: {
    width: '80%',
    height: '80%',
    borderRadius: 20,
    overflow: 'hidden',
    flexWrap: 'wrap',
    marginTop: 3
  },
  wocButton: {
    borderWidth: 1,
    borderColor: 'white',
    width: '50%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chosen: {
    backgroundColor: 'rgba(85,170,255,1)',
  },
  unchosen: {
    backgroundColor: 'rgba(85,170,255,0.5)',
  },
  clearWocButton: {
    borderRadius: 20,
    backgroundColor: 'rgba(85,170,255,1)',
    width: '80%',
    alignItems: 'center',
    marginTop: 2
  }
})
