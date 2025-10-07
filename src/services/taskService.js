import {db} from '../firebase/firebaseConfig';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {auth} from '../firebase/firebaseConfig';
const tasksCollection = collection(db, 'tasks');

// Subscribe to tasks in real-time
export const subscribeTasks = callback => {
  const q = query(tasksCollection, orderBy('createdAt', 'desc'));
  const unsubscribe = onSnapshot(q, snapshot => {
    const data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    callback(data);
  });
  return unsubscribe; // call this to stop listening
};

// Add a new task
export const addTask = async ({title, description, completed = false}) => {
  await addDoc(tasksCollection, {
    title,
    description,
    completed,
    createdAt: serverTimestamp(),
    name: auth.currentUser.displayName,
  });
};

// Update a task
export const updateTask = async (id, updates) => {
  const taskDoc = doc(db, 'tasks', id);
  await updateDoc(taskDoc, updates);
};

// Delete a task
export const deleteTask = async id => {
  const taskDoc = doc(db, 'tasks', id);
  await deleteDoc(taskDoc);
};
