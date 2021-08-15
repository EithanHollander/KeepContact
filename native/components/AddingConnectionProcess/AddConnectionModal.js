import React, {useState} from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import axios from 'axios';
import SERVER_IP_ADDRESS from '@sita/ips';

import { connect } from 'react-redux'
import { getConnections } from 'sitapp/store/actions/connectionsActions';

import GeneralModal from '@sit/GeneralModal';
import ChooseContactModal from '@sit/AddingConnectionProcess/ChooseContactModal';
import ConnectionProcessName from '@sit/AddingConnectionProcess/ConnectionProcessName';
import ConnectionProcessDetails from '@sit/AddingConnectionProcess/ConnectionProcessDetails';
import ConnectionProcessRecurrence from '@sit/AddingConnectionProcess/ConnectionProcessRecurrence';

function AddConnectionModal (props) {

  const EMPTY_CONNECTION = {
    name: "",
    phone: {
      shortFormat: "",
      fullFormat: ""
    },
    email: "",
    lastCommunicated: new Date().toJSON(),
    recurrence: {
      amount: "1",
      jump: "week"
    }
  }

  const [modalVisible, setModalVisible] = props.visibleState;
  const [chooseContactModalVisible, setChooseContactModalVisible] = useState(false);
  const [modalStage, setModalStage] = useState(0);

  const [newConnection, setNewConnection] = useState(EMPTY_CONNECTION);
  const setNameForConnection = (text) => setNewConnection(prev => ({...prev, name: text}));
  const setPhoneForConnection = (phone) => setNewConnection(prev => ({...prev, phone: phone}));
  const setEmailForConnection = (text) => setNewConnection(prev => ({...prev, email: text}));
  const setrecurrenceForConnection = (recurrence) => setNewConnection(prev => ({...prev, recurrence: recurrence}));
  const [stageValidity, setStageValidity] = useState(false);

  function cleanup() {
    setModalStage(0);
    setNewConnection(EMPTY_CONNECTION);
    setStageValidity(false);
  }

  function pressPrevious() {
    setStageValidity(true);
    setModalStage(prev => prev-1);
  }

  function pressNext() {
    setModalStage(prev => prev+1);
  }

  function pressChooseContact() {
    setChooseContactModalVisible(true);
  }

  function pressAddConnection() {
    axios.post(SERVER_IP_ADDRESS + "/connections", newConnection).then((res) => {
      props.getConnections();
    });
    cleanup();
    setModalVisible(false);
  }

  function titlePerStage() {
    var title = "";
    switch (modalStage) {
      case 0:
        title = "Who are they?";
        break;
      case 1:
        title = "How Often?";
        break;
      case 2:
        title = "Tell Me More";
        break;
      default:
        title = ""
    }
    return title;
  }

  return (

    <GeneralModal visibleState={props.visibleState} exitOverload={cleanup}>
      {/* Modal Titles */}
      <View>
        <Text style={styles.modalTitle}>{modalStage > 0 ? newConnection.name : "Add a Connection!"}</Text>
        <Text style={styles.modalSecondTitle}>{titlePerStage()}</Text>
      </View>

      {/* Modal Content */}
      <View style={styles.modalContent}>
        {modalStage === 0 &&
          <View style={{width: '100%', justifyContent: 'center'}}>
            <ConnectionProcessName
              nameState={[newConnection.name, setNameForConnection]}
              stageState={[stageValidity, setStageValidity, {nameNecessary: true}]}
            />
            <Text style={{textAlign: 'center'}}>or</Text>
            <TouchableOpacity
              style={styles.Action}
              onPress={pressChooseContact}>
              <Text>Choose From Contacts</Text>
            </TouchableOpacity>
          </View>
        }
        {modalStage === 1 && <ConnectionProcessRecurrence
          recurrenceState={[newConnection.recurrence, setrecurrenceForConnection]}
          stageState={[stageValidity, setStageValidity, {recurrenceNecessary: true}]}/>}
        {modalStage === 2 && <ConnectionProcessDetails
          emailState={[newConnection.email, setEmailForConnection]}
          phoneState={[newConnection.phone, setPhoneForConnection]}
          stageState={[stageValidity, setStageValidity, {emailNecessary: false, phoneNecessary: false}]}/>}
      </View>

      {/* Sub Modal */}
      <ChooseContactModal
        visibleState={[chooseContactModalVisible, setChooseContactModalVisible]}
        connectionState={[newConnection, setNewConnection]}>
      </ChooseContactModal>

      {/* Modal Actions */}
      <View style={styles.modalActions}>
        {modalStage > 0 && modalStage <= 2 &&
          <TouchableOpacity
            style={[styles.Action, styles.growing]}
            onPress={pressPrevious}>
            <Text>Previous</Text>
          </TouchableOpacity>
        }
        {modalStage >= 0 && modalStage < 2 &&
          <TouchableOpacity
            style={[styles.Action, styles.growing, (stageValidity? null : styles.disabledAction)]}
            disabled={!stageValidity}
            onPress={pressNext}>
            <Text>Next</Text>
          </TouchableOpacity>
        }
        {modalStage === 2 &&
          <TouchableOpacity
            style={[styles.Action, styles.growing, (stageValidity? null : styles.disabledAction)]}
            disabled={!stageValidity}
            onPress={pressAddConnection}>
            <Text>Add</Text>
          </TouchableOpacity>
        }
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
  },
  Action: {
    backgroundColor: 'rgba(200,200,200,0.1)',
    minWidth: '33%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white'
  },
  growing: {
    flexGrow: 1
  },
  LeftAction: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'rgb(255,100,100)'
  },
  RightAction: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  disabledAction: {
    opacity: 0
  }
})

const mapStateToProps  = (state) => ({})

export default connect(mapStateToProps, {getConnections})(AddConnectionModal);
