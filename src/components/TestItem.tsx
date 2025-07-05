import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { type RootState } from '@/store';

const TestItem = () => {
  const value = useSelector((state: RootState) => state.test.value);
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>state</Card.Title>
        <Card.Text>{value}</Card.Text>
        <Card.Text>{token ?? 'トークンなし'}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TestItem;
