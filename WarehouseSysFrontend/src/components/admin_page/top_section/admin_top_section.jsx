import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Importing styles specific to Admin Page
import { 
  HeaderContainer, 
  Logo, 
  ButtonGroup, 
  NavButton, 
  UserInfo,
  BurgerWrapper,
  BurgerMenu,
  BurgerMenuItem
} from '../admin_page.styled'; // Ensure path is correct

const AdminTopSection = () => {
  const navigate = useNavigate();
  const [accessLevel, setAccessLevel] = useState(0);
  const [employeeName, setEmployeeName] = useState('');
  const [loading, setLoading] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // 1. Logic to fetch user data (Identical to BaseTopSection for consistency)
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

        // Security check: If user is not admin, kick them out
        if (posData.access_level < 90) {
             navigate('/main');
        }

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

      {/* Burger Button */}
      <BurgerWrapper onClick={() => setMenuOpen(prev => !prev)}>
        ☰
      </BurgerWrapper>

      {/* Admin Specific Menu */}
      {menuOpen && (
        <BurgerMenu>
          <BurgerMenuItem
            onClick={() => {
              navigate('/main/admin/employees');
              setMenuOpen(false);
            }}
          >
            Manage Employees
          </BurgerMenuItem>

          <BurgerMenuItem
            onClick={() => {
              navigate('/main/admin/positions');
              setMenuOpen(false);
            }}
          >
             Manage Positions
          </BurgerMenuItem>
        </BurgerMenu>
      )}

      {/* Logo redirects to Admin Dashboard */}
      <Logo onClick={() => navigate('/main/admin')}>
        WarehouseSys <span style={{fontSize: '0.6em', color: '#e74c3c'}}>ADMIN</span>
      </Logo>

      <ButtonGroup>

        {!loading && (
          <UserInfo>
            {employeeName || 'Admin'} (Lvl: {accessLevel})
          </UserInfo>
        )}

        {/* Button to return to regular user view */}
        <NavButton 
            onClick={() => navigate('/main')}
        >
          To Base View
        </NavButton>

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

export default AdminTopSection;