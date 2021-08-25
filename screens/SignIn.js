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

import {getData, storeData} from '../libraries/asyncStorage'

const signIn = ({navigation}) => {
    const [txtPhoneEmail, setPhoneEmail] = React.useState("");
    const [txtPassword, setPassword] = React.useState("");
    const [isSelected, setSelection] = useState(false);
    const [emailPhonePlaceHolder, setEmailPhonePlaceHolder] = React.useState('70838972')
    let errors = []
    // const [loginCredentialStorage, setLoginCredentialStorage] = React.useState('')
    const [phoneOrEmailSelected, SetphoneOrEmailSelected] = React.useState(0)

  const onPressPhone = () => {
    if(emailPhonePlaceHolder == 'eliashousseini@gmail.com')
    setEmailPhonePlaceHolder('70838972')
    SetphoneOrEmailSelected(0)
  }
  const onPressEmail = () => {
    if(emailPhonePlaceHolder == '70838972')
    setEmailPhonePlaceHolder('eliashousseini@gmail.com')
    SetphoneOrEmailSelected(1)
  }

  const onPressForgotPassword = () => {
    alert('You forgot your password.')
  }

  const validateEmailFormat = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
}
  const validatePhoneFormat = (phone) => {
    const expression = /^[0-9\b]+$/
    return expression.test(phone)
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
        // if(!isSelected){
        //   errors.push('checkbox1')
        // }
        if (errors.length) { 
          alert('please fill all the fields and check all the boxes')
        } 
        else {
          if(phoneOrEmailSelected == 0){
            if(!validatePhoneFormat(txtPhoneEmail)){
              alert('phone format not valid')
            } else {
              getData().then(item => {
                if(item === null || item === undefined){
                  // console.log(item.emailPhone)
                  alert('please sign up !')
                } 
                else if(item.emailPhone !== txtPhoneEmail){
                  alert('please sign up !')
                }
                else if( item.emailPhone === txtPhoneEmail){
                  if(isSelected){
                    // errors.push('checkbox1')
                    storeData({
                      login: true
                    })
        
                  }
                navigation.navigate('LoginSuccessful')
                }
              })
            }
          } else if(phoneOrEmailSelected == 1){
            if(!validateEmailFormat(txtPhoneEmail   )){
              alert('email format not valid')
            } else {
              getData().then(item => {
                if(item === null || item === undefined){
                  // console.log(item.emailPhone)
                  alert('please sign up !')
                } 
                else if(item.emailPhone !== txtPhoneEmail){
                  alert('please sign up !')
                }
                else if( item.emailPhone === txtPhoneEmail){
                  if(isSelected){
                    // errors.push('checkbox1')
                    storeData({
                      login: true
                    })
        
                  }
                navigation.navigate('LoginSuccessful')
                }
              })
            }
          }


        }
  }    

  const onPressSignUp = () => {
    navigation.navigate('SignUp')
  }

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
            <SafeAreaView style = {styles.termsAndConditions}>
      <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          tintColors={{ true: 'white', false: 'white' }}
          lineWidth={2.0}
          boxType='square'
          style={{marginRight: 20, marginLeft: 10, width: 20, height: 20}}
          // style={{width: 2}}
      />
      <SafeAreaView style={{flexDirection: 'row', width: '80%', justifyContent:'space-between'}}>
        <View>
        <Text style = {styles.termsAndConditionsText1}>Remember me</Text>
        </View>
      <View>
      <Text style = {styles.termsAndConditionsText2} onPress={onPressForgotPassword}>Forgot Password ?</Text>
      </View>

      </SafeAreaView>


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
        // backgroundColor: 'green'
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
    checkbox: {
      marginRight: 10,
      width: 20, height: 20,
      // backgroundColor: 'red',
      // height: 12
    },
    termsAndConditions:{
      flexDirection: 'row',
      alignItems: "center",
      margin: 10,
      // backgroundColor: 'white',
      height: 50,
      
    },
    termsAndConditionsText1: {
      color: 'white',
      // backgroundColor: 'red',
    },
    termsAndConditionsText2: {
      color: 'white',
      // backgroundColor: 'green',
      textDecorationLine: 'underline',
    }
    
  });
export default signIn