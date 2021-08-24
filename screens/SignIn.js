import React, {useState, useEffect} from 'react';
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

const signIn = ({navigation}) => {
    const [txtPhoneEmail, setPhoneEmail] = React.useState("");
    const [txtPassword, setPassword] = React.useState("");
    const [isSelected, setSelection] = useState(false);
    const [emailPhonePlaceHolder, setEmailPhonePlaceHolder] = React.useState('+96170838972')
    let errors = []
    const [loginCredentialStorage, setLoginCredentialStorage] = React.useState('')

  const onPressPhone = () => {
    if(emailPhonePlaceHolder == 'eliashousseini@gmail.com')
    setEmailPhonePlaceHolder('+96170838972')
  }
  const onPressEmail = () => {
    if(emailPhonePlaceHolder == '+96170838972')
    setEmailPhonePlaceHolder('eliashousseini@gmail.com')
  }

  const onPressForgotPassword = () => {
    alert('You forgot your password.')
  }

  const onPressVerify = () => {
        if(
          txtPhoneEmail.trim() === ""
        ){
          errors.push('firstName')
        }
        if(
          txtPassword.trim() === ""
        ){
          errors.push('lastName')
        }
        if(!isSelected){
          errors.push('checkbox1')
        }
        if (errors.length) { 
          alert('please fill all the fields and check all the boxes')
        } else {
        // if(loginCredentialStorage == txtPhoneEmail)
          navigation.navigate('LoginSuccessful')
        // else alert('please sign up')
        }
  }

  const onPressSignUp = () => {
    navigation.navigate('SignUp')
  }

  // useEffect(() => {
  //   SetupHelper.getItemAsyncStorage('loginCredential').then((item) => {
  //     // nothing in the local storage
  //     if (item == null || item == undefined) {
  //       console.log('no login Credential in storage')
  //     } else {
  //       setLoginCredentialStorage(item)
  //     }
  //   })
  // })

    return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Sign In</Text>
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
        onChangeText={setPhoneEmail}
        value={txtPhoneEmail}
        placeholder = {emailPhonePlaceHolder}
      />
            <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={txtPassword}
        placeholder = 'Password'
        secureTextEntry = {true}
      />
            <SafeAreaView style = {styles.confirmation}>
      <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          // style={styles.checkbox}
          tintColors={{ true: 'white', false: 'white' }}
      />
      <SafeAreaView style = {styles.confirmationArea}>      
      <Text style={styles.rememberMe}>Remember me</Text>
      <Text style={styles.forgotPassword} onPress={
      onPressForgotPassword
    }
      >Forgot Password ?</Text></SafeAreaView>
      </SafeAreaView>
      <TouchableOpacity
        style={styles.verify}
        onPress={onPressVerify}
      >
        <Text style={styles.verifyText} 
        >Sign In</Text>
      </TouchableOpacity>
        <View style={styles.barPosition}>
        <View style={styles.bar} />
        <View>
        <Text style={styles.socialMediaText}> Or Sign In using </Text>
        </View>
        <View style={styles.bar} />
        </View>
        <View style={styles.socialMediaItems}
      >
      <View style={styles.socialMediaItem} >
      <Image source={require('../Assets/google.png')}/>
      </View>
      <View style={styles.socialMediaItem} >
      <Image source={require('../Assets/linkedin.png')}/>
        </View>
      <View style={styles.socialMediaItem} >
      <Image source={require('../Assets/facebook.png')}/>
      </View>
    </View>
    <Text style={styles.signIn}>Already have an Acount ?
        <Text style = {styles.underline} onPress={onPressSignUp}> Sign Up</Text> 
    </Text>
    </SafeAreaView>
    )
}
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
      fontSize: 30,
    },
    input: {
      height: 40,
      margin: 12,
      // borderWidth: 1,
      backgroundColor: '#FFFFFF'
    },
    phoneMail:{
      flexDirection: 'row',
      // paddingHorizontal: 13,
      marginLeft: 12,
      marginRight: 12,
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
    rememberMe:{
        color: 'white'
    },
    forgotPassword:{
        color: 'white',
        paddingLeft: '20%',
        textDecorationLine: 'underline'
    },
    confirmationArea:{
        flexDirection: 'row',
    },
    socialMediaText:{
      textAlign: 'center', color: 'white'
    },
    socialMediaItems:{
        flexDirection: "row", height: 50, margin: 10,
    },
    socialMediaItem:{
        flex: 1, backgroundColor: "white", marginRight: 10,
        alignItems:'center',
        justifyContent: 'center'
    },
    bar: {
      flex: 1, height: 1, backgroundColor: 'white',
      margin: 10
    },
    barPosition: {
      flexDirection: 'row', alignItems: 'center',
      height: '7%'
    },
    
  });
export default signIn