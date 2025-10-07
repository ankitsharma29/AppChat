import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, database } from '../../firebase/firebaseConfig';
import { ref, set } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return Alert.alert('Error', 'Please fill all fields.');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update Firebase Auth profile with displayName
      await updateProfile(userCredential.user, { displayName: name });

      // Save additional info in Realtime Database
      const userRef = ref(database, `users/${userCredential.user.uid}`);
      await set(userRef, { name, email });

      // Save token for session persistence
      const token = await userCredential.user.getIdToken();
      await AsyncStorage.setItem('token', token);

      navigation.replace('Tasks'); // Redirect to home screen
    } catch (err) {
      // Alert.alert('Signup Failed', err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <LinearGradient
          colors={['#4cd137', '#4876ff']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.orText}>Already have an account?</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#f5f6fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2f3640',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: '600',
    color: '#555',
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#4876ff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginText: {
    color: '#4876ff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
