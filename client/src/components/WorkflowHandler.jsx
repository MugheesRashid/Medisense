import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const workflowRoutes = {
  symptom_selection: "/symptoms",
  medical_history: "/medical-history",
  medisense_ai_questions: "/follow-up-questions",
  results: "/results",
};

function WorkflowHandler({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const draft = localStorage.getItem("medisense_symptoms_draft");
    const workflow = localStorage.getItem("workflowInProgress");
    const questionsByAI = localStorage.getItem("medisense_ai_questions");

    let nextWorkflow = workflow;

    if (!draft || draft === "null" || draft === "[]" || draft === null) {
      nextWorkflow = "symptom_selection";
    } else if (!workflow) {
      if (questionsByAI) {
        nextWorkflow = "medisense_ai_questions";
      } else if (draft) {
        nextWorkflow = "symptom_selection";
      }
    }

    // Set workflow in localStorage if it changed
    if (nextWorkflow && nextWorkflow !== workflow) {
      localStorage.setItem("workflowInProgress", nextWorkflow);
    }

    // Navigate to the route if it exists
    if (nextWorkflow && workflowRoutes[nextWorkflow]) {
      navigate(workflowRoutes[nextWorkflow], { replace: true });
    }
  }, [navigate]);

  return <>{children}</>;
}

export default WorkflowHandler;
