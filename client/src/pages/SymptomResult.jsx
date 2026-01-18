import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { toast, ToastContainer } from "react-toastify";

// Icon components (using SVG for consistency)
const Icons = {
  ChevronLeft: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  ),
  ChevronDown: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  ),
  ChevronUp: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  ),
  AlertTriangle: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    </svg>
  ),
  CheckCircle: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Clock: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Brain: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  ),
  Activity: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  ),
  AlertCircle: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Download: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  ),
  Printer: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
      />
    </svg>
  ),
  Globe: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Target: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  TrendingUp: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  ),
  Shield: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  Zap: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  Leaf: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>
  ),
  Users: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13 0h1m-4 3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  BookOpen: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
  Home: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
  FileText: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  Bookmark: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  ),
  MessageSquare: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  ),
  Pill: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  ),
  Heart: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  Filter: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  ),
  Star: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  ),
  Calendar: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  Thermometer: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  Eye: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  ),
  XCircle: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Search: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
  Bell: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  ),
};

const SymptomResult = ({ results }) => {
  const { t, language, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [medications, setMedications] = useState({ chinese: [], sasang: [] });
  const [expandedDisease, setExpandedDisease] = useState(null);
  const [activeMedicationTab, setActiveMedicationTab] = useState("sasang");
  const [expandedMedication, setExpandedMedication] = useState(null);
  const [severityFilter, setSeverityFilter] = useState("all");
  const [analysisConfidence, setAnalysisConfidence] = useState(89);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!results.diagnose || results == null) {
      localStorage.setItem("workflowInProgress", "symptom_selection");
      navigate("/symptoms");
      return;
    }

    if(results.diagnose && results.diagnose.length > 0) {
      toast.success("Diagnosis completed successfully!")
    } else{
      toast.error("No diagnosis could be made based on the provided symptoms.")
    }

    const savedSymptoms = localStorage.getItem("medisense_symptoms_draft");
    if (savedSymptoms) {
      try {
        const parsedSymptoms = JSON.parse(savedSymptoms);
        setSelectedSymptoms(parsedSymptoms);

        // Set diseases from results
        if (results.diagnose && Array.isArray(results.diagnose)) {
          // Map the API results to include all fields from your example
          const formattedDiseases = results.diagnose.map((disease, index) => {
            // Map severity from string to number if needed
            const severity =
              disease.severity ||
              (disease.symptomsMatch
                ? disease.symptomsMatch
                    .filter((s) => s.includes("level"))
                    .reduce((acc, s) => {
                      const match = s.match(/level\s*(\d+)/i);
                      return match ? Math.max(acc, parseInt(match[1])) : acc;
                    }, 5)
                : 5);

            return {
              id: disease.id || index + 1,
              name: disease.name || "Unknown Condition",
              probability: disease.probability || disease.confidence || 0.5,
              criticalLevel:
                disease.criticalLevel ||
                (disease.urgency === "Low"
                  ? "low"
                  : disease.urgency === "High"
                    ? "high"
                    : "medium"),
              confidence: disease.confidence || disease.probability || 0.5,
              description:
                disease.description || t("results.defaultDescription"),
              commonality: disease.commonality || "Common",
              urgency: disease.urgency || "Moderate",
              symptomsMatch: disease.symptomsMatch || [],
              symptomsNotPresent: disease.symptomsNotPresent || [],
              possibleCauses: disease.possibleCauses || [],
              riskFactors: disease.riskFactors || [],
              complications: disease.complications || [],
              diagnosticTests: disease.diagnosticTests || [],
              timeline: disease.timeline || "Varies by condition",
              icon: disease.icon || "🟡",
              color:
                disease.color ||
                getDiseaseColor(disease.criticalLevel || "medium"),
              borderColor:
                disease.borderColor ||
                getDiseaseBorderColor(disease.criticalLevel || "medium"),
              textColor: disease.textColor || "#FFFFFF",
              severity: severity,
            };
          });
          setDiseases(formattedDiseases);

          // Calculate confidence based on results
          if (results.diagnose.length > 0) {
            const avgConfidence =
              results.diagnose.reduce(
                (sum, d) => sum + (d.confidence || d.probability || 0),
                0,
              ) / results.diagnose.length;
            setAnalysisConfidence(
              Math.min(95, Math.max(70, Math.floor(avgConfidence * 100))),
            );
          }
        }

        // Set medications from results
        if (results.chinese && Array.isArray(results.chinese)) {
          const formattedChineseMeds = results.chinese.map((med, index) => ({
            id: med.id || index + 1,
            name: med.name || "Unknown Medicine",
            chineseName:
              med.chineseName || med.alternativeName || "Traditional Formula",
            category: med.category || "Herbal Formula",
            uses: med.uses ||
              med.conditions || ["General wellness", "Symptom relief"],
            ingredients: med.ingredients || ["Traditional herbs"],
            dosage: med.dosage || "As directed",
            preparation: med.preparation || "Decoction",
            duration: med.duration || "Varies",
            contraindications: med.contraindications || [
              "Consult practitioner",
            ],
            precautions: med.precautions || ["Take as directed"],
            efficacy: med.efficacy || "Varies by individual",
            icon: med.icon && med.icon.length > 2 ? med.icon : "🍃",
            color: "bg-gradient-to-r from-emerald-50/60 to-teal-50/60",
          }));
          setMedications((prev) => ({
            ...prev,
            chinese: formattedChineseMeds,
          }));
        }

        if (results.sasang && Array.isArray(results.sasang)) {
          const formattedSasangMeds = results.sasang.map((med, index) => ({
            id: med.id || index + 1,
            name: med.name || "Sasang Formula",
            koreanName: med.koreanName || med.alternativeName || "사상처방",
            constitution: med.constitution || "Taeyang/Taeeum/Soyang/Soeum",
            category: med.category || "Constitutional Formula",
            uses: med.uses || med.conditions || ["Constitutional balance"],
            ingredients: med.ingredients || ["Korean herbs"],
            dosage: med.dosage || "As prescribed",
            preparation: med.preparation || "Custom preparation",
            duration: med.duration || "Varies",
            contraindications: med.contraindications || [
              "Mismatched constitution",
            ],
            precautions: med.precautions || ["Requires diagnosis"],
            efficacy: med.efficacy || "Varies by constitution",
            icon: med.icon || "🌿",
            color: "bg-gradient-to-r from-indigo-50/60 to-purple-50/60",
          }));
          setMedications((prev) => ({ ...prev, sasang: formattedSasangMeds }));
        }
      } catch (error) {
        console.error("Error processing results:", error);
      }
    }

    localStorage.setItem("workflowInProgress", "results");
    localStorage.removeItem("medisense_ai_questions");
    localStorage.removeItem("medical_history");
  }, [results, navigate, t]);

  const getDiseaseColor = (level) => {
    switch (level) {
      case "high":
        return "bg-gradient-to-r from-red-50/80 to-orange-50/80";
      case "medium":
        return "bg-gradient-to-r from-amber-50/80 to-yellow-50/80";
      case "low":
        return "bg-gradient-to-r from-emerald-50/80 to-teal-50/80";
      default:
        return "bg-gradient-to-r from-indigo-50/80 to-purple-50/80";
    }
  };

  const getDiseaseBorderColor = (level) => {
    switch (level) {
      case "high":
        return "border-red-300";
      case "medium":
        return "border-amber-300";
      case "low":
        return "border-emerald-300";
      default:
        return "border-indigo-300";
    }
  };

  const getCriticalColor = (level) => {
    switch (level) {
      case "high":
        return "bg-gradient-to-r from-red-100 to-orange-100 text-red-800 border-red-200";
      case "medium":
        return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border-indigo-200";
    }
  };

  const getCriticalIcon = (level) => {
    switch (level) {
      case "high":
        return <Icons.AlertTriangle className="w-4 h-4" />;
      case "medium":
        return <Icons.AlertCircle className="w-4 h-4" />;
      case "low":
        return <Icons.CheckCircle className="w-4 h-4" />;
      default:
        return <Icons.Activity className="w-4 h-4" />;
    }
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 0.8)
      return "bg-gradient-to-r from-red-500 to-orange-500";
    if (probability >= 0.6)
      return "bg-gradient-to-r from-amber-500 to-yellow-500";
    if (probability >= 0.4) return "bg-gradient-to-r from-blue-500 to-cyan-500";
    return "bg-gradient-to-r from-indigo-500 to-purple-500";
  };

  const filteredDiseases = diseases
    .filter((disease) => {
      if (severityFilter === "all") return true;
      return disease.criticalLevel === severityFilter;
    })
    .filter((disease) => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        disease.name.toLowerCase().includes(searchLower) ||
        disease.description.toLowerCase().includes(searchLower) ||
        disease.symptomsMatch.some((s) => s.toLowerCase().includes(searchLower))
      );
    });

  const exportResults = () => {
    const data = {
      analysisDate: new Date().toISOString(),
      symptoms: selectedSymptoms,
      diseases: diseases,
      medications: medications,
      confidence: analysisConfidence,
      recommendations: t("results.exportDisclaimer"),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `medisense-analysis-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const printResults = () => {
    window.print();
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 ${language === "ur" ? "rtl" : "ltr"}`}
    >
      {/* Compact Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  localStorage.setItem(
                    "workflowInProgress",
                    "symptom_selection",
                  );
                  navigate("/symptoms");
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <Icons.ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br bg-[url('/logo.png')] bg-center bg-cover rounded-lg flex items-center justify-center shadow-sm">
                </div>
                <span className="text-lg font-bold text-gray-800">
                  Medi
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Sense
                  </span>
                  <span className="text-indigo-600">AI</span>
                </span>
                <span className="text-sm text-gray-500 hidden sm:inline">
                  • {t("results.title")}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex space-x-2">
                <button
                  onClick={exportResults}
                  className="flex items-center px-3 py-2 bg-gradient-to-r from-gray-50 to-indigo-50 border border-gray-200 hover:border-indigo-300 rounded-lg text-gray-700 hover:text-indigo-700 transition-all duration-200 text-sm"
                >
                  <Icons.Download className="w-4 h-4 mr-1" />
                  {t("results.export")}
                </button>
                <button
                  onClick={printResults}
                  className="flex items-center px-3 py-2 bg-gradient-to-r from-gray-50 to-indigo-50 border border-gray-200 hover:border-indigo-300 rounded-lg text-gray-700 hover:text-indigo-700 transition-all duration-200 text-sm"
                >
                  <Icons.Printer className="w-4 h-4 mr-1" />
                  {t("results.print")}
                </button>
              </div>

              {/* Language Switcher */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-gray-50 to-indigo-50 border border-gray-200 hover:border-indigo-300 transition-all duration-200 group-hover:shadow-sm">
                  <Icons.Globe className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {language === "en"
                      ? "EN"
                      : language === "ur"
                        ? "اردو"
                        : "한국어"}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <button
                    onClick={() => changeLanguage("en")}
                    className={`w-full px-4 py-2 text-left hover:bg-indigo-50 transition-colors ${language === "en" ? "text-indigo-600 font-semibold bg-indigo-50" : "text-gray-700"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>English</span>
                      {language === "en" && (
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => changeLanguage("ur")}
                    className={`w-full px-4 py-2 text-left hover:bg-indigo-50 transition-colors ${language === "ur" ? "text-indigo-600 font-semibold bg-indigo-50" : "text-gray-700"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>اردو</span>
                      {language === "ur" && (
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => changeLanguage("ko")}
                    className={`w-full px-4 py-2 text-left hover:bg-indigo-50 transition-colors ${language === "ko" ? "text-indigo-600 font-semibold bg-indigo-50" : "text-gray-700"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>한국어</span>
                      {language === "ko" && (
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Analysis Overview */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {t("results.title")}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {t("results.basedOn")} {selectedSymptoms.length}{" "}
                {t("results.symptoms")} • {t("results.analyzedAt")}{" "}
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-xs text-gray-500 font-medium">
                  {t("results.confidence")}
                </div>
                <div className="flex items-center">
                  <Icons.Shield className="w-4 h-4 text-emerald-500 mr-2" />
                  <span className="font-bold text-gray-800">
                    {analysisConfidence}%
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                <Icons.Zap className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t("results.searchConditions")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 whitespace-nowrap">
                {t("results.filterBy")}
              </span>
              <div className="relative">
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="bg-gradient-to-r from-gray-50 to-indigo-50 border border-gray-300 hover:border-indigo-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none pr-8"
                >
                  <option value="all">{t("results.allLevels")}</option>
                  <option value="high">{t("results.highPriority")}</option>
                  <option value="medium">{t("results.mediumPriority")}</option>
                  <option value="low">{t("results.lowPriority")}</option>
                </select>
                <Icons.ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Warning Box */}
          <div className="bg-gradient-to-r from-amber-50/80 to-yellow-50/80 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start">
              <Icons.AlertTriangle className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-1 text-sm">
                  {t("results.disclaimer.title")}
                </h3>
                <p className="text-amber-700 text-xs">
                  {t("results.disclaimer.text")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Disease Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Disease Results Header */}
            <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center">
                  <Icons.Target className="w-5 h-5 mr-2 text-indigo-600" />
                  {t("results.potentialConditions")}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({filteredDiseases.length} {t("results.of")}{" "}
                    {diseases.length})
                  </span>
                </h2>
              </div>

              {/* Diseases List */}
              <div className="space-y-4">
                {filteredDiseases.length > 0 ? (
                  filteredDiseases.map((disease) => (
                    <div
                      key={disease.id}
                      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                        expandedDisease === disease.id
                          ? `${disease.borderColor} border-2`
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {/* Disease Header */}
                      <div
                        className={`p-4 cursor-pointer ${getDiseaseColor(disease.criticalLevel)}`}
                        onClick={() =>
                          setExpandedDisease(
                            expandedDisease === disease.id ? null : disease.id,
                          )
                        }
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                              {disease.icon.length > 2
                                ? disease.criticalLevel === "critical"
                                  ? "🔴"
                                  : "🟡"
                                : disease.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center flex-wrap gap-2 mb-1">
                                <h3 className="font-bold text-gray-800 truncate">
                                  {disease.name}
                                </h3>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getCriticalColor(
                                    disease.criticalLevel,
                                  )} flex items-center whitespace-nowrap`}
                                >
                                  {getCriticalIcon(disease.criticalLevel)}
                                  <span className="ml-1 capitalize">
                                    {t(
                                      `results.${disease.criticalLevel}Priority`,
                                    )}
                                  </span>
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm line-clamp-2">
                                {disease.description}
                              </p>
                              <div className="flex items-center space-x-4 mt-2 flex-wrap">
                                <div className="flex items-center text-xs text-gray-500">
                                  <Icons.Star className="w-3 h-3 mr-1" />
                                  {disease.commonality}
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                  <Icons.Calendar className="w-3 h-3 mr-1" />
                                  {disease.timeline}
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                  <Icons.Thermometer className="w-3 h-3 mr-1" />
                                  {t("results.severity")}: {disease.severity}/10
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right ml-2">
                            <div className="text-xl font-bold text-gray-800 mb-1">
                              {Math.round(disease.probability)}%
                            </div>
                            {expandedDisease === disease.id ? (
                              <Icons.ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <Icons.ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>

                        {/* Probability and Severity Bars */}
                        <div className="mt-4 space-y-2">
                          <div>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>{t("results.probability")}</span>
                              <span>
                                {Math.round(disease.probability)}%{" "}
                                {t("results.match")}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${getProbabilityColor(
                                  disease.probability,
                                )}`}
                                style={{
                                  width: `${Math.round(disease.probability)}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>{t("results.estimatedSeverity")}</span>
                              <span>{disease.severity}/10</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                style={{ width: `${disease.severity * 10}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details - COMPREHENSIVE VIEW */}
                      {expandedDisease === disease.id && (
                        <div className="p-4 bg-white border-t">
                          {/* Full Description */}
                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
                              <Icons.BookOpen className="w-4 h-4 mr-2 text-indigo-600" />
                              {t("results.fullDescription")}
                            </h4>
                            <p className="text-sm text-gray-700 bg-gray-50/50 p-3 rounded-lg">
                              {disease.description}
                            </p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                              {/* Urgency & Action */}
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
                                  <Icons.AlertCircle className="w-4 h-4 mr-2 text-indigo-600" />
                                  {t("results.urgencyAction")}
                                </h4>
                                <div
                                  className={`p-3 rounded-lg border ${getCriticalColor(
                                    disease.criticalLevel,
                                  )}`}
                                >
                                  <div className="font-medium mb-1 text-sm">
                                    {disease.urgency}
                                  </div>
                                  <p className="text-xs">
                                    {disease.criticalLevel === "high"
                                      ? t("results.seekImmediate")
                                      : disease.criticalLevel === "medium"
                                        ? t("results.scheduleAppointment")
                                        : t("results.monitorSelfCare")}
                                  </p>
                                </div>
                              </div>

                              {/* Symptoms Analysis - COMPREHENSIVE */}
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                                  {t("results.symptomsAnalysis")}
                                </h4>
                                <div className="space-y-3">
                                  {/* Matching Symptoms */}
                                  {disease.symptomsMatch &&
                                    disease.symptomsMatch.length > 0 && (
                                      <div>
                                        <div className="text-xs text-emerald-600 mb-1 flex items-center">
                                          <Icons.CheckCircle className="w-3 h-3 mr-1" />
                                          {t("results.matchingSymptoms")} (
                                          {disease.symptomsMatch.length})
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                          {disease.symptomsMatch.map(
                                            (symptom, idx) => (
                                              <span
                                                key={idx}
                                                className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs mb-1"
                                              >
                                                {symptom}
                                              </span>
                                            ),
                                          )}
                                        </div>
                                      </div>
                                    )}

                                  {/* Not Present Symptoms */}
                                  {disease.symptomsNotPresent &&
                                    disease.symptomsNotPresent.length > 0 && (
                                      <div>
                                        <div className="text-xs text-gray-500 mb-1 flex items-center">
                                          <Icons.XCircle className="w-3 h-3 mr-1" />
                                          {t("results.notPresentSymptoms")} (
                                          {disease.symptomsNotPresent.length})
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                          {disease.symptomsNotPresent.map(
                                            (symptom, idx) => (
                                              <span
                                                key={idx}
                                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs mb-1"
                                              >
                                                {symptom}
                                              </span>
                                            ),
                                          )}
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </div>

                              {/* Diagnostic Tests */}
                              {disease.diagnosticTests &&
                                disease.diagnosticTests.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                                      {t("results.diagnosticTests")}
                                    </h4>
                                    <ul className="space-y-1">
                                      {disease.diagnosticTests.map(
                                        (test, idx) => (
                                          <li
                                            key={idx}
                                            className="flex items-center text-xs"
                                          >
                                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-2"></div>
                                            {test}
                                          </li>
                                        ),
                                      )}
                                    </ul>
                                  </div>
                                )}
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                              {/* Possible Causes */}
                              {disease.possibleCauses &&
                                disease.possibleCauses.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                                      {t("results.possibleCauses")}
                                    </h4>
                                    <ul className="space-y-2">
                                      {disease.possibleCauses.map(
                                        (cause, idx) => (
                                          <li
                                            key={idx}
                                            className="flex items-start text-xs p-2 bg-gradient-to-r from-indigo-50/60 to-purple-50/60 rounded-lg"
                                          >
                                            <div className="w-4 h-4 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs">
                                              {idx + 1}
                                            </div>
                                            {cause}
                                          </li>
                                        ),
                                      )}
                                    </ul>
                                  </div>
                                )}

                              {/* Risk Factors */}
                              {disease.riskFactors &&
                                disease.riskFactors.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                                      {t("results.riskFactors")}
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                      {disease.riskFactors.map((risk, idx) => (
                                        <span
                                          key={idx}
                                          className="px-2 py-1 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200 rounded-lg text-xs"
                                        >
                                          {risk}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                              {/* Possible Complications */}
                              {disease.complications &&
                                disease.complications.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                                      {t("results.complications")}
                                    </h4>
                                    <div className="space-y-2">
                                      {disease.complications.map(
                                        (complication, idx) => (
                                          <div
                                            key={idx}
                                            className="flex items-start p-2 bg-gradient-to-r from-red-50/60 to-pink-50/60 rounded-lg"
                                          >
                                            <Icons.AlertTriangle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                                            <span className="text-xs text-red-700">
                                              {complication}
                                            </span>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  </div>
                                )}

                              {/* Timeline */}
                              {disease.timeline && (
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                                    {t("results.timeline")}
                                  </h4>
                                  <div className="p-3 bg-gradient-to-r from-teal-50/60 to-emerald-50/60 rounded-lg">
                                    <div className="flex items-center text-xs text-teal-700">
                                      <Icons.Clock className="w-4 h-4 mr-2" />
                                      {disease.timeline}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                            <button
                              onClick={() =>
                                window.open(
                                  `https://www.google.com/search?q=${encodeURIComponent(disease.name + " disease info")}`,
                                  "_blank",
                                )
                              }
                              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center text-sm"
                            >
                              <Icons.BookOpen className="w-4 h-4 mr-2" />
                              {t("results.learnMore")}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-sm mb-2">
                      {t("results.noConditions")}
                    </div>
                    <button
                      onClick={() => {localStorage.setItem("workflowInProgress", "symptom_selection"); navigate("/symptoms")}}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm"
                    >
                      {t("results.addSymptoms")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Medications Panel */}
          <div className="space-y-6">
            {/* Medications Panel */}
            <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Icons.Leaf className="w-5 h-5 mr-2 text-emerald-600" />
                  {t("results.traditionalOptions")}
                </h3>
                <div className="text-sm text-gray-500">
                  {t("results.basedOnPattern")}
                </div>
              </div>

              {/* Medication Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveMedicationTab("sasang")}
                  className={`flex-1 py-3 text-center font-medium border-b-2 transition-all ${
                    activeMedicationTab === "sasang"
                      ? "border-indigo-600 text-indigo-700"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-center text-sm">
                    <Icons.Users className="w-4 h-4 mr-2" />
                    {t("results.sasangMedicine")}
                  </div>
                </button>

                <button
                  onClick={() => setActiveMedicationTab("chinese")}
                  className={`flex-1 py-3 text-center font-medium border-b-2 transition-all ${
                    activeMedicationTab === "chinese"
                      ? "border-emerald-600 text-emerald-700"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-center text-sm">
                    <Icons.Pill className="w-4 h-4 mr-2" />
                    {t("results.chineseMedicine")}
                  </div>
                </button>
              </div>

              {/* Medications List */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {medications[activeMedicationTab]?.length > 0 ? (
                  medications[activeMedicationTab]?.map((med) => (
                    <div
                      key={med.id}
                      className={`border rounded-xl overflow-hidden transition-all ${
                        expandedMedication === med.id
                          ? activeMedicationTab === "chinese"
                            ? "border-emerald-300"
                            : "border-indigo-300"
                          : "border-gray-200"
                      }`}
                    >
                      <div
                        className={`p-4 cursor-pointer ${med.color}`}
                        onClick={() =>
                          setExpandedMedication(
                            expandedMedication === med.id ? null : med.id,
                          )
                        }
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                              {med.icon.length > 2 ? "💊" : med.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800 text-sm">
                                {med.name}
                              </h4>
                              <p className="text-xs text-gray-600">
                                {activeMedicationTab === "chinese"
                                  ? med.chineseName
                                  : med.koreanName}
                              </p>
                              <div className="flex items-center mt-1 flex-wrap gap-1">
                                <span className="px-2 py-0.5 bg-white text-gray-700 rounded text-xs font-medium border">
                                  {med.category}
                                </span>
                                {activeMedicationTab === "sasang" && (
                                  <span className="px-2 py-0.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded text-xs">
                                    {med.constitution}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {expandedMedication === med.id ? (
                            <Icons.ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Icons.ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>

                        {/* Uses */}
                        <div className="mt-3">
                          <div className="text-xs text-gray-500 mb-1">
                            {t("results.bestFor")}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {med.uses &&
                              med.uses.slice(0, 3).map((use, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-white rounded text-xs text-gray-700 border"
                                >
                                  {use}
                                </span>
                              ))}
                            {med.uses && med.uses.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500">
                                +{med.uses.length - 3} {t("results.more")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Medication Details */}
                      {expandedMedication === med.id && (
                        <div className="p-4 bg-white border-t">
                          <div className="space-y-4">
                            {/* Ingredients */}
                            {med.ingredients && med.ingredients.length > 0 && (
                              <div>
                                <h5 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
                                  <Icons.Leaf className="w-4 h-4 mr-2 text-emerald-600" />
                                  {t("results.keyIngredients")}
                                </h5>
                                <div className="grid grid-cols-2 gap-2">
                                  {med.ingredients.map((ingredient, idx) => (
                                    <div
                                      key={idx}
                                      className="p-2 bg-gradient-to-r from-emerald-50/60 to-teal-50/60 rounded-lg text-xs"
                                    >
                                      {ingredient}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Usage Instructions */}
                            <div>
                              <h5 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
                                <Icons.BookOpen className="w-4 h-4 mr-2 text-indigo-600" />
                                {t("results.usageInstructions")}
                              </h5>
                              <div className="space-y-3">
                                {med.dosage && (
                                  <div className="p-3 bg-gradient-to-r from-indigo-50/60 to-blue-50/60 rounded-lg">
                                    <div className="text-xs text-indigo-700 font-medium mb-1">
                                      {t("results.dosage")}
                                    </div>
                                    <div className="text-xs">{med.dosage}</div>
                                  </div>
                                )}
                                {med.preparation && (
                                  <div className="p-3 bg-gradient-to-r from-emerald-50/60 to-teal-50/60 rounded-lg">
                                    <div className="text-xs text-emerald-700 font-medium mb-1">
                                      {t("results.preparation")}
                                    </div>
                                    <div className="text-xs">
                                      {med.preparation}
                                    </div>
                                  </div>
                                )}
                                {med.duration && (
                                  <div className="p-3 bg-gradient-to-r from-amber-50/60 to-yellow-50/60 rounded-lg">
                                    <div className="text-xs text-amber-700 font-medium mb-1">
                                      {t("results.duration")}
                                    </div>
                                    <div className="text-xs">
                                      {med.duration}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Contraindications */}
                            {med.contraindications &&
                              med.contraindications.length > 0 && (
                                <div>
                                  <h5 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
                                    <Icons.AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
                                    {t("results.contraindications")}
                                  </h5>
                                  <div className="space-y-2">
                                    {med.contraindications
                                      .slice(0, 3)
                                      .map((contra, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-start p-2 bg-gradient-to-r from-red-50/60 to-pink-50/60 rounded-lg"
                                        >
                                          <div className="w-4 h-4 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs">
                                            !
                                          </div>
                                          <span className="text-xs text-red-700">
                                            {contra}
                                          </span>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              )}
                          </div>

                          {/* Disclaimer */}
                          <div className="mt-4 p-3 bg-gradient-to-r from-gray-50/60 to-indigo-50/60 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-600 text-center">
                              {t("results.traditionalDisclaimer")}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <div className="text-gray-400 text-xs mb-2">
                      {t("results.noMedications")}
                    </div>
                  </div>
                )}
              </div>

              {/* Traditional Medicine Disclaimer */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-start p-3 bg-gradient-to-r from-gray-50/60 to-indigo-50/60 rounded-lg">
                  <Icons.AlertCircle className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-600">
                    {t("results.traditionalSystem")}
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-indigo-200/50 rounded-2xl p-5">
              <h4 className="font-semibold text-indigo-800 mb-3 flex items-center text-sm">
                <Icons.Zap className="w-4 h-4 mr-2" />
                {t("results.recommendedSteps")}
              </h4>
              <ol className="space-y-3">
                {[
                  {
                    key: "consult",
                    title: "results.consultProvider",
                    desc: "results.shareResults",
                  },
                  {
                    key: "monitor",
                    title: "results.monitorSymptoms",
                    desc: "results.keepTrack",
                  },
                  {
                    key: "traditional",
                    title: "results.considerTraditional",
                    desc: "results.consultPractitioners",
                  },
                ].map((step, index) => (
                  <li key={step.key} className="flex items-start">
                    <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-indigo-800 text-sm">
                        {t(step.title)}
                      </div>
                      <div className="text-xs text-indigo-700">
                        {t(step.desc)}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => navigate("/symptoms")}
                  className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200 font-medium text-sm"
                >
                  {t("results.editSymptoms")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SymptomResult;
