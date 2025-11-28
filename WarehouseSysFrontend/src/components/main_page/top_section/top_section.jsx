import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HeaderContainer, 
  Logo, 
  ButtonGroup, 
  NavButton, 
  UserInfo 
} from './top_section.styled';

const MainTopSection = () => {
  const navigate = useNavigate();
  const [accessLevel, setAccessLevel] = useState(0);
  const [employeeName, setEmployeeName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAccess = async () => {
      try {
        const storedEmployeeId = localStorage.getItem('employeeId'); 
        if (!storedEmployeeId) {
            console.warn("No employee ID found, redirecting to login.");
            navigate('/login');
            return;
        }

        const empResponse = await fetch(`http://localhost:8080/employees/${storedEmployeeId}`);
        if (!empResponse.ok) throw new Error('Failed to fetch employee');
        const empData = await empResponse.json();
        
        setEmployeeName(`${empData.first_name} ${empData.last_name}`);
        const positionId = empData.position_id;

        // Step B: Fetch Position details to get Access Level
        // Endpoint example: GET /positions/{id}
        const posResponse = await fetch(`http://localhost:8080/employee_positions/${positionId}`);
        if (!posResponse.ok) throw new Error('Failed to fetch position');
        const posData = await posResponse.json();

        // Step C: Set Access Level
        setAccessLevel(posData.access_level);
        console.log(`User Access Level: ${posData.access_level}`);

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
      <Logo onClick={() => navigate('/main')}>WarehouseSys</Logo>

      <ButtonGroup>
        {!loading && (
          <UserInfo>
            {employeeName || 'User'} (Lvl: {accessLevel})
          </UserInfo>
        )}

        {/* Base Button - Always Visible */}
        <NavButton onClick={() => navigate('/main/base')}>
          Base
        </NavButton>

        {/* Admin Button - Visible only if access_level >= 90 */}
        {!loading && accessLevel >= 90 && (
          <NavButton $isAdmin onClick={() => navigate('/main/admin')}>
            Admin Panel
          </NavButton>
        )}
        
        <NavButton onClick={() => {
            localStorage.clear();
            navigate('/login');
        }} style={{ marginLeft: '20px', backgroundColor: '#7f8c8d' }}>
            Logout
        </NavButton>
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default MainTopSection;