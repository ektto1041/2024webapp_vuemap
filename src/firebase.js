import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: 'karpedia-dev.firebaseapp.com',
  projectId: 'karpedia-dev',
  storageBucket: 'karpedia-dev.appspot.com',
  messagingSenderId: '1093645881039',
  appId: '1:1093645881039:web:5882301b038488da0b31ba',
  measurementId: 'G-SKWMGJEFP9',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const getData = async () => {
  const newData = [];

  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach(doc => {
    newData.push({
      name: doc.id,
      lat: doc.data().lat,
      lng: doc.data().lng,
      addr: doc.data().addr,
    });
  });

  return newData;
};

const setData = async (name, newData) => {
  await setDoc(doc(db, 'users', name), newData);
};

export { getData, setData };
