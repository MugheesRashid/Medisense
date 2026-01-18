import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// Simple loading component
// Simple loading component - Updated to match symptom selection page theme
const SimpleLoader = ({ messages, currentMessageIndex, onCancel }) => {
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
              Analyzing your responses...
            </h3>
            <p className="text-gray-600 text-sm">
              Please wait while we process your answers
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
          <button className="px-6 py-2 border border-purple-300 text-purple-700 rounded-xl hover:bg-purple-50 transition mx-auto block">
            Please wait...
          </button>
        </div>
      </div>
    </div>
  );
};
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
  HelpCircle: ({ className }) => (
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
  RotateCcw: ({ className }) => (
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
        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
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
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    </svg>
  ),
  Sparkles: ({ className }) => (
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
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  ),
  Bot: ({ className }) => (
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
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  Send: ({ className }) => (
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
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  ),
  ThumbsUp: ({ className }) => (
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
        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
      />
    </svg>
  ),
  ThumbsDown: ({ className }) => (
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
        d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
      />
    </svg>
  ),
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
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {t("guide.title")}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
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
              <p className="text-gray-700">{t("guide.point1")}</p>
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
              <p className="text-gray-700">{t("guide.point2")}</p>
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
              <p className="text-gray-700">{t("guide.point3")}</p>
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
              <p className="text-gray-700">{t("guide.point4")}</p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition font-semibold"
          >
            {t("guide.getStarted")}
          </button>
        </div>
      </div>
    </div>
  );
};

