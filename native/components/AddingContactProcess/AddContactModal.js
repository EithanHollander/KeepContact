import React, {useState} from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import axios from 'axios';
import SERVER_IP_ADDRESS from '@sita/ips';

import { connect } from 'react-redux'
import { getContacts } from 'sitapp/store/actions/contactsActions';

import GeneralModal from '@sit/GeneralModal';
import ContactProcessName from '@sit/AddingContactProcess/ContactProcessName';
import ContactProcessDetails from '@sit/AddingContactProcess/ContactProcessDetails';
import ContactProcessRecurrence from '@sit/AddingContactProcess/ContactProcessRecurrence';

function AddContactModal (props) {

  const EMPTY_CONTACT = {
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
  const [modalStage, setModalStage] = useState(0);

  const [newContact, setNewContact] = useState(EMPTY_CONTACT);
  const setNameForContact = (text) => setNewContact(prev => ({...prev, name: text}));
  const setPhoneForContact = (phone) => setNewContact(prev => ({...prev, phone: phone}));
  const setEmailForContact = (text) => setNewContact(prev => ({...prev, email: text}));
  const setrecurrenceForContact = (recurrence) => setNewContact(prev => ({...prev, recurrence: recurrence}));
  const [stageValidity, setStageValidity] = useState(false);

  function cleanup() {
    setModalStage(0);
    setNewContact(EMPTY_CONTACT);
    setStageValidity(false);
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
        <Text style={styles.modalTitle}>{modalStage > 0 ? newContact.name : "Add a New Contact!"}</Text>
        <Text style={styles.modalSecondTitle}>{titlePerStage()}</Text>
      </View>

      {/* Modal Content */}
      <View style={styles.modalContent}>
        {modalStage === 0 && <ContactProcessName
          nameState={[newContact.name, setNameForContact]}
          stageState={[stageValidity, setStageValidity, {nameNecessary: true}]}/>}
        {modalStage === 1 && <ContactProcessRecurrence
          recurrenceState={[newContact.recurrence, setrecurrenceForContact]}
          stageState={[stageValidity, setStageValidity, {recurrenceNecessary: true}]}/>}
        {modalStage === 2 && <ContactProcessDetails
          emailState={[newContact.email, setEmailForContact]}
          phoneState={[newContact.phone, setPhoneForContact]}
          stageState={[stageValidity, setStageValidity, {emailNecessary: false, phoneNecessary: false}]}/>}
      </View>

      {/* Modal Actions */}
      <View style={styles.modalActions}>
        {modalStage > 0 && modalStage <= 2 &&
          <TouchableOpacity
            style={styles.Action}
            onPress={pressPrevious}>
            <Text>Previous</Text>
          </TouchableOpacity>
        }
        {modalStage >= 0 && modalStage < 2 &&
          <TouchableOpacity
            style={[styles.Action, (stageValidity? null : styles.disabledAction)]}
            disabled={!stageValidity}
            onPress={pressNext}>
            <Text>Next</Text>
          </TouchableOpacity>
        }
        {modalStage === 2 &&
          <TouchableOpacity
            style={[styles.Action, (stageValidity? null : styles.disabledAction)]}
            disabled={!stageValidity}
            onPress={pressAddContact}>
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
