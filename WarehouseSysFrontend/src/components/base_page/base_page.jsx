import React from 'react';
import { useLocation } from 'react-router-dom'; // 1. Імпортуємо хук локації
import BaseTopSection from './top_section/base_top_section';
import ProductsPage from './product_page/product_page'; // 2. Імпортуємо сторінку товарів (вкажіть правильний шлях)

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
        
        {/* Якщо не товари і не звіти - показуємо дашборд */}
        {!isProductsPage && !isReportsPage && <DashboardContent />}

      </MainContent>
    </PageContainer>
  );
};

export default BasePage;