import React from 'react';
import MainTopSection from './top_section/top_section'; 
import { 
  PageContainer, 
  MainContent, 
  WelcomeMessage 
} from './main_page.styled';

const MainPage = () => {
  return (
    <PageContainer>
      {/* 1. Top Navigation Bar */}
      <MainTopSection />

      {/* 2. Main Content Area */}
      <MainContent>
        <WelcomeMessage>
           <h1>Welcome to the Warehouse System</h1>
           <p>Select an option from the menu above to get started.</p>
        </WelcomeMessage>
        
        {/* Placeholder for future content or routing outlets if needed */}
        {/* <Outlet /> */}
      </MainContent>
    </PageContainer>
  );
};

export default MainPage;