import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';

import axios from 'axios';
import SERVER_IP_ADDRESS from '@sita/ips';

import { connect } from 'react-redux'
import { getConnections } from 'sitapp/store/actions/connectionsActions';

import GeneralModal from '@sit/GeneralModal';
import ConnectionPhoneField from '@sit/ConnectionFields/ConnectionPhoneField';

function EditConnectionPhoneModal (props) {

  const [modalVisible, setModalVisible] = props.visibleState;
  const [phoneEditValue, setPhoneEditValue] = useState(props.connectionDetails.phone);
  const [validToEdit, setValidToEdit] = useState(false);

  const [stageValid, setStageValid] = useState(false);

  useEffect(() =>{
    setStageValid(validToEdit);
  }, [validToEdit])

  useEffect(() => {
    setPhoneEditValue(props.connectionDetails.phone);
  }, [props])

  function finishEditing() {
    axios.put(SERVER_IP_ADDRESS + "/connections/detail", {id: props.connectionDetails._id, detail: {phone: phoneEditValue}}).then((res) => {
      props.getConnections();
    });
    setModalVisible(false);
  }

  return (
    <GeneralModal visibleState={props.visibleState} exitOverload={() => null}>

      {/* Modal Titles */}
      <View>
        <Text style={styles.modalTitle}>{props.connectionDetails.name}</Text>
        <Text style={styles.modalSecondTitle}>Set Phone Number</Text>
      </View>

      {/* Modal Content */}
      <View style={styles.modalContent}>
        <View style={{height: '100%',width: '100%', justifyContent: 'space-evenly'}}>
          <ConnectionPhoneField
            phoneState={[phoneEditValue, setPhoneEditValue]}
            validState={[validToEdit, setValidToEdit, {necessary: true}]}/>
        </View>
      </View>

      {/* Modal Actions */}
      <View style={styles.modalActions}>
        <TouchableOpacity
          style={[styles.Action, (stageValid? null : styles.disabledAction)]}
          disabled={!stageValid}
          onPress={finishEditing}>
          <Text>Finish</Text>
        </TouchableOpacity>
      </View>

    </GeneralModal>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    textAlign: 'center',
    fontSize: 23
  },
  modalSecondTitle: {
    textAlign: 'center',
    fontSize: 17
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "flex-start",
    height: 40
  },
  Action: {
    backgroundColor: 'rgba(200,200,200,0.1)',
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white'
  },
  disabledAction: {
    opacity: 0
  }
});

const mapStateToProps  = (state) => ({})

export default connect(mapStateToProps, {getConnections})(EditConnectionPhoneModal);
