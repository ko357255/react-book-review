import BookList from '@/components/BookList';
import PaginationButton from '@/components/PaginationButton';
import { useState } from 'react';

const Reviews = () => {
  const [offset, setOffset] = useState(0);

  return (
    <div className="reviews">
      <title>書籍レビュー | 一覧</title>
      <meta
        name="description"
        content="書籍レビューサイトのレビュー一覧ページです。"
      />

      <h2 className="mb-3">書籍レビュー一覧</h2>
      <BookList offset={offset} />
      <PaginationButton
        prevOnClick={() => setOffset((prev) => prev - 10)}
        nextOnClick={() => setOffset((prev) => prev + 10)}
        prevDisabled={offset <= 0}
      />
    </div>
  );
};

export default Reviews;
