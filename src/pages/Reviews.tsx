import BookList from '@/components/BookList';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const Reviews = () => {
  const [offset, setOffset] = useState(0);

  return (
    <div className="reviews">
      <BookList offset={offset} />
      <div className="d-flex justify-content-center">
        <Button variant="primary" onClick={() => setOffset(offset + 10)}>
          →
        </Button>
        {offset > 0 && (
          <Button variant="secondary" onClick={() => setOffset(offset - 10)}>
            ←
          </Button>
        )}
      </div>
    </div>
  );
};

export default Reviews;
