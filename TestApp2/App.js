import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, Pressable, View, TextInput, Image, FlatList, ActivityIndicator} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GenericTextButton from './components/GenericTextButton';
import LoginHereButton from './components/LoginHereButton';
import RegisterButton from './components/RegisterButton';
import ProfileDropDownButton from './components/ProfileDropDownButton';
import TeacherHomePageButton from './components/TeacherHomePageButton';
import TeacherScanQRScreenButton from './components/TeacherScanQRScreenButton';
import TeacherChatScreenButton from './components/TeacherChatScreen';
import TeacherQueueScreenButton from './components/TeacherQueueScreen';
import ParentHomePageButton from './components/ParentHomePageButton';
import GenerateQRScreenButton from './components/GenerateQRScreenButton';
import RequestPickUpScreenButton from './components/RequestPickUpScreenButton';
import CalendarScreenButton from './components/CalendarScreenButton';
import ChildButtonRenderer from './components/ChildButtonRenderer';
import CreateQRCode from './components/QRCode';
import FetchGuardianFirstName from './components/fetchGuardianFirstName';



export default function App() {
  const insertIntoQueueIP = 'http:10.161.103.210:3001/queue'; // Update with your actual server URL
  const getGuardiansIP = 'http:10.161.103.210:3000/guardians';
  function insertIntoQueue(postdata, IP){
    fetch(insertIntoQueueIP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Handle success, if needed
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error, if needed
      });
  }
  const [postData, setPostData] = useState([{
    idStudent: String, idGuardian: String, studentFirst: String, parentFirst: String, parentLast: String, parentCar: String, studentLast: String, type: String
  }])
  const [screen, showScreen] = useState(0);
  const [numChildren, changeChildren] = useState(2);
  // [0 = preLogin screen, 1= loginScreen, 2 = loginVerified]
  /*Redundant code:
  const [showLoginScreen, setshowLoginScreen] = useState(0);
  const [loginVerified, setverifyLogin]= useState(0);*/
  const [username, setUsernameForLogin]= useState('');
  const [password, setPasswordForLogin] = useState('');
  const [guardianData, setGuardianData] = useState([]);
  function verifyLogin(U, P, DB){
    verified = false;
    for(i = 0; i<Object.keys(DB).length; i++)
    {
      if(U == DB[i].guardianUsername && P == DB[i].guardianLastName)
      {
        showScreen(2);
        verified = true;
      }
    }
    if(verified == false){
      showScreen(12);
    }
    console.log(verified);
  }
  const getGuardians = async () => {
    try {
      const response = await fetch(getGuardiansIP);
      const data = await response.json();
      setGuardianData(data);
    } catch (error) {
      console.error(error);
    }
  };  
  useEffect(() => {
    getGuardians();
  }, []);
  return (
    <SafeAreaProvider>
      {
      screen == 1 ? //Login Screen
        <SafeAreaProvider> 
          <View style={styles.loginScreen}>
            <View style = {styles.PUPlogoTopBorder}>
              <Image style={{width: 60, height: 60}} source={require('./assets/PuPIcon.png')}></Image>
              <Text style={styles.headerText}> Pick Up Pal </Text>
            </View>
            <View style = {styles.LoginTextInput}>
              <Text style={styles.loginText}> Login </Text>
              <TextInput style={styles.loginInput} placeholder="Enter Username" onChangeText={username => setUsernameForLogin(username)}/>
              <TextInput style={styles.loginInput} secureTextEntry={true} placeholder="Enter Password" onChangeText={password => setPasswordForLogin(password)}/>
            </View>
            <View style={styles.registerPrompt}> 
              <Text style={{fontSize: 20}}>New User? </Text>
              <RegisterButton label="Click here to Register!" onPress={() => {showScreen(3)}}> </RegisterButton>
            </View>
            <View><LoginHereButton label='LOGIN' onPress={() => verifyLogin(username, password, guardianData)}/></View>
            <View style={styles.loginBottomBorder}>
              <Text>By continuing you agree with Pick Up Pals Terms of Service and Private Policy.</Text>
            </View>
          </View>
        </SafeAreaProvider>
      :
      screen == 0? //Pre-Login Screen
        <View style={styles.container}>
            <Text>HOME PAGE</Text>
            <GenericTextButton label="Login" onPress={() => showScreen(1)}/> 
            <StatusBar style="auto"/>
        </View>
      :
      screen == 2? //Teacher Home Screen
      <View style={styles.container}>
        <View style={styles.SafeArea}>
          <View style={styles.teacherTopBorder}>
            <Image style={{width: 60, height: 60}} source={require('./assets/PuPIcon.png')}></Image>
            <Text style={{width: 240, fontSize: 40, color: '#fff', letterSpacing: 10}}> PUP </Text>
            <ProfileDropDownButton></ProfileDropDownButton>
          </View>
          <View style={styles.teacherhomePageMiddle}>
            <Text style={{fontSize: 30, textDecorationLine: 'underline'}}> Announcements: </Text>
            <Text style={{fontSize: 18, padding: 5, height: 260, backgroundColor: '#aaa'}}>This is a sample announcement. We should put that there are no pickups on dead day for our demo.</Text>
            <Text style={{fontSize: 30, textDecorationLine: 'underline'}}> Notifications: </Text>
            <Text style={{fontSize: 18, padding: 5, height: 260, backgroundColor: '#aaa'}}>This is a sample notification. We should put the kids we are going to be picking pup for our demo</Text>
          </View>
          <View style={styles.teacherBottomBorder}>
            <TeacherHomePageButton onPress={() => showScreen(2)}></TeacherHomePageButton>
            <TeacherScanQRScreenButton onPress={() => showScreen(5)}></TeacherScanQRScreenButton>
            <TeacherChatScreenButton onPress={() => showScreen(6)}></TeacherChatScreenButton>
            <TeacherQueueScreenButton onPress={() => showScreen(7)}></TeacherQueueScreenButton>
          </View>
        </View>
      </View> 
      :
      screen == 3? //Registration Screen
      <View style={styles.loginScreen}>
        <View style = {styles.PUPlogoTopBorder}>
          <Image style={{width: 60, height: 60}} source={require('./assets/PuPIcon.png')}></Image>
          <Text style={styles.headerText}> Pick Up Pal </Text>
        </View>
        <View style = {styles.RegistrationTextInput}>
          <Text style={styles.registrationText}> Register Now </Text>
          <Text style={styles.registrationText2}> First Name </Text>
          <TextInput style={styles.registerInput} placeholder="_____" onChangeText={firstName => setText(firstName)}/>
          <Text style={styles.registrationText2}> Last Name </Text>
          <TextInput style={styles.registerInput} placeholder="_____" onChangeText={lastName => setText(lastName)}/>
          <Text style={styles.registrationText2}> Date of Birth </Text>
          <TextInput style={styles.registerInput} placeholder="_____" onChangeText={DOB => setText(DOB)}/>
          <Text style={styles.registrationText2}> Email Address </Text>
          <TextInput style={styles.registerInput} placeholder="_____" onChangeText={Email => setText(Email)}/>
          <Text style={styles.registrationText2}> Password </Text>
          <TextInput style={styles.registerInput} placeholder="*****" onChangeText={password => setText(password)}/>
          <Text style={styles.registrationText2}> Confirm Password </Text>
          <TextInput style={styles.registerInput} placeholder="*****" onChangeText={confPassword => setText(confPassword)}/>
        </View>
        <View style={styles.loginPrompt}> 
          <Text style={{fontSize: 20}}>Already have an account? </Text>
          <RegisterButton label="Click here to Login!" onPress={() => {showScreen(1)}}> </RegisterButton>
        </View>
        <View><LoginHereButton label='CREATE ACCOUNT' onPress={() => {showScreen(4)}}/></View>
        <View style={styles.registerBottomBorder}>
          <Text style={{fontSize: 12}}>We’re committed to your privacy. PUP uses the information you provide to contact you about relevant content and services. You may unsubscribe from these communications at any time. For more details, check Settings</Text>
        </View>
      </View>
      :
      screen == 4? //Registration Screen
      <View style={styles.tyForRegisterScreen}>
        <View style = {styles.PUPlogoTopBorder}>
          <Image style={{width: 60, height: 60}} source={require('./assets/PuPIcon.png')}></Image>
          <Text style={styles.headerText}> Pick Up Pal </Text>
        </View>
        <View style={{width: 375, height: 600, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20,textAlign: 'center', padding: 10}}> Thank you for creating an account with Pick Up Pals. You will now be redirected to the login screen where you can login to your new account! </Text>
          <GenericTextButton label="Continue" onPress={() => showScreen(1)}></GenericTextButton>
        </View>
      </View>
      :
      screen == 5? //SCAN QR Screen
      <View style={styles.container}>
        <View style={styles.SafeArea}>
          <View style={styles.teacherTopBorder}>
            <Image style={{width: 60, height: 60}} source={require('./assets/PuPIcon.png')}></Image>
            <Text style={{width: 240, fontSize: 40, color: '#fff', letterSpacing: 10}}> PUP </Text>
            <ProfileDropDownButton></ProfileDropDownButton>
          </View>
          <View style={styles.teacherhomePageMiddle}>
            <Text style={{fontSize: 30, textDecorationLine: 'underline'}}> SCAN QR Screen: </Text>
          </View>
          <View style={styles.teacherBottomBorder}>
            <TeacherHomePageButton onPress={() => showScreen(2)}></TeacherHomePageButton>
            <TeacherScanQRScreenButton onPress={() => showScreen(5)}></TeacherScanQRScreenButton>
            <TeacherChatScreenButton onPress={() => showScreen(6)}></TeacherChatScreenButton>
            <TeacherQueueScreenButton onPress={() => showScreen(7)}></TeacherQueueScreenButton>
          </View>
        </View>
      </View> 
      :
      screen == 6? //Chat Screen
      <View style={styles.container}>
        <View style={styles.SafeArea}>
          <View style={styles.teacherTopBorder}>
            <Image style={{width: 60, height: 60}} source={require('./assets/PuPIcon.png')}></Image>
            <Text style={{width: 240, fontSize: 40, color: '#fff', letterSpacing: 10}}> PUP </Text>
            <ProfileDropDownButton></ProfileDropDownButton>
          </View>
          <View style={styles.teacherhomePageMiddle}>
            <Text style={{fontSize: 30, textDecorationLine: 'underline'}}> Chat Screen: </Text>
          </View>
          <View style={styles.teacherBottomBorder}>
            <TeacherHomePageButton onPress={() => showScreen(2)}></TeacherHomePageButton>
            <TeacherScanQRScreenButton onPress={() => showScreen(5)}></TeacherScanQRScreenButton>
            <TeacherChatScreenButton onPress={() => showScreen(6)}></TeacherChatScreenButton>
            <TeacherQueueScreenButton onPress={() => showScreen(7)}></TeacherQueueScreenButton>
          </View>
        </View>
      </View> 
      :
      screen == 7? //Queue Screen
      <View style={styles.container}>
        <View style={styles.SafeArea}>
          <View style={styles.teacherTopBorder}>
            <Image style={{width: 60, height: 60}} source={require('./assets/PuPIcon.png')}></Image>
            <Text style={{width: 240, fontSize: 40, color: '#fff', letterSpacing: 10}}> PUP </Text>
            <ProfileDropDownButton></ProfileDropDownButton>
          </View>
          <View style={styles.teacherhomePageMiddle}>
            <Text style={{fontSize: 30, textDecorationLine: 'underline'}}> Queue Screen: </Text>
          </View>
          <View style={styles.teacherBottomBorder}>
            <TeacherHomePageButton onPress={() => showScreen(2)}></TeacherHomePageButton>
            <TeacherScanQRScreenButton onPress={() => showScreen(5)}></TeacherScanQRScreenButton>
            <TeacherChatScreenButton onPress={() => showScreen(6)}></TeacherChatScreenButton>
            <TeacherQueueScreenButton onPress={() => showScreen(7)}></TeacherQueueScreenButton>
          </View>
        </View>
      </View> 
      :
      screen == 8? //Parent Home Screen
      <View style={styles.container}>
        <View style={styles.SafeArea}>
          <View style={styles.teacherTopBorder}>
            <Image style={{width: 60, height: 60}} source={require('./assets/PuPIcon.png')}></Image>
            <Text style={{width: 240, fontSize: 40, color: '#fff', letterSpacing: 10}}> PUP </Text>
            <ProfileDropDownButton></ProfileDropDownButton>
          </View>
          <View style={styles.teacherhomePageMiddle}>
            <Text style={{fontSize: 30, textDecorationLine: 'underline'}}> Announcements: </Text>
            <Text style={{fontSize: 18, padding: 5, height: 260, backgroundColor: '#aaa'}}>This is a sample announcement. We should put that there are no pickups on dead day for our demo.</Text>
            <Text style={{fontSize: 30, textDecorationLine: 'underline'}}> Notifications: </Text>
            <Text style={{fontSize: 18, padding: 5, height: 260, backgroundColor: '#aaa'}}>This is a sample notification. We should put the kids we are going to be picking pup for our demo</Text>
          </View>
          <View style={styles.teacherBottomBorder}>
            <ParentHomePageButton onPress={() => showScreen(8)}></ParentHomePageButton>
            <GenerateQRScreenButton onPress={() => showScreen(9)}></GenerateQRScreenButton>
            <RequestPickUpScreenButton onPress={() => showScreen(10)}></RequestPickUpScreenButton>
            <CalendarScreenButton onPress={() => showScreen(11)}></CalendarScreenButton>
          </View>
        </View>
      </View> 
      :
      screen == 9? //Generate QR Screen
      <View style={styles.container}>
        <View style={styles.SafeArea}>
          <View style={styles.teacherTopBorder}>
            <Image style={{width: 60, height: 60}} source={require('./assets/PuPIcon.png')}></Image>
            <Text style={{width: 240, fontSize: 40, color: '#fff', letterSpacing: 10}}> PUP </Text>
            <ProfileDropDownButton></ProfileDropDownButton>
          </View>
          <View style={styles.childrenToPickUpViewStyle}>
            <Text style={{fontSize: 20, textDecorationLine: 'underline'}}> Which Children would you like to Pick up Today? </Text>
            <ChildButtonRenderer numChildren={numChildren} names={['Timmy', 'Jimmy']}></ChildButtonRenderer>
            <GenericTextButton label="Generate QR Code"></GenericTextButton>
          </View>
          <View style={styles.teacherBottomBorder}>
            <ParentHomePageButton onPress={() => showScreen(8)}></ParentHomePageButton>
            <GenerateQRScreenButton onPress={() => showScreen(9)}></GenerateQRScreenButton>
            <RequestPickUpScreenButton onPress={() => showScreen(10)}></RequestPickUpScreenButton>
            <CalendarScreenButton onPress={() => showScreen(11)}></CalendarScreenButton>
          </View>
        </View>
      </View> 
      :
      screen == 10? //Request Pick up Screen
      <View style={styles.container}>
        <View style={styles.SafeArea}>
          <View style={styles.teacherTopBorder}>
            <Image style={{width: 60, height: 60}} source={require('./assets/PuPIcon.png')}></Image>
            <Text style={{width: 240, fontSize: 40, color: '#fff', letterSpacing: 10}}> PUP </Text>
            <ProfileDropDownButton></ProfileDropDownButton>
          </View>
          <View style={styles.teacherhomePageMiddle}>
            <Text style={{fontSize: 30, textDecorationLine: 'underline'}}> Request Pick Up Screen: </Text>
            <CreateQRCode></CreateQRCode>
          </View>
          <View style={styles.teacherBottomBorder}>
            <ParentHomePageButton onPress={() => showScreen(8)}></ParentHomePageButton>
            <GenerateQRScreenButton onPress={() => showScreen(9)}></GenerateQRScreenButton>
            <RequestPickUpScreenButton onPress={() => showScreen(10)}></RequestPickUpScreenButton>
            <CalendarScreenButton onPress={() => showScreen(11)}></CalendarScreenButton>
          </View>
        </View>
      </View>
      :
      screen == 11? //Calendar Screen
      <View style={styles.container}>
        <View style={styles.SafeArea}>
          <View style={styles.teacherTopBorder}>
            <Image style={{width: 60, height: 60}} source={require('./assets/PuPIcon.png')}></Image>
            <Text style={{width: 240, fontSize: 40, color: '#fff', letterSpacing: 10}}> PUP </Text>
            <ProfileDropDownButton></ProfileDropDownButton>
          </View>
          <View style={styles.teacherhomePageMiddle}>
            <Text style={{fontSize: 30, textDecorationLine: 'underline'}}> Calendar screen: </Text>
          </View>
          <View style={styles.teacherBottomBorder}>
            <ParentHomePageButton onPress={() => showScreen(8)}></ParentHomePageButton>
            <GenerateQRScreenButton onPress={() => showScreen(9)}></GenerateQRScreenButton>
            <RequestPickUpScreenButton onPress={() => showScreen(10)}></RequestPickUpScreenButton>
            <CalendarScreenButton onPress={() => showScreen(11)}></CalendarScreenButton>
          </View>
        </View>
      </View>
      :
      screen == 12? //Wrong Login Screen
      <View style={styles.container}>
        <Text>Wrong Username or Password, please press continue to try again</Text>
        <GenericTextButton label='Continue' onPress={() => showScreen(1)}></GenericTextButton>
      </View>


      :
      <View style={{flex: 1, padding: 100,alignItems: 'center', backgroundColor: '#aaa'}}>
        <Text>{guardianData[1].guardianUsername}</Text>
      </View> //Empty view should never be reached, for some reason I get error where there's no else statement
    } 
    </SafeAreaProvider> 
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginScreen: {
    flex: 1, //What portion of the screen will this view take (based on what view it is in)
    backgroundColor: "#fff",
    flexDirection: 'column', //Where all the content will be centered around (Ex. top means context starts at the top of the screen, center means it starts in the center)
    justifyContent: 'space-between',
    alignItems: 'center' //Similar to allignment on work documents (words start in the center, left, or right)
  },
  tyForRegisterScreen: {
    flexDirection: 'column',
  },
  registerBottomBorder: {
    flex: .1,
    justifyContent: 'flex-start',
    backgroundColor: '#1E3CD5',
  },
  loginBottomBorder:{
    flex: .1,
    justifyContent: 'flex-start',
    backgroundColor: '#1E3CD5',
  },
  loginInput: {
    height: 40,
    padding: 10,
    fontSize: 20,
    width: 360,
    backgroundColor: '#aaa',
  },
  registerInput: {
    height: 30,
    padding: 10,
    fontSize: 16,
    width: 360,
    backgroundColor: '#aaa',
  },
  childrenToPickUpViewStyle: {
    flex: .75,
    width: 375,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },  
  registerPrompt: {
    flexDirection: 'row',
  },
  loginPrompt: {
    flexDirection: 'column',
  },
  PUPlogoTopBorder: {
    height: 115,
    width: 375,
    backgroundColor: '#1E31DA',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  LoginTextInput: {
    flex: .3,
    width: 360,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  registrationText: {
    textAlign: "center",
    fontSize: 30,
    
  },
  RegistrationTextInput: {
    flex: .6,
    justifyContent: 'space-between',

  },
  registrationText2: {
    fontSize: 20,
  },
  headerText: {
    fontSize:40,
    textAlign:'left',
    color: '#fff',
  },
  loginText:{
    fontSize:40,
    textAlign:'left',
  },
  SafeArea: {
    justifyContent: 'flex-start',
    flex: .9255, //I just set this to be right at the point where it says "Home screen" right at the top of my IPhone
    width: 500,
    backgroundColor: '#ff0', //Yellow
    alignItems: 'center',
  },
  teacherTopBorder: {
    flex: .1, //Size of top Border
    width: 375,
    justifyContent: 'flex-start', //Puts Home Screen at the top
    alignItems: 'center', //Puts home screen at center alligned
    backgroundColor: "#1E31DA",
    flexDirection: 'row',
  },
  teacherhomePageMiddle:{
    flex: .75,
    width: 375,
    backgroundColor: '#fff'
  },
  teacherBottomBorder:{
    flex: .15,
    width: 375,
    backgroundColor: "#1E31DA", //Dark Blue
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }
});
