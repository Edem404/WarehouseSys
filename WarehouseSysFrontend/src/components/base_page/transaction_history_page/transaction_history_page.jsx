import React, { useEffect, useState } from "react";
import { 
  HistoryContainer, 
  HistoryTable, 
  TransactionRow, 
  QuantityText 
} from "./transaction_history_page.styled"; 
import { SectionTitle } from "../base_page.styled"; 

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' - новіші зверху, 'asc' - старіші зверху

  useEffect(() => {
    fetch("http://localhost:8080/inventory_transactions/all")
      .then(res => res.json())
      .then(data => {
        // Початкове сортування: новіші зверху (desc)
        // Використовуємо localeCompare для надійного порівняння рядків дати
        const sorted = data.sort((a, b) => {
            const dateA = a.timestamp || "";
            const dateB = b.timestamp || "";
            return dateB.localeCompare(dateA);
        });
        setTransactions(sorted);
      })
      .catch(err => {
          console.error("Error loading transactions:", err);
          setTransactions([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Функція зміни сортування при кліку на заголовок
  const handleSort = () => {
    const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    setSortOrder(newOrder);

    const sorted = [...transactions].sort((a, b) => {
        const dateA = a.timestamp || "";
        const dateB = b.timestamp || "";

        if (newOrder === 'asc') {
            return dateA.localeCompare(dateB); // Зростання (старіші -> новіші)
        } else {
            return dateB.localeCompare(dateA); // Спадання (новіші -> старіші)
        }
    });

    setTransactions(sorted);
  };

  if (loading) return <div style={{padding: '20px'}}>Loading history...</div>;

  return (
    <>
        <SectionTitle>Transaction History</SectionTitle>

        <HistoryContainer>
          {transactions.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#7f8c8d' }}>No transactions found.</p>
          ) : (
            <HistoryTable>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product ID</th>
                  <th>Type (ID)</th>
                  <th>Employee (ID)</th>
                  
                  {/* Клікабельний заголовок для сортування */}
                  <th 
                    onClick={handleSort} 
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    title="Click to sort by Date"
                  >
                    Date {sortOrder === 'desc' ? '↓' : '↑'}
                  </th>
                  
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(item => {
                   const isPositive = item.quantity_change > 0;
                   
                   return (
                    <TransactionRow key={item.id} $isPositive={isPositive}>
                      <td>{item.id}</td>
                      <td>{item.product_id}</td> 
                      
                      <td>
                          {/* Відображення типу транзакції */}
                          {item.transaction_type_id === 2 ? 'Receipt' : 
                           item.transaction_type_id === 1 ? 'Writeoff' : 
                           item.transaction_type_id === 3 ? 'Shipment' : item.transaction_type_id}
                      </td>
                      
                      <td>{item.employee_id}</td>
                      
                      {/* Дата як рядок */}
                      <td>{item.timestamp}</td>
                      
                      <td>
                        <QuantityText $isPositive={isPositive}>
                            {isPositive ? '+' : ''}{item.quantity_change}
                        </QuantityText>
                      </td>
                    </TransactionRow>
                  );
                })}
              </tbody>
            </HistoryTable>
          )}
        </HistoryContainer>
    </>
  );
}