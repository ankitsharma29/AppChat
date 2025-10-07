import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addTask } from '../../services/taskService';
import colors from '../../utils/colors';


const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a task title.');
      return;
    }
    try {
      await addTask({ title, description, completed: false });
      Alert.alert('Success', 'Task added successfully!');
      setTitle('');
      setDescription('');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding task:', error);
      Alert.alert('Error', 'Failed to add task.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.multiline]}
        multiline
      />
      <Button title="Add Task" onPress={handleAddTask} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default AddTaskScreen;
