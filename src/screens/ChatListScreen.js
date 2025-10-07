import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {createChatRoom, getChatRooms} from '../services/chatService';

export default function ChatListScreen({navigation}) {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState('');

  useEffect(() => {
    const unsubscribe = getChatRooms(setRooms);
    return unsubscribe;
  }, []);

  const handleCreateRoom = async () => {
    if (newRoom.trim()) {
      await createChatRoom(newRoom);
      setNewRoom('');
    }
  };

  const renderRoom = ({item}) => (
    <TouchableOpacity
      style={styles.roomCard}
      onPress={() =>
        navigation.navigate('ChatRoom', {
          roomId: item.roomId,
          roomName: item.roomName,
          userId: 'user1',
        })
      }>
      <Text style={styles.roomName}>{item.roomName}</Text>
      <Text style={styles.subText}>Tap to open chat</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat Rooms</Text>
      <FlatList
        data={rooms}
        keyExtractor={item => item.roomId}
        renderItem={renderRoom}
        ListEmptyComponent={
          <Text style={styles.empty}>No chat rooms yet.</Text>
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter room name"
          value={newRoom}
          onChangeText={setNewRoom}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleCreateRoom}>
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 15, backgroundColor: '#fff'},
  header: {fontSize: 22, fontWeight: 'bold', marginBottom: 10},
  roomCard: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
  },
  roomName: {fontSize: 18, fontWeight: '600'},
  subText: {fontSize: 13, color: 'gray'},
  inputContainer: {
    flexDirection: 'row',
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#2a9d8f',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addText: {color: '#fff', fontWeight: 'bold'},
  empty: {textAlign: 'center', color: 'gray', marginTop: 30},
});
