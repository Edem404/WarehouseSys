import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ProductsContainer,
  TopBar,
  SearchInput,
  AddButton,
  ProductsTable,
  EmptyMessage,
  ActionButton,
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
  StockInfo 
} from "./product_page.styled";

import { SectionTitle } from "../base_page.styled"; 

// --- УНІВЕРСАЛЬНА МОДАЛКА (СТВОРЕННЯ / РЕДАГУВАННЯ) ---
const ProductFormModal = ({ isOpen, onClose, onRefresh, productToEdit }) => {
    const [formData, setFormData] = useState({
        name: '',
        article: '',
        quantity: '',
        price: '',
        min_quantity_threshold: '', 
        product_type_id: '',
        supplier_id: ''
    });

    const [productTypes, setProductTypes] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    // 1. Завантаження довідників (Типи, Постачальники)
    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                try {
                    const typesRes = await fetch("http://localhost:8080/product_types/all");
                    if (typesRes.ok) setProductTypes(await typesRes.json());
                    
                    const supRes = await fetch("http://localhost:8080/suppliers/all");
                    if (supRes.ok) setSuppliers(await supRes.json());
                } catch (error) {
                    console.error("Error fetching dependencies:", error);
                }
            };
            fetchData();
        }
    }, [isOpen]);

    // 2. Логіка заповнення форми при відкритті
    useEffect(() => {
        if (isOpen) {
            if (productToEdit) {
                // РЕЖИМ РЕДАГУВАННЯ: Заповнюємо даними з пропсу (без запиту на бек)
                setFormData({
                    name: productToEdit.name,
                    article: productToEdit.article || productToEdit.sku || '',
                    quantity: productToEdit.quantity,
                    price: productToEdit.price,
                    min_quantity_threshold: productToEdit.min_quantity_threshold || '',
                    product_type_id: productToEdit.product_type_id,
                    supplier_id: productToEdit.supplier_id
                });
            } else {
                // РЕЖИМ СТВОРЕННЯ: Очищаємо форму
                setFormData({
                    name: '',
                    article: '',
                    quantity: '',
                    price: '',
                    min_quantity_threshold: '',
                    product_type_id: '',
                    supplier_id: ''
                });
            }
        }
    }, [isOpen, productToEdit]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        // Валідація
        if (!formData.name || !formData.article || !formData.quantity === '' || 
            !formData.price === '' || !formData.product_type_id || !formData.supplier_id) {
            alert("Please fill in all required fields");
            return;
        }

        const payload = {
            name: formData.name,
            article: formData.article,
            quantity: parseInt(formData.quantity),
            price: parseFloat(formData.price),
            min_quantity_threshold: formData.min_quantity_threshold ? parseInt(formData.min_quantity_threshold) : 0,
            product_type_id: parseInt(formData.product_type_id),
            supplier_id: parseInt(formData.supplier_id)
        };

        try {
            let url = "http://localhost:8080/products";
            let method = "POST";

            // Якщо редагуємо - змінюємо URL та метод
            if (productToEdit) {
                url = `http://localhost:8080/products/edit/${productToEdit.id}`;
                method = "POST"; 
            }

            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert(productToEdit ? "Product updated!" : "Product created!");
                onClose();
                onRefresh();
            } else {
                const errorData = await response.json(); 
                alert(`Error: ${errorData.message || 'Operation failed'}`);
            }
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Failed to connect to server.");
        }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>{productToEdit ? "Edit Product" : "Add New Product"}</ModalTitle>
                
                <FormGroup>
                    <Label>Product Name:</Label>
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Wireless Mouse" />
                </FormGroup>

                <FormGroup>
                    <Label>Article:</Label>
                    <Input name="article" value={formData.article} onChange={handleChange} placeholder="e.g. ART-12345" />
                </FormGroup>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <FormGroup>
                        <Label>Quantity:</Label>
                        <Input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="0" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Price (UAH):</Label>
                        <Input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" />
                    </FormGroup>
                </div>

                <FormGroup>
                    <Label>Min Threshold (Alert Level):</Label>
                    <Input 
                        type="number" 
                        name="min_quantity_threshold" 
                        value={formData.min_quantity_threshold} 
                        onChange={handleChange} 
                        placeholder="e.g. 10 (Optional)" 
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Product Type:</Label>
                    <Select name="product_type_id" value={formData.product_type_id} onChange={handleChange}>
                        <option value="">-- Select Type --</option>
                        {productTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.type_name}</option>
                        ))}
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label>Supplier:</Label>
                    <Select name="supplier_id" value={formData.supplier_id} onChange={handleChange}>
                        <option value="">-- Select Supplier --</option>
                        {suppliers.map(sup => (
                            <option key={sup.id} value={sup.id}>{sup.name} (Ph: {sup.phone_number}, {sup.email})</option>
                        ))}
                    </Select>
                </FormGroup>
                <ModalButtons>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton onClick={handleSubmit}>
                        {productToEdit ? "Save Changes" : "Create"}
                    </SubmitButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};

// --- INVENTORY TRANSACTION MODAL (Без змін) ---
const InventoryTransactionModal = ({ isOpen, onClose, product, type, onRefresh }) => {
    const [quantity, setQuantity] = useState('');

    if (!isOpen || !product) return null;

    let title = '';
    let btnText = '';
    let btnColor = '';
    let transactionTypeId = 0; 

    const ID_WRITEOFF = 1;
    const ID_RECEIPT = 2;
    const ID_SHIPMENT = 3; 

    switch (type) {
        case 'receipt':
            title = `Надходження: ${product.name}`;
            btnText = "Add Stock";
            btnColor = "#27ae60"; 
            transactionTypeId = ID_RECEIPT; 
            break;
        case 'writeoff':
            title = `Списання: ${product.name}`;
            btnText = "Write Off";
            btnColor = "#e67e22"; 
            transactionTypeId = ID_WRITEOFF;
            break;
        case 'shipment':
            title = `Відвантаження: ${product.name}`;
            btnText = "Ship Product";
            btnColor = "#3498db"; 
            transactionTypeId = ID_SHIPMENT; 
            break;
        default:
            break;
    }

    const handleSubmit = async () => {
        if (!quantity || parseInt(quantity) === 0) {
            alert("Please enter a valid quantity");
            return;
        }

        const storedEmployeeId = localStorage.getItem('employeeId');
        if (!storedEmployeeId) {
            alert("Error: Employee not identified. Please relogin.");
            return;
        }

        const absQty = Math.abs(parseInt(quantity));
        let qtyChange = 0;

        if (type === 'receipt') {
            qtyChange = absQty; 
        } else {
            qtyChange = -absQty; 
        }

        const payload = {
            product_id: product.id,
            transaction_type_id: transactionTypeId,
            employee_id: parseInt(storedEmployeeId),
            quantity_change: qtyChange
        };

        try {
            const response = await fetch("http://localhost:8080/inventory_transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Transaction successful!");
                onClose();
                setQuantity('');
                onRefresh();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Transaction failed'}`);
            }
        } catch (error) {
            console.error("Transaction error:", error);
            alert("Failed to connect to server.");
        }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>{title}</ModalTitle>
                
                <StockInfo>
                    Current stock: <b>{product.quantity}</b>
                </StockInfo>

                <FormGroup>
                    <Label>Quantity {type === 'receipt' ? "to Add" : "to Remove"}:</Label>
                    <Input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        placeholder="Enter quantity (positive number)"
                        autoFocus
                        min="1"
                    />
                </FormGroup>

                <ModalButtons>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton 
                        onClick={handleSubmit} 
                        style={{ backgroundColor: btnColor }}
                    >
                        {btnText}
                    </SubmitButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};

// --- ГОЛОВНА СТОРІНКА ---
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  
  // Стан для модалки форми (Створення / Редагування)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // Стан для транзакцій
  const [isTransModalOpen, setIsTransModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [transType, setTransType] = useState('receipt'); 
  
  const navigate = useNavigate();

  const fetchProducts = () => {
    fetch("http://localhost:8080/products/all")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  // Відкриття модалки СТВОРЕННЯ
  const openCreateModal = () => {
      setProductToEdit(null); // Очищаємо, щоб це було створення
      setIsFormModalOpen(true);
  };

  // Відкриття модалки РЕДАГУВАННЯ
  const openEditModal = (product) => {
      setProductToEdit(product); // Передаємо існуючий продукт
      setIsFormModalOpen(true);
  };

  const openTransactionModal = (product, type) => {
      setSelectedProduct(product);
      setTransType(type);
      setIsTransModalOpen(true);
  };

  const handleDelete = async (id) => {
      if(window.confirm("Are you sure you want to delete this product?")) {
          try {
              const res = await fetch(`http://localhost:8080/products/${id}`, { method: 'DELETE' });
              if (res.ok) {
                  fetchProducts();
              } else {
                  alert("Failed to delete product");
              }
          } catch (e) {
              console.error(e);
          }
      }
  };

  return (
    <>
        <SectionTitle>Product list</SectionTitle>

        <ProductsContainer>
          <TopBar>
            <SearchInput
              placeholder="Search by name..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <AddButton onClick={openCreateModal}>
              Add product
            </AddButton>
          </TopBar>

          {filtered.length === 0 ? (
            <EmptyMessage>Products not founded.</EmptyMessage>
          ) : (
            <ProductsTable>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Article</th>
                  <th>Quantity</th>
                  <th>Quantity Threshold</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => {
                  const isLowStock = item.quantity <= (item.min_quantity_threshold || 0);

                  return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.article || item.sku}</td> 
                        
                        <td style={{ 
                            color: isLowStock ? '#e74c3c' : '#34495e', 
                            fontWeight: isLowStock ? 'bold' : 'normal' 
                        }}>
                            {item.quantity} 
                            {isLowStock && ' ⚠️'}
                        </td>

                        <td>{item.min_quantity_threshold || 0}</td>

                        <td>{item.price} грн</td>
                        
                        <td style={{ display: 'flex', gap: '5px' }}>
                        
                        <ActionButton 
                            onClick={() => openTransactionModal(item, 'receipt')}
                            style={{ backgroundColor: '#27ae60' }}
                            title="Add Stock"
                        >
                            Receipt
                        </ActionButton>

                        <ActionButton 
                            onClick={() => openTransactionModal(item, 'shipment')}
                            style={{ backgroundColor: '#3498db' }}
                            title="Ship Product"
                        >
                            Shipment
                        </ActionButton>

                        <ActionButton 
                            onClick={() => openTransactionModal(item, 'writeoff')}
                            style={{ backgroundColor: '#e67e22' }}
                            title="Write Off Stock"
                        >
                            Writeoff
                        </ActionButton>

                        {/* Кнопка EDIT - Жовто-помаранчева */}
                        <ActionButton 
                            onClick={() => openEditModal(item)}
                            style={{ backgroundColor: '#f39c12' }}
                            title="Edit Product Details"
                        >
                            Edit
                        </ActionButton>

                        <ActionButton 
                            $delete 
                            onClick={() => handleDelete(item.id)}
                            title="Delete Product"
                        >
                            Delete
                        </ActionButton>

                        </td>
                    </tr>
                  );
                })}
              </tbody>
            </ProductsTable>
          )}
        </ProductsContainer>

        {/* Універсальна модалка для форми */}
        <ProductFormModal 
            isOpen={isFormModalOpen} 
            onClose={() => setIsFormModalOpen(false)}
            onRefresh={fetchProducts}
            productToEdit={productToEdit} // Передаємо продукт, якщо редагуємо
        />

        {/* Модалка транзакцій */}
        <InventoryTransactionModal 
            isOpen={isTransModalOpen}
            onClose={() => setIsTransModalOpen(false)}
            product={selectedProduct}
            type={transType}
            onRefresh={fetchProducts}
        />
    </>
  );
}