
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {CONNECTION_COMPONENT_WIDTH, CONNECTION_COMPONENT_HEIGHT} from '@sita/dimensions';

import { connect } from 'react-redux'
import { getConnections } from 'sitapp/store/actions/connectionsActions';
import axios from 'axios';
import SERVER_IP_ADDRESS from '@sita/ips';

import SwipeActions from '@sit/ConnectionDetails/SwipeActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { EmailWOC, WhatsappWOC, PhoneCallWOC, MeetUpWOC } from '@sit/ConnectionDetails/WaysOfConnection';
import TimeDiff from 'js-time-diff';

function Connection (props) {
  const {style, getConnections} = props;
  const [connectionDetails, setConnectionDetails] = useState(props.connectionDetails);
  function updateComm() {
    axios.patch(
      SERVER_IP_ADDRESS + "/connections/" + connectionDetails._id.toString(),
      {},
      { params: { comm: true } })
    .then((res) => {
        getConnections();
    });
  }

  function updateSnooze() {
    console.log("snooze");
  }

  function timeToDisplay(nextComm) {
    var timeDiff = TimeDiff(nextComm).toString();
    if (timeDiff.includes('after')) {
      timeDiff = 'in ' + timeDiff.replace('after', '');
    }
    else {
      timeDiff = timeDiff.replace('ago', 'late');
    }
    return timeDiff;
  }

  useEffect(() => {
    setConnectionDetails(props.connectionDetails);
  },[props.connectionDetails])

  return (
    <View style={[styles.Connection, style]}>

      <SwipeActions swipeRightAction={updateComm} swipeLeftAction={updateSnooze}/>

      <View style={styles.ConnectionNameContainer}>
        <Text style={styles.ConnectionNameText}>{connectionDetails.name}</Text>
      </View>

      <View style={styles.ConnectionDetails}>
        <View style={styles.ConnectionWocRow}>
          <WhatsappWOC connectionDetails={connectionDetails}/>
          <PhoneCallWOC connectionDetails={connectionDetails}/>
          <MeetUpWOC connectionDetails={connectionDetails}/>
          <EmailWOC connectionDetails={connectionDetails}/>
        </View>

        <View style={styles.ConnectionDetailRow}>
          <MaterialIcons name='schedule' size={30} color='#5af' />
          <Text> {timeToDisplay(connectionDetails.nextComm)}</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  Connection: {
    width: CONNECTION_COMPONENT_WIDTH,
    height: CONNECTION_COMPONENT_HEIGHT,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  ConnectionDetails: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flex: 1
  },
  ConnectionNameContainer: {
    alignItems: 'center'
  },
  ConnectionNameText: {
    fontSize: 22
  },
  ConnectionWocRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  ConnectionDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  }
});

Connection.defaultProps = {
  style: {}
}

const mapStateToProps  = (state) => ({})

export default connect(mapStateToProps, {getConnections})(Connection);
