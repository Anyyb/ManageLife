import { useState, useEffect,useContext } from 'react'
import { StyleSheet,View,Text, Pressable,TextInput,Platform, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notification from'../components/notifications';
import QuotesList from'../components/inspirationalQuotes';
import loginService from '../services/login';
import UserContext from '../context/userContext';
import createUserService from '../services/createuser';

const Etusivu=({route}) => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [addSingupVisible, setaddSingupVisible] = useState(false)
  const [name, setName] = useState('')
  //const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const { info } = route.params

//talletetaan kirjautuneen käyttäjän token ja tiedot asyncstorageen
useEffect(() => {
  const fetchUser = async () => {
  const loggedUserJSON = await AsyncStorage.getItem('loggedAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    loginService.setToken(user.token)
  }}
  fetchUser();
}, [])

//kirjautumisen tapahtumankäsittelijä
const handleLogin =  async () => {
  console.log('logging in with', username)
  try {
    const user = await loginService.login({
      username, password,
    })
    await AsyncStorage.setItem(
      'loggedAppUser', JSON.stringify(user)
    )
    loginService.setToken(user.token)
    setUser(user)
    console.log('Received user:', user)
  } catch (exception) {
    setErrorMessage('wrong username or password')
    setTimeout(() => {
      setErrorMessage(null)
    }, 7000)
  }
}
//lisää käyttäjä
const handleaddNewUser =  async () => {
  console.log('New User added')
  
  const newUser = {
    username: newUsername,
    name: name,
    password: newPassword,
  }
  try {
    await createUserService.createUser(newUser)
    setErrorMessage(`New User added: Username: ${newUser.username}`) 
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  } catch (error) {
    console.error('Error adding user:', error)
    setErrorMessage('Error creating user.')
  }
}
//uloskirjautumisen tapahtumankäsittelijä
//tyhjennetään tila ja local storage
const handleLogout = () => {
    AsyncStorage.removeItem('loggedAppUser')
    setUser(null)
}

return(
<View style={styles.flexContainer}>
<Notification message={errorMessage}/>
<Text style={{fontSize: 13, fontWeight: 'bold', color: 'white',}}> Toimiiko route.params: {info} </Text>
{/*Jos käyttäjä ei ole kirjautunut näytä loginForm*/}
{!user && <LoginForm handleLogin={handleLogin} username={username}password={password} setUsername={setUsername} setPassword={setPassword}/>}
{/*Käyttäjän luomisen lomakkeen napit*/}
{addSingupVisible === false ? (
  <View style={styles.buttonContainer}>
  <Pressable
    style={styles.buttonSingup} 
    onPress={() => setaddSingupVisible(true)} >
    <Text style={styles.buttonText}>Sign up</Text>
  </Pressable>
  </View>
) : (
  <View style={styles.buttonContainer}>
  <Pressable
    style={styles.buttonSingup} 
    onPress={() => setaddSingupVisible(false)} >
    <Text style={styles.buttonText}>Hide signing</Text>
  </Pressable>
  </View>
)
}
{/*Jos käyttäjä on kirjautunut näytä muu sisältö*/}
{user &&

<View style={styles.flexContainer}>
<View style={styles.buttonContainer}>
<Pressable
style={styles.buttonLogout} 
onPress={handleLogout}>
<Text style={styles.buttonText}>Log out</Text>
</Pressable>
</View>
<View style={styles.mainContainer}>
<Text style={styles.text}> Aurinkoista päivää!</Text>
<Text style={styles.text}>{user.name}</Text>
<Image style={styles.image} source={require('../assets/smiley.png')}/>
<QuotesList/>
</View>
</View>
}
<View style={styles.flexContainer}>
{ addSingupVisible && <CreateUserForm handleaddNewUser={handleaddNewUser} newUsername={newUsername} 
newPassword={newPassword} name={name} setNewUsername={setNewUsername} setNewPassword={setNewPassword} setName={setName} />}
</View>
</View>
)
}
const LoginForm=(props) => {
  return(
    <View style={styles.loginContainer}>
      <View>
      <Text style={styles.inputLabel}>Käyttäjänimi:</Text>
        <TextInput
            style={styles.input}
            type="text"
            value={props.username}
            placeholder="Anna käyttäjänimi"
            onChangeText={props.setUsername}
          />
        </View>
        <View>
        <Text style={styles.inputLabel}>Salasana:</Text>
          <TextInput
            style={styles.input}
            type="text"
            value={props.password}
            secureTextEntry={true} 
            placeholder="Anna salasana"
            onChangeText={props.setPassword}
          />
        
      <Pressable
      style={styles.buttonLogin} 
      onPress={props.handleLogin}>
      <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
      </View>
      </View>
  )
}
const CreateUserForm=(props) => {
  return(
    <View style={styles.createContainer}>
      <View>
      <Text style={styles.inputLabel}>Käyttäjänimi:</Text>
        <TextInput
            style={styles.input}
            type="text"
            value={props.newUsername}
            placeholder="Anna käyttäjänimi"
            onChangeText={props.setNewUsername}
          />
        </View>
        <View>
        <Text style={styles.inputLabel}>Salasana:</Text>
          <TextInput
            style={styles.input}
            type="text"
            value={props.newPassword}
            secureTextEntry={true} 
            placeholder="Anna salasana"
            onChangeText={props.setNewPassword}
          />
          <Text style={styles.inputLabel}>Etu- ja sukunimi:</Text>
          <TextInput
            style={styles.input}
            type="text"
            value={props.name}
            placeholder="Anna etu- ja sukunimi"
            onChangeText={props.setName}
          />
      <Pressable
      style={styles.buttonLogin} 
      onPress={props.handleaddNewUser}>
      <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      </View>
      </View>
  )
}
const styles = StyleSheet.create({
  flexContainer: {
    flex:1, // container täyttää näytön
    flexDirection: 'column', //felxin suunta
    backgroundColor:'#9988bb',
  },
  mainContainer: {
    flex:2,
    justifyContent:'center',
    alignItems:'center',
    margin:20,
    padding:20,
    borderRadius: 5,
    backgroundColor: '#716090',
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
      shadowOffset:{width:1,height:2},
      shadowOpacity:3,
      shadowColor:'black',
      shadowRadius:3,
    }
    }),
  },
  input: {
    padding:10,
    marginBottom:10,
    backgroundColor: 'white',
    color:'black',
  },
  inputLabel: {
    textAlign:'left',
    fontWeight:'500',
    color:'white',
    marginBottom:2,
  },
  text: {
    marginTop:10,
    fontSize:20,
    color:"white",
  },
  loginContainer: {
    justifyContent:'center',
    margin:20,
    padding:20,
    borderRadius: 5,
    backgroundColor: '#716090',
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
      shadowOffset:{width:1,height:2},
      shadowOpacity:3,
      shadowColor:'black',
      shadowRadius:3,
    }
  }),
},
  image: {
    padding:5,
},
  buttonContainer: {
    flexDirection: 'row-reverse',
    padding:15,
},
  buttonLogin: {
    padding:10,
    marginBottom:10,
    backgroundColor: '#5d4c7f',
    borderRadius: 2,
}, 
  buttonSingup: {
    width:'25%',
    padding:10,
    backgroundColor: '#5d4c7f',
    borderRadius: 2,
}, 
  buttonLogout: {
    width:'25%',
    padding:10,
    backgroundColor: '#5d4c7f',
    borderRadius: 2,

},
  buttonText:{
    fontFamily:'Arial',
    fontWeight:'bold',
    color: 'white',
    fontSize:'13',   
},
createContainer: {
  margin:20,
  padding:20,
  borderRadius: 5,
  backgroundColor: '#716090',
  ...Platform.select({
    android: {
      elevation: 5,
    },
    ios: {
    shadowOffset:{width:1,height:2},
    shadowOpacity:3,
    shadowColor:'black',
    shadowRadius:3,
  }
  }),
  },
});
export default Etusivu;