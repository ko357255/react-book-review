import { useDispatch } from 'react-redux';
import './App.css';
import Router from '@/routes/Router';
import { useEffect } from 'react';
import { fetchUser, setTokenFromLocalStorage } from './store/auth';
import { useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/index';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  // ローカルストレージを元にログイン状態をstoreに読み込む
  useEffect(() => {
    dispatch(setTokenFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [token, dispatch]);

  return (
    <div className="app d-flex">
      <Router />
    </div>
  );
}

export default App;
