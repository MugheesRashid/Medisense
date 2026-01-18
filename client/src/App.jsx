import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import SymptomSelectionDashboard from "./pages/SymptomSelectionDashboard";
import SymptomResult from "./pages/SymptomResult";
import FollowUpQuestions from "./pages/FollowUpQuestions";
import MedicalHistory from "./pages/MedicalHistory";
import { ToastContainer } from "react-toastify";

import WorkflowHandler from "./components/WorkflowHandler";
import "./assets/style/rtl.css";

import { LanguageProvider } from "./context/LanguageContext";
const App = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [results, setResults] = useState({noresult: true});
  const [AIQuestions, setAIQuestions] = useState([]);

  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route
          path="/symptoms"
          element={
            <WorkflowHandler AIQuestions={AIQuestions}>
              <SymptomSelectionDashboard
                setSymptoms={setSymptoms}
                setAIQuestions={setAIQuestions}
              />
            </WorkflowHandler>
          }
        ></Route>
        <Route
          path="/follow-up-questions"
          element={
            <WorkflowHandler>
              <FollowUpQuestions
                questionsByAI={AIQuestions}
                setResults={setResults}
                medicalHistory={medicalHistory}
                symptoms={symptoms}
              />
            </WorkflowHandler>
          }
        ></Route>
        <Route
          path="/medical-history"
          element={
            <WorkflowHandler>
              <MedicalHistory setMedicalHistory={setMedicalHistory} />
            </WorkflowHandler>
          }
        ></Route>
        <Route
          path="/results"
          element={
            <WorkflowHandler>
              <SymptomResult results={results} />
            </WorkflowHandler>
          }
        ></Route>
      </Routes>
            <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

    </LanguageProvider>
  );
};

export default App;
