import React, {useState} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native'

import CheckBox from '@react-native-community/checkbox'

import {getData, storeData} from '../libraries/asyncStorage'

const SignUp = ({navigation}) => {

  const [txtFirstName, setFirstName] = useState<string>("")
  const [txtLastName, setLastName] = useState<string>("")
  const [isSelected1, setSelection1] = useState<boolean>(false)
  const [isSelected2, setSelection2] = useState<boolean>(false)
  const [txtEmail, setTextEmail] = useState<string>("")
  const [emailPhonePlaceHolder, setEmailPhonePlaceHolder] = useState<string>('+96170838972')
  const [phoneOrEmailSelected, SetphoneOrEmailSelected] = useState<boolean>(false)

  let errors : string[] = []

  const onPressPhone = () => {
    if(emailPhonePlaceHolder == 'eliashousseini@gmail.com')
    setEmailPhonePlaceHolder('+96170838972')
    SetphoneOrEmailSelected(false)
  }
  const onPressEmail = () => {
    if(emailPhonePlaceHolder == '+96170838972')
    setEmailPhonePlaceHolder('eliashousseini@gmail.com')
    SetphoneOrEmailSelected(true)
    // alert(phoneOrEmailSelected)
  }
  const validateEmailFormat = (email: string) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
}
  const validatePhoneFormat = (phone: string) => {
    // const expression = /^[0-9\b]+$/
    const expression = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    return expression.test(phone)
  }

  const onPressSubmitCheck = ()=>{
      if(
          txtFirstName.trim() === ""
      ){
        errors.push('firstName')
      }
      if(
        txtLastName.trim() === ""
      ){
        errors.push('lastName')
      }
      if(txtEmail.trim() === ""){
        errors.push('email')
      }
      if(!isSelected1){
        errors.push('checkbox1')
      }
      if(!isSelected2){
        errors.push('checkbox2')
      }

      if (errors.length) { 
        alert('please fill all the fields and check all the boxes')
      }

      else {
        if(phoneOrEmailSelected == false){
          if(!validatePhoneFormat(txtEmail)){
            alert('phone format not valid')
          } 
          else {
            // alert('phone format valid')
            getData().then(item => {
              if(item === null 
                || item == undefined
                ){
                    storeData({
                      firstName: txtFirstName,
                      lastName: txtLastName,
                      emailPhone: txtEmail
                    })
                    navigation.navigate('SignUpSucceful')
              }
              else{
                  if(item.emailPhone !== null || item.emailPhone !== undefined){
                    if(item.emailPhone == txtEmail)
                      alert('User already exists')
                      else {
                        storeData({
                          firstName: txtFirstName,
                          lastName: txtLastName,
                          emailPhone: txtEmail,
                      })
                      navigation.navigate('SignUpSucceful')
                      }
                  } 
                  else{
                    storeData({
                      firstName: txtFirstName,
                      lastName: txtLastName,
                      emailPhone: txtEmail
                  })
                  navigation.navigate('SignUpSucceful')
                }
              }}
            )
          }
        } else if(phoneOrEmailSelected === true){
          if(!validateEmailFormat(txtEmail)){
            alert('email format not valid')
          } 
          else {
            alert('email format valid')
            getData().then(item => {
              if(item === null || item === undefined){
                  storeData({
                  firstName: txtFirstName,
                  lastName: txtLastName,
                  emailPhone: txtEmail
                })
                navigation.navigate('SignUpSucceful')
              } else if(item.emailPhone !== null || item.emailPhone !== undefined){
                  if(item.emailPhone === txtEmail){
                     alert('User already exists')
                  } else {
                    storeData({
                      firstName: txtFirstName,
                      lastName: txtLastName,
                      emailPhone: txtEmail
                  })
                  navigation.navigate('SignUpSucceful')
                  }
                } else {
                  storeData({
                    firstName: txtFirstName,
                    lastName: txtLastName,
                    emailPhone: txtEmail
                })
                    navigation.navigate('SignUpSucceful')
                }
                })
          }
        }
      }
  
  }

  const onPressSignIn = () => {
    navigation.navigate('SignIn')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Sign Up</Text>
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={txtFirstName}
        placeholder = 'First Name'
      />
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={txtLastName}
        placeholder = 'Family Name'
      />
      <SafeAreaView style = {styles.phoneMail}>
      <TouchableOpacity
        style={styles.phoneButton}
        onPress={onPressPhone}
      >
        <View style={styles.textIcon}>
        <Image source={require('../Assets/smartphone.png')}/>
        <Text>Via Phone </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.emailButton}
        onPress={onPressEmail}
      >
      <Image source={require('../Assets/email.png')}/>
      </TouchableOpacity>
      </SafeAreaView>

      <TextInput
        style={styles.emailInput}
        onChangeText={setTextEmail}
        value={txtEmail}
        placeholder = {emailPhonePlaceHolder}
      />
      <SafeAreaView style = {styles.confirmation}>
      <CheckBox
          value={isSelected1}
          onValueChange={setSelection1}
          tintColors={{ true: 'white', false: 'white' }}
          boxType='square'
          style={{marginRight: 10, width: 20, height: 20, marginLeft: 10}}

      />
      <Text style={styles.TexttermsAndConditions}>I agree to User Terms and Conditions</Text>
      </SafeAreaView>
      <SafeAreaView style = {styles.verification}>
      <CheckBox
          value={isSelected2}
          onValueChange={setSelection2}
          tintColors={{ true: 'black', false: 'black' }}
          lineWidth={2.0}
          boxType='square'
          style={{marginRight: 10, marginLeft: 10, width: 20, height: 20}}
      />
      <Text>I am not a robot</Text>
      </SafeAreaView>
      <TouchableOpacity
        style={styles.verify}
        onPress={onPressSubmitCheck}
      >
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
      <Text style={styles.signIn}>Already have an Acount ? <Text style = {styles.underline} onPress={onPressSignIn}>Sign In</Text> </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: '#1C82EB',
    // paddingLeft: 10
  },
  headerText:{
    height: 50,
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    marginBottom: 30,
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 40
  },
  phoneMail:{
    flexDirection: 'row',
    height: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  phoneButton: {
    alignItems: "center",
    backgroundColor: "#ECECEC",
    paddingTop: 10,
    flex: 1,
    borderTopStartRadius: 5,

  },
  emailButton: {
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    flex: 1,
    borderTopEndRadius: 5
  },
  textIcon:{
    flexDirection: 'row'
  },
  emailInput:{
    borderWidth: 1,
    backgroundColor: 'white',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 40

  },
  confirmation:{
    flexDirection: 'row',
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 40
    
  },
  verification:{
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: 'white',
    height: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  verify:{
    backgroundColor: '#FD6A01',
    marginTop: 50,
    alignItems: "center",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 50
  },
  verifyText:{
    color: 'white',
    fontSize: 20,
  },
  signIn: {
    height: 40,
    margin: 12,
    textAlign: 'center',
    color: 'white',
  },
  underline:{
    textDecorationLine: 'underline'
  },
  TexttermsAndConditions:{
    color:'white'
  }

});

export default SignUp;
