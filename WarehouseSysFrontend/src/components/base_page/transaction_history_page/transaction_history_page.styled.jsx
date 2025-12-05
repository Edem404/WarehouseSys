import styled from "styled-components";

export const HistoryContainer = styled.div`
  margin-top: 20px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

export const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;

  th {
    background-color: #34495e; /* Darker header for contrast */
    color: white;
    text-align: left;
    padding: 12px;
    border-bottom: 2px solid #bdc3c7;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #ecf0f1;
    color: #34495e;
  }
`;

// Special row that changes color based on props
export const TransactionRow = styled.tr`
  /* If $isPositive is true -> Light Green background
     If false -> Light Red background
     Base background is white/transparent
  */
  background-color: ${props => 
    props.$isPositive 
      ? 'rgba(39, 174, 96, 0.1)'  // Very light green
      : 'rgba(231, 76, 60, 0.1)'  // Very light red
  };

  &:hover {
    /* Slightly darker on hover to keep the interactive feel */
    background-color: ${props => 
      props.$isPositive 
        ? 'rgba(39, 174, 96, 0.2)' 
        : 'rgba(231, 76, 60, 0.2)'
    };
  }
`;

// Helper to color just the quantity text
export const QuantityText = styled.span`
  font-weight: bold;
  color: ${props => props.$isPositive ? '#27ae60' : '#c0392b'};
`;