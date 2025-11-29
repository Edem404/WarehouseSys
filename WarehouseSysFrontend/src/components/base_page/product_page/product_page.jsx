// products_page.jsx (або там де він у вас лежить)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ProductsContainer,
  TopBar,
  SearchInput,
  AddButton,
  ProductsTable,
  EmptyMessage,
  ActionButton
} from "./product_page.styled";

// Ми видалили імпорт PageContainer та MainContent, бо вони вже є у BasePage
import { SectionTitle } from "../base_page.styled"; 

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  // ПОВЕРТАЄМО ЛИШЕ ВНУТРІШНІЙ КОНТЕНТ (без PageContainer/MainContent)
  return (
    <>
        <SectionTitle>Список товарів</SectionTitle>

        <ProductsContainer>
          <TopBar>
            <SearchInput
              placeholder="Пошук за назвою..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <AddButton onClick={() => navigate("/products/create")}>
              Додати товар
            </AddButton>
          </TopBar>

          {filtered.length === 0 ? (
            <EmptyMessage>Товари не знайдено.</EmptyMessage>
          ) : (
            <ProductsTable>
              {/* ... ваша таблиця без змін ... */}
              <thead>
                <tr>
                  <th>ID</th><th>Назва</th><th>SKU</th><th>Кількість</th><th>Ціна</th><th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.sku}</td>
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
    </>
  );
}