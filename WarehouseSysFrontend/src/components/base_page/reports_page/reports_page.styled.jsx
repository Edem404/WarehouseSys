import styled from "styled-components";

export const ReportsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ControlsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap; /* Додаємо перенос, якщо кнопок стане багато */
`;

export const ReportButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #2980b9;
  }
`;

// --- PREVIEW AREA ---

export const ReportPreviewBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

export const PreviewHeader = styled.div`
  background-color: #f8f9fa;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h4 { 
    margin: 0; 
    color: #2c3e50;
  }
`;

export const ClosePreviewButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-weight: bold;
  
  &:hover { text-decoration: underline; }
`;

export const StyledIframe = styled.iframe`
  width: 100%;
  height: 600px;
  border: none;
  background-color: white;
`;

// --- MODAL STYLES ---

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
  gap: 20px;
  color: #2c3e50;
`;

export const ModalTitle = styled.h3`
  margin-top: 0;
  color: #2c3e50;
  text-align: center;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
  background-color: white;
  color: #2c3e50;

  &:focus {
    border-color: #3498db;
    outline: none;
  }

  option {
    color: #2c3e50;
    background: white;
  }
`;

// НОВИЙ КОМПОНЕНТ INPUT (для дат)
export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
  background-color: white;
  color: #2c3e50;
  font-family: inherit;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

export const CancelButton = styled.button`
  background-color: #95a5a6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover { background-color: #7f8c8d; }
`;

export const GenerateButton = styled.button`
  background-color: #27ae60;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover { background-color: #2ecc71; }
  &:disabled { background-color: #bdc3c7; cursor: not-allowed; }
`;