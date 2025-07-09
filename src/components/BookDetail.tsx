import { bookGet, type BookData } from '@/api/book';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Card, Spinner, Table } from 'react-bootstrap';

const ThStyle = styled.th`
  width: 90px;
`;

const BookDetail = ({ bookId }: { bookId: string }) => {
  const [book, setBook] = useState<BookData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const book = await bookGet({ id: bookId });
        setBook(book);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('予期せぬエラーが発生しました');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  return (
    <>
      {isLoading && <Spinner />}
      {error && <p className="text-danger">{error}</p>}
      {book && (
        <>
          <Card className="mb-3 bg-light">
            <Card.Body>
              <Card.Title className="fw-bold fs-4 mb-2">
                {book.title}
              </Card.Title>

              <Table borderless responsive className="mb-0" variant="light">
                <tbody>
                  <tr className="py-2 border-bottom">
                    <ThStyle className="text-end align-top">URL</ThStyle>
                    <td>
                      <Card.Link
                        href={book.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {book.url}
                      </Card.Link>
                    </td>
                  </tr>
                  <tr className="py-2 border-bottom">
                    <ThStyle className="text-end align-top">詳細</ThStyle>
                    <td>{book.detail}</td>
                  </tr>
                  <tr className="py-2 border-bottom">
                    <ThStyle className="text-end align-top">レビュー</ThStyle>
                    <td>{book.review}</td>
                  </tr>
                  <tr>
                    <ThStyle className="text-end align-top">レビュアー</ThStyle>
                    <td>{book.reviewer}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default BookDetail;
