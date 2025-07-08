import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormField from '@/components/FormField';
import { signin } from '@/api/user';
import { useDispatch } from 'react-redux';
import { fetchUser, setToken } from '@/store/auth';
import type { AppDispatch } from '@/store';
import { useSelector } from 'react-redux';
import { type RootState } from '@/store';

interface ProfileEditFormData {
  email: string;
  password: string;
}

const ProfileEditForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ProfileEditFormData>({
    mode: 'all',
    defaultValues: {

    },
  });

  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();
  const dispath = useDispatch<AppDispatch>();

  const onSubmit = async ({ email, password }: ProfileEditFormData) => {
    setFormError(null);
    setIsLoading(true);

    try {
      const { token } = await signin({ email, password });

      // トークンをストアとローカルストレージにセット
      dispath(setToken(token));
      dispath(fetchUser());

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
      {/* メールアドレス */}
      <FormField
        label="メールアドレス"
        id="email"
        type="email"
        placeholder="example@email.com"
        registerProps={register('email', {
          required: 'メールアドレスを入力してください',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: '有効なメールアドレスを入力してください',
          },
        })}
        error={errors.email?.message}
        isTouched={touchedFields.email}
      />

      {/* パスワード */}
      <FormField
        label="パスワード"
        id="password"
        type="password"
        registerProps={register('password', {
          required: 'パスワードを入力してください',
        })}
        error={errors.password?.message}
        isTouched={touchedFields.password}
      />

      {/* ログインボタン */}
      <Button
        variant="primary"
        type="submit"
        className="mb-3"
        disabled={isLoading}
      >
        ログイン
      </Button>

      {/* フォームエラー */}
      {formError && <div className="text-danger">{formError}</div>}
    </Form>
  );
};

export default ProfileEditForm;