const FollowUpQuestions = ({
  symptoms,
  questionsByAI,
  setResults,
  medicalHistory,
}) => {
  const { t, language, changeLanguage } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showPreviousAnswers, setShowPreviousAnswers] = useState(false);
  const [aiTyping, setAiTyping] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [ansOfFUQ, setAnsOfFUQ] = useState();
  const [finalSymptoms, setFinalSymptoms] = useState(symptoms);
  const [isLoading, setIsLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [currentLoadingMessageIndex, setCurrentLoadingMessageIndex] =
    useState(0);
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setCurrentLoadingMessageIndex((prev) => (prev + 1) % 3);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    // If this has already run, skip everything
    if (hasRun.current) return;

    // Mark as run immediately
    hasRun.current = true;

    // 1. Handle Medical History Toast
    if (localStorage.getItem("medisense_medical_history")) {
      toast.info("Medical history Completed. Using it for better analysis.");
    } else {
      toast.info("Medical History Skipped.");
    }
  }, []);

  useEffect(() => {
    // 2. Handle Guide Visibility
    const hasSeenGuide = localStorage.getItem("medisense_guide_seen");
    if (!hasSeenGuide) {
      setTimeout(() => {
        setShowGuide(true);
      }, 500);
    }
  }, []);
  const handleCloseGuide = () => {
    setShowGuide(false);
    localStorage.setItem("medisense_guide_seen", "true");
  };

  useEffect(() => {
    if (questionsByAI.length === 0) {
      const storedQuestions = JSON.parse(
        localStorage.getItem("medisense_ai_questions") || "[]",
      );
      setQuestions(storedQuestions);
    } else if (questionsByAI.length > 0) {
      setQuestions(questionsByAI);
    } else {
      localStorage.setItem("workflowInProgress", "symptom_selection");
      navigate("/symptoms", { replace: true });
    }
  }, [questionsByAI]);
  // Simulate AI typing effect
  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      setAiTyping(true);
      const timer = setTimeout(() => {
        setAiTyping(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, questions.length]);

  const handleAnswer = (questionId, answerId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: prev[questionId] === answerId ? null : answerId,
    }));
  };

  const handleMultipleSelect = (questionId, answerId) => {
    setAnswers((prev) => {
      const currentAnswers = prev[questionId] || [];
      if (currentAnswers.includes(answerId)) {
        return {
          ...prev,
          [questionId]: currentAnswers.filter((id) => id !== answerId),
        };
      } else {
        return {
          ...prev,
          [questionId]: [...currentAnswers, answerId],
        };
      }
    });
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsLoading(true);

      const followUpAnswers = questions.map((q) => {
        const selected = answers[q.id];
        const answer =
          q.type === "multiple"
            ? q.options
                .filter((opt) => selected?.includes(opt.id))
                .map((opt) => opt.text)
            : q.options.find((opt) => opt.id === selected)?.text;

        return {
          id: q.id,
          question: q.question,
          answer,
        };
      });

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const symptomsToSend =
          symptoms.length === 0
            ? JSON.parse(
                localStorage.getItem("medisense_symptoms_draft") || "[]",
              )
            : symptoms;

        setFinalSymptoms(symptomsToSend);
        console.log(followUpAnswers);
        // This would be your actual API call
        const response = await axios.post(
          "https://medisense-genai.up.railway.app/api/symptoms/diagnose",
          {
            symptoms: symptomsToSend,
            medicalHistory: localStorage.getItem(medicalHistory),
            followUpAnswers,
          },
        );
        setResults(response.data);
        localStorage.setItem("workflowInProgress", "results");
        navigate("/results");
      } catch (error) {
        setIsLoading(false);
        toast.error(
          "The application is currently very busy try again later. Medical History got deleted due to security concers, pls fill it again.",
        );
        localStorage.removeItem("medisense_medical_history");
        console.error("Error:", error);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkip = () => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex]?.id]: "skipped",
    }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleNext();
    }
  };

  const getAnswerText = (questionId) => {
    const answer = answers[questionId];
    if (!answer) return t("answers.notAnswered");
    if (answer === "skipped") return t("answers.skipped");

    const question = questions.find((q) => q.id === questionId);
    const option = question.options.find((opt) => opt.id === answer);
    return option ? option.text : t("answers.selected");
  };

  const calculateProgress = () => {
    const answered = Object.keys(answers).length;
    return questions.length > 0
      ? Math.round((answered / questions.length) * 100)
      : 0;
  };

  if (isLoading) {
    return (
      <SimpleLoader
        messages={[
          "Processing your answers...",
          "Analyzing patterns...",
          "Generating insights...",
        ]}
        currentMessageIndex={currentLoadingMessageIndex}
        onCancel={() => setIsLoading(false)}
      />
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 ${language === "ur" ? "rtl" : "ltr"}`}
    >
      {showGuide && <GuidePopup onClose={handleCloseGuide} />}
      {/* Compact Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  localStorage.setItem("workflowInProgress", "medical_history");
                  navigate("/medical-history");
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <Icons.ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br bg-[url('/logo.png')] bg-center bg-cover rounded-lg flex items-center justify-center"></div>
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
                  {t("qheader.step")}
                </div>
                <div className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {t("qheader.stepNumber")}
                </div>
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
        <div className="max-w-6xl mx-auto">
          {/* Progress Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-800">
                {t("questions.title")}
              </h1>
              <div className="text-sm text-gray-500">
                {currentQuestionIndex + 1} {t("questions.of")}{" "}
                {questions.length} {t("questions.questions")}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("questions.progress")}</span>
                <span className="font-medium text-indigo-600">
                  {calculateProgress()}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
              <div className="flex justify-center space-x-1">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index <= currentQuestionIndex
                        ? index < currentQuestionIndex
                          ? "bg-green-500"
                          : "bg-indigo-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Question Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Introduction */}
              <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icons.Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-gray-800">
                        {t("ai.name")}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full">
                        {t("ai.status")}
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-50/80 to-purple-50/80 rounded-xl p-4 border border-indigo-100">
                      {aiTyping ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-150" />
                          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-300" />
                          <span className="text-sm text-gray-600">
                            {t("ai.typing")}
                          </span>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-800 text-sm mb-2">
                            {t("ai.introduction")}
                          </p>
                          <div className="flex items-center text-xs text-indigo-600 font-medium">
                            <Icons.Sparkles className="w-3 h-3 mr-1" />
                            <span>{t("ai.improvement")}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Question */}
              {questions.length > 0 && questions[currentQuestionIndex] && (
                <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-indigo-600">
                          Q{currentQuestionIndex + 1}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <Icons.Clock className="w-4 h-4 inline mr-1" />
                        {questions[currentQuestionIndex]?.time || "1 min"}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setShowPreviousAnswers(!showPreviousAnswers)
                      }
                      className="flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      <Icons.Eye className="w-4 h-4 mr-1" />
                      {showPreviousAnswers
                        ? t("questions.hideAnswers")
                        : t("questions.viewAnswers")}
                    </button>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {questions[currentQuestionIndex]?.question}
                  </h3>

                  {/* AI Reasoning */}
                  <div className="mb-5 p-3 bg-gradient-to-r from-indigo-50/60 to-blue-50/60 rounded-lg border border-indigo-100">
                    <div className="flex items-start">
                      <Icons.HelpCircle className="w-4 h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-indigo-800 mb-1">
                          {t("questions.whyThisMatters")}
                        </div>
                        <div className="text-sm text-indigo-700">
                          {questions[currentQuestionIndex]?.reasoning ||
                            t("questions.defaultReasoning")}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Answer Options */}
                  <div className="space-y-3">
                    {questions[currentQuestionIndex]?.options.map(
                      (option, index) => {
                        const isSelected =
                          questions[currentQuestionIndex]?.type === "multiple"
                            ? (
                                answers[questions[currentQuestionIndex]?.id] ||
                                []
                              ).includes(option.id)
                            : answers[questions[currentQuestionIndex]?.id] ===
                              option.id;

                        return (
                          <button
                            key={option.id}
                            onClick={() => {
                              if (
                                questions[currentQuestionIndex]?.type ===
                                "multiple"
                              ) {
                                handleMultipleSelect(
                                  questions[currentQuestionIndex]?.id,
                                  option.id,
                                );
                              } else {
                                handleAnswer(
                                  questions[currentQuestionIndex]?.id,
                                  option.id,
                                );
                              }
                            }}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                              isSelected
                                ? "border-indigo-500 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 ring-1 ring-indigo-200"
                                : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30"
                            }`}
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                                  isSelected
                                    ? "border-indigo-500 bg-indigo-500"
                                    : "border-gray-300"
                                }`}
                              >
                                {isSelected && (
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <span className="text-xl mr-3">
                                    {option.emoji || "⚪"}
                                  </span>
                                  <span className="font-medium text-gray-800 text-sm">
                                    {option.text}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>
              )}

              {/* Previous Answers */}
              {showPreviousAnswers && (
                <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <Icons.CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    {t("questions.previousAnswers")}
                  </h4>
                  <div className="space-y-3">
                    {questions
                      .filter(
                        (q, idx) => idx < currentQuestionIndex && answers[q.id],
                      )
                      .map((question) => (
                        <div
                          key={question.id}
                          className="p-3 bg-gray-50/50 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-xs text-gray-600 mb-1">
                                Q{question.id}: {question.question}
                              </div>
                              <div className="text-sm font-medium text-gray-800">
                                {getAnswerText(question.id)}
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setCurrentQuestionIndex(question.id - 1);
                                setShowPreviousAnswers(false);
                              }}
                              className="text-indigo-600 hover:text-indigo-700 text-xs font-medium px-3 py-1 hover:bg-indigo-50 rounded-lg transition-colors"
                            >
                              {t("questions.edit")}
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 pt-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentQuestionIndex === 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100 hover:scale-105"
                    }`}
                  >
                    <Icons.ChevronLeft className="w-4 h-4 mr-1" />
                    {t("navigation.previous")}
                  </button>
                  <button
                    onClick={handleSkip}
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    <Icons.SkipForward className="w-4 h-4 mr-1" />
                    {t("navigation.skip")}
                  </button>
                </div>

                <button
                  onClick={handleNext}
                  disabled={questions.length === 0}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${
                    questions.length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white hover:shadow-lg"
                  }`}
                >
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      {t("navigation.nextQuestion")}
                      <Icons.ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      {t("navigation.finishAnalysis")}
                      <Icons.Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* AI qstats. */}
              <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-indigo-200/50 rounded-2xl p-5">
                <h3 className="font-semibold text-indigo-800 mb-4 flex items-center text-sm">
                  <Icons.Zap className="w-4 h-4 mr-2" />
                  {t("qstats.title")}
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-indigo-700 mb-1">
                      <span>{t("qstats.currentAccuracy")}</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="w-full bg-indigo-100 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-teal-400 to-emerald-400 h-1.5 rounded-full"
                        style={{ width: "78%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-indigo-700 mb-1">
                      <span>{t("qstats.potentialAccuracy")}</span>
                      <span className="font-medium">93%</span>
                    </div>
                    <div className="w-full bg-indigo-100 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-1.5 rounded-full"
                        style={{ width: "93%" }}
                      />
                    </div>
                  </div>
                  <div className="pt-3 border-t border-indigo-200">
                    <div className="text-xs text-indigo-700 mb-2">
                      {t("qstats.improvementPerAnswer")}
                    </div>
                    <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {t("qstats.upTo15")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-sm">
                  <Icons.MessageSquare className="w-4 h-4 mr-2 text-teal-600" />
                  {t("tips.title")}
                </h3>
                <ul className="space-y-2 text-xs text-gray-600">
                  {[
                    "recentSymptoms",
                    "specificDetails",
                    "avoidSkipping",
                    "editLater",
                  ].map((key) => (
                    <li key={key} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mr-2 mt-1" />
                      <span>{t(`tips.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress Summary */}
              <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4 text-sm">
                  {t("progress.title")}
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {calculateProgress()}%
                    </div>
                    <div className="text-xs text-gray-600">
                      {t("progress.complete")}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-indigo-50/50 rounded-lg">
                      <div className="text-lg font-bold text-indigo-700">
                        {Object.keys(answers).length}
                      </div>
                      <div className="text-xs text-gray-600">
                        {t("progress.answered")}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-purple-50/50 rounded-lg">
                      <div className="text-lg font-bold text-purple-700">
                        {questions.length}
                      </div>
                      <div className="text-xs text-gray-600">
                        {t("progress.total")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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
    </div>
  );
};

export default FollowUpQuestions;
