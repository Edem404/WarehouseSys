import styled from "styled-components";

export const ProductsContainer = styled.div`
  margin-top: 20px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const SearchInput = styled.input`
  padding: 10px 15px;
  width: 280px;
  border-radius: 6px;
  border: 1px solid #bdc3c7;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #2980b9;
  }
`;

export const AddButton = styled.button`
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const ProductsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;

  th {
    background-color: #ecf0f1;
    text-align: left;
    padding: 12px;
    color: #2c3e50;
    border-bottom: 2px solid #bdc3c7;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #ecf0f1;
    color: #34495e;
  }

  tr:hover {
    background-color: #f7f9fa;
  }
`;

export const EmptyMessage = styled.div`
  padding: 40px 0;
  text-align: center;
  color: #7f8c8d;
  font-size: 18px;
`;

export const ActionButton = styled.button`
  border: none;
  /* Якщо передано проп $delete - червоний, інакше - синій (за замовчуванням) */
  background-color: ${props => props.$delete ? "#e74c3c" : "#3498db"};
  padding: 7px 14px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  margin-right: 8px;
  transition: 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    transform: scale(0.96);
  }
`;

// === СТИЛІ ДЛЯ МОДАЛЬНИХ ВІКОН ===

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ModalTitle = styled.h3`
  margin-top: 0;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
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
  border: 1px solid #555;
  border-radius: 5px;
  font-size: 16px;
  
  background-color: #3e3e3e;
  color: #ecf0f1;

  &::placeholder {
    color: #95a5a6;
  }

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #555;
  border-radius: 5px;
  font-size: 16px;
  
  background-color: #3e3e3e;
  color: #ecf0f1;
  
  option {
    background-color: #3e3e3e;
    color: #ecf0f1;
  }

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
  font-weight: bold;
  &:hover { background-color: #7f8c8d; }
`;

export const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  &:hover { background-color: #2980b9; }
`;

// === НОВИЙ СТИЛЬ (Додано для відображення залишків у транзакціях) ===
export const StockInfo = styled.p`
  color: #7f8c8d;
  margin-bottom: 15px;
  font-size: 15px;
  text-align: center;

  b {
    color: #2c3e50;
    font-weight: 600;
  }
`;