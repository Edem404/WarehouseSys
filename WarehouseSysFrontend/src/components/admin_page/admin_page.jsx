import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminTopSection from './top_section/admin_top_section';

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
  SubmitButton
} from './admin_page.styled';

// --- Sub-components Stubs ---
const EmployeesStub = () => (
    <ContentCard>
        <SectionTitle>Employee Management</SectionTitle>
        <p>List of employees...</p>
    </ContentCard>
);

const PositionsStub = () => (
    <ContentCard>
        <SectionTitle>Position Management</SectionTitle>
        <p>Manage access levels...</p>
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
            console.error("Registration error:", error);
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
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        position_id: ''
    });

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
                } catch (error) {
                    console.error("Error connecting to server:", error);
                }
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
            alert("Please fill all fields");
            return;
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
                alert(`Error: ${errorData.message || 'Failed to add employee'}`);
            }
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("Failed to connect to server.");
        }
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

// --- NEW MODAL: ADD SUPPLIER ---
const AddSupplierModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        email: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.phone_number || !formData.email) {
            alert("Please fill all fields");
            return;
        }

        const payload = {
            name: formData.name,
            phone_number: formData.phone_number,
            email: formData.email
        };

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
                alert(`Error: ${errorData.message || 'Failed to add supplier'}`);
            }
        } catch (error) {
            console.error("Error adding supplier:", error);
            alert("Failed to connect to server.");
        }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>Add New Supplier</ModalTitle>
                <FormGroup>
                    <Label>Supplier Name:</Label>
                    <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Global Tech LLC" />
                </FormGroup>
                <FormGroup>
                    <Label>Phone Number:</Label>
                    <Input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="e.g. +380501234567" />
                </FormGroup>
                <FormGroup>
                    <Label>Email:</Label>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="contact@supplier.com" />
                </FormGroup>
                <ModalButtons>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton onClick={handleSubmit}>Confirm</SubmitButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};

// --- NEW MODAL: ADD PRODUCT TYPE ---
const AddProductTypeModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        type_name: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.type_name) {
            alert("Please fill the type name");
            return;
        }

        const payload = {
            type_name: formData.type_name
        };

        try {
            const response = await fetch('http://localhost:8080/product_types', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Product Type added successfully!");
                onClose();
                setFormData({ type_name: '' });
            } else {
                const errorData = await response.json(); 
                alert(`Error: ${errorData.message || 'Failed to add product type'}`);
            }
        } catch (error) {
            console.error("Error adding product type:", error);
            alert("Failed to connect to server.");
        }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>Add Product Type</ModalTitle>
                <FormGroup>
                    <Label>Type Name:</Label>
                    <Input type="text" name="type_name" value={formData.type_name} onChange={handleChange} placeholder="e.g. Electronics" />
                </FormGroup>
                <ModalButtons>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton onClick={handleSubmit}>Confirm</SubmitButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};

// --- DASHBOARD COMPONENT ---
const AdminDashboard = ({ 
    onOpenRegister, 
    onOpenAddEmployee,
    onOpenAddSupplier,
    onOpenAddProductType 
}) => (
    <>
      <SectionTitle>Admin Dashboard</SectionTitle>
      
      <ContentCard>
          <h3>Quick Actions</h3>
          <p>Perform administrative tasks quickly.</p>
          
          <ActionButtonsContainer>
              <ActionButton onClick={onOpenAddEmployee} style={{backgroundColor: '#e67e22'}}>
                  + Add Employee
              </ActionButton>
              
              <ActionButton onClick={onOpenRegister}>
                  + Register User Account
              </ActionButton>

              <ActionButton onClick={onOpenAddSupplier} style={{backgroundColor: '#8e44ad'}}>
                  + Add Supplier
              </ActionButton>

              <ActionButton onClick={onOpenAddProductType} style={{backgroundColor: '#16a085'}}>
                  + Add Product Type
              </ActionButton>
          </ActionButtonsContainer>

      </ContentCard>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <ContentCard>
            <h3>System Status</h3>
            <p style={{color: 'green', fontWeight: 'bold', fontSize: '1.2em'}}>● Online</p>
          </ContentCard>

          <ContentCard>
            <h3>Total Users</h3>
            <p style={{fontSize: '24px', margin: '10px 0'}}>Loading...</p>
          </ContentCard>
          
          <ContentCard>
            <h3>Pending Approvals</h3>
            <p>0 tasks pending</p>
          </ContentCard>
      </div>
    </>
);

// --- MAIN PAGE COMPONENT ---

const AdminPage = () => {
  const location = useLocation();
  
  // States for all modals
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);
  const [isAddProductTypeModalOpen, setIsAddProductTypeModalOpen] = useState(false);

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
            />
        )}

      </MainContent>

      {/* Modals */}
      <RegisterUserModal 
          isOpen={isRegisterModalOpen} 
          onClose={() => setIsRegisterModalOpen(false)} 
      />

      <AddEmployeeModal
          isOpen={isAddEmployeeModalOpen}
          onClose={() => setIsAddEmployeeModalOpen(false)}
      />

      <AddSupplierModal
          isOpen={isAddSupplierModalOpen}
          onClose={() => setIsAddSupplierModalOpen(false)}
      />

      <AddProductTypeModal
          isOpen={isAddProductTypeModalOpen}
          onClose={() => setIsAddProductTypeModalOpen(false)}
      />

    </PageContainer>
  );
};

export default AdminPage;