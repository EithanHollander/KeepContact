import React, {useState, useRef, useEffect} from 'react';

import PhoneInput from "react-native-phone-number-input";

export default function ContactPhoneField (props) {
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneFormattedValue, setPhoneForContact] = props.phoneState;
  const [validPhone, setValidPhone, {necessary}] = props.validState;
  const phoneInput = useRef(null);

  function isValidPhone(text) {
    return phoneInput.current.isValidNumber(text) || (text === "" && !necessary);
  }
  function setPhoneNumber(text) {
    setValidPhone(isValidPhone(text));
    setPhoneValue(text);
  }
  function setFullPhoneNumber(text) {
    setPhoneForContact(text);
  }

  useEffect(() => {
    setValidPhone(isValidPhone(phoneValue));
  },[])

  return (
    <PhoneInput
      ref={phoneInput}
      defaultValue={phoneValue}
      defaultCode="IL"
      layout="first"
      onChangeText={setPhoneNumber}
      onChangeFormattedText={setFullPhoneNumber}
      containerStyle={{width: '100%', height: 40, elevation: 3}}
      countryPickerButtonStyle={{width: 60}}
      codeTextStyle={{fontSize: 14, marginLeft: -13}}
      textInputStyle={{fontSize: 14, height: 40, marginTop: 1}}
    />
  )
}
