import React, {useState} from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';

import axios from 'axios';
import SERVER_IP_ADDRESS from '@sita/ips';

import { connect } from 'react-redux'
import { getContacts } from 'sitapp/store/actions/contactsActions';

import ContactProcessName from '@sit/AddingContactProcess/ContactProcessName';
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

  function exitModal() {
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
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => exitModal()}>
          <View style={styles.centeredView}>

            <TouchableWithoutFeedback onPress={null}>
              <View style={styles.modalView}>

                {/* Modal Titles */}
                <View>
                  <Text style={styles.modalTitle}>{modalStage > 0 ? newContact.name : "Add a New Contact!"}</Text>
                  <Text style={styles.modalSecondTitle}>{titlePerStage()}</Text>
                </View>

                {/* Modal Details */}
                <View style={[styles.modalInputs]}>
                  {modalStage === 0 && <ContactProcessName nameState={[newContact.name, setNewContact]} validState={[stageValidity, setStageValidity]}/>}
                  {modalStage === 1 && <ContactProcessRecurrence recurrenceState={[newContact.recurrence, setNewContact]} validState={[stageValidity, setStageValidity]}/>}
                </View>

                {/* Modal Actions */}
                <View style={styles.modalActions}>
                  {modalStage > 0 && modalStage <= 1 &&
                    <TouchableOpacity
                      style={styles.Action}
                      onPress={pressPrevious}>
                      <Text>Previous</Text>
                    </TouchableOpacity>
                  }
                  {modalStage >= 0 && modalStage < 1 &&
                    <TouchableOpacity
                      style={[styles.Action, (stageValidity? null : styles.disabledAction)]}
                      disabled={!stageValidity}
                      onPress={pressNext}>
                      <Text>Next</Text>
                    </TouchableOpacity>
                  }
                  {modalStage === 1 &&
                    <TouchableOpacity
                      style={[styles.Action, (stageValidity? null : styles.disabledAction)]}
                      disabled={!stageValidity}
                      onPress={pressAddContact}>
                      <Text>Add</Text>
                    </TouchableOpacity>
                  }
                </View>

              </View>
            </TouchableWithoutFeedback>

          </View>
        </TouchableWithoutFeedback>

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
    elevation: 5,
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
    backgroundColor: 'rgba(200,200,200,0.1)',
    minWidth: '33%',
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    borderWidth: 1,
    borderRadius: 10,
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
    opacity: 0
  }
})

const mapStateToProps  = (state) => ({})

export default connect(mapStateToProps, {getContacts})(AddContactModal);
