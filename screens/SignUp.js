import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import CheckBox from '@react-native-community/checkbox'

import SetupHelper from '../SetupHelper';

const SignUp = ({navigation}) => {
  const [txtFirstName, setFirstName] = React.useState("");
  const [txtLastName, setLastName] = React.useState("");
  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [txtEmail, setTextEmail] = React.useState("");
  const [emailPhone, setEmailPhone] = React.useState('+96170838972')
  let errors = []

  const onPressPhone = () => {
    if(emailPhone == 'eliashousseini@gmail.com')
    setEmailPhone('+96170838972')
  }
  const onPressEmail = () => {
    if(emailPhone == '+96170838972')
    setEmailPhone('eliashousseini@gmail.com')
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
        <Image style={styles.phoneImage} source={require('../Assets/smartphone.png')}/>
        <Text>Via Phone </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.emailButton}
        onPress={onPressEmail}
      >
      <Image style={styles.phoneImage} source={require('../Assets/email.png')}/>
      </TouchableOpacity>
      </SafeAreaView>

      <TextInput
        style={styles.emailInput}
        onChangeText={setTextEmail}
        value={txtEmail}
        placeholder = {emailPhone}
      />
      <SafeAreaView style = {styles.confirmation}>
      <CheckBox
          value={isSelected1}
          onValueChange={setSelection1}
          tintColors={{ true: 'white', false: 'white' }}
      />
      <Text style={styles.TexttermsAndConditions}>I agree to User Terms and Conditions</Text>
      </SafeAreaView>
      <SafeAreaView style = {styles.verification}>
      <CheckBox
          value={isSelected2}
          onValueChange={setSelection2}
      />
      <Text>I am not a robot</Text>
      </SafeAreaView>
      <TouchableOpacity
        style={styles.verify}
        onPress={()=>{
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
            } else {
              SetupHelper.setItemAsyncStorage('loginCredential', txtEmail)
            }
        }}
      >
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
      <Text style={styles.signIn}>Already have an Acount ? <Text style = {styles.underline} onPress={()=> {
        navigation.navigate('SignIn')
      }}>Sign In</Text> </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: '#1C82EB'
  },
  headerText:{
    height: 40,
    margin: 12,
    textAlign: 'center',
    color: 'white',
    fontSize: 30
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    backgroundColor: '#FFFFFF'
  },
  phoneMail:{
    flexDirection: 'row',
    paddingHorizontal: 13,
    height: 40,
  },
  phoneButton: {
    alignItems: "center",
    backgroundColor: "#ECECEC",
    paddingTop: 10,
    flex: 1
  },
  emailButton: {
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    flex: 1
  },
  textIcon:{
    flexDirection: 'row'
  },
  emailInput:{
    height: 50,
    marginLeft: 12,
    marginRight: 12,
    borderWidth: 1,
    backgroundColor: 'white'
  },
  confirmation:{
    flexDirection: 'row',
    alignItems: "center",
    margin: 10,
  },
  verification:{
    flexDirection: 'row',
    alignItems: "center",
    margin: 10,
    backgroundColor: 'white',
    height: 50
  },
  verify:{
    backgroundColor: '#FD6A01',
    margin: 10,
    height: 50,
    alignItems: "center",
    padding: 10,
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