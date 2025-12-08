import React, { useEffect, useState } from "react";
import {
  PageContainer,
  TopBar,
  SearchInput,
  AddButton,
  SuppliersTable,
  EmptyMessage,
  ActionButton,
  ModalOverlay,
  ModalContent,
  WideModalContent, // Імпортуємо широке вікно
  ModalTitle,
  FormGroup,
  Label,
  Input,
  ModalButtons,
  CancelButton,
  SubmitButton
} from "./suppliers_page.styled";

import { SectionTitle } from "../base_page.styled"; 

// --- MODAL: SHOW SUPPLIER PRODUCTS (НОВЕ) ---
const SupplierProductsModal = ({ isOpen, onClose, supplier }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && supplier) {
            setLoading(true);
            // Використовуємо існуючий ендпоінт для отримання всіх продуктів
            // і фільтруємо їх на клієнті
            fetch("http://localhost:8080/products/all")
                .then(res => res.json())
                .then(data => {
                    const supplierProducts = data.filter(p => p.supplier_id === supplier.id);
                    setProducts(supplierProducts);
                })
                .catch(err => {
                    console.error("Error fetching products:", err);
                    setProducts([]);
                })
                .finally(() => setLoading(false));
        }
    }, [isOpen, supplier]);

    if (!isOpen || !supplier) return null;

    return (
        <ModalOverlay onClick={onClose}>
            {/* Використовуємо WideModalContent для таблиці */}
            <WideModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>Products from: {supplier.name}</ModalTitle>
                
                {loading ? (
                    <p style={{textAlign: 'center'}}>Loading products...</p>
                ) : products.length === 0 ? (
                    <EmptyMessage>No products found for this supplier.</EmptyMessage>
                ) : (
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <SuppliersTable>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Article</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>{p.name}</td>
                                        <td>{p.article || p.sku}</td>
                                        <td>{p.quantity}</td>
                                        <td>{p.price} ₴</td>
                                    </tr>
                                ))}
                            </tbody>
                        </SuppliersTable>
                    </div>
                )}

                <ModalButtons>
                    <CancelButton onClick={onClose}>Close</CancelButton>
                </ModalButtons>
            </WideModalContent>
        </ModalOverlay>
    );
};

// --- MODAL: ADD SUPPLIER (Без змін) ---
const AddSupplierModal = ({ isOpen, onClose, onRefresh }) => {
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
            alert("Please fill in all fields");
            return;
        }

        const payload = {
            name: formData.name,
            phone_number: formData.phone_number,
            email: formData.email,
            is_active: true
        };

        try {
            const response = await fetch("http://localhost:8080/suppliers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Supplier added successfully!");
                onClose();
                setFormData({ name: '', phone_number: '', email: '' }); 
                onRefresh(); 
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
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Global Tech LLC" />
                </FormGroup>
                <FormGroup>
                    <Label>Phone Number:</Label>
                    <Input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="e.g. +380501234567" />
                </FormGroup>
                <FormGroup>
                    <Label>Email:</Label>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="contact@supplier.com" />
                </FormGroup>
                <ModalButtons>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton onClick={handleSubmit}>Create</SubmitButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userAccessLevel, setUserAccessLevel] = useState(0);

  // Стейт для модалки продуктів
  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    const fetchAccess = async () => {
        const storedEmployeeId = localStorage.getItem('employeeId');
        if (storedEmployeeId) {
            try {
                const empRes = await fetch(`http://localhost:8080/employees/${storedEmployeeId}`);
                if (!empRes.ok) return;
                const empData = await empRes.json();

                const posRes = await fetch(`http://localhost:8080/employee_positions/${empData.position_id}`);
                if (!posRes.ok) return;
                const posData = await posRes.json();

                setUserAccessLevel(posData.access_level);
            } catch (error) {
                console.error("Error fetching user access level:", error);
            }
        }
    };
    fetchAccess();
  }, []);

  const fetchSuppliers = () => {
    fetch("http://localhost:8080/suppliers/all")
      .then(res => res.json())
      .then(data => setSuppliers(data))
      .catch(err => {
          console.error("Error loading suppliers:", err);
          setSuppliers([]);
      });
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
      if (userAccessLevel < 40) {
          alert("Access Denied: You need level 40+ to delete suppliers.");
          return;
      }

      if(window.confirm("Are you sure you want to delete this supplier?")) {
          try {
              const res = await fetch(`http://localhost:8080/suppliers/${id}`, { method: 'DELETE' });
              if (res.ok) {
                  fetchSuppliers();
              } else {
                  alert("Failed to delete supplier");
              }
          } catch (e) {
              console.error(e);
          }
      }
  };

  // Відкриває модалку з продуктами
  const handleCheckProducts = (supplier) => {
      setSelectedSupplier(supplier);
      setIsProductsModalOpen(true);
  };

  const filtered = suppliers.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
        <SectionTitle>Suppliers Management</SectionTitle>

        <PageContainer>
          <TopBar>
            <SearchInput
              placeholder="Search supplier by name..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            
            {userAccessLevel >= 40 && (
                <AddButton onClick={() => setIsModalOpen(true)}>
                + Add Supplier
                </AddButton>
            )}
          </TopBar>

          {filtered.length === 0 ? (
            <EmptyMessage>No suppliers found.</EmptyMessage>
          ) : (
            <SuppliersTable>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.id} style={{ opacity: item.is_active ? 1 : 0.6 }}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.phone_number}</td>
                    <td>{item.email}</td>
                    
                    <td style={{ 
                        color: item.is_active ? '#27ae60' : '#e74c3c', 
                        fontWeight: 'bold' 
                    }}>
                        {item.is_active ? 'Active' : 'Inactive'}
                    </td>

                    <td style={{ display: 'flex', gap: '5px' }}>
                      
                      {/* --- BUTTON: CHECK PRODUCTS (MODAL) --- */}
                      <ActionButton 
                        onClick={() => handleCheckProducts(item)}
                        style={{ backgroundColor: '#1abc9c' }} 
                        title="View Products in Modal"
                      >
                        Check Products
                      </ActionButton>

                      {userAccessLevel >= 40 && (
                          <ActionButton 
                            $delete 
                            onClick={() => handleDelete(item.id)}
                            title="Delete Supplier"
                          >
                            Delete
                          </ActionButton>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </SuppliersTable>
          )}
        </PageContainer>

        <AddSupplierModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            onRefresh={fetchSuppliers}
        />

        {/* --- MODAL FOR PRODUCTS LIST --- */}
        <SupplierProductsModal 
            isOpen={isProductsModalOpen}
            onClose={() => setIsProductsModalOpen(false)}
            supplier={selectedSupplier}
        />
    </>
  );
}