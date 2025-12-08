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
  const [suppliersMap, setSuppliersMap] = useState({}); // Стан для збереження мапи: { id: "Name" }
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc'); 

  useEffect(() => {
    const fetchData = async () => {
        try {
            // 1. Виконуємо запити паралельно (транзакції + постачальники)
            const [transRes, supRes] = await Promise.all([
                fetch("http://localhost:8080/inventory_transactions/all"),
                fetch("http://localhost:8080/suppliers/all")
            ]);

            const transData = await transRes.json();
            const supData = await supRes.json();

            // 2. Створюємо мапу постачальників для швидкого доступу
            // Перетворюємо [{id: 1, name: "Global"}, ...] в { 1: "Global", ... }
            const map = {};
            if (Array.isArray(supData)) {
                supData.forEach(sup => {
                    map[sup.id] = sup.name;
                });
            }
            setSuppliersMap(map);

            // 3. Сортуємо транзакції
            const sorted = transData.sort((a, b) => {
                const dateA = a.timestamp || "";
                const dateB = b.timestamp || "";
                return dateB.localeCompare(dateA); // desc
            });
            setTransactions(sorted);

        } catch (err) {
            console.error("Error loading data:", err);
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, []);

  const handleSort = () => {
    const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    setSortOrder(newOrder);

    const sorted = [...transactions].sort((a, b) => {
        const dateA = a.timestamp || "";
        const dateB = b.timestamp || "";

        if (newOrder === 'asc') {
            return dateA.localeCompare(dateB);
        } else {
            return dateB.localeCompare(dateA);
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
                  <th>Type</th>
                  <th>Supplier</th> {/* Нова колонка */}
                  <th>Employee (ID)</th>
                  
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
                   
                   // Отримуємо ім'я постачальника з мапи
                   const supplierName = item.supplier_id ? suppliersMap[item.supplier_id] : '-';

                   return (
                    <TransactionRow key={item.id} $isPositive={isPositive}>
                      <td>{item.id}</td>
                      <td>{item.product_id}</td> 
                      
                      <td>
                          {item.transaction_type_id === 2 ? 'Receipt' : 
                           item.transaction_type_id === 1 ? 'Writeoff' : 
                           item.transaction_type_id === 3 ? 'Shipment' : item.transaction_type_id}
                      </td>

                      {/* Відображаємо Ім'я постачальника або прочерк */}
                      <td style={{ fontStyle: item.supplier_id ? 'normal' : 'italic', color: item.supplier_id ? 'black' : '#000000ff' }}>
                          {supplierName || `ID: ${item.supplier_id}`}
                      </td>
                      
                      <td>{item.employee_id}</td>
                      
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