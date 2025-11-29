import styled from 'styled-components';

// --- Page Layout ---

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f6f9;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const MainContent = styled.div`
  padding-top: 90px; /* Space for fixed header */
  padding-left: 2rem;
  padding-right: 2rem;
  box-sizing: border-box;
`;

export const SectionTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 24px;
`;

export const ContentCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 20px;
  
  h3 {
    margin-top: 0;
    color: #34495e;
  }
  
  p {
    color: #7f8c8d;
  }
`;


// --- Header Styles ---

export const HeaderContainer = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 0 2rem;
  height: 70px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-sizing: border-box;
`;

export const Logo = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ecf0f1;
  margin: 0;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  margin-left: auto;
`;

export const UserInfo = styled.div`
  font-size: 0.9rem;
  color: #bdc3c7;
  margin-right: 20px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavButton = styled.button`
  padding: 10px 20px;

  background-color: ${props => {
    if (props.$isAdmin) return '#e74c3c';   // Red for Admin
    if (props.$isBack) return '#34495e';    // Dark Blue/Grey
    if (props.$isLogout) return '#7f8c8d';  // Grey
    return '#007bff';                       // Default Blue
  }};
  
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  white-space: nowrap;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    transform: scale(0.95);
  }
`;


// --- Burger Menu Styles ---

export const BurgerWrapper = styled.div`
  font-size: 28px;
  cursor: pointer;
  user-select: none;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

export const BurgerMenu = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  width: 240px;
  padding: 15px;
  background-color: #2c3e50;
  border-right: 2px solid #1f2a34;
  box-shadow: 3px 0 6px rgba(0,0,0,0.3);
  z-index: 1200;
`;

export const BurgerMenuItem = styled.div`
  padding: 12px 5px;
  font-size: 16px;
  color: #ecf0f1;
  border-bottom: 1px solid #3c4b57;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3c4b57;
  }
`;
