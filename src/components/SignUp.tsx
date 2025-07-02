import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
  } = useForm<SignUpFormData>({
    mode: 'all',
  });

  // フォーム送信時の処理
  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
  };

  // パスワードの入力を監視
  const password = watch('password');

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {/* メールアドレス */}
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>メールアドレス</Form.Label>
        <Form.Control
          required
          id="email"
          type="email"
          placeholder="example@email.com"
          {...register('email', {
            required: 'メールアドレスを入力してください',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: '有効なメールアドレスを入力してください',
            },
          })}
          // エラースタイル
          isInvalid={Boolean(errors.email)} // !!errors.emailでも可
          isValid={touchedFields.email && Boolean(!errors.email?.message)}
        />
        {/* エラーメッセージ */}
        <Form.Control.Feedback type="invalid">
          {errors.email && errors.email.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* パスワード */}
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>パスワード</Form.Label>
        <Form.Control
          id="password"
          type="password"
          {...register('password', {
            required: 'パスワードを入力してください',
          })}
          isInvalid={Boolean(errors.password)}
          isValid={touchedFields.password && Boolean(!errors.password?.message)}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password && errors.password.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* 再確認パスワード */}
      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>パスワード(再確認)</Form.Label>
        <Form.Control
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', {
            required: 'パスワード(再確認)を入力してください',
            validate: (
              value, // カスタムバリデーション
            ) => value === password || 'パスワードが一致しません',
          })}
          isInvalid={Boolean(errors.confirmPassword)}
          isValid={
            touchedFields.confirmPassword &&
            Boolean(!errors.confirmPassword?.message)
          }
        />
        <Form.Control.Feedback type="invalid">
          {errors.confirmPassword && errors.confirmPassword.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* サインアップボタン */}
      <Button variant="primary" type="submit">
        新規登録
      </Button>
    </Form>
  );
};

export default SignUpForm;
