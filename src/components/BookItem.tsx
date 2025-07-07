import type { BookData } from '@/api/book';
import { Card } from 'react-bootstrap';

const BookItem = ({ book }: { book: BookData }) => {
  return (
    <Card className="mb-3 bg-light" style={{borderWidth: '1.5px'}}>
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.detail}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BookItem;
