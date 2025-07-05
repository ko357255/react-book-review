import TestItem from '@/components/TestItem';
import type { RootState } from '@/store';
import { add, remove, set } from '@/store/test';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Home = () => {
  // testの値
  const value = useSelector((state: RootState) => state.test.value);

  const dispatch = useDispatch();

  return (
    <div className="home">
      <h2>ホーム</h2>
      <p>test: {value}</p>
      <button onClick={() => dispatch(add())}>add</button>
      <button onClick={() => dispatch(remove())}>remove</button>
      <button onClick={() => dispatch(set(0))}>set</button>
      <TestItem />
    </div>
  );
};

export default Home;
