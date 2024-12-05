import { useContext, useState, useEffect } from 'react';
import { StyleSheet,View,Text, FlatList, TextInput, Pressable } from 'react-native';
import UserContext from '../context/userContext';
import TaskService from '../services/taskService';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tehtavalista=({navigation}) => {
const {user} = useContext(UserContext);
const [addedTaskText, setAddedTaskText] = useState('');
const [tasks, setTasks] = useState([])


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

//haetaan tehtävät
useEffect(() => {
  TaskService.getAll().then(tasks =>
    setTasks( tasks )
    
  )
}, [tasks])

function tasksInputHandler(addedText) { //fetching user inputs
  setAddedTaskText(addedText);
}
//lisää tulo
const addTaskHandler =  async () => {
  console.log('New Task added')
  
  
  const createNewTask = {
    title: addedTaskText,
    id: Math.random().toString(),
  }
  
  if (!user.token) {
    console.error('token empty')
    return
  }
  TaskService.setToken(user.token)
  await
  TaskService.create(createNewTask)
  setTasks(tasks.concat(createNewTask))
  setErrorMessage(` New Task added in Tasks: Title: ${createNewTask.title}.`)
  setTimeout(() => {
    setErrorMessage(null)
  }, 5000)
}

const deleteTaskHandler = async(id) => {
  console.log('Task Deleted')
  const findTask = tasks.find(task => task.id === id)
  if (!findTask) {
    console.error("Task not found")
    return
  }
  await
  TaskService.deleteTask(findTask.id)
  setTasks(tasks.filter(task => task.id !== findTask.id))
  setErrorMessage(`Task deleted: ${findTask.title}`)
  setTimeout(() => {
    setErrorMessage(null);
  }, 5000);
}

return (

  <View style={styles.appLayout}>
    <Text>Kirjautuneena: {user ? user.name : 'Ei kirjautunut'}</Text>
    <View style={styles.inputLayout}>
      <TextInput 
        style={styles.textInput} 
        placeholder='To do list' 
        onChangeText={tasksInputHandler}
        value={addedTaskText}
        />
      <Pressable
        style={styles.buttonAdd} 
        onPress={addTaskHandler}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
        
    </View>
    <TaskList tasks={tasks} deleteTaskHandler={deleteTaskHandler}/>
  </View>
  )
};
const TaskList = ({tasks, deleteTaskHandler}) => {
  return (
    <View style={styles.taskLayout}>
      <Text style={styles.tableHeader}>Tehtävälista:</Text>
      <FlatList
        data={tasks}
        scrollEnabled={true} 
        keyExtractor={(item) => item.id.toString()}
        alwaysBounceVertical={false} 
        renderItem={({ item }) => (
        <View style={styles.taskItem}>
         <View style={styles.taskRow}>
         <Text style={styles.taskText}>Task: {item.title}</Text>
            <Pressable
            onPress={() => deleteTaskHandler(item.id)}>
            <Icon name="trash" size={30} color="#5d4c7f" />
            </Pressable>
          </View>
          </View>
        )}
      />
    </View>
  )
}

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
    flex: 1,
    fontSize: 15,
    padding:5,
    color:'black',
  },
  buttonGoback: {
    padding:5,
    margin:2,
    backgroundColor: '#5d4c7f',
    borderRadius: 2,
},
  tableHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
},
taskRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
},

buttonAdd:{
  padding:5,
  margin:2,
  backgroundColor: '#5d4c7f',
  borderRadius: 2,
},
buttonText:{
 color:'white',
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

