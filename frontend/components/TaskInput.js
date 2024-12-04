import { View, TextInput, Button, StyleSheet } from 'react-native';

function TaskInput() {

    return (
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
    )
};

export default TaskInput;

const styles = StyleSheet.create({

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
      
      
      //buttonStyle: { //task button style 
       // backgroundColor: 'blue',
       // paddingVertical: 10,
       // paddingHorizontal: 20,
       // borderRadius: 3,
        
      //},
      //buttonPressed: { //task button style kun pressed
  
      //}
})