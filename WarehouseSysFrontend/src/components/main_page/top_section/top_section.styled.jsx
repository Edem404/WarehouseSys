import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #2c3e50; /* Same dark color as Login Header */
  color: white;
  padding: 0 2rem;
  height: 70px; /* Fixed height for the top bar */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed; /* Fix to top */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

export const Logo = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ecf0f1;
  margin: 0;
  cursor: pointer;
  
  &:hover {
    color: #ffffff;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px; /* Space between buttons */
  align-items: center;
`;

export const NavButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.$isAdmin ? '#e74c3c' : '#007bff'}; /* Red for Admin, Blue for Base */
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;

  &:hover {
    background-color: ${props => props.$isAdmin ? '#c0392b' : '#0056b3'};
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

export const UserInfo = styled.div`
  font-size: 0.9rem;
  color: #bdc3c7;
  margin-right: 20px;
`;