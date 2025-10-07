import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { sendMessage, listenMessages } from '../services/chatService';
import ChatMessage from '../components/ChatMessage';

export default function ChatRoomScreen({ route }) {
  const { roomId, roomName, userId } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = listenMessages(roomId, setMessages);
    return () => unsubscribe();
  }, [roomId]);

  const handleSend = async () => {
    if (!message.trim()) return;
    await sendMessage(roomId, userId, message);
    setMessage('');
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{roomName}</Text>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ChatMessage message={item} currentUserId={userId} />}
        // inverted
      />
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type message..."
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8 }}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
}
