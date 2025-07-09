import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormField from '@/components/FormField';
import { bookCreate } from '@/api/book';

interface ReviewFormData {
  title: string;
  url: string;
  detail: string;
  review: string;
}

const NewReviewForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ReviewFormData>({
    mode: 'all',
  });

  const navigate = useNavigate();

  const onSubmit = async ({ title, url, detail, review }: ReviewFormData) => {
    setFormError(null);
    setIsLoading(true);

    try {
      const newReview = await bookCreate({ title, url, detail, review });
      alert(`レビューを投稿しました ${newReview.title}`);

      navigate('/reviews');
    } catch (e: unknown) {
      if (e instanceof Error) {
        setFormError(e.message);
      } else {
        setFormError('予期せぬエラーが発生しました');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label="書籍タイトル"
        id="title"
        type="text"
        registerProps={register('title', {
          required: '書籍タイトルを入力してください',
        })}
        error={errors.title?.message}
        isTouched={touchedFields.title}
      />

      <FormField
        label="書籍情報参照URL"
        id="url"
        type="text"
        registerProps={register('url', {
          required: '書籍情報参照URLを入力してください',
        })}
        error={errors.url?.message}
        isTouched={touchedFields.url}
      />

      <FormField
        label="書籍詳細情報"
        id="detail"
        type="text"
        registerProps={register('detail', {
          required: '書籍詳細情報を入力してください',
        })}
        error={errors.detail?.message}
        isTouched={touchedFields.detail}
      />

      <FormField
        label="感想"
        id="review"
        type="text"
        registerProps={register('review', {
          required: '感想を入力してください',
        })}
        error={errors.review?.message}
        isTouched={touchedFields.review}
      />

      <Button
        variant="primary"
        type="submit"
        className="mb-3"
        disabled={isLoading}
      >
        投稿
      </Button>

      {/* フォームエラー */}
      {formError && <div className="text-danger">{formError}</div>}
    </Form>
  );
};

export default NewReviewForm;
