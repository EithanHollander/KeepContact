import React, {useState, useRef, useEffect} from 'react';

import PhoneInput from "react-native-phone-number-input";

export default function ContactPhoneField (props) {
  const [phoneValue, setPhoneForContact] = props.phoneState;
  const [shortFormat, setShortFormat] = useState(phoneValue.shortFormat);
  const [fullFormat, setFullFormat] = useState(phoneValue.fullFormat);
  const [validPhone, setValidPhone, {necessary}] = props.validState;
  const phoneInput = useRef(null);

  function isValidPhone(text) {
    return phoneInput.current.isValidNumber(text) || (text === "" && !necessary);
  }
  function setPhoneNumber(text) {
    setValidPhone(isValidPhone(text));
    setShortFormat(text);
  }
  function setFullPhoneNumber(text) {
    setFullFormat(text);
  }

  useEffect(() => {
    setValidPhone(isValidPhone(shortFormat));
  },[])

  useEffect(() => {
    setPhoneForContact({shortFormat: shortFormat, fullFormat: fullFormat});
  }, [shortFormat, fullFormat])

  return (
    <PhoneInput
      ref={phoneInput}
      defaultValue={shortFormat}
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
