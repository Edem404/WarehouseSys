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
  Select, // Не забудьте імпортувати Select
  ModalButtons,
  CancelButton,
  SubmitButton
} from "./product_page.styled";

import { SectionTitle } from "../base_page.styled"; 

// --- КОМПОНЕНТ МОДАЛЬНОГО ВІКНА ---
const CreateProductModal = ({ isOpen, onClose, onRefresh }) => {
    // Оновлений початковий стан згідно з вашими вимогами
    const [formData, setFormData] = useState({
        name: '',
        article: '', // Було sku
        quantity: '',
        price: '',
        product_type_id: '',
        supplier_id: ''
    });

    // Стейт для списків, що підтягуються з БД
    const [productTypes, setProductTypes] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    // Завантаження даних при відкритті модалки
    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                try {
                    // 1. Отримуємо типи продуктів
                    // Припускаю ендпоінт /product_types, замініть якщо інший
                    const typesRes = await fetch("http://localhost:8080/product_types/all");
                    if (typesRes.ok) {
                        const typesData = await typesRes.json();
                        setProductTypes(typesData);
                    }

                    // 2. Отримуємо постачальників
                    // Припускаю ендпоінт /suppliers, замініть якщо інший
                    const supRes = await fetch("http://localhost:8080/suppliers/all");
                    if (supRes.ok) {
                        const supData = await supRes.json();
                        setSuppliers(supData);
                    }
                } catch (error) {
                    console.error("Error fetching dependencies:", error);
                }
            };
            fetchData();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        // Валідація всіх полів
        if (!formData.name || !formData.article || !formData.quantity || 
            !formData.price || !formData.product_type_id || !formData.supplier_id) {
            alert("Please fill in all fields");
            return;
        }

        // Формування JSON
        const payload = {
            name: formData.name,
            article: formData.article,
            quantity: parseInt(formData.quantity),
            price: parseFloat(formData.price),
            product_type_id: parseInt(formData.product_type_id),
            supplier_id: parseInt(formData.supplier_id)
        };

        try {
            const response = await fetch("http://localhost:8080/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Product created successfully!");
                onClose();
                // Скидаємо форму
                setFormData({ 
                    name: '', article: '', quantity: '', 
                    price: '', product_type_id: '', supplier_id: '' 
                });
                onRefresh();
            } else {
                const errorData = await response.json(); 
                alert(`Error: ${errorData.message || 'Failed to create product'}`);
            }
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to connect to server.");
        }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>Add New Product</ModalTitle>
                
                <FormGroup>
                    <Label>Product Name:</Label>
                    <Input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="e.g. Wireless Mouse"
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Article:</Label>
                    <Input 
                        name="article" 
                        value={formData.article} 
                        onChange={handleChange} 
                        placeholder="e.g. ART-12345"
                    />
                </FormGroup>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <FormGroup>
                        <Label>Quantity:</Label>
                        <Input 
                            type="number"
                            name="quantity" 
                            value={formData.quantity} 
                            onChange={handleChange} 
                            placeholder="0"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Price (UAH):</Label>
                        <Input 
                            type="number"
                            step="0.01"
                            name="price" 
                            value={formData.price} 
                            onChange={handleChange} 
                            placeholder="0.00"
                        />
                    </FormGroup>
                </div>

                {/* Випадаючий список для TYPE */}
                <FormGroup>
                    <Label>Product Type:</Label>
                    <Select 
                        name="product_type_id" 
                        value={formData.product_type_id} 
                        onChange={handleChange}
                    >
                        <option value="">-- Select Type --</option>
                        {productTypes.map(type => (
                            <option key={type.id} value={type.id}>
                                {type.type_name}
                            </option>
                        ))}
                    </Select>
                </FormGroup>

                {/* Випадаючий список для SUPPLIER */}
                <FormGroup>
                    <Label>Supplier:</Label>
                    <Select 
                        name="supplier_id" 
                        value={formData.supplier_id} 
                        onChange={handleChange}
                    >
                        <option value="">-- Select Supplier --</option>
                        {suppliers.map(sup => (
                            <option key={sup.id} value={sup.id}>
                                {/* Відображаємо всю інфу: ім'я, телефон, email */}
                                {sup.name} (Ph: {sup.phone_number}, {sup.email})
                            </option>
                        ))}
                    </Select>
                </FormGroup>

                <ModalButtons>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton onClick={handleSubmit}>Create</SubmitButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};

// --- ОСНОВНА СТОРІНКА ---
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
            <AddButton onClick={() => setIsModalOpen(true)}>
              Add product
            </AddButton>
          </TopBar>

          {filtered.length === 0 ? (
            <EmptyMessage>Products not founded.</EmptyMessage>
          ) : (
            <ProductsTable>
              <thead>
                <tr>
                  <th>ID</th><th>Назва</th><th>Article</th><th>Кількість</th><th>Ціна</th><th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    {/* Зверніть увагу, я змінив SKU на Article у відображенні */}
                    <td>{item.article || item.sku}</td> 
                    <td>{item.quantity}</td>
                    <td>{item.price} грн</td>
                    <td>
                      <ActionButton onClick={() => navigate(`/products/${item.id}`)}>Перегляд</ActionButton>
                      <ActionButton onClick={() => navigate(`/products/edit/${item.id}`)}>Редагувати</ActionButton>
                      <ActionButton $delete onClick={() => console.log("delete", item.id)}>Видалити</ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </ProductsTable>
          )}
        </ProductsContainer>

        <CreateProductModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            onRefresh={fetchProducts}
        />
    </>
  );
}