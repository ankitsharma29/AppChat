import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {subscribeTasks, updateTask, deleteTask} from '../services/taskService';
import TaskItem from '../components/TaskItem';

export default function TaskListScreen({navigation}) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeTasks(setTasks); // Use real-time subscription
    return () => unsubscribe(); // cleanup on unmount
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TaskItem
            task={item}
            onComplete={() => updateTask(item.id, {completed: !item.completed})}
            onDelete={() => deleteTask(item.id)}
            navigation={navigation}
          />
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.addText}>+ Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  addButton: {
    backgroundColor: '#2a9d8f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addText: {color: '#fff', fontWeight: 'bold'},
});
