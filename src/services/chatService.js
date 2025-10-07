import {auth, db} from '../firebase/firebaseConfig';
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

// Reference to "chats" collection
const chatCollection = collection(db, 'chats');

// Create a new chat room
export const createChatRoom = async roomName => {
  const roomRef = doc(chatCollection); // generates a new doc ID
  await addDoc(chatCollection, {
    roomId: roomRef.id,
    roomName,
    createdAt: serverTimestamp(),
  });
  return roomRef.id;
};

// Get all chat rooms (real-time)
export const getChatRooms = callback => {
  const q = query(chatCollection, orderBy('createdAt', 'desc'));
  const unsubscribe = onSnapshot(q, snapshot => {
    const rooms = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    callback(rooms);
  });
  return unsubscribe;
};

// // Send a message to a specific room
// export const sendMessage = async (roomId, senderId, message) => {
//   const messagesRef = collection(db, 'chats', roomId, 'messages');
//   await addDoc(messagesRef, {
//     senderId,
//     message,
//     timestamp: serverTimestamp(),
//   });
// };

// // Listen for new messages in a room
// export const listenMessages = (roomId, callback) => {
//   const messagesRef = collection(db, 'chats', roomId, 'messages');
//   const q = query(messagesRef, orderBy('timestamp', 'asc'));
//   const unsubscribe = onSnapshot(q, (snapshot) => {
//     const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     callback(messages);
//   });
//   return unsubscribe;
// };

// Send a message in task chat
export const sendMessage = async (taskId, senderId, message) => {
  console.log("auth.currentUser",auth.currentUser);
  
  const messagesRef = collection(db, 'tasks', taskId, 'messages');
  await addDoc(messagesRef, {
    senderId,
    message,
    timestamp: serverTimestamp(),
    name: auth.currentUser.displayName,
  });
};

// Listen for messages in task chat
export const listenMessages = (taskId, callback) => {
  const messagesRef = collection(db, 'tasks', taskId, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'asc'));
  const unsubscribe = onSnapshot(q, snapshot => {
    const messages = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    console.log('messages', messages);
    callback(messages);
  });
  return unsubscribe;
};
