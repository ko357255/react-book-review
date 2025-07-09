import { bookGet, type BookData } from '@/api/book';
import { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';

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
          <Card className="mb-3 bg-light" style={{ borderWidth: '1.5px' }}>
            <Card.Body>
              <Card.Title className="fw-bold fs-4 mb-2">
                {book.title}
              </Card.Title>
              <Container>
                {/* URL */}
                <Row className="py-2 border-bottom">
                  <Col xs={3} className="text-end fw-semibold">
                    URL
                  </Col>
                  <Col xs={9}>
                    <Card.Link
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {book.url}
                    </Card.Link>
                  </Col>
                </Row>

                {/* 詳細 */}
                <Row className="py-2 border-bottom">
                  <Col xs={3} className="text-end fw-semibold">
                    詳細
                  </Col>
                  <Col xs={9}>
                    <Card.Text>{book.detail}</Card.Text>
                  </Col>
                </Row>

                {/* レビュー */}
                <Row className="py-2 border-bottom">
                  <Col xs={3} className="text-end fw-semibold">
                    レビュー
                  </Col>
                  <Col xs={9}>
                    <Card.Text>{book.review}</Card.Text>
                  </Col>
                </Row>

                {/* レビュアー */}
                <Row className="py-2">
                  <Col xs={3} className="text-end fw-semibold">
                    レビュアー
                  </Col>
                  <Col xs={9}>
                    <Card.Text>{book.reviewer}</Card.Text>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default BookDetail;
