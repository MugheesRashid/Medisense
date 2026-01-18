import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

// Icons - using a subset for compact design
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
  ChevronRight: ({ className }) => (
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
        d="M9 5l7 7-7 7"
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
  Lock: ({ className }) => (
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
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
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
  User: ({ className }) => (
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
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
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
  SkipForward: ({ className }) => (
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
        d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
      />
    </svg>
  ),
  Info: ({ className }) => (
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
        d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
  Plus: ({ className }) => (
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
        d="M12 4v16m8-8H4"
      />
    </svg>
  ),
  X: ({ className }) => (
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
};

// Updated Simple Loader (matching symptom selection theme)
const SimpleLoader = ({ messages, currentMessageIndex, onCancel }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-50 via-white to-indigo-50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative max-w-md w-full mx-4">
        <div className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-purple-200 p-8 shadow-2xl">
          {/* Simple Spinner */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent rounded-full border-t-purple-600 border-r-indigo-600 animate-spin"></div>
          </div>

          {/* Loading Message */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {messages[currentMessageIndex]}
            </h3>
            <p className="text-gray-600 text-sm">
              Please wait while we process your medical history
            </p>
          </div>

          {/* Simple Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentMessageIndex + 1) * 25}%` }}
            />
          </div>

          {/* Cancel Button */}
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-purple-300 text-purple-700 rounded-xl hover:bg-purple-50 transition mx-auto block"
          >
            Please wait...
          </button>
        </div>
      </div>
    </div>
  );
};

// Guide Popup Component
const GuidePopup = ({ onClose }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn">
      <div className="relative max-w-lg w-full mx-4">
        <div className="relative bg-white rounded-2xl border border-purple-200 p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mr-3">
                <Icons.Info className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {t("mhguide.title")}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Icons.X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Guide Content */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-gray-700">{t("mhguide.point1")}</p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <p className="text-gray-700">{t("mhguide.point2")}</p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <p className="text-gray-700">{t("mhguide.point3")}</p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-700">{t("mhguide.point4")}</p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition font-semibold"
          >
            {t("mhguide.getStarted")}
          </button>
        </div>
      </div>
    </div>
  );
};

const MedicalHistory = ({ setMedicalHistory }) => {
  const { t, language, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentLoadingMessageIndex, setCurrentLoadingMessageIndex] =
    useState(0);
  const [showGuide, setShowGuide] = useState(false);
  const [customConditionInput, setCustomConditionInput] = useState("");
  const [customConditions, setCustomConditions] = useState([]);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    chronicConditions: [],
    medications: "",
    allergies: "",
    smoking: "",
    alcohol: "",
    exercise: "",
    familyHistory: "",
  });

  const loadingMessages = [
    "Processing medical history...",
    "Analyzing your data...",
    "Updating records...",
    "Finalizing...",
  ];

  const [isSkipped, setIsSkipped] = useState(false);

  const chronicConditionsOptions = [
    { id: "diabetes", label: t("conditions.diabetes"), icon: "🩸" },
    { id: "hypertension", label: t("conditions.hypertension"), icon: "❤️" },
    { id: "asthma", label: t("conditions.asthma"), icon: "🌬️" },
    { id: "heart-disease", label: t("conditions.heartDisease"), icon: "🫀" },
    { id: "kidney-disease", label: t("conditions.kidneyDisease"), icon: "🧬" },
    { id: "thyroid", label: t("conditions.thyroid"), icon: "🦋" },
    { id: "arthritis", label: t("conditions.arthritis"), icon: "🦴" },
    { id: "depression", label: t("conditions.depression"), icon: "🧠" },
    { id: "copd", label: t("conditions.copd"), icon: "🫁" },
    { id: "liver", label: t("conditions.liver"), icon: "🍃" },
  ];

  // Show guide popup on component mount
  useEffect(() => {
    const hasSeenGuide = localStorage.getItem(
      "medisense_medical_history_guide_seen",
    );
    if (!hasSeenGuide) {
      setTimeout(() => {
        setShowGuide(true);
      }, 500);
    }
  }, []);

  // Rotate loading messages
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setCurrentLoadingMessageIndex(
          (prev) => (prev + 1) % loadingMessages.length,
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLoading, loadingMessages.length]);

  const handleCloseGuide = () => {
    setShowGuide(false);
    localStorage.setItem("medisense_medical_history_guide_seen", "true");
  };

  const handleConditionToggle = (conditionId) => {
    setFormData((prev) => {
      if (prev.chronicConditions.includes(conditionId)) {
        return {
          ...prev,
          chronicConditions: prev.chronicConditions.filter(
            (id) => id !== conditionId,
          ),
        };
      } else {
        return {
          ...prev,
          chronicConditions: [...prev.chronicConditions, conditionId],
        };
      }
    });
  };

  const handleAddCustomCondition = () => {
    if (customConditionInput.trim()) {
      const newCondition = {
        id: `custom_${Date.now()}`,
        label: customConditionInput.trim(),
        icon: "➕",
        isCustom: true,
      };
      setCustomConditions([...customConditions, newCondition]);
      setCustomConditionInput("");
    }
  };

  const handleRemoveCustomCondition = (conditionId) => {
    setCustomConditions(
      customConditions.filter((condition) => condition.id !== conditionId),
    );
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Prepare data to send to backend
    const medicalHistoryData = {
      ...formData,
      customConditions: customConditions.map((c) => ({
        name: c.label,
        type: "custom",
        addedAt: new Date().toISOString(),
      })),
    };
    localStorage.setItem(
      "medisense_medical_history",
      JSON.stringify(medicalHistoryData),
    );
    localStorage.setItem("workflowInProgress", "medisense_ai_questions");
    navigate("/follow-up-questions");
  };

  const handleSkip = () => {
    localStorage.setItem("workflowInProgress", "medisense_ai_questions");
    navigate("/follow-up-questions");
  };

  const isFormComplete = () => {
    return formData.age && formData.gender;
  };

  if (isLoading) {
    return (
      <SimpleLoader
        messages={loadingMessages}
        currentMessageIndex={currentLoadingMessageIndex}
        onCancel={() => setIsLoading(false)}
      />
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 ${language === "ur" ? "rtl" : "ltr"}`}
    >
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      {/* Guide Popup */}
      {showGuide && <GuidePopup onClose={handleCloseGuide} />}

      {/* Compact Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  localStorage.removeItem("medisense_ai_questions");
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
                <div className="w-8 h-8 bg-gradient-to-br bg-[url('/logo.png')] bg-center bg-cover bg-no-repeat rounded-lg flex items-center justify-center">
                  
                </div>
                <span className="text-lg font-bold text-gray-800">
                  Medi
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Sense
                  </span>
                  <span className="text-indigo-600">AI</span>
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-gray-500 font-medium">
                  {t("header.step")}
                </div>
                <div className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {t("header.stepNumber")}
                </div>
              </div>

              {/* Language Switcher with Gradient */}
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

                {/* Language Dropdown */}
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
        <div className="max-w-6xl mx-auto">
          {/* Privacy Notice - Compact */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-indigo-50/80 via-purple-50/80 to-indigo-50/80 border border-indigo-200/50 rounded-2xl p-5 mb-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                  <Icons.Shield className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-gray-800 mb-2">
                    {t("medicalHistory.title")}
                  </h1>
                  <p className="text-sm text-gray-600 mb-3">
                    {t("medicalHistory.description")}
                  </p>
                  <div className="flex items-center text-xs text-indigo-700 font-medium">
                    <Icons.Lock className="w-3 h-3 mr-2" />
                    <span>{t("medicalHistory.privacyNotice")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Grid - Compact */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-white p-4 rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Icons.Activity className="w-4 h-4 text-cyan-600" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {t("benefits.improvedAccuracy")}
                </h3>
                <p className="text-xs text-gray-600">
                  {t("benefits.accuracyDetail")}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-100 to-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Icons.CheckCircle className="w-4 h-4 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {t("benefits.personalizedInsights")}
                </h3>
                <p className="text-xs text-gray-600">
                  {t("benefits.insightsDetail")}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg flex items-center justify-center mb-3">
                  <Icons.Brain className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {t("benefits.betterRecommendations")}
                </h3>
                <p className="text-xs text-gray-600">
                  {t("benefits.recommendationsDetail")}
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <Icons.User className="w-4 h-4 text-indigo-600" />
                  </div>
                  {t("formSections.basicInfo")}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("formFields.age")}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      placeholder={t("placeholders.age")}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("formFields.gender")}
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                    >
                      <option value="">{t("placeholders.gender")}</option>
                      <option value="male">{t("gender.male")}</option>
                      <option value="female">{t("gender.female")}</option>
                      <option value="other">{t("gender.other")}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Chronic Conditions */}
              <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center mr-3">
                      <Icons.Heart className="w-4 h-4 text-red-600" />
                    </div>
                    {t("formSections.chronicConditions")}
                  </h2>
                  <span className="text-xs text-gray-500">
                    {t("formSections.selectAll")}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {chronicConditionsOptions.map((condition) => {
                    const isSelected = formData.chronicConditions.includes(
                      condition.id,
                    );
                    return (
                      <button
                        key={condition.id}
                        type="button"
                        onClick={() => handleConditionToggle(condition.id)}
                        className={`p-3 rounded-xl border transition-all duration-200 ${
                          isSelected
                            ? "border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 ring-1 ring-indigo-200"
                            : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50"
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{condition.icon}</span>
                          <span className="font-medium text-gray-800 text-sm">
                            {condition.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Conditions */}
                {customConditions.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      {t("mhformSections.customConditions")} (
                      {customConditions.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {customConditions.map((condition) => (
                        <div
                          key={condition.id}
                          className="inline-flex items-center bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 rounded-full px-3 py-1.5 text-sm"
                        >
                          <span className="mr-1">{condition.icon}</span>
                          <span>{condition.label}</span>
                          <button
                            onClick={() =>
                              handleRemoveCustomCondition(condition.id)
                            }
                            className="ml-2 text-teal-600 hover:text-teal-800"
                          >
                            <Icons.X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add Custom Condition */}
                <div className="mt-4">
                  <div className="flex">
                    <input
                      type="text"
                      value={customConditionInput}
                      onChange={(e) => setCustomConditionInput(e.target.value)}
                      placeholder={t("mhplaceholders.addCustomCondition")}
                      className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-l-xl focus:ring-2 focus:ring-indigo-500 text-sm"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddCustomCondition();
                        }
                      }}
                    />
                    <button
                      onClick={handleAddCustomCondition}
                      disabled={!customConditionInput.trim()}
                      className={`px-4 py-3 font-medium rounded-r-xl transition-all duration-200 ${
                        customConditionInput.trim()
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-md"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <Icons.Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {t("mhformSections.customConditionNote")}
                  </p>
                </div>
              </div>

              {/* Medications */}
              <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg flex items-center justify-center mr-3">
                    <Icons.Pill className="w-4 h-4 text-purple-600" />
                  </div>
                  {t("formSections.medications")}
                </h2>
                <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">
                    {t("medications.description")}
                  </p>
                  <textarea
                    value={formData.medications}
                    onChange={(e) =>
                      handleInputChange("medications", e.target.value)
                    }
                    placeholder={t("placeholders.medications")}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm min-h-[80px]"
                  />
                  <div className="text-xs text-gray-500 mt-2">
                    {t("medications.dosageNote")}
                  </div>
                </div>
              </div>

              {/* Allergies */}
              <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <Icons.AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  {t("formSections.allergies")}
                </h2>
                <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200">
                  <p className="text-sm text-amber-800 mb-3">
                    {t("allergies.important")}
                  </p>
                  <textarea
                    value={formData.allergies}
                    onChange={(e) =>
                      handleInputChange("allergies", e.target.value)
                    }
                    placeholder={t("placeholders.allergies")}
                    className="w-full px-4 py-3 bg-white border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition text-sm min-h-[70px]"
                  />
                </div>
              </div>

              {/* Lifestyle Factors */}
              <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  {t("formSections.lifestyle")}
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      key: "smoking",
                      label: t("lifestyle.smoking"),
                      options: ["never", "former", "current"],
                    },
                    {
                      key: "alcohol",
                      label: t("lifestyle.alcohol"),
                      options: ["never", "occasional", "moderate", "heavy"],
                    },
                    {
                      key: "exercise",
                      label: t("lifestyle.exercise"),
                      options: ["none", "1-2/week", "3-4/week", "daily"],
                    },
                  ].map((item) => (
                    <div key={item.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {item.label}
                      </label>
                      <select
                        value={formData[item.key]}
                        onChange={(e) =>
                          handleInputChange(item.key, e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm"
                      >
                        <option value="">
                          {t("placeholders.selectOption")}
                        </option>
                        {item.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {t(`lifestyleOptions.${item.key}.${opt}`)}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Family History */}
              <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  {t("formSections.familyHistory")}
                </h2>
                <textarea
                  value={formData.familyHistory}
                  onChange={(e) =>
                    handleInputChange("familyHistory", e.target.value)
                  }
                  placeholder={t("placeholders.familyHistory")}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm min-h-[80px]"
                />
              </div>
            </div>

            {/* Right Column - Guidance & Actions */}
            <div className="space-y-6">
              {/* Why This Matters */}
              <div className="bg-gradient-to-br from-indigo-50/80 to-teal-50/80 border border-indigo-200/50 rounded-2xl p-5">
                <h3 className="font-semibold text-indigo-800 mb-3 flex items-center text-sm">
                  <Icons.Info className="w-4 h-4 mr-2" />
                  {t("guidance.whyContextMatters")}
                </h3>
                <ul className="space-y-3 text-xs text-indigo-700">
                  {[
                    {
                      number: 1,
                      key: "ageGender",
                      text: t("guidance.points.ageGender"),
                    },
                    {
                      number: 2,
                      key: "chronicConditions",
                      text: t("guidance.points.chronicConditions"),
                    },
                    {
                      number: 3,
                      key: "medications",
                      text: t("guidance.points.medications"),
                    },
                    {
                      number: 4,
                      key: "allergies",
                      text: t("guidance.points.allergies"),
                    },
                  ].map((item) => (
                    <li key={item.key} className="flex items-start">
                      <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-teal-500 text-white rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs font-bold">
                        {item.number}
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Completion Status */}
              <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4 text-sm">
                  {t("completion.title")}
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: t("completion.basicInfo"),
                      complete: !!(formData.age && formData.gender),
                    },
                    {
                      label: t("completion.chronicConditions"),
                      complete:
                        formData.chronicConditions.length > 0 ||
                        customConditions.length > 0,
                    },
                    {
                      label: t("completion.medications"),
                      complete: !!formData.medications.trim(),
                    },
                    {
                      label: t("completion.allergies"),
                      complete: !!formData.allergies.trim(),
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs text-gray-700">
                        {item.label}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                          item.complete
                            ? "bg-gradient-to-br from-green-100 to-teal-100 text-teal-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {item.complete ? "✓" : "○"}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {Object.values(formData).filter(Boolean).length}/8
                    </div>
                    <div className="text-xs text-gray-600">
                      {t("completion.fieldsCompleted")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormComplete()}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                    isFormComplete()
                      ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white hover:shadow-lg hover:scale-[1.02]"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isFormComplete() ? (
                    <div className="flex items-center justify-center">
                      <span>{t("actions.continueToAnalysis")}</span>
                      <Icons.ChevronRight className="w-4 h-4 ml-2" />
                    </div>
                  ) : (
                    t("actions.completeBasicInfoFirst")
                  )}
                </button>

                <button
                  onClick={handleSkip}
                  className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200 font-medium flex items-center justify-center hover:bg-indigo-50"
                >
                  <Icons.SkipForward className="w-4 h-4 mr-2" />
                  {t("actions.skipThisStep")}
                </button>

                {/* Accuracy Improvement */}
                <div className="text-center bg-gradient-to-r from-gray-50 to-indigo-50/30 rounded-xl p-3 border border-gray-200/50">
                  <div className="text-xs text-gray-600 mb-1">
                    {t("accuracy.improvesBy")}
                  </div>
                  <div className="text-lg font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    {t("accuracy.upTo40")}
                  </div>
                </div>
              </div>

              {/* Privacy Assurance */}
              <div className="bg-gradient-to-r from-gray-50/80 to-indigo-50/50 rounded-xl p-4 border border-indigo-200/50">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <Icons.Lock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                      {t("privacy.title")}
                    </h3>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {[
                        "noPersonalInfo",
                        "dataDeleted",
                        "noConnection",
                        "anonymous",
                      ].map((key) => (
                        <li key={key} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2 mt-1" />
                          <span>{t(`privacy.${key}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-200">
                <div className="flex items-start">
                  <Icons.AlertTriangle className="w-3 h-3 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-600">
                    {t("disclaimer.text")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MedicalHistory;
