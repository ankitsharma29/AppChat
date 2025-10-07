import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const token = await userCredential.user.getIdToken();
      await AsyncStorage.setItem('token', token);
      navigation.replace('Home');
    } catch (err) {
      Alert.alert('Login Failed', err.message);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{borderWidth: 1, marginBottom: 10, padding: 8}}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{borderWidth: 1, marginBottom: 10, padding: 8}}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}
