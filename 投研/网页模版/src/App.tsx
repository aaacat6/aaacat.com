import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReportPage } from './pages/ReportPage';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>);

}