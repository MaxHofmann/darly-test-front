import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../redux/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';

import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const feachFc = async () => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    });
    // console.log('Document written with ID: ', docRef.id);

    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

feachFc();

const HomePage = () => {
  const dispatch = useAppDispatch();

  const { isAuth, email } = useAuth();

  return isAuth ? (
    <div>
      <h1>Welcome</h1>

      <button onClick={() => dispatch(removeUser())}>Log out from {email}</button>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default HomePage;
