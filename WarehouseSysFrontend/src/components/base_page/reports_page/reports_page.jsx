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
  const [reportType, setReportType] = useState("invoice"); // Дефолтне значення

  // Результат
  const [generatedHtml, setGeneratedHtml] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
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
  }, [isModalOpen]);

  const handleGenerate = async () => {
    if (!selectedTransId) {
      alert("Please select a transaction first.");
      return;
    }

    try {
      // 1. ЕНДПОІНТ: Оновлений загальний роут
      const response = await fetch(`http://localhost:8080/reports/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 2. BODY: Оновлена структура JSON
        body: JSON.stringify({
          report_type: reportType,       // "invoice" або "act"
          report_format: "html",         // Завжди "html"
          transaction_id: parseInt(selectedTransId) // ID передаємо тут, як число
        }),
      });
      
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Failed to generate report");
      }

      // Отримуємо HTML рядок
      const resultHtml = await response.text();

      setGeneratedHtml(resultHtml);
      setIsModalOpen(false); 

    } catch (error) {
      console.error("Error generating report:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <SectionTitle>Reports</SectionTitle>
      
      <ContentCard>
        <ReportsContainer>
            <p>Generate document and reports:</p>
            
            <ControlsContainer>
                <ReportButton onClick={() => setIsModalOpen(true)}>
                    📄 Generate new document
                </ReportButton>
            </ControlsContainer>
        </ReportsContainer>
      </ContentCard>

      {/* --- PREVIEW AREA --- */}
      {generatedHtml && (
          <ReportPreviewBox>
              <PreviewHeader>
                  <h4>Document review</h4>
                  <ClosePreviewButton onClick={() => setGeneratedHtml(null)}>Close X</ClosePreviewButton>
              </PreviewHeader>
              <StyledIframe title="Report Preview" srcDoc={generatedHtml} />
          </ReportPreviewBox>
      )}

      {/* --- MODAL WINDOW --- */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalTitle>Document generation</ModalTitle>
            
            {/* 1. Вибір транзакції */}
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
            </FormGroup>

            {/* 2. Вибір ТИПУ звіту (invoice / act) */}
            <FormGroup>
                <Label>Document type:</Label>
                <Select 
                    value={reportType} 
                    onChange={e => setReportType(e.target.value)}
                >
                    <option value="invoice">Invoice</option>
                    <option value="act">Write-off Act</option>
                </Select>
            </FormGroup>

            {/* 3. Формат (Тільки HTML, заблокований) */}
            <FormGroup>
                <Label>File format:</Label>
                <Select disabled value="html">
                    <option value="html">HTML Document</option>
                </Select>
            </FormGroup>

            <ModalActions>
                <CancelButton onClick={() => setIsModalOpen(false)}>Cancel</CancelButton>
                <GenerateButton onClick={handleGenerate} disabled={!selectedTransId}>
                    Generate
                </GenerateButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}