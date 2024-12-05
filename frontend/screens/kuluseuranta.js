import { useContext,useEffect } from 'react';
import { StyleSheet,View,Text, Pressable } from 'react-native';
import UserContext from '../context/userContext';

const Kuluseuranta=({navigation}) => {
const {user} = useContext(UserContext);

useEffect(() => {
  navigation.setOptions({
  headerRight: () => (
    navigation.canGoBack() ? (
    <Pressable style={styles.buttonGoback} onPress={() => navigation.goBack()}>
      <Text style={{color:'white'}}>Back</Text>
    </Pressable>
     ) : null
),
});
}, [navigation]);

return(
    <View style={styles.container}>
    <Text>Kuluseuranta</Text>
    <Text>Kirjautuneena: {user ? user.name : 'Ei kirjautunut'}</Text>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#9988bb',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonGoback: {
      padding:5,
      margin:2,
      backgroundColor: '#5d4c7f',
      borderRadius: 2,
  },
});
export default Kuluseuranta;