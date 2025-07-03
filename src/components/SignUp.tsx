// import { UserCreate } from '@/api/api';
import { useEffect, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  icon: FileList;
}

const SignUpForm = () => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
    watch,
  } = useForm<SignUpFormData>({
    mode: 'all',
  });

  // フォーム送信時の処理
  const onSubmit = ({ name, email, password, icon }: SignUpFormData) => {
    console.log(name,email,password,icon);
    // const signUp = async () => {
    //   try {
    //     const taken = await UserCreate({name, email, password});
        
    //   } catch(e) {

    //   }
    // };
  };

  // 入力を監視
  const password = watch('password');
  const icon = watch('icon');

  useEffect(() => {
    if (!icon || icon.length === 0) {
      setIconUrl(null);
      return;
    }

    const render = new FileReader();
    render.onload = () => {
      setIconUrl(render.result as string);
    };
    console.log(icon);
    render.readAsDataURL(icon[0]);
  }, [icon]);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {/* 名前 */}
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>ユーザー名</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder=""
          {...register('name', {
            required: 'ユーザー名を入力してください',
          })}
          // エラースタイル
          isInvalid={Boolean(errors.name)} // !!errors.emailでも可
          isValid={touchedFields.name && Boolean(!errors.name?.message)}
        />
        {/* エラーメッセージ */}
        <Form.Control.Feedback type="invalid">
          {errors.name && errors.name.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* メールアドレス */}
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>メールアドレス</Form.Label>
        <Form.Control
          required
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

      {/* アイコン */}
      <Form.Group className="mb-3" controlId="icon">
        <Form.Label>アイコン</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          {...register('icon', {
            required: 'アイコンを設定してください',
          })}
          isInvalid={Boolean(errors.icon)}
          isValid={dirtyFields.icon && Boolean(!errors.icon?.message)}
        />
        <Form.Control.Feedback type="invalid">
          {errors.icon && errors.icon.message}
        </Form.Control.Feedback>
      </Form.Group>
      {iconUrl && (
        <div className="mb-3">
          <Image
            src={iconUrl}
            width={200}
            height={200}
            rounded
            style={{
              objectFit: 'cover',
              objectPosition: 'cover',
            }}
          />
        </div>
      )}

      {/* サインアップボタン */}
      <Button variant="primary" type="submit">
        新規登録
      </Button>
    </Form>
  );
};

export default SignUpForm;
