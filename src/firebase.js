import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: 'vuemap-3ec88.firebaseapp.com',
  projectId: 'vuemap-3ec88',
  storageBucket: 'vuemap-3ec88.appspot.com',
  messagingSenderId: '350714389250',
  appId: '1:350714389250:web:2459440a96ee605805981b',
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
