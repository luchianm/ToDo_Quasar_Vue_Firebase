import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
// firebase keygit
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db
}
