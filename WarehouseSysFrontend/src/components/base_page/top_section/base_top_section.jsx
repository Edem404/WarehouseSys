import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  HeaderContainer, 
  Logo, 
  ButtonGroup, 
  NavButton, 
  UserInfo,
  BurgerWrapper,
  BurgerMenu,
  BurgerMenuItem
} from '../base_page.styled';

const BaseTopSection = () => {
  const navigate = useNavigate();
  const [accessLevel, setAccessLevel] = useState(0);
  const [employeeName, setEmployeeName] = useState('');
  const [loading, setLoading] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserAccess = async () => {
      try {
        const storedEmployeeId = localStorage.getItem('employeeId'); 
        
        if (!storedEmployeeId) {
            navigate('/login');
            return;
        }

        const empResponse = await fetch(`http://localhost:8080/employees/${storedEmployeeId}`);
        const empData = await empResponse.json();
        
        setEmployeeName(`${empData.name} ${empData.surname}`);
        
        const positionId = empData.position_id;

        const posResponse = await fetch(`http://localhost:8080/employee_positions/${positionId}`);
        const posData = await posResponse.json();

        setAccessLevel(posData.access_level);

      } catch (error) {
        console.error("Error fetching access level:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAccess();
  }, [navigate]);

  return (
    <HeaderContainer>

      {/* Бургер кнопка */}
      <BurgerWrapper onClick={() => setMenuOpen(prev => !prev)}>
        ☰
      </BurgerWrapper>

      {/* Меню */}
      {menuOpen && (
        <BurgerMenu>

          <BurgerMenuItem
            onClick={() => {
              navigate('/main/base/products');
              setMenuOpen(false);
            }}
          >
            Список товарів
          </BurgerMenuItem>

          <BurgerMenuItem
            onClick={() => {
              navigate('/main/base/reports');
              setMenuOpen(false);
            }}
          >
            Звіти
          </BurgerMenuItem>

        </BurgerMenu>
      )}

      {/* Лого */}
      <Logo onClick={() => navigate('/main')}>
        WarehouseSys
      </Logo>

      <ButtonGroup>

        {!loading && (
          <UserInfo>
            {employeeName || 'User'} (Lvl: {accessLevel})
          </UserInfo>
        )}

        <NavButton 
            $isBack 
            onClick={() => navigate('/main')}
        >
          ← Back
        </NavButton>

        {!loading && accessLevel >= 90 && (
          <NavButton 
            $isAdmin 
            onClick={() => navigate('/main/admin')}
          >
            Admin Panel
          </NavButton>
        )}
        
        <NavButton 
            $isLogout 
            onClick={() => {
                localStorage.clear();
                navigate('/login');
            }} 
            style={{ marginLeft: '10px' }}
        >
            Logout
        </NavButton>

      </ButtonGroup>

    </HeaderContainer>
  );
};

export default BaseTopSection;
