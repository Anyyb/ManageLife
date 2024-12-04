import { useContext, useState } from 'react';
import { StyleSheet,View,Text, FlatList, Button, TextInput, Pressable } from 'react-native';
import UserContext from '../context/userContext';


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
    {text: addedTaskText, key: Math.random().toString(), completed: false },
  ]);
  setAddedTaskText(''); //tyhjentää syöttökentän lisäyksen jälkeen
} 

function deleteTaskHandler(taskKey) {
  setAllTasks((currentTasks) => 
    currentTasks.filter((task) => task.key !== taskKey)
  );  
}

return (

  <View style={styles.appLayout}>
    <View style={styles.inputLayout}>
      <TextInput 
        style={styles.textInput} 
        placeholder='To do list' 
        onChangeText={tasksInputHandler}
        value={addedTaskText}
        />
      <Button
        style={styles.buttonStyle} 
        title="Add" 
        onPress={addTaskHandler}
        /> 
    </View>
    <View style={styles.taskLayout}>
      <FlatList 
        data={allTasks} 
        renderItem={(itemData) => {
          return (
            <Pressable onPress={() => deleteTaskHandler(itemData.item.key)}>
              <View style={styles.taskItem}>
                <Text 
                  style={styles.taskText}>
                  {itemData.item.text}
                </Text>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.key}
        alwaysBounceVertical={false}
        />   
  </View>
  <Text>Kirjautuneena: {user ? user.name : 'Ei kirjautunut'}</Text>
  </View>
);
};

const styles = StyleSheet.create({
  appLayout: { //koko näytön layout
    flex: 1,
    padding: 40,
    backgroundColor: '#98b'
  },
  inputLayout: { // buttonin ja input
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    padding: 5,
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 25,
    backgroundColor: 'white',
    borderRadius: 4,

  },
  taskLayout: { // jos haluaa muokata tuota taskLayoutia vielä
    width: '100%',
  
  },
  textInput: { //input johon kirjoitetaan
    padding: 10,
    width: '80%',
    
  },
  taskItem: { //stylesheet tehtäville, kun ne on lisätty listaan
    backgroundColor: 'white',
    padding: 10,
    margin: 8,
    borderRadius: 4,
    
  },
  taskText: { //tehtävien fontti
    fontSize: 15,
  },
  
  
  
  //buttonStyle: { //task button style 
   // backgroundColor: 'blue',
   // paddingVertical: 10,
   // paddingHorizontal: 20,
   // borderRadius: 3,
    
  //},
  //buttonPressed: { //task button style kun pressed

  //}

});

export default  Tehtavalista;

