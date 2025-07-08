import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { type RootState } from '@/store';

const StatePreview = () => {
  const value = useSelector((state: RootState) => state.test.value);
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>state</Card.Title>
          <Card.Text>value: {value}</Card.Text>
          <Card.Text>token: {token ?? 'トークンなし'}</Card.Text>
          <Card.Text>user: {JSON.stringify(user) ?? 'ユーザー無し'}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default StatePreview;
