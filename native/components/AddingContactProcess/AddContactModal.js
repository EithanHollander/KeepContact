import React, {useState} from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

import axios from 'axios';
import SERVER_IP_ADDRESS from '@sita/ips';

import { connect } from 'react-redux'
import { getContacts } from 'sitapp/store/actions/contactsActions';

import ContactProcessName from '@sit/AddingContactProcess/ContactProcessName';
import ContactProcessWoc from '@sit/AddingContactProcess/ContactProcessWoc';
import ContactProcessRecurrence from '@sit/AddingContactProcess/ContactProcessRecurrence';

function AddContactModal (props) {

  const EMPTY_CONTACT = {
    name: "",
    woc: "",
    lastCommunicated: new Date().toJSON(),
    recurrence: {
      amount: "1",
      jump: "week"
    }
  }

  const [modalVisible, setModalVisible] = props.visibilty;
  const [modalStage, setModalStage] = useState(0);

  const [newContact, setNewContact] = useState(EMPTY_CONTACT);
  const [stageValidity, setStageValidity] = useState(false);

  function cleanup() {
    setModalStage(0);
    setNewContact(EMPTY_CONTACT);
    setStageValidity(false);

    setModalVisible(false);
  }

  function pressCancel() {
    cleanup();
  }

  function pressPrevious() {
    setStageValidity(true);
    setModalStage(prev => prev-1);
  }

  function pressNext() {
      setModalStage(prev => prev+1);
  }

  function pressAddContact() {
    axios.post(SERVER_IP_ADDRESS + "/contacts", newContact).then((res) => {
      props.getContacts();
    });
    cleanup();
  }

  function titlePerStage() {
    var title = "";
    switch (modalStage) {
      case 0:
        title = "Who are they?";
        break;
      case 1:
        title = "What's their language?";
        break;
      case 2:
        title = "How Often?";
        break;
      default:
        title = ""
    }
    return title;
  }

  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            {/* Modal Titles */}
            <View>
              <Text style={styles.modalTitle}>Add a New Contact!</Text>
              <Text style={styles.modalSecondTitle}>{titlePerStage()}</Text>
            </View>

            {/* Modal Details */}
            <View style={[styles.modalInputs]}>
              {modalStage === 0 && <ContactProcessName nameState={[newContact.name, setNewContact]} validState={[stageValidity, setStageValidity]}/>}
              {modalStage === 1 && <ContactProcessWoc wocState={[newContact.woc, setNewContact]}/>}
              {modalStage === 2 && <ContactProcessRecurrence recurrenceState={[newContact.recurrence, setNewContact]} validState={[stageValidity, setStageValidity]}/>}
            </View>

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              {modalStage >= 0 &&
                <TouchableOpacity
                  style={[styles.Action, styles.LeftAction]}
                  onPress={pressCancel}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              }
              {modalStage > 0 && modalStage <= 2 &&
                <TouchableOpacity
                  style={styles.Action}
                  onPress={pressPrevious}>
                  <Text>Previous</Text>
                </TouchableOpacity>
              }
              {modalStage >= 0 && modalStage < 2 &&
                <TouchableOpacity
                  style={[styles.Action, styles.RightAction, (stageValidity? null : styles.disabledAction)]}
                  disabled={!stageValidity}
                  onPress={pressNext}>
                  <Text>Next</Text>
                </TouchableOpacity>
              }
              {modalStage === 2 &&
                <TouchableOpacity
                  style={[styles.Action, styles.RightAction, (stageValidity? null : styles.disabledAction)]}
                  disabled={!stageValidity}
                  onPress={pressAddContact}>
                  <Text>Add</Text>
                </TouchableOpacity>
              }
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  modalView: {
    width: 300,
    height: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 23
  },
  modalSecondTitle: {
    textAlign: 'center',
    fontSize: 17
  },
  modalInputs: {
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
    backgroundColor: '#5af',
    minWidth: '33%',
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    borderWidth: 1,
    borderColor: 'white'
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
    opacity: 0.5
  }
})

const mapStateToProps  = (state) => ({})

export default connect(mapStateToProps, {getContacts})(AddContactModal);
