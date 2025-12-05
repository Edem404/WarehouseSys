import React from 'react';
import { useLocation } from 'react-router-dom';
import BaseTopSection from './top_section/base_top_section';
import ProductsPage from './product_page/product_page';

// 1. Імпортуємо нову сторінку історії транзакцій
// (Переконайтеся, що шлях відповідає тому, де ви створили файл)
import TransactionHistoryPage from './transaction_history_page/transaction_history_page';

import { 
  PageContainer, 
  MainContent, 
  SectionTitle, 
  ContentCard 
} from './base_page.styled';

const BasePage = () => {
  const location = useLocation(); // Отримуємо поточний URL

  // Логіка визначення, яку сторінку показувати
  const isProductsPage = location.pathname.includes('/products');
  const isReportsPage = location.pathname.includes('/reports');
  
  // 2. Додаємо перевірку: чи ми на сторінці транзакцій
  const isTransactionsPage = location.pathname.includes('/transactions');

  // Виносимо стандартний контент (Дашборд) в окрему змінну для чистоти
  const DashboardContent = () => (
    <>
      <SectionTitle>Base Operations</SectionTitle>
      
      <ContentCard>
        <h3>Active Tasks</h3>
        <p>Here you will see the list of active warehouse tasks available for basic employees.</p>
        <div style={{ marginTop: '20px', padding: '20px', background: '#f8f9fa', border: '1px dashed #ccc', textAlign: 'center', color: '#7f8c8d' }}>
          Table with tasks will be implemented here...
        </div>
      </ContentCard>

      <ContentCard>
         <h3>Notifications</h3>
         <p>No new notifications.</p>
      </ContentCard>
    </>
  );

  const ReportsStub = () => (
      <ContentCard>
          <SectionTitle>Звіти</SectionTitle>
          <p>Сторінка звітів у розробці...</p>
      </ContentCard>
  );

  return (
    <PageContainer>
      {/* Header завжди на місці */}
      <BaseTopSection />

      <MainContent>
        {/* Умовний рендерінг вмісту */}
        
        {isProductsPage && <ProductsPage />}
        
        {isReportsPage && <ReportsStub />}

        {/* 3. Відображаємо історію транзакцій, якщо обрано цей пункт меню */}
        {isTransactionsPage && <TransactionHistoryPage />}
        
        {/* Якщо не товари, не звіти і не транзакції - показуємо дашборд */}
        {!isProductsPage && !isReportsPage && !isTransactionsPage && <DashboardContent />}

      </MainContent>
    </PageContainer>
  );
};

export default BasePage;