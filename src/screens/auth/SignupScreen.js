import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, database } from '../../firebase/firebaseConfig';
import { ref, set } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!name.trim()) {
      return Alert.alert('Error', 'Please enter your name.');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update Firebase Auth profile with displayName
      await updateProfile(userCredential.user, { displayName: name });

      // Optional: save additional user info in Realtime Database
      const userRef = ref(database, `users/${userCredential.user.uid}`);
      await set(userRef, {
        name,
        email,
      });

      // Save token for session persistence
      const token = await userCredential.user.getIdToken();
      await AsyncStorage.setItem('token', token);

      navigation.replace('Tasks'); // Redirect to home screen
    } catch (err) {
      Alert.alert('Signup Failed', err.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 8 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 8 }}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}
