// import { useEffect, useState } from 'react';
import { bookListGet } from '@/api/book';
import { Spinner } from 'react-bootstrap';
import BookItem from '@/components/BookItem';
import { useQuery } from '@tanstack/react-query';

const BookList = ({ offset }: { offset: number }) => {
  const {
    data: books,
    isLoading,
    isError,
    error, // エラー時は３回再試行を行った後、エラーが入る
  } = useQuery({
    // 異なるキャッシュかどうかを判別するための値
    queryKey: ['books', offset],
    // データを渡す関数
    queryFn: () => bookListGet(offset),
    // キャッシュの有効期限
    staleTime: 1000 * 30,
  });

  return (
    <div className="book-list">
      {isLoading && (
        <Spinner animation="border" variant="secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {isError && <p className="text-danger">{error.message}</p>}
      {books && books.map((book) => <BookItem key={book.id} book={book} />)}
    </div>
  );
};

export default BookList;
