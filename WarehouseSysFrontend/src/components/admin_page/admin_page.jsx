import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminTopSection from './top_section/admin_top_section';

// Імпортуємо стилі (включаючи НОВІ)
import { 
  PageContainer, 
  MainContent, 
  SectionTitle, 
  ContentCard,
  ActionButton, 
  ActionButtonsContainer,
  ModalOverlay, 
  ModalContent,
  ModalTitle,
  FormGroup,
  Label,
  Input,
  Select, 
  ModalButtons,
  CancelButton,
  SubmitButton,
  // Нові імпорти для красивого дашборда:
  DashboardGrid,
  StatHeader,
  StatBigNumber,
  StatLabel,
  StatusIndicator
} from './admin_page.styled';

// --- Sub-components Stubs ---
const EmployeesStub = () => (
    <ContentCard>
        <SectionTitle>Employee Management</SectionTitle>
        <p style={{color: '#7f8c8d'}}>List of employees...</p>
    </ContentCard>
);

const PositionsStub = () => (
    <ContentCard>
        <SectionTitle>Position Management</SectionTitle>
        <p style={{color: '#7f8c8d'}}>Manage access levels...</p>
    </ContentCard>
);

// --- MODAL: REGISTER USER ---
const RegisterUserModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        employee_id: '',
        email: '',
        password: ''
    });
    const [employeesList, setEmployeesList] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const fetchEmployees = async () => {
                try {
                    const response = await fetch('http://localhost:8080/employees/all');
                    if (response.ok) {
                        const data = await response.json();
                        setEmployeesList(data);
                    }
                } catch (error) {
                    console.error("Error connecting to server:", error);
                }
            };
            fetchEmployees();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.employee_id || !formData.email || !formData.password) {
            alert("Please fill all fields");
            return;
        }
        const payload = {
            employee_id: parseInt(formData.employee_id),
            email: formData.email,
            password_hash: formData.password 
        };
        try {
            const response = await fetch('http://localhost:8080/employee_accounts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                alert("User registered successfully!");
                onClose();
                setFormData({ employee_id: '', email: '', password: '' });
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Registration failed'}`);
            }
        } catch (error) {
            alert("Failed to connect to server.");
        }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>Register New User</ModalTitle>
                <FormGroup>
                    <Label>Select Employee:</Label>
                    <Select name="employee_id" value={formData.employee_id} onChange={handleChange}>
                        <option value="">-- Choose an employee --</option>
                        {employeesList.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.name} {emp.surname} (ID: {emp.id})
                            </option>
                        ))}
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label>Login (Email):</Label>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="user@example.com" />
                </FormGroup>
                <FormGroup>
                    <Label>Password:</Label>
                    <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />
                </FormGroup>
                <ModalButtons>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton onClick={handleSubmit}>Confirm</SubmitButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};

// --- MODAL: ADD EMPLOYEE ---
const AddEmployeeModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', surname: '', position_id: '' });
    const [positionsList, setPositionsList] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const fetchPositions = async () => {
                try {
                    const response = await fetch('http://localhost:8080/employee_positions/all');
                    if (response.ok) {
                        const data = await response.json();
                        setPositionsList(data);
                    }
                } catch (error) { console.error(error); }
            };
            fetchPositions();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.surname || !formData.position_id) {
            alert("Please fill all fields"); return;
        }
        const payload = {
            name: formData.name,
            surname: formData.surname,
            position_id: parseInt(formData.position_id)
        };
        try {
            const response = await fetch('http://localhost:8080/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                alert("Employee added successfully!");
                onClose();
                setFormData({ name: '', surname: '', position_id: '' });
            } else {
                const errorData = await response.json(); 
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) { alert("Failed to connect to server."); }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>Add New Employee</ModalTitle>
                <FormGroup>
                    <Label>First Name:</Label>
                    <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Roman" />
                </FormGroup>
                <FormGroup>
                    <Label>Last Name:</Label>
                    <Input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="e.g. Borduliak" />
                </FormGroup>
                <FormGroup>
                    <Label>Position:</Label>
                    <Select name="position_id" value={formData.position_id} onChange={handleChange}>
                        <option value="">-- Choose a position --</option>
                        {positionsList.map((pos) => (
                            <option key={pos.id} value={pos.id}>
                                {pos.position_name} (Lvl: {pos.access_level}) 
                            </option>
                        ))}
                    </Select>
                </FormGroup>
                <ModalButtons>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton onClick={handleSubmit}>Confirm</SubmitButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};

// --- MODAL: ADD SUPPLIER ---
const AddSupplierModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', phone_number: '', email: '' });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.phone_number || !formData.email) {
            alert("Please fill all fields"); return;
        }
        const payload = { ...formData };
        try {
            const response = await fetch('http://localhost:8080/suppliers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                alert("Supplier added successfully!");
                onClose();
                setFormData({ name: '', phone_number: '', email: '' });
            } else {
                const errorData = await response.json(); 
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) { alert("Failed to connect to server."); }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>Add New Supplier</ModalTitle>
                <FormGroup>
                    <Label>Supplier Name:</Label>
                    <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Phone Number:</Label>
                    <Input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Email:</Label>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                </FormGroup>
                <ModalButtons>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton onClick={handleSubmit}>Confirm</SubmitButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};

