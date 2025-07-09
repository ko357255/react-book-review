import type { BookData } from '@/api/book';
import styled from '@emotion/styled';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DetailButtonStyle = styled(Card.Link)`
  min-width: 70px;
`;

const BookItem = ({ book }: { book: BookData }) => {
  return (
    <Card className="mb-3 bg-light" style={{ borderWidth: '1.5px' }}>
      <Card.Body className="d-flex ">
        <div className="flex-grow-1 pe-3">
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>{book.detail}</Card.Text>
        </div>
        <DetailButtonStyle
          className="btn btn-outline-dark d-flex align-items-center justify-content-center"
          as={Link}
          to={`/detail/${book.id}`}
        >
          詳細
        </DetailButtonStyle>
      </Card.Body>
    </Card>
  );
};

export default BookItem;
