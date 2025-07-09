import type { BookData } from '@/api/book';
import { selectBookLog } from '@/api/log';
import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const BookItem = ({ book }: { book: BookData }) => {
  const navigate = useNavigate();

  const handleClick = async (id: string) => {
    try {
      await selectBookLog({ selectBookId: id });
      navigate(`/detail/${id}`);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else {
        throw new Error('予期せぬエラーが発生しました');
      }
    }
  };

  return (
    <Card className="mb-3 bg-light" style={{ borderWidth: '1.5px' }}>
      <Card.Body className="d-flex ">
        <div className="flex-grow-1 pe-3">
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>{book.detail}</Card.Text>
        </div>
        <div
          className="btn btn-outline-dark d-flex align-items-center justify-content-center"
          onClick={() => handleClick(book.id)}
        >
          詳細
        </div>
        {book.isMine && (
          <Card.Link
            as={Link}
            to={`/edit/${book.id}`}
            className="btn btn-primary d-flex align-items-center justify-content-center ms-2"
          >
            編集
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookItem;
