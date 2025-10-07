import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ChatMessage({message, currentUserId}) {
  const isMine = message.senderId === currentUserId;
  return (
    <View style={[styles.container, isMine ? styles.myMsg : styles.otherMsg]}>
      <Text style={{color: 'black', textAlign: 'right'}}>
        {message.name ?? ''}
      </Text>
      <Text style={{color: 'black', textAlign: 'left'}}>
        {message.message}
      </Text>
      {message.timestamp && (
        <Text style={styles.time}>
          {message.timestamp
            .toDate()
            .toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 8, marginVertical: 4, borderRadius: 8, maxWidth: '80%'},
  myMsg: {backgroundColor: '#2a9d8f', alignSelf: 'flex-end', color: '#fff'},
  otherMsg: {backgroundColor: '#e5e5e5', alignSelf: 'flex-start'},
  time: {fontSize: 10, color: '#555', marginTop: 2, alignSelf: 'flex-end'},
});
