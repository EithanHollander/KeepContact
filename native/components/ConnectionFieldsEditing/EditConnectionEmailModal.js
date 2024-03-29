import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';

import axios from 'axios';
import SERVER_IP_ADDRESS from '@sita/ips';

import { connect } from 'react-redux'
import { getConnections } from 'sitapp/store/actions/connectionsActions';

import GeneralModal from '@sit/GeneralModal';
import ConnectionEmailField from '@sit/ConnectionFields/ConnectionEmailField';

function EditConnectionEmailModal (props) {

  const [modalVisible, setModalVisible] = props.visibleState;
  const [emailEditValue, setEmailEditValue] = useState(props.connectionDetails.email);
  const [validToEdit, setValidToEdit] = useState(false);

  const [stageValid, setStageValid] = useState(false);

  useEffect(() =>{
    setStageValid(validToEdit);
  }, [validToEdit])

  useEffect(() => {
    setEmailEditValue(props.connectionDetails.email);
  }, [props])


  function finishEditing() {
    axios.patch(
      SERVER_IP_ADDRESS + "/connections/" + props.connectionDetails._id.toString(),
      { email: emailEditValue },
      { params: { comm: false } })
    .then((res) => {
      setModalVisible(false);
      props.getConnections();
    });
  }

  return (
    <GeneralModal visibleState={props.visibleState} exitOverload={() => null}>

      {/* Modal Titles */}
      <View>
        <Text style={styles.modalTitle}>{props.connectionDetails.name}</Text>
        <Text style={styles.modalSecondTitle}>Set Email</Text>
      </View>

      {/* Modal Content */}
      <View style={styles.modalContent}>
        <View style={{height: '100%', width: '100%', justifyContent: 'space-evenly'}}>
          <ConnectionEmailField
            emailState={[emailEditValue, setEmailEditValue]}
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

export default connect(mapStateToProps, {getConnections})(EditConnectionEmailModal);
