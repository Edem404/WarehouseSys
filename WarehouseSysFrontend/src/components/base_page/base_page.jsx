import React from 'react';
import { useLocation } from 'react-router-dom';
import BaseTopSection from './top_section/base_top_section';
import ProductsPage from './product_page/product_page';

// Імпорти сторінок
import TransactionHistoryPage from './transaction_history_page/transaction_history_page';
import SuppliersPage from './suppliers_page/suppliers_page';

import { 
  PageContainer, 
  MainContent, 
  SectionTitle, 
  ContentCard 
} from './base_page.styled';

const BasePage = () => {
  const location = useLocation(); 

  // Логіка визначення, яку сторінку показувати
  const isProductsPage = location.pathname.includes('/products');
  const isReportsPage = location.pathname.includes('/reports');
  const isTransactionsPage = location.pathname.includes('/transactions');
  
  // 2. Додаємо перевірку шляху для постачальників
  const isSuppliersPage = location.pathname.includes('/suppliers');

  // Виносимо стандартний контент (Дашборд) в окрему змінну
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
      <BaseTopSection />

      <MainContent>
        {/* Умовний рендерінг вмісту */}
        
        {isProductsPage && <ProductsPage />}
        
        {isReportsPage && <ReportsStub />}

        {isTransactionsPage && <TransactionHistoryPage />}

        {/* 3. Рендеримо сторінку постачальників */}
        {isSuppliersPage && <SuppliersPage />}
        
        {/* Оновлена умова: показуємо дашборд, якщо жодна з інших сторінок не активна */}
        {!isProductsPage && !isReportsPage && !isTransactionsPage && !isSuppliersPage && <DashboardContent />}

      </MainContent>
    </PageContainer>
  );
};

export default BasePage;