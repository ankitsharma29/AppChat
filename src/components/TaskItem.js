import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {auth} from '../firebase/firebaseConfig';

export default function TaskItem({task, onComplete, onDelete, navigation}) {

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatRoom', {
          roomId: task.id,
          roomName: task.title,
          userId: auth.currentUser?.uid ?? 'user1',
        })
      }>
      <View style={styles.card}>
        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.title}
        </Text>
        <Text>{task.description}</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={onComplete}>
            <Text style={styles.btn}>
              {task.completed ? '✅ Completed' : '⬜ Mark Done'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.btn}>🗑 Delete</Text>
          </TouchableOpacity>
        </View>
        <Text style={{color: '#007AFF'}}>💬 Chat</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {fontSize: 16, fontWeight: '600'},
  completed: {textDecorationLine: 'line-through', color: 'gray'},
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
    gap: 15, // or use marginRight on buttons if gap not supported
  },
  btn: {color: '#007AFF', fontWeight: 'bold'},
});
