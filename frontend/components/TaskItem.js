import { View, Text, StyleSheet } from 'react-native';

function TaskItem(props) {
    return (
        <View style={styles.taskItem}>
            <Text style={styles.taskText}>{props.text}</Text>
        </View>
    );
}

export default TaskItem;

const styles = StyleSheet.create({

    taskItem: { //stylesheet tehtäville, kun ne on lisätty listaan
        backgroundColor: 'white',
        padding: 10,
        margin: 8,
        borderRadius: 4,
        
      },
      taskText: { //tehtävien fontti
        fontSize: 15,
      }
      

})