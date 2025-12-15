// admin_page.styled.js
import styled from 'styled-components';

// Container for the whole page
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f2f5; // Slightly different shade or same as base
`;

// Wrapper for the main content (below header)
export const MainContent = styled.main`
  flex: 1;
  padding: 40px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

// Title for sections
export const SectionTitle = styled.h2`
  font-size: 24px;
  color: #2c3e50; // Maybe darker for admin
  margin-bottom: 20px;
  border-bottom: 2px solid #e74c3c; // Red accent for Admin context
  padding-bottom: 10px;
`;

// Card component for content blocks
export const ContentCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
`;

// --- Re-exporting Header styles if they are shared, or defining new ones ---
// Assuming you want to reuse header styles from base_page.styled, 
// strictly speaking you should import them inside the component, 
// but here are definitions if you need a standalone file.

export const HeaderContainer = styled.header`
  background-color: #2c3e50; // Darker theme for Admin
  color: white;
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: #ecf0f1;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const UserInfo = styled.span`
  margin-right: 15px;
  color: #bdc3c7;
  font-size: 14px;
`;

// Button component adapted for props
export const NavButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  // Conditional styling based on props
  background-color: ${props => props.$isLogout ? '#95a5a6' : '#3498db'};
  color: white;

  &:hover {
    background-color: ${props => props.$isLogout ? '#7f8c8d' : '#2980b9'};
    transform: translateY(-1px);
  }
`;

// Burger Menu Styles
export const BurgerWrapper = styled.div`
  display: none; 
  cursor: pointer;
  font-size: 24px;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export const BurgerMenu = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: #34495e;
  display: flex;
  flex-direction: column;
  z-index: 100;
`;

export const BurgerMenuItem = styled.div`
  padding: 15px 20px;
  color: white;
  border-bottom: 1px solid #2c3e50;
  cursor: pointer;
  &:hover {
    background-color: #2c3e50;
  }
`;

export const ActionButton = styled.button`
  background-color: #27ae60;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
  font-weight: bold;

  &:hover {
    background-color: #219150;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent black
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // Ensure it sits on top of everything
`;

export const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ModalTitle = styled.h3`
  margin-top: 0;
  color: #2c3e50;
  text-align: center;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #7f8c8d;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const CancelButton = styled.button`
  background-color: #95a5a6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #7f8c8d;
  }
`;

export const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 16px;
  
  // Styling to match the dark inputs in your screenshot
  background-color: #3e3e3e; 
  color: #ecf0f1; 

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 15px; // Відступ між кнопками
  margin-top: 15px;
  flex-wrap: wrap; 
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const StatHeader = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  color: #2c3e50; /* Темно-синій, добре видно на білому */
  font-weight: 600;
  border-bottom: 1px solid #ecf0f1;
  padding-bottom: 10px;
`;

export const StatBigNumber = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  color: #34495e; /* Темний колір для цифр */
  margin: 15px 0;
`;

export const StatLabel = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d; /* Сірий для пояснень */
  margin: 0;
`;

export const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #27ae60; /* Зелений */
  margin: 15px 0;
`;