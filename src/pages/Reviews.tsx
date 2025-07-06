import { useEffect, useState } from 'react';
import { bookGet, type BookData } from '@/api/book';
import { Spinner } from 'react-bootstrap';
import BookItem from '@/components/BookItem';

const Reviews = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setError(null);
      setIsLoading(true);

      try {
        const books = await bookGet(0);
        setBooks(books);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('予期せぬエラーが発生しました');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="books">
      <h2>本一覧</h2>
      {isLoading && (
        <Spinner animation="border" variant="secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {error && <p className="text-danger">{error}</p>}
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default Reviews;