// --- MODAL: ADD PRODUCT TYPE ---
const AddProductTypeModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ type_name: '' });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.type_name) { alert("Please fill the type name"); return; }
        try {
            const response = await fetch('http://localhost:8080/product_types', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type_name: formData.type_name }),
            });
            if (response.ok) {
                alert("Product Type added successfully!");
                onClose();
                setFormData({ type_name: '' });
            } else {
                const errorData = await response.json(); 
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) { alert("Failed to connect to server."); }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>Add Product Type</ModalTitle>
                <FormGroup>
                    <Label>Type Name:</Label>
                    <Input type="text" name="type_name" value={formData.type_name} onChange={handleChange} />
                </FormGroup>
                <ModalButtons>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton onClick={handleSubmit}>Confirm</SubmitButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};

// --- MODAL: ADD INVENTORY TRANSACTION TYPE ---
const AddInventoryTransactionTypeModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ type_name: '' });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.type_name) { alert("Please fill the name"); return; }
        try {
            const response = await fetch('http://localhost:8080/inventory_transaction_types', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type_name: formData.type_name }),
            });
            if (response.ok) {
                alert("Transaction Type added successfully!");
                onClose();
                setFormData({ type_name: '' });
            } else {
                const errorData = await response.json(); 
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) { alert("Failed to connect to server."); }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>Add Transaction Type</ModalTitle>
                <FormGroup>
                    <Label>Transaction Type Name:</Label>
                    <Input type="text" name="type_name" value={formData.type_name} onChange={handleChange} />
                </FormGroup>
                <ModalButtons>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton onClick={handleSubmit}>Confirm</SubmitButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};

// --- DASHBOARD COMPONENT (ОНОВЛЕНО З ВИКОРИСТАННЯМ НОВИХ СТИЛІВ) ---
const AdminDashboard = ({ 
    onOpenRegister, 
    onOpenAddEmployee,
    onOpenAddSupplier,
    onOpenAddProductType,
    onOpenAddInventoryTransactionType 
}) => (
    <>
      <SectionTitle>Admin Dashboard</SectionTitle>
      
      <ContentCard>
          <StatHeader>Quick Actions</StatHeader>
          <StatLabel style={{marginBottom: '15px'}}>Perform administrative tasks quickly.</StatLabel>
          
          <ActionButtonsContainer>
              <ActionButton onClick={onOpenAddEmployee} style={{backgroundColor: '#e67e22'}}>
                  + Add Employee
              </ActionButton>
              <ActionButton onClick={onOpenRegister}>
                  + Register User
              </ActionButton>
              <ActionButton onClick={onOpenAddSupplier} style={{backgroundColor: '#8e44ad'}}>
                  + Add Supplier
              </ActionButton>
              <ActionButton onClick={onOpenAddProductType} style={{backgroundColor: '#16a085'}}>
                  + Add Product Type
              </ActionButton>
              <ActionButton onClick={onOpenAddInventoryTransactionType} style={{backgroundColor: '#34495e'}}>
                  + Add Trans. Type
              </ActionButton>
          </ActionButtonsContainer>
      </ContentCard>

      {/* Grid з картками статистики */}
      <DashboardGrid>
          <ContentCard>
            <StatHeader>System Status</StatHeader>
            <StatusIndicator>
                <span style={{fontSize: '1.5em', lineHeight: '0'}}>●</span> Online
            </StatusIndicator>
            <StatLabel>Server is running normally</StatLabel>
          </ContentCard>

          <ContentCard>
            <StatHeader>Total Users</StatHeader>
            <StatBigNumber>Loading...</StatBigNumber>
            <StatLabel>Registered in system</StatLabel>
          </ContentCard>
          
          <ContentCard>
            <StatHeader>Pending Tasks</StatHeader>
            <StatBigNumber>0</StatBigNumber>
            <StatLabel>Approvals required</StatLabel>
          </ContentCard>
      </DashboardGrid>
    </>
);

// --- MAIN PAGE COMPONENT ---
const AdminPage = () => {
  const location = useLocation();
  
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);
  const [isAddProductTypeModalOpen, setIsAddProductTypeModalOpen] = useState(false);
  const [isAddInventoryTransactionTypeModalOpen, setIsAddInventoryTransactionTypeModalOpen] = useState(false); 

  const isEmployeesPage = location.pathname.includes('/employees');
  const isPositionsPage = location.pathname.includes('/positions');

  return (
    <PageContainer>
      <AdminTopSection />
      <MainContent>
        {isEmployeesPage && <EmployeesStub />}
        {isPositionsPage && <PositionsStub />}
        
        {!isEmployeesPage && !isPositionsPage && (
            <AdminDashboard 
                onOpenRegister={() => setIsRegisterModalOpen(true)} 
                onOpenAddEmployee={() => setIsAddEmployeeModalOpen(true)}
                onOpenAddSupplier={() => setIsAddSupplierModalOpen(true)}
                onOpenAddProductType={() => setIsAddProductTypeModalOpen(true)}
                onOpenAddInventoryTransactionType={() => setIsAddInventoryTransactionTypeModalOpen(true)}
            />
        )}
      </MainContent>

      <RegisterUserModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
      <AddEmployeeModal isOpen={isAddEmployeeModalOpen} onClose={() => setIsAddEmployeeModalOpen(false)} />
      <AddSupplierModal isOpen={isAddSupplierModalOpen} onClose={() => setIsAddSupplierModalOpen(false)} />
      <AddProductTypeModal isOpen={isAddProductTypeModalOpen} onClose={() => setIsAddProductTypeModalOpen(false)} />
      <AddInventoryTransactionTypeModal isOpen={isAddInventoryTransactionTypeModalOpen} onClose={() => setIsAddInventoryTransactionTypeModalOpen(false)} />
    </PageContainer>
  );
};

export default AdminPage;