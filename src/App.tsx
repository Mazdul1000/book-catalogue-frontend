import { useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import { useAppDispatch } from './redux/hook';
import { getUserData, loginUser, setLoading, setUser } from './redux/features/user/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true))
  },[])

  onAuthStateChanged(auth, (user) => {
    
    if(user){
      dispatch(getUserData(user.uid));
      dispatch(setLoading(false));
    }else{
      dispatch(setLoading(false));
    }
  })
  return (
    <div>
      <MainLayout />
    </div>
  )
}

export default App
