import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import Contact from '@sit/Contact';

import axios from 'axios';
import SERVER_IP_ADDRESS from '@sita/ips';

export default function Stack () {

  const [contactsList, setContactsList] = useState([]);
  var updateContactsListInterval;

  function updateContactsList() {
    axios.get(SERVER_IP_ADDRESS + "/contacts").then((res) => {
      setContactsList(res.data);
    })
  }
  useEffect(() => {
    updateContactsList();
    if (updateContactsListInterval) clearInterval(updateContactsListInterval)
    updateContactsListInterval = setInterval(() => {
        updateContactsList();
    }, 10000);
  }, [])

  function renderContact({item}) {
    return <Contact contactName={item.name} additionalStyle={styles.ContactExternalStyle}/>
  }

  return (
    <View style={styles.Stack}>
      <FlatList
        style={styles.InnerStack}
        data={contactsList}
        renderItem={renderContact}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      >
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  Stack: {
    backgroundColor: 'transparent',
    height: 600
  },
  InnerStack: {
  },
  ContactExternalStyle: {
    marginBottom: 10
  }
})