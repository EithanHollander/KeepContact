import React, {useState} from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import GeneralModal from '@sit/GeneralModal';

export default function ChooseContactModal (props) {

  const [modalVisible, setModalVisible] = props.visibleState;
  const [newConnection, setNewConnection] = props.connectionState;

  function pressChooseContact() {
    alert("Chosen!");
  }
  return (
    <GeneralModal visibleState={props.visibleState} exitOverload={() => null}>
      {/* Modal Titles */}
      <View>
        <Text style={styles.modalTitle}>Choose From Contacts:</Text>
      </View>

      {/* Modal Content */}
      <View style={styles.modalContent}>
        <Text>Hello</Text>
      </View>

      {/* Modal Actions */}
      <View style={styles.modalActions}>
        <TouchableOpacity
          style={[styles.Action, (true? null : styles.disabledAction)]}
          disabled={!true}
          onPress={pressChooseContact}>
          <Text>Choose</Text>
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
