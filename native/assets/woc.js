// WOC:
// - empty
// - WhatsApp
// - call
// - meet

import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function wocIcon(woc) {
    var icon;
    switch (woc) {
      case "empty":
        icon = (
          <TouchableOpacity onPress={() => alert("person")}>
            <MaterialIcons name='person-outline' size={30} color='#5af'/>
          </TouchableOpacity>
        )
        break;
      case "whatsapp":
        icon = (
          <TouchableOpacity onPress={() => alert("whatsapp")}>
            <MaterialCommunityIcons name='whatsapp' size={30} color='#5af'/>
          </TouchableOpacity>
        )
        break;
      case "call":
        icon = (
          <TouchableOpacity onPress={() => alert("call")}>
            <MaterialIcons name='call' size={30} color='#5af'/>
          </TouchableOpacity>
        )
        break;
      case "meet":
        icon = (
          <TouchableOpacity onPress={() => alert("meet up")}>
            <MaterialIcons name='location-on' size={30} color='#5af'/>
          </TouchableOpacity>
        )
        break;
      default:
        icon = (
          <TouchableOpacity onPress={() => alert("person")}>
            <MaterialIcons name='person-outline' size={30} color='#5af'/>
          </TouchableOpacity>
        )
    }
    return icon;
  }
