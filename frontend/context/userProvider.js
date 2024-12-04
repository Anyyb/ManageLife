import {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from './userContext';

//määritellään provider joka tarjoaa arvon jota halutaan välittää
const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)

const updateUserState= async () =>{
useEffect(() => {
    const fetchUser = async () => {
    const loggedUserJSON = await AsyncStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    } else {
        setUser(null)
      }
    }
    fetchUser()
}, [user])  
}

useEffect(() => {
  updateUserState()
}, []);

  return (
    <UserContext.Provider value ={{user, setUser}}>
    {children}
    </UserContext.Provider>
    
  )
}
 
export default UserProvider;