import React, { useState, useEffect } from "react";
import { ContentCard, SectionTitle } from '../base_page.styled';
import {
  ReportsContainer,
  ControlsContainer,
  ReportButton,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  FormGroup,
  Label,
  Select,
  Input,
  ModalActions,
  CancelButton,
  GenerateButton,
  ReportPreviewBox,
  PreviewHeader,
  ClosePreviewButton,
  StyledIframe
} from "./reports_page.styled";

export default function ReportsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Дані
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(false);

  // Стейт форми
  const [reportType, setReportType] = useState("invoice"); 
  const [selectedTransId, setSelectedTransId] = useState("");
  
  // Стейт параметрів
  const [selectedProductId, setSelectedProductId] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState(""); // Використовується як "дата з" або "дата перевірки стану"

  // Результат
  const [generatedHtml, setGeneratedHtml] = useState(null);

  const currentUserId = localStorage.getItem("employeeId"); 

  // --- ЕФЕКТИ ЗАВАНТАЖЕННЯ ДАНИХ ---

  // 1. Завантаження ТРАНЗАКЦІЙ (для Invoice/Act)
  useEffect(() => {
    if (isModalOpen && (reportType === 'invoice' || reportType === 'act')) {
      setLoading(true);
      fetch("http://localhost:8080/inventory_transactions/all")
        .then(res => res.json())
        .then(data => {
            const sorted = data.sort((a, b) => {
                const dateA = a.timestamp || "";
                const dateB = b.timestamp || "";
                return dateB.localeCompare(dateA);
            });
            setTransactions(sorted);
        })
        .catch(err => console.error("Failed to load transactions", err))
        .finally(() => setLoading(false));
    }
  }, [isModalOpen, reportType]);

  // 2. Завантаження ПРОДУКТІВ (для Dynamic Report ТА Warehouse State)
  useEffect(() => {
    if (isModalOpen && (reportType === 'product_move_dynamic' || reportType === 'warehouse_state')) {
      setLoading(true);
      fetch("http://localhost:8080/products/all") 
        .then(res => res.json())
        .then(data => {
            const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
            setProducts(sorted);
        })
        .catch(err => console.error("Failed to load products", err))
        .finally(() => setLoading(false));
    }
  }, [isModalOpen, reportType]);

  // Функція відкриття модалки
  const openModalWithType = (type) => {
    setReportType(type);
    setSelectedTransId("");
    setSelectedProductId("");
    setDateFrom("");
    setDateTo("");
    setIsModalOpen(true);
  };

  const handleGenerate = async () => {
    let endpoint = "";
    let requestBody = {};

    // --- ЛОГІКА ДЛЯ РІЗНИХ ТИПІВ ---

    if (reportType === "warehouse_state") {
        // Валідація: Дата обов'язкова
        if (!dateTo) {
            alert("Please select a date.");
            return;
        }

        endpoint = "http://localhost:8080/reports/create_warehouse_state_report";
        
        requestBody = {
            date_to: dateTo,
            report_type: "warehouse_state",
            report_format: "html",
            responsible_employee_id: parseInt(currentUserId, 10)
        };

        // Опціональне додавання продукту
        // Додаємо ключ product_id ТІЛЬКИ якщо вибрано продукт (не пустий рядок)
        if (selectedProductId) {
            requestBody.product_id = parseInt(selectedProductId);
        }

    } else if (reportType === "product_move_dynamic") {
        if (!selectedProductId || !dateFrom || !dateTo) {
            alert("Please select a product and specify date range.");
            return;
        }

        endpoint = "http://localhost:8080/reports/create_dynamic_report";
        requestBody = {
            product_id: parseInt(selectedProductId),
            date_from: dateFrom,
            date_to: dateTo,
            report_type: "product_move_dynamic",
            report_format: "html"
        };

    } else if (reportType === "financial_report") {
        endpoint = "http://localhost:8080/reports/create_financial_report";
        requestBody = {
            report_type: reportType,       
            report_format: "html",         
            responsible_employee_id: parseInt(currentUserId, 10)
        };

    } else {
        // Invoice / Act
        if (!selectedTransId) {
            alert("Please select a transaction first.");
            return;
        }
        endpoint = "http://localhost:8080/reports/create";
        requestBody = {
            report_type: reportType,       
            report_format: "html",
            transaction_id: parseInt(selectedTransId),         
            responsible_employee_id: parseInt(currentUserId, 10)
        };
    }

    // --- ВІДПРАВКА ЗАПИТУ ---
    try {
      console.log("Sending request to:", endpoint);
      console.log("Body:", requestBody);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Failed to generate report");
      }

      const resultHtml = await response.text();
      setGeneratedHtml(resultHtml);
      setIsModalOpen(false); 

    } catch (error) {
      console.error("Error generating report:", error);
      alert("Error: " + error.message);
    }
  };

  const getModalTitle = () => {
      switch(reportType) {
          case 'invoice': return 'Generate Invoice';
          case 'act': return 'Generate Write-off Act';
          case 'financial_report': return 'Financial Report';
          case 'product_move_dynamic': return 'Product Dynamic Report';
          case 'warehouse_state': return 'Warehouse State Report';
          default: return 'Document Generation';
      }
  };

  return (
    <>
      <SectionTitle>Reports</SectionTitle>
      
      <ContentCard>
        <ReportsContainer>
            <p>Select document type to generate:</p>
            
            <ControlsContainer>
                <ReportButton onClick={() => openModalWithType('invoice')}>
                    📄 Invoice
                </ReportButton>

                <ReportButton onClick={() => openModalWithType('act')} style={{ backgroundColor: '#e67e22' }}>
                    🗑️ Write-off Act
                </ReportButton>

                <ReportButton onClick={() => openModalWithType('financial_report')} style={{ backgroundColor: '#8e44ad' }}>
                    💰 Financial Report
                </ReportButton>

                <ReportButton onClick={() => openModalWithType('product_move_dynamic')} style={{ backgroundColor: '#27ae60' }}>
                    📈 Product Dynamic
                </ReportButton>

                {/* НОВА КНОПКА */}
                <ReportButton onClick={() => openModalWithType('warehouse_state')} style={{ backgroundColor: '#16a085' }}>
                    🏭 Warehouse State
                </ReportButton>
            </ControlsContainer>
        </ReportsContainer>
      </ContentCard>

      {generatedHtml && (
          <ReportPreviewBox>
              <PreviewHeader>
                  <h4>Document review</h4>
                  <ClosePreviewButton onClick={() => setGeneratedHtml(null)}>Close X</ClosePreviewButton>
              </PreviewHeader>
              <StyledIframe title="Report Preview" srcDoc={generatedHtml} />
          </ReportPreviewBox>
      )}

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalTitle>{getModalTitle()}</ModalTitle>
            
            {/* --- FORM FIELDS START --- */}

            {/* 1. Transaction Select (Invoice/Act) */}
            {(reportType === 'invoice' || reportType === 'act') && (
                <FormGroup>
                    <Label>Select transaction:</Label>
                    <Select 
                        value={selectedTransId} 
                        onChange={e => setSelectedTransId(e.target.value)}
                        disabled={loading}
                    >
                        <option value="">-- Transaction --</option>
                        {transactions.map(t => (
                            <option key={t.id} value={t.id}>
                                ID: {t.id} | {t.timestamp} | {t.quantity_change > 0 ? '+' : ''}{t.quantity_change}
                            </option>
                        ))}
                    </Select>
                    {loading && <small>Loading transactions...</small>}
                </FormGroup>
            )}

            {/* 2. Product Select (Dynamic Report OR Warehouse State) */}
            {(reportType === 'product_move_dynamic' || reportType === 'warehouse_state') && (
                <FormGroup>
                    <Label>Select Product {reportType === 'warehouse_state' ? '(Optional)' : ''}:</Label>
                    <Select
                        value={selectedProductId}
                        onChange={e => setSelectedProductId(e.target.value)}
                        disabled={loading}
                    >
                        {/* Опція для вибору всіх продуктів (для warehouse_state це означає product_id не буде в JSON) */}
                        <option value="">
                            {reportType === 'warehouse_state' ? '-- All Products --' : '-- Choose Product --'}
                        </option>
                        {products.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.name} (SKU: {p.article})
                            </option>
                        ))}
                    </Select>
                </FormGroup>
            )}

            {/* 3. Dates for Dynamic Report */}
            {reportType === 'product_move_dynamic' && (
                <>
                    <FormGroup>
                        <Label>Date From:</Label>
                        <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Date To:</Label>
                        <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
                    </FormGroup>
                </>
            )}

            {/* 4. Date for Warehouse State */}
            {reportType === 'warehouse_state' && (
                <FormGroup>
                    <Label>Check state at date:</Label>
                    <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
                </FormGroup>
            )}

            {/* --- FORM FIELDS END --- */}

            <FormGroup>
                <Label>File format:</Label>
                <Select disabled value="html">
                    <option value="html">HTML Document</option>
                </Select>
            </FormGroup>

            <ModalActions>
                <CancelButton onClick={() => setIsModalOpen(false)}>Cancel</CancelButton>
                
                <GenerateButton 
                    onClick={handleGenerate} 
                    disabled={
                        (reportType === 'product_move_dynamic' && (!selectedProductId || !dateFrom || !dateTo)) ||
                        ((reportType === 'invoice' || reportType === 'act') && !selectedTransId) ||
                        (reportType === 'warehouse_state' && !dateTo) // Тільки дата обов'язкова
                    }
                >
                    Generate
                </GenerateButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}