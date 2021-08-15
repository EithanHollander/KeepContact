import React, {useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { getConnections } from 'sitapp/store/actions/connectionsActions';

import Connection from '@sit/ConnectionDetails/Connection';

function Stack (props) {

  const {connections} = props.connections;
  var updateConnectionsListInterval;

  useEffect(() => {
    props.getConnections();
    if (updateConnectionsListInterval) clearInterval(updateConnectionsListInterval);
    setInterval(() => {
      props.getConnections();
    }, 10000)
  }, [])

  function renderConnection({item}) {
    return (
      <Connection
        style={styles.ConnectionExternalStyle}
        connectionDetails={item}
      />
    )
  }

  return (
    <View style={styles.Stack}>
      <FlatList
        data={connections}
        renderItem={renderConnection}
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
  ConnectionExternalStyle: {
    marginBottom: 10
  }
});

const mapStateToProps  = (state) => ({connections:state.connections})

export default connect(mapStateToProps, {getConnections})(Stack);
