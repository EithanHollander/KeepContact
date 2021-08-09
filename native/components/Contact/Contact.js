
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Contact () {

  function wocIcon(woc) {
    var icon;
    switch (woc) {
      case "empty":
        icon = (
          <TouchableOpacity onPress={() => alert("person")}>
            <MaterialIcons name='person-outline' size={30} color='#5af'/>
          </TouchableOpacity>
        )
        break;
      case "whatsapp":
        icon = (
          <TouchableOpacity onPress={() => alert("whatsapp")}>
            <MaterialCommunityIcons name='whatsapp' size={30} color='#5af'/>
          </TouchableOpacity>
        )
        break;
      case "call":
        icon = (
          <TouchableOpacity onPress={() => alert("call")}>
            <MaterialIcons name='call' size={30} color='#5af'/>
          </TouchableOpacity>
        )
        break;
      case "meet":
        icon = (
          <TouchableOpacity onPress={() => alert("meet up")}>
            <MaterialIcons name='location-on' size={30} color='#5af'/>
          </TouchableOpacity>
        )
        break;
      default:
        icon = (
          <TouchableOpacity onPress={() => alert("person")}>
            <MaterialIcons name='person-outline' size={30} color='#5af'/>
          </TouchableOpacity>
        )
    }
    return icon;
  }

  return (
    <View style={styles.Contact}>
      <View style={styles.ContactDetails}>
        <View style={styles.ContactDetailRow}>
            { wocIcon("meet") }
          <Text> name of contact</Text>
        </View>
        <View style={styles.ContactDetailRow}>
          <MaterialIcons name='schedule' size={30} color='#5af' />
          <Text> in _ days</Text>
        </View>
      </View>
      <View style={styles.ContactActions}>
        <TouchableOpacity onPress={() => alert("done!")}>
          <MaterialIcons name='done' size={30} color='#5af'/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Contact: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10

  },
  ContactDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  }
});
