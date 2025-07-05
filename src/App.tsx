import { useDispatch } from 'react-redux';
import './App.css';
import Router from '@/routes/Router';
import { useEffect } from 'react';
import { setTokenFromLocalStorage } from './store/auth';

function App() {
  const dispatch = useDispatch();

  // ローカルストレージを元にログイン状態をstoreに読み込む
  useEffect(() => {
    dispatch(setTokenFromLocalStorage());
  }, [dispatch]);

  return (
    <div className="app d-flex">
      <Router />
    </div>
  );
}

export default App;
