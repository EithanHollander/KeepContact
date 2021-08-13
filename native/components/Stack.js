import React, {useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { getContacts } from 'sitapp/store/actions/contactsActions';

import Contact from '@sit/ContactDetails/Contact';

function Stack (props) {

  const {contacts} = props.contacts;
  var updateContactsListInterval;

  useEffect(() => {
    props.getContacts();
    if (updateContactsListInterval) clearInterval(updateContactsListInterval);
    setInterval(() => {
      props.getContacts();
    }, 10000)
  }, [])

  function renderContact({item}) {
    return (
      <Contact
        style={styles.ContactExternalStyle}
        contactDetails={item}
      />
    )
  }

  return (
    <View style={styles.Stack}>
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Stack: {
    backgroundColor: 'transparent',
    height: 600
  },
  ContactExternalStyle: {
    marginBottom: 10
  }
});

const mapStateToProps  = (state) => ({contacts:state.contacts})

export default connect(mapStateToProps, {getContacts})(Stack);
