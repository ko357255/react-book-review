import { Alert, Button, Form } from 'react-bootstrap';
import { useState, type FormEvent } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

  const validate = (email: string, password: string) => {
    const errors: string[] = [];

    if (email.length === 0) {
      errors.push('メールアドレスを入力してください');
    }
    if (password.length === 0) {
      errors.push('パスワードを入力してください');
    }

    if (errors.length > 0) {
      setErrors(errors);
      return false;
    }

    return { email, password };
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const isValid = validate(email, password);
    if (!isValid) return;

    alert(`Email: ${email}, Pass: ${password}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* メールアドレス */}
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      {/* パスワード */}
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      {/* エラーメッセージ */}
      {errors.length > 0 && (
        <Alert variant="danger" className="py-2 px-3">
          {errors.map((msg, i) => (
            <div key={i}>{msg}</div>
          ))}
        </Alert>
      )}

      {/* ログインボタン */}
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
