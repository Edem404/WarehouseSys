import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f6f9;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const MainContent = styled.div`
  padding-top: 80px; /* Space for fixed header (70px header + 10px buffer) */
  padding-left: 2rem;
  padding-right: 2rem;
  min-height: 100vh;
  box-sizing: border-box;
`;

export const WelcomeMessage = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-top: 20px;
  text-align: center;
  color: #34495e;

  h1 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }

  p {
    color: #7f8c8d;
    font-size: 1.1rem;
  }
`;