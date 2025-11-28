// login_page.styled.jsx
import styled from 'styled-components';

// Main container to center everything
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Центрує вертикально */
  align-items: center;     /* <--- ЦЕЙ РЯДОК ЦЕНТРУЄ ГОРИЗОНТАЛЬНО */
  min-height: 100vh;       /* Висота на весь екран */
  width: 100vw;            /* Ширина на весь екран */
  background-color: #f0f2f5;
  box-sizing: border-box;
  padding: 20px;
`;

// Card for the login form
export const LoginCard = styled.div`
  background: white;
  padding: 2.5rem; // Більше відступів
  border-radius: 12px; // Більше заокруглення
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); // М'якша тінь
  width: 100%;
  max-width: 420px; // Трохи ширше
  display: flex;
  flex-direction: column; // Вертикальна форма
  gap: 2rem; // Відступ між заголовком і формою
`;

// Title
export const Title = styled.h2`
  text-align: center;
  color: #1a1a1a;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
`;

// Form
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem; // Відступ між полями
`;

// Input field
export const Input = styled.input`
  /* Include padding and border in the element's total width and height */
  box-sizing: border-box; 

  padding: 14px 16px;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

// Button
export const Button = styled.button`
  /* Include padding and border in the element's total width and height */
  box-sizing: border-box;

  padding: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Error message
export const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 14px;
  text-align: center;
  margin-top: -1rem;
  margin-bottom: 1rem;
`;