import React from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';

import axios from 'axios';
import SERVER_IP_ADDRESS from '@sita/ips';

import {MODAL_WIDTH, MODAL_HEIGHT} from '@sita/dimensions';

export default function GeneralModal (props) {

  const [modalVisible, setModalVisible] = props.visibleState;

  function exitModal() {
    props.exitOverload();
    setModalVisible(false);
  }
  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={exitModal}
      >
        <TouchableWithoutFeedback onPress={exitModal}>
          <View style={styles.centeredView}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalView}>
                {props.children}
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
    width: MODAL_WIDTH,
    height: MODAL_HEIGHT,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
