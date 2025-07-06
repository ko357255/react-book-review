import { useEffect, useState } from 'react';
import { bookGet, type BookData } from '@/api/book';
import { Spinner } from 'react-bootstrap';
import BookItem from '@/components/BookItem';

const BookList = ({ offset }: { offset: number }) => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setError(null);
      setIsLoading(true);

      try {
        const books = await bookGet(offset);
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
  }, [offset]);

  return (
    <div className="book-list">
      <h2>書籍レビュー一覧</h2>
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

export default BookList;
