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
  const [transactions, setTransactions] = useState([]);
  const [loadingTrans, setLoadingTrans] = useState(false);

  // Стейт форми
  const [selectedTransId, setSelectedTransId] = useState("");
  const [reportType, setReportType] = useState("invoice"); 

  // Результат
  const [generatedHtml, setGeneratedHtml] = useState(null);

  // Отримуємо ID поточного юзера
  const currentUserId = localStorage.getItem("employeeId"); 

  // Завантаження транзакцій (потрібне тільки якщо модалка відкрита і тип не фінансовий звіт)
  useEffect(() => {
    if (isModalOpen && reportType !== 'financial_report') {
      setLoadingTrans(true);
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
        .finally(() => setLoadingTrans(false));
    }
  }, [isModalOpen, reportType]);

  // Функція для відкриття модалки з конкретним типом
  const openModalWithType = (type) => {
    setReportType(type);
    setSelectedTransId(""); // Скидаємо вибір транзакції
    setIsModalOpen(true);
  };

  const handleGenerate = async () => {
    // Валідація: ID транзакції потрібен тільки якщо це НЕ фінансовий звіт
    if (reportType !== "financial_report" && !selectedTransId) {
      alert("Please select a transaction first.");
      return;
    }

    try {
      // 1. ЛОГІКА ВИБОРУ ЕНДПОІНТУ
      let endpoint = "http://localhost:8080/reports/create"; 
      
      if (reportType === "financial_report") {
          endpoint = "http://localhost:8080/reports/create_multi_product"; 
      }

      // Формуємо тіло запиту
      const requestBody = {
        report_type: reportType,       
        report_format: "html",         
        responsible_employee_id: parseInt(currentUserId, 10)
      };

      console.log(requestBody)
      
      // Додаємо transaction_id тільки якщо це не фінансовий звіт
      if (reportType !== "financial_report") {
          requestBody.transaction_id = parseInt(selectedTransId);
      }

      // 2. ВИКОНАННЯ POST ЗАПИТУ
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  // Helper для заголовка модалки
  const getModalTitle = () => {
      switch(reportType) {
          case 'invoice': return 'Generate Invoice';
          case 'act': return 'Generate Write-off Act';
          case 'financial_report': return 'Generate Financial Report';
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
                {/* 3 окремі кнопки для кожного типу */}
                <ReportButton onClick={() => openModalWithType('invoice')}>
                    📄 Invoice
                </ReportButton>

                <ReportButton onClick={() => openModalWithType('act')} style={{ backgroundColor: '#e67e22' }}>
                    🗑️ Write-off Act
                </ReportButton>

                <ReportButton onClick={() => openModalWithType('financial_report')} style={{ backgroundColor: '#8e44ad' }}>
                    💰 Financial Report
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
            
            {/* 1. Вибір транзакції (Приховано для financial_report) */}
            {reportType !== 'financial_report' && (
                <FormGroup>
                    <Label>Select transaction:</Label>
                    <Select 
                        value={selectedTransId} 
                        onChange={e => setSelectedTransId(e.target.value)}
                        disabled={loadingTrans}
                    >
                        <option value="">-- Transaction --</option>
                        {transactions.map(t => (
                            <option key={t.id} value={t.id}>
                                ID: {t.id} | {t.timestamp} | {t.quantity_change > 0 ? '+' : ''}{t.quantity_change}
                            </option>
                        ))}
                    </Select>
                    {loadingTrans && <small>Loading transactions...</small>}
                </FormGroup>
            )}

            {/* 2. Формат (Тільки HTML, заблокований) */}
            <FormGroup>
                <Label>File format:</Label>
                <Select disabled value="html">
                    <option value="html">HTML Document</option>
                </Select>
            </FormGroup>

            <ModalActions>
                <CancelButton onClick={() => setIsModalOpen(false)}>Cancel</CancelButton>
                {/* Кнопка активна для фін. звіту завжди, для інших - якщо обрана транзакція */}
                <GenerateButton 
                    onClick={handleGenerate} 
                    disabled={reportType !== 'financial_report' && !selectedTransId}
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