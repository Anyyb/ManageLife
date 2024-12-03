import { useContext } from 'react';
import { StyleSheet,View,Text, Pressable} from 'react-native';
import UserContext from '../context/userContext';

const Tehtavalista=({navigation}) => {
const {user} = useContext(UserContext);
return(
    <View style={styles.container}>
    <Text>Tehtävälista</Text>
    <Text>Kirjautuneena: {user ? user.name : 'Ei kirjautunut'}</Text>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
export default  Tehtavalista;