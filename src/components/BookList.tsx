import { useEffect, useState } from 'react';
import { bookGet, type BookData } from '@/api/book';
import { Spinner } from 'react-bootstrap';
import BookItem from '@/components/BookItem';
import { useQuery } from '@tanstack/react-query';

const BookList = ({ offset }: { offset: number }) => {
  // const [books, setBooks] = useState<BookData[]>([]);
  // const [error, setError] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(false);

  const { data: books, isLoading, isError, error } = useQuery({
    queryKey: ['books', offset],
    queryFn: () => bookGet(offset),
    staleTime: 1000 * 60 * 1,
  });


  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     setError(null);
  //     setIsLoading(true);

  //     try {
  //       const books = await bookGet(offset);
  //       setBooks(books);
  //     } catch (e) {
  //       if (e instanceof Error) {
  //         setError(e.message);
  //       } else {
  //         setError('予期せぬエラーが発生しました');
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchBooks();
  // }, [offset]);

  return (
    <div className="book-list">
      {isLoading && (
        <Spinner animation="border" variant="secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {isError && <p className="text-danger">{error.message}</p>}
      {books && books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
