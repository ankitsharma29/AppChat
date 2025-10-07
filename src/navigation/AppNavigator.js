import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, Alert, TouchableOpacity, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {auth} from '../firebase/firebaseConfig';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import AddTaskScreen from '../screens/tasks/AddTaskScreen';
import ChatListScreen from '../screens/chats/ChatListScreen';
import ChatRoomScreen from '../screens/chats/ChatRoomScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import TaskListScreen from '../screens/tasks/TaskListScreen';



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = navigation => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await signOut(auth);
          navigation.replace('Login');
        },
      },
    ]);
  };

  if (initializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Tasks"
              component={TaskListScreen}
              options={({navigation}) => ({
                title: 'Tasks',
                headerRight: () => (
                  <TouchableOpacity
                    style={{marginRight: 10}}
                    onPress={() => handleLogout(navigation)}>
                    <Text style={{color: '#ff3b30', fontWeight: 'bold'}}>
                      Logout
                    </Text>
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
            <Stack.Screen name="ChatList" component={ChatListScreen} />
            <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
