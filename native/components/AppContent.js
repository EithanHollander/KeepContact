import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux'
import { getContacts } from 'sitapp/store/actions/contactsActions';

import AddConnectionButton from '@sit/AddingConnectionProcess/AddConnectionButton';
import Stack from '@sit/Stack';

function AppContent(props) {

  useEffect(() => {
    props.getContacts();
  },[])

  return (
    <View>
      <AddConnectionButton style={styles.AddConnectionButtonExternalStyle} />
      <Stack/>
    </View>
  );
}

const styles = StyleSheet.create({
  AddConnectionButtonExternalStyle : {
    marginBottom: 20
  }
});

const mapStateToProps  = (state) => ({})

export default connect(mapStateToProps, {getContacts})(AppContent);
