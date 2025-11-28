import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopSection from './../border_part/top/top_section';
import BottomSection from '../border_part/bottom/bottom_section';
import { 
  PageContainer, 
  LoginCard, 
  Title, 
  Form, 
  Input, 
  Button, 
  ErrorMessage 
} from './login_page.styled';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      // Запит до backend C++
      const response = await fetch('http://localhost:8080/employee_accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);

        // *** ГОЛОВНЕ: зберігаємо employeeId ***
        if (!data.employee_id) {
          throw new Error("Backend did not return employee_id.");
        }

        localStorage.setItem('employeeId', data.employee_id);

        // Переадресація
        navigate('/main');
      } else {
        setError(data.message || 'Invalid credentials');
      }

    } catch (err) {
      console.error("Fetch error:", err);
      setError('Server is not responding. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <TopSection />

      <LoginCard>
        <Title>Welcome Back</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <Input 
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <Input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Login'}
          </Button>
        </Form>
      </LoginCard>

      <BottomSection />
    </PageContainer>
  );
};

export default LoginPage;
