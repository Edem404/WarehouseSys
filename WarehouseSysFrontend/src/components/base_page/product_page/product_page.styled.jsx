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
