// login_page.jsx
import React, { useState } from 'react';
import TopSection from './../border_part/top/top_section'; // Імпорт
import BottomSection from '../border_part/bottom/bottom_section'; // Імпорт
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      // Імітація запиту до API
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Login successful with:', { email, password });
      alert('Login successful!'); 
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <TopSection /> {/* Верхня секція */}

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

      <BottomSection /> {/* Нижня секція */}
    </PageContainer>
  );
};

export default LoginPage;