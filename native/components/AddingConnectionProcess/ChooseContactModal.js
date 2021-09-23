import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, FlatList, Modal, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux'
import { getContacts } from 'sitapp/store/actions/contactsActions';
import { isLegalPhoneNumber } from '@sita/validity';

function ChooseContactModal (props) {

  const {contacts, done} = props.contacts;

  const [modalVisible, setModalVisible] = props.visibleState;
  const [newConnection, setNewConnection] = props.connectionState;

  const [searchBarText, setSearchBarText] = useState("");
  function chooseContact(item) {
    const contactName = item.name;
    const isLegalPhone = item.phoneNumbers ? isLegalPhoneNumber(item.phoneNumbers[0].number) : false;
    const contactFullFormatPhone = isLegalPhone ? item.phoneNumbers[0].number : "";
    // doesn't support formats which don't begin with +972, sorry not sorry. look at isLegaLPhoneNumber
    const contactShortFormatPhone = contactFullFormatPhone ? contactFullFormatPhone.substring(4) : "";
    const contactEmail = item.emails ? item.emails[0].email : "";

    setNewConnection(prev => ({
      ...prev,
      name: contactName,
      phone: {
        shortFormat: contactShortFormatPhone,
        fullFormat: contactFullFormatPhone
      },
      email: contactEmail
    }));
    exitModal();
  }

  function renderContact({item}) {
    return (
      <TouchableHighlight onPress={() => chooseContact(item)} activeOpacity={0.8} underlayColor='rgba(85,170,255,0.8)'>
        <View style={{flexDirection: 'column', height: 70, justifyContent: 'center', paddingLeft: 15, borderBottomColor: 'rgba(85,170,255,0.5)', borderBottomWidth: 1}}>
          <Text style={{fontSize: 20, textAlign: 'left'}}>{item.name}</Text>
          {item.phoneNumbers?
            <Text style={{fontSize: 10}}>{item.phoneNumbers[0]?.number}</Text> :
            <Text style={{fontSize: 10}}>{item.emails[0]?.email}</Text> }
        </View>
      </TouchableHighlight>
    );
  }

  function exitModal() {
    setSearchBarText("");
    setModalVisible(false);
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={exitModal}
    >
      <View style={styles.FullModal}>

        <View style={styles.TopBar}>
          <MaterialCommunityIcons name='close' size={30} color={'#5af'}/>
          <TextInput
            style={styles.SearchBar}
            placeholder="Search Contact..."
            value={searchBarText}
            onChangeText={(text) => setSearchBarText(text)}/>
        </View>
        <FlatList
          data={contacts.filter(contact => contact.name.includes(searchBarText))}
          renderItem={renderContact}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
        />
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  FullModal: {
    backgroundColor: 'white'
  },
  TopBar: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30,
    borderBottomColor: "#5af",
    borderBottomWidth: 3
  },
  SearchBar: {
    flex: 1,
    height: '100%'
  }
})

const mapStateToProps  = (state) => ({contacts:state.contacts, done:state.done})

export default connect(mapStateToProps, {getContacts})(ChooseContactModal);
