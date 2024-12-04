import { useContext, useState } from 'react';
import { StyleSheet,View,Text, FlatList} from 'react-native';
import UserContext from '../context/userContext';
import TaskItem from '../components/TaskItem';
import TaskInput from '../components/TaskInput';


const Tehtavalista=({navigation}) => {
const {user} = useContext(UserContext);
const [addedTaskText, setAddedTaskText] = useState('');
const [allTasks, setAllTasks] = useState([]);

function tasksInputHandler(addedText) { //fetching user inputs
  setAddedTaskText(addedText);
}

function addTaskHandler() { //kun painetaan buttonia, lisätään käyttäjän uusi lisäämä 'task' tähän arrayhyn
  if(addedTaskText.trim() === '') return;
  setAllTasks((currentTasks) => [
    ...currentTasks, 
    {text: addedTaskText, key: Math.random().toString() },
  ]);
  setAddedTaskText(''); //tyhjentää syöttökentän lisäyksen jälkeen
} 
return (
  <View style={styles.appLayout}>
    <View style={styles.taskLayout}>
      <FlatList 
        data={allTasks} 
        renderItem={(itemData) => {
          return <TaskItem text={itemData.item.text} />;
        }}
        keyExtractor={(item) => item.key}
        alwaysBounceVertical={false}/>
       
  </View>
  <Text>Kirjautuneena: {user ? user.name : 'Ei kirjautunut'}</Text>
</View>
)}
const styles = StyleSheet.create({
  appLayout: { //koko näytön layout
    flex: 1,
    padding: 40,
    backgroundColor: '#98b'
  },
  

});

export default  Tehtavalista;