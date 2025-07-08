import { useDispatch } from 'react-redux';
import './App.css';
import Router from '@/routes/Router';
import { useEffect } from 'react';
import { fetchUser, setTokenFromLocalStorage } from './store/auth';
import type { AppDispatch } from '@/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  // ローカルストレージを元にログイン状態をstoreに読み込む
  useEffect(() => {
    dispatch(setTokenFromLocalStorage());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="app d-flex">
      <Router />
    </div>
  );
}

export default App;
