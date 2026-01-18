import React, { useState, useEffect } from "react";
import Model from "react-body-highlighter";
import axios from "axios";
import {
  Search,
  ChevronLeft,
  Plus,
  X,
  Clock,
  AlertCircle,
  Target,
  Globe,
  User,
  ChevronRight,
  Thermometer,
  Brain,
  Calendar,
  Save,
  Trash2,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Zap,
  SearchIcon,
  Activity as ActivityIcon,
  Edit,
  Sliders,
  Type,
  FileText,
  Sparkles,
  Loader2,
  Languages,
  Shield,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "../assets/services/Translate.services";
import "../assets/style/ss.css";

// Import symptoms database
import symptomsDatabase, {
  getSymptomsByMultipleBodyParts,
  getSymptomsByBodyPart,
  getGeneralSymptoms,
} from "../assets/symptom";
import { BODY_PARTS_DB } from "../assets/BodyParts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Loading Component
const AnalysisLoadingScreen = ({ messages, currentMessageIndex, onCancel }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-indigo-50/30 via-white to-purple-50/20 backdrop-blur-sm z-50 flex items-center justify-center">
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
              {t("mhloading.trustMessage")}
            </p>
          </div>

          {/* Simple Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentMessageIndex + 1) * (100 / messages.length)}%` }}
            />
          </div>

          {/* Cancel Button */}
          <button
            className="px-6 py-2 border border-purple-300 text-purple-700 rounded-xl hover:bg-purple-50 transition mx-auto block"
          >
            {t("mhloading.pleaseWait")}
          </button>
        </div>
      </div>
    </div>
  );
};
const SymptomSelectionDashboard = ({ setSymptoms, setAIQuestions }) => {
  const { language, direction, t } = useLanguage();
  const { translating, translateSymptomsList } = useTranslation();

  // State Management
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [activeStep, setActiveStep] = useState("body");
  const [duration, setDuration] = useState({
    type: "days",
    value: "3-7 days",
    exactValue: "",
    startTime: null,
  });
  const [severity, setSeverity] = useState(5);
  const [temperature, setTemperature] = useState(98.6);
  const [measureValue, setMeasureValue] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [bodyView, setBodyView] = useState("anterior");
  const [showExactDuration, setShowExactDuration] = useState(false);
  const [durationValue, setDurationValue] = useState(0);
  const [durationUnit, setDurationUnit] = useState("hours");
  const [symptomNotes, setSymptomNotes] = useState("");
  const [showAllSymptoms, setShowAllSymptoms] = useState(false);
  const [bodyPartSearchQuery, setBodyPartSearchQuery] = useState("");
  const [filteredBodyParts, setFilteredBodyParts] = useState([]);
  const [showBodyPartSuggestions, setShowBodyPartSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showTranslateButton, setShowTranslateButton] = useState(false);

  const navigate = useNavigate();

  // Loading messages
  const loadingMessages = [
    t("mhloading.analyzingSymptoms"),
    t("mhloading.checkingDatabase"),
    t("mhloading.comparingPatterns"),
    t("mhloading.calculatingProbabilities"),
    t("mhloading.creatingActionPlan"),
    t("mhloading.almostDone"),
    t("mhloading.generatingReport"),
  ];

  // New state for custom symptom
  const [customSymptomData, setCustomSymptomData] = useState({
    name: "",
    description: "",
    measureType: "scale",
    measureLabel: "Severity",
    minValue: 1,
    maxValue: 10,
    defaultUnit: "",
    customUnit: "",
  });
  const [customSymptomMeasureValue, setCustomSymptomMeasureValue] = useState(5);

  // Initialize with dummy symptoms
  useEffect(() => {
    const savedDraft = localStorage.getItem("medisense_symptoms_draft");
    if (savedDraft) {
      try {
        const parsedData = JSON.parse(savedDraft);
        setSelectedSymptoms(parsedData);
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  }, []);

  // Rotate loading messages
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLoading, loadingMessages.length]);

  // Check if translation is needed
  useEffect(() => {
    if (language !== "en" && filteredSymptoms.length > 0) {
      setShowTranslateButton(true);
    } else {
      setShowTranslateButton(false);
    }
  }, [language, filteredSymptoms.length]);

  // Handle muscle click from body map
  const handleMuscleClick = (muscleData) => {
    const muscle = muscleData.muscle;
    if (!muscle) return;

    const mappedCategories =
      symptomsDatabase.mapBodyPartToSymptomCategories(muscle);

    setSelectedBodyPart({
      name: muscle,
      mappedParts: mappedCategories,
      isGeneral: false,
    });

    try {
      const symptoms = getSymptomsByBodyPart(muscle);
      setFilteredSymptoms(symptoms);
      setSelectedMuscle(muscle);
      setActiveStep("symptom");
    } catch (error) {
      console.error("Error getting symptoms:", error);
      const fallbackSymptoms = getSymptomsByMultipleBodyParts([muscle]);
      setFilteredSymptoms(fallbackSymptoms);
      setSelectedMuscle(muscle);
      setActiveStep("symptom");
    }
  };

  // Handle symptom selection
  const handleSymptomSelect = (symptom) => {
    setSelectedSymptom(symptom);

    // Set default values based on symptom type
    if (symptom.measureType === "temperature") {
      setTemperature(98.6);
      setMeasureValue(98.6);
    } else {
      setSeverity(5);
      setMeasureValue(5);
    }

    // Set default duration
    const now = new Date();
    setDuration({
      type: "days",
      value: "3-7 days",
      exactValue: "",
      startTime: now.toISOString(),
      startedAgo: "2 days ago",
    });

    setDurationValue(2);
    setDurationUnit("days");
    setShowExactDuration(false);
    setSymptomNotes("");

    setActiveStep("details");
  };

  // Handle custom symptom button click
  const handleCustomSymptomClick = () => {
    setCustomSymptomData({
      name: "",
      description: "",
      measureType: "scale",
      measureLabel: t("symptomDashboard.severity"),
      minValue: 1,
      maxValue: 10,
      defaultUnit: "",
      customUnit: "",
    });
    setCustomSymptomMeasureValue(5);
    setActiveStep("customSymptom");
  };

  // Handle custom symptom form input changes
  const handleCustomSymptomChange = (field, value) => {
    setCustomSymptomData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle adding custom symptom
  const handleAddCustomSymptom = () => {
    if (!customSymptomData.name.trim()) {
      alert("Please enter a symptom name");
      return;
    }

    // Calculate exact duration
    let exactDuration = "";
    if (showExactDuration && durationValue > 0) {
      const unitText =
        durationValue === 1 ? durationUnit.slice(0, -1) : durationUnit;
      exactDuration = `${durationValue} ${unitText}`;
    } else {
      exactDuration = duration.value;
    }

    // Determine the unit to use
    const unitToUse =
      customSymptomData.measureType === "custom"
        ? customSymptomData.customUnit
        : customSymptomData.defaultUnit || "";

    // Create the custom symptom object
    const newCustomSymptom = {
      id: Date.now(),
      name: customSymptomData.name,
      description:
        customSymptomData.description || "Custom symptom added by user",
      category: "custom",
      bodyPart: selectedBodyPart?.name || "general",
      duration: {
        type: showExactDuration ? durationUnit : duration.type,
        value: showExactDuration ? exactDuration : duration.value,
        exactValue: exactDuration,
        exactHours:
          durationUnit === "hours" ? durationValue : durationValue * 24,
        exactDays:
          durationUnit === "days"
            ? durationValue
            : Math.floor(durationValue / 24),
        startTime: duration.startTime || new Date().toISOString(),
      },
      measureType: customSymptomData.measureType,
      measureValue: customSymptomMeasureValue,
      measureLabel: customSymptomData.measureLabel,
      unit: unitToUse,
      notes: symptomNotes,
      addedAt: new Date().toISOString(),
      selectedMuscle: selectedMuscle,
      isCustom: true,
      customData: {
        minValue: customSymptomData.minValue,
        maxValue: customSymptomData.maxValue,
      },
    };

    const updatedSymptoms = [...selectedSymptoms, newCustomSymptom];
    setSelectedSymptoms(updatedSymptoms);

    // Save to localStorage
    try {
      localStorage.setItem(
        "medisense_symptoms_draft",
        JSON.stringify(updatedSymptoms),
      );
    } catch (error) {
      console.error("Error saving draft:", error);
    }

    // Reset for next symptom
    resetSelection();
  };

  // Reset custom symptom selection
  const resetCustomSymptom = () => {
    setCustomSymptomData({
      name: "",
      description: "",
      measureType: "scale",
      measureLabel: t("symptomDashboard.severity"),
      minValue: 1,
      maxValue: 10,
      defaultUnit: "",
      customUnit: "",
    });
    setCustomSymptomMeasureValue(5);
    setDuration({
      type: "days",
      value: "3-7 days",
      exactValue: "",
      startTime: null,
    });
    setDurationValue(0);
    setDurationUnit("hours");
    setShowExactDuration(false);
    setSymptomNotes("");
    setActiveStep("symptom");
  };

  const clearDraft = () => {
    if (window.confirm("Are you sure you want to clear all symptoms?")) {
      setSelectedSymptoms([]);
      localStorage.removeItem("medisense_symptoms_draft");
    }
  };

  // Handle adding symptom with all details
  const handleAddSymptom = () => {
    if (!selectedSymptom) return;

    // Calculate exact duration
    let exactDuration = "";
    if (showExactDuration && durationValue > 0) {
      const unitText =
        durationValue === 1 ? durationUnit.slice(0, -1) : durationUnit;
      exactDuration = `${durationValue} ${unitText}`;
    } else {
      exactDuration = duration.value;
    }

    const newSymptom = {
      id: Date.now(),
      name: selectedSymptom.name,
      description: selectedSymptom.description,
      category: selectedSymptom.category,
      bodyPart: selectedBodyPart?.name || "general",
      duration: {
        type: showExactDuration ? durationUnit : duration.type,
        value: showExactDuration ? exactDuration : duration.value,
        exactValue: exactDuration,
        exactHours:
          durationUnit === "hours" ? durationValue : durationValue * 24,
        exactDays:
          durationUnit === "days"
            ? durationValue
            : Math.floor(durationValue / 24),
        startTime: duration.startTime || new Date().toISOString(),
      },
      measureType: selectedSymptom.measureType,
      measureValue:
        selectedSymptom.measureType === "temperature"
          ? temperature
          : measureValue,
      measureLabel: selectedSymptom.measureLabel,
      unit: selectedSymptom.defaultUnit || "",
      notes: symptomNotes,
      addedAt: new Date().toISOString(),
      selectedMuscle: selectedMuscle,
    };

    const updatedSymptoms = [...selectedSymptoms, newSymptom];
    setSelectedSymptoms(updatedSymptoms);

    // Save to localStorage
    try {
      localStorage.setItem(
        "medisense_symptoms_draft",
        JSON.stringify(updatedSymptoms),
      );
    } catch (error) {
      toast.error("Error saving draft:", error);
    }

    // Reset for next symptom
    resetSelection();
  };

  // Remove symptom
  const handleRemoveSymptom = (id) => {
    const updatedSymptoms = selectedSymptoms.filter((s) => s.id !== id);
    setSelectedSymptoms(updatedSymptoms);
    try {
      localStorage.setItem(
        "medisense_symptoms_draft",
        JSON.stringify(updatedSymptoms),
      );
    } catch (error) {
      toast.error("Error saving draft:", error);
    }
  };

  // Reset selection
  const resetSelection = () => {
    setSelectedMuscle(null);
    setSelectedSymptom(null);
    setSelectedBodyPart(null);
    setActiveStep("body");
    setDuration({
      type: "days",
      value: "3-7 days",
      exactValue: "",
      startTime: null,
    });
    setSeverity(5);
    setTemperature(98.6);
    setMeasureValue(5);
    setSymptomNotes("");
    setDurationValue(0);
    setDurationUnit("hours");
    setShowExactDuration(false);
  };

  // Get icon for category
  const getCategoryIcon = (categoryId) => {
    if (categoryId === "custom") return "➕";
    const category = symptomsDatabase.categories.find(
      (c) => c.id === categoryId,
    );
    return category ? category.icon : "💊";
  };

  // Format duration display
  const formatDuration = (durationObj) => {
    if (!durationObj) return "Not specified";

    if (durationObj.exactValue) {
      return durationObj.exactValue;
    }

    return durationObj.value || "Not specified";
  };

  // Render measurement input based on symptom type
  const renderMeasurementInput = () => {
    if (!selectedSymptom) return null;

    switch (selectedSymptom.measureType) {
      case "temperature":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Thermometer className="w-4 h-4 mr-2" />
                {selectedSymptom.measureLabel}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min={selectedSymptom.minValue}
                  max={selectedSymptom.maxValue}
                  step="0.1"
                  value={temperature}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setTemperature(value);
                    setMeasureValue(value);
                  }}
                  className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex items-center space-x-2 min-w-[120px]">
                  <span className="text-xl font-bold text-gray-800">
                    {temperature.toFixed(1)}°F
                  </span>
                  <span className="text-sm text-gray-500">
                    ({(((temperature - 32) * 5) / 9).toFixed(1)}°C)
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>95°F (35°C)</span>
                <span className="text-green-600">Normal: 98.6°F (37°C)</span>
                <span>107°F (41.7°C)</span>
              </div>
            </div>
          </div>
        );

      case "scale":
      case "frequency":
      case "weight":
        const maxValue = selectedSymptom.maxValue || 10;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {selectedSymptom.measureLabel}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min={selectedSymptom.minValue || 1}
                  max={maxValue}
                  step="1"
                  value={measureValue}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setMeasureValue(value);
                    if (selectedSymptom.measureType === "scale") {
                      setSeverity(value);
                    }
                  }}
                  className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex items-center space-x-2 min-w-[80px]">
                  <span className="text-xl font-bold text-gray-800">
                    {measureValue}
                  </span>
                  {selectedSymptom.defaultUnit && (
                    <span className="text-gray-600">
                      {selectedSymptom.defaultUnit}
                    </span>
                  )}
                </div>
              </div>
              {selectedSymptom.measureType === "scale" && (
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Mild (1-3)</span>
                  <span>Moderate (4-7)</span>
                  <span>Severe (8-10)</span>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {selectedSymptom.measureLabel || t("symptomDashboard.severity")}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={measureValue}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setMeasureValue(value);
                    setSeverity(value);
                  }}
                  className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex items-center space-x-2 min-w-[80px]">
                  <span className="text-xl font-bold text-gray-800">
                    {measureValue}/10
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Mild (1-3)</span>
                <span>Moderate (4-7)</span>
                <span>Severe (8-10)</span>
              </div>
            </div>
          </div>
        );
    }
  };

  // Render custom symptom measurement input
  const renderCustomSymptomMeasurementInput = () => {
    switch (customSymptomData.measureType) {
      case "scale":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {customSymptomData.measureLabel}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min={customSymptomData.minValue}
                  max={customSymptomData.maxValue}
                  step="1"
                  value={customSymptomMeasureValue}
                  onChange={(e) =>
                    setCustomSymptomMeasureValue(parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex items-center space-x-2 min-w-[80px]">
                  <span className="text-xl font-bold text-gray-800">
                    {customSymptomMeasureValue}
                  </span>
                  {customSymptomData.defaultUnit && (
                    <span className="text-gray-600">
                      {customSymptomData.defaultUnit}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>
                  Mild ({customSymptomData.minValue}-
                  {Math.floor(
                    (customSymptomData.maxValue - customSymptomData.minValue) /
                      3,
                  ) + customSymptomData.minValue}
                  )
                </span>
                <span>
                  Moderate (
                  {Math.floor(
                    (customSymptomData.maxValue - customSymptomData.minValue) /
                      3,
                  ) +
                    1 +
                    customSymptomData.minValue}
                  -
                  {Math.floor(
                    (2 *
                      (customSymptomData.maxValue -
                        customSymptomData.minValue)) /
                      3,
                  ) + customSymptomData.minValue}
                  )
                </span>
                <span>
                  Severe (
                  {Math.floor(
                    (2 *
                      (customSymptomData.maxValue -
                        customSymptomData.minValue)) /
                      3,
                  ) +
                    1 +
                    customSymptomData.minValue}
                  -{customSymptomData.maxValue})
                </span>
              </div>
            </div>
          </div>
        );

      case "temperature":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Thermometer className="w-4 h-4 mr-2" />
                Temperature
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="95"
                  max="107"
                  step="0.1"
                  value={customSymptomMeasureValue}
                  onChange={(e) =>
                    setCustomSymptomMeasureValue(parseFloat(e.target.value))
                  }
                  className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex items-center space-x-2 min-w-[120px]">
                  <span className="text-xl font-bold text-gray-800">
                    {customSymptomMeasureValue.toFixed(1)}°F
                  </span>
                  <span className="text-sm text-gray-500">
                    ({(((customSymptomMeasureValue - 32) * 5) / 9).toFixed(1)}
                    °C)
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>95°F (35°C)</span>
                <span className="text-green-600">Normal: 98.6°F (37°C)</span>
                <span>107°F (41.7°C)</span>
              </div>
            </div>
          </div>
        );

      case "custom":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {customSymptomData.measureLabel}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min={customSymptomData.minValue}
                  max={customSymptomData.maxValue}
                  step="1"
                  value={customSymptomMeasureValue}
                  onChange={(e) =>
                    setCustomSymptomMeasureValue(parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex items-center space-x-2 min-w-[100px]">
                  <span className="text-xl font-bold text-gray-800">
                    {customSymptomMeasureValue}
                  </span>
                  {customSymptomData.customUnit && (
                    <span className="text-gray-600">
                      {customSymptomData.customUnit}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Min: {customSymptomData.minValue}</span>
                <span>Current: {customSymptomMeasureValue}</span>
                <span>Max: {customSymptomData.maxValue}</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Measurement
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={customSymptomMeasureValue}
                  onChange={(e) =>
                    setCustomSymptomMeasureValue(parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex items-center space-x-2 min-w-[80px]">
                  <span className="text-xl font-bold text-gray-800">
                    {customSymptomMeasureValue}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  // Filter symptoms based on search and category
  useEffect(() => {
    let symptoms = [];

    try {
      if (selectedBodyPart) {
        if (selectedBodyPart.name !== "general" && selectedBodyPart.name) {
          symptoms = getSymptomsByBodyPart(selectedBodyPart.name);
        } else if (selectedBodyPart.name === "general") {
          symptoms = getGeneralSymptoms();
        }
      } else {
        symptoms = symptomsDatabase.symptoms.filter((symptom) => {
          const isPureGeneral =
            symptom.isGeneral &&
            symptom.bodyParts.length === 1 &&
            symptom.bodyParts[0] === "general";
          return !isPureGeneral;
        });
      }

      if (searchQuery) {
        symptoms = symptoms.filter(
          (s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (s.description &&
              s.description.toLowerCase().includes(searchQuery.toLowerCase())),
        );
      }

      if (selectedCategory !== "all") {
        symptoms = symptoms.filter((s) => s.category === selectedCategory);
      }

      setFilteredSymptoms(symptoms);
    } catch (error) {
      console.error("Error filtering symptoms:", error);
      let fallbackSymptoms = symptomsDatabase.symptoms;

      if (selectedBodyPart && selectedBodyPart.mappedParts) {
        fallbackSymptoms = fallbackSymptoms.filter(
          (symptom) =>
            selectedBodyPart.mappedParts.some((p) =>
              symptom.bodyParts.includes(p),
            ) || symptom.bodyParts.includes("general"),
        );
      }

      if (searchQuery) {
        fallbackSymptoms = fallbackSymptoms.filter(
          (s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (s.description &&
              s.description.toLowerCase().includes(searchQuery.toLowerCase())),
        );
      }

      if (selectedCategory !== "all") {
        fallbackSymptoms = fallbackSymptoms.filter(
          (s) => s.category === selectedCategory,
        );
      }

      setFilteredSymptoms(fallbackSymptoms);
    }
  }, [searchQuery, selectedCategory, selectedBodyPart]);

  // Show all general symptoms when clicking the general button
  const handleShowAllGeneralSymptoms = () => {
    setSelectedBodyPart({
      name: "general",
      mappedParts: ["general"],
      isGeneral: true,
    });

    try {
      const generalSymptoms = getGeneralSymptoms();
      setFilteredSymptoms(generalSymptoms);
    } catch (error) {
      console.error("Error getting general symptoms:", error);
      const fallbackSymptoms = symptomsDatabase.symptoms.filter(
        (s) => s.isGeneral,
      );
      setFilteredSymptoms(fallbackSymptoms);
    }

    setActiveStep("symptom");
  };

  // Translate symptoms
  const handleTranslateSymptoms = async () => {
    if (language === "en") return;

    try {
      const translatedSymptoms = await translateSymptomsList(
        filteredSymptoms,
        language,
      );
      setFilteredSymptoms(translatedSymptoms);
      alert(
        t("symptomDashboard.translatedSuccess", {
          language: language.toUpperCase(),
        }),
      );
    } catch (error) {
      console.error("Translation failed:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);
    setSymptoms(selectedSymptoms);

    try {
      const response = await axios.post(
        "https://medisense-genai.up.railway.app/api/symptoms/analyze",
        { symptoms: selectedSymptoms },
      );

      localStorage.setItem(
        "medisense_ai_questions",
        JSON.stringify(response.data.questions),
      );
      setAIQuestions(response.data.questions);

      // Simulate loading for UX
      setTimeout(() => {
        setIsLoading(false);
        if (response.data.medicalHistoryNeeded === true) {
          localStorage.setItem("workflowInProgress", "medical_history");
          navigate("/medical-history");
        } else {
          localStorage.setItem("workflowInProgress", "medisense_ai_questions");
          navigate("/follow-up-questions");
        }
      }, 5000); // 5 seconds for demo
    } catch (error) {
      toast.error("There are some issues submitting your symptoms. Pls try again after 15 min.");
      setIsLoading(false);
    }
  };

  // Cancel loading
  const handleCancelLoading = () => {
    setIsLoading(false);
  };

  // RTL/LTR conditional styling
  const rtlClass = direction === "rtl" ? "rtl" : "";
  const flexDirectionClass =
    direction === "rtl" ? "flex-row-reverse" : "flex-row";
  const textAlignClass = direction === "rtl" ? "text-right" : "text-left";
  const spaceXReverse = direction === "rtl" ? "space-x-reverse" : "";

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-indigo-50/30 via-white to-purple-50/20 ${rtlClass}`}
    >
      {/* Loading Screen */}
      {isLoading && (
        <AnalysisLoadingScreen
          messages={loadingMessages}
          currentMessageIndex={currentMessageIndex}
          onCancel={handleCancelLoading}
        />
      )}

      {/* Header - Compact Gradient Design */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-purple-100/50">
        <div className="container mx-auto px-4 py-3">
          <div
            className={`flex items-center justify-between ${flexDirectionClass}`}
          >
            <div className={`flex items-center space-x-3 ${spaceXReverse}`}>
              <button
                onClick={() => {
                  localStorage.removeItem("medisense_ai_questions");
                  localStorage.setItem(
                    "workflowInProgress",
                    "symptom_selection",
                  );
                  navigate("/");
                }}
                className="p-2 hover:bg-purple-50 rounded-lg transition"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className={`flex items-center space-x-2 ${spaceXReverse}`}>
                <div className="w-8 h-8 bg-[url('/logo.png')] bg-center bg-cover bg-no-repeat rounded-lg flex items-center justify-center">
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                  MediSense<span className="text-indigo-800">AI</span>
                </span>
              </div>
            </div>

            <div className={`flex items-center space-x-3 ${spaceXReverse}`}>
              <div className="flex items-center text-sm text-gray-600">
                <Languages className="w-4 h-4 mr-2" />
                <LanguageSelector compact />
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Progress Bar - Gradient Design */}
        <div className="mb-6">
          <div
            className={`flex items-center justify-between mb-2 ${flexDirectionClass}`}
          >
            <h1 className="text-2xl font-bold text-gray-900">
              {activeStep === "body" && t("symptomDashboard.selectBodyPart")}
              {activeStep === "symptom" && t("symptomDashboard.selectSymptom")}
              {activeStep === "details" &&
                t("symptomDashboard.addSymptomDetails")}
              {activeStep === "customSymptom" &&
                t("symptomDashboard.addCustomSymptom")}
            </h1>
            <div className={`flex items-center space-x-4 ${spaceXReverse}`}>
              <span className="text-sm text-gray-500">
                {t("symptomDashboard.symptomsAdded", {
                  count: selectedSymptoms.length,
                  s: selectedSymptoms.length !== 1 ? "s" : "",
                })}
              </span>
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {activeStep === "body" && t("symptomDashboard.step1")}
                {activeStep === "symptom" && t("symptomDashboard.step2")}
                {activeStep === "customSymptom" && t("symptomDashboard.step2")}
                {activeStep === "details" && t("symptomDashboard.step3")}
              </span>
            </div>
          </div>
          <div className="w-full bg-gradient-to-r from-gray-200 to-gray-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-500 h-2 rounded-full transition-all duration-300"
              style={{
                width:
                  activeStep === "body"
                    ? "33%"
                    : activeStep === "symptom" || activeStep === "customSymptom"
                      ? "66%"
                      : "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Body Map & Symptom Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Body Map Section */}
            {activeStep === "body" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-5 shadow-sm">
                {/* Body Part Search */}
                <div className="w-full relative mb-5">
                  <input
                    className="bg-gradient-to-r from-gray-50 to-white border border-purple-200 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    placeholder={t("symptomDashboard.searchOrganPlaceholder")}
                    value={bodyPartSearchQuery}
                    onChange={(e) => {
                      const query = e.target.value;
                      setBodyPartSearchQuery(query);

                      if (query.trim() === "") {
                        setFilteredBodyParts([]);
                        setShowBodyPartSuggestions(false);
                      } else {
                        const filtered = BODY_PARTS_DB.filter((part) =>
                          part.name.toLowerCase().includes(query.toLowerCase()),
                        );
                        setFilteredBodyParts(filtered);
                        setShowBodyPartSuggestions(true);
                      }
                    }}
                  />
                  <SearchIcon className="top-1/2 -translate-y-1/2 right-0 absolute text-purple-600 bg-purple-100 h-[46px] w-[52px] p-2.5 rounded-r-xl" />

                  {/* Body Parts Suggestions Dropdown */}
                  {showBodyPartSuggestions && filteredBodyParts.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-purple-200 rounded-xl shadow-lg z-50 max-h-[300px] overflow-y-auto">
                      {filteredBodyParts.map((part) => (
                        <button
                          key={part.name}
                          onClick={() => {
                            const mappedCategories =
                              symptomsDatabase.mapBodyPartToSymptomCategories(
                                part.name,
                              );
                            setSelectedBodyPart({
                              name: part.name,
                              mappedParts: mappedCategories,
                              isGeneral: false,
                            });
                            setBodyPartSearchQuery(part.name);
                            setShowBodyPartSuggestions(false);
                            setSelectedMuscle(part.name);
                            setActiveStep("symptom");

                            try {
                              const symptoms = getSymptomsByBodyPart(part.name);
                              setFilteredSymptoms(symptoms);
                            } catch (error) {
                              console.error("Error getting symptoms:", error);
                              const fallbackSymptoms =
                                getSymptomsByMultipleBodyParts([part.name]);
                              setFilteredSymptoms(fallbackSymptoms);
                            }
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 border-b border-gray-100 transition flex items-center justify-between group"
                        >
                          <div>
                            <div className="font-medium text-gray-800">
                              {part.name}
                            </div>
                            <div className="text-xs text-gray-500 capitalize">
                              {part.category}
                              {part.system ? ` • ${part.system}` : ""}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className={`flex items-center justify-between mb-5 ${flexDirectionClass}`}
                >
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    {t("symptomDashboard.clickBodyPart")}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setBodyView("anterior")}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                        bodyView === "anterior"
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                          : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {t("symptomDashboard.frontView")}
                    </button>
                    <button
                      onClick={() => setBodyView("posterior")}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                        bodyView === "posterior"
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                          : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {t("symptomDashboard.backView")}
                    </button>
                  </div>
                </div>

                {/* Interactive Body Map */}
                <div className="relative h-[500px] bg-gradient-to-br from-purple-50/50 to-indigo-50/50 rounded-xl border-2 border-dashed border-purple-200/50 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <Model
                      type={bodyView}
                      onClick={handleMuscleClick}
                      style={{
                        width: "100%",
                        height: "100%",
                        maxWidth: "400px",
                        maxHeight: "400px",
                      }}
                      highlightedColors={["#8b5cf6"]}
                    />
                  </div>

                  {/* Animated Scan Effect */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-scan" />
                  </div>
                </div>

                {/* Quick Access to General Symptoms */}
                <div className="mt-6 p-5 bg-gradient-to-r from-purple-50/80 to-indigo-50/80 rounded-xl border border-purple-200/50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <ActivityIcon className="w-5 h-5 mr-2 text-purple-600" />
                    {t("symptomDashboard.generalSymptoms")}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {t("symptomDashboard.generalSymptomsDesc")}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {symptomsDatabase.symptoms
                      .filter((s) => s.isGeneral)
                      .slice(0, 4)
                      .map((symptom) => (
                        <button
                          key={symptom.id}
                          onClick={() => handleSymptomSelect(symptom)}
                          className="flex flex-col items-center p-3 bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 border border-purple-100 rounded-xl transition group shadow-sm hover:shadow"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center mb-2">
                            <span className="text-lg">
                              {getCategoryIcon(symptom.category)}
                            </span>
                          </div>
                          <span className="font-medium text-gray-800 text-sm text-center">
                            {symptom.name}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            Add details
                          </span>
                        </button>
                      ))}
                  </div>

                  <button
                    onClick={handleShowAllGeneralSymptoms}
                    className="w-full px-4 py-3 bg-gradient-to-r from-white to-gray-50 border-2 border-purple-300/50 text-purple-700 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition font-medium flex items-center justify-center shadow-sm hover:shadow"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t("symptomDashboard.browseAllGeneral")}
                  </button>
                </div>
              </div>
            )}

            {/* Symptom Selection */}
            {activeStep === "symptom" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-5 shadow-sm">
                <div
                  className={`flex items-center justify-between mb-6 ${flexDirectionClass}`}
                >
                  <div className={textAlignClass}>
                    <button
                      onClick={resetSelection}
                      className="flex items-center text-gray-600 hover:text-purple-600 mb-2"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      {selectedBodyPart?.isGeneral
                        ? t("symptomDashboard.backToBodyMap")
                        : t("symptomDashboard.backToSymptoms")}
                    </button>
                    <h2 className="text-xl font-bold text-gray-900 capitalize">
                      {selectedBodyPart?.isGeneral
                        ? t("symptomDashboard.generalSymptoms")
                        : t("symptomDashboard.symptomsFor", {
                            bodyPart:
                              selectedBodyPart?.name || selectedBodyPart,
                          })}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Select the specific symptom you're experiencing
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {t("symptomDashboard.symptomsFound", {
                      count: filteredSymptoms.length,
                    })}
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="mb-6">
                  <div className="relative mb-4">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t(
                        "symptomDashboard.searchSymptomsPlaceholder",
                      )}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />

                    {/* Translate Button */}
                    {showTranslateButton && (
                      <button
                        onClick={handleTranslateSymptoms}
                        disabled={translating}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs rounded-lg flex items-center space-x-1 transition ${
                          translating
                            ? "bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-400 cursor-wait"
                            : "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600 hover:bg-purple-100"
                        } ${spaceXReverse}`}
                      >
                        {translating ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>{t("symptomDashboard.translating")}</span>
                          </>
                        ) : (
                          <>
                            <Languages className="w-3 h-3" />
                            <span>
                              {t("symptomDashboard.translateSymptoms")}
                            </span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                        selectedCategory === "all"
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                          : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {t("symptomDashboard.allCategories")}
                    </button>
                    {symptomsDatabase.categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                          selectedCategory === category.id
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                            : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category.icon} {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Symptoms List */}
                <div className="grid md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                  {filteredSymptoms.length > 0 ? (
                    filteredSymptoms.map((symptom) => (
                      <button
                        key={symptom.id}
                        onClick={() => handleSymptomSelect(symptom)}
                        className="flex items-start justify-between p-4 bg-gradient-to-r from-gray-50 to-white hover:from-purple-50 hover:to-indigo-50 border border-purple-100 rounded-xl transition group text-left hover:shadow"
                      >
                        <div
                          className={`flex items-start space-x-3 ${spaceXReverse}`}
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center mt-1">
                            <span className="text-xl">
                              {getCategoryIcon(symptom.category)}
                            </span>
                          </div>
                          <div className={textAlignClass}>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {symptom.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {symptom.description}
                            </p>
                            <div className="flex items-center text-xs text-gray-500">
                              <span className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-50 rounded">
                                {symptom.measureLabel}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 mt-1" />
                      </button>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8">
                      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        {t("symptomDashboard.noSymptomsFound")}
                      </p>
                    </div>
                  )}

                  {/* Custom Symptom Card */}
                  <button
                    onClick={handleCustomSymptomClick}
                    className="flex items-start justify-between p-4 bg-gradient-to-r from-purple-50/80 to-indigo-50/80 hover:from-purple-100 hover:to-indigo-100 border-2 border-dashed border-purple-300 rounded-xl transition group text-left col-span-2 hover:shadow"
                  >
                    <div
                      className={`flex items-start space-x-3 ${spaceXReverse}`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-lg flex items-center justify-center mt-1">
                        <Plus className="w-5 h-5 text-purple-700" />
                      </div>
                      <div className={textAlignClass}>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {t("symptomDashboard.addCustomSymptomCard")}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {t("symptomDashboard.customSymptomDesc")}
                        </p>
                        <div className="flex items-center text-xs text-purple-600">
                          <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 rounded">
                            {t("symptomDashboard.customTag")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-500 group-hover:text-purple-700 mt-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Custom Symptom Creation */}
            {activeStep === "customSymptom" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-5 shadow-sm">
                <div
                  className={`flex items-center justify-between mb-6 ${flexDirectionClass}`}
                >
                  <div className={textAlignClass}>
                    <button
                      onClick={() => setActiveStep("symptom")}
                      className="flex items-center text-gray-600 hover:text-purple-600 mb-2"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      {t("symptomDashboard.backToSymptoms")}
                    </button>
                    <h2 className="text-xl font-bold text-gray-900">
                      {t("symptomDashboard.addCustomSymptom")}
                    </h2>
                    <p className="text-gray-600">
                      {t("symptomDashboard.descriptionPlaceholder")}
                    </p>
                    {selectedBodyPart && !selectedBodyPart.isGeneral && (
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {t("symptomDashboard.location")}:{" "}
                        {selectedBodyPart?.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Custom Symptom Basic Information */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-purple-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Edit className="w-5 h-5 mr-2 text-purple-600" />
                      {t("symptomDashboard.symptomInformation")}
                    </h3>

                    <div className="space-y-4">
                      {/* Symptom Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Type className="w-4 h-4 mr-2" />
                          {t("symptomDashboard.symptomName")}
                        </label>
                        <input
                          type="text"
                          placeholder={t(
                            "symptomDashboard.symptomNamePlaceholder",
                          )}
                          value={customSymptomData.name}
                          onChange={(e) =>
                            handleCustomSymptomChange("name", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        />
                      </div>

                      {/* Symptom Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          {t("symptomDashboard.description")}
                        </label>
                        <textarea
                          placeholder={t(
                            "symptomDashboard.descriptionPlaceholder",
                          )}
                          value={customSymptomData.description}
                          onChange={(e) =>
                            handleCustomSymptomChange(
                              "description",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-3 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition min-h-[100px]"
                          rows="3"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {t("symptomDashboard.examples")}: "Sharp burning
                          sensation that starts in the morning and gets worse
                          throughout the day."
                        </p>
                      </div>

                      {/* Measurement Type Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Sliders className="w-4 h-4 mr-2" />
                          {t("symptomDashboard.measurementType")}
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            {
                              id: "scale",
                              label: t("symptomDashboard.scale"),
                              icon: "📊",
                            },
                            {
                              id: "temperature",
                              label: t("symptomDashboard.temperature"),
                              icon: "🌡️",
                            },
                            {
                              id: "frequency",
                              label: t("symptomDashboard.frequency"),
                              icon: "🔄",
                            },
                            {
                              id: "custom",
                              label: t("symptomDashboard.custom"),
                              icon: "⚙️",
                            },
                          ].map((type) => (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => {
                                handleCustomSymptomChange(
                                  "measureType",
                                  type.id,
                                );
                                handleCustomSymptomChange(
                                  "measureLabel",
                                  type.id === "scale"
                                    ? t("symptomDashboard.severity")
                                    : type.id === "temperature"
                                      ? t("symptomDashboard.temperature")
                                      : type.id === "frequency"
                                        ? t("symptomDashboard.frequency")
                                        : "Custom Scale",
                                );
                                if (type.id === "temperature") {
                                  setCustomSymptomMeasureValue(98.6);
                                }
                              }}
                              className={`p-3 rounded-xl border-2 transition ${
                                customSymptomData.measureType === type.id
                                  ? "border-purple-600 bg-gradient-to-r from-purple-50 to-indigo-50"
                                  : "border-gray-200 bg-white hover:border-gray-300"
                              }`}
                            >
                              <div className="text-2xl mb-2">{type.icon}</div>
                              <div className="text-sm font-medium">
                                {type.label}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Measurement Configuration */}
                      {customSymptomData.measureType === "scale" && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t("symptomDashboard.minimumValue")}
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={customSymptomData.minValue}
                              onChange={(e) =>
                                handleCustomSymptomChange(
                                  "minValue",
                                  parseInt(e.target.value),
                                )
                              }
                              className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t("symptomDashboard.maximumValue")}
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={customSymptomData.maxValue}
                              onChange={(e) =>
                                handleCustomSymptomChange(
                                  "maxValue",
                                  parseInt(e.target.value),
                                )
                              }
                              className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                        </div>
                      )}

                      {customSymptomData.measureType === "custom" && (
                        <div className="space-y-4 mt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("symptomDashboard.minimumValue")}
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={customSymptomData.minValue}
                                onChange={(e) =>
                                  handleCustomSymptomChange(
                                    "minValue",
                                    parseInt(e.target.value),
                                  )
                                }
                                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("symptomDashboard.maximumValue")}
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={customSymptomData.maxValue}
                                onChange={(e) =>
                                  handleCustomSymptomChange(
                                    "maxValue",
                                    parseInt(e.target.value),
                                  )
                                }
                                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t("symptomDashboard.customUnit")}
                            </label>
                            <input
                              type="text"
                              placeholder={t(
                                "symptomDashboard.customUnitPlaceholder",
                              )}
                              value={customSymptomData.customUnit}
                              onChange={(e) =>
                                handleCustomSymptomChange(
                                  "customUnit",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Duration Selection */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-purple-100">
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {t("symptomDashboard.duration")}
                    </label>

                    <div className="space-y-4">
                      {/* Quick Duration Options */}
                      {!showExactDuration && (
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          {symptomsDatabase.durationOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setDuration({
                                  ...duration,
                                  type: option.value.includes("hours")
                                    ? "hours"
                                    : "days",
                                  value: option.label,
                                  exactValue: option.value,
                                });
                              }}
                              className={`px-3 py-3 rounded-xl text-sm font-medium transition ${
                                duration.value === option.label
                                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                                  : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Toggle for Exact Duration */}
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() =>
                            setShowExactDuration(!showExactDuration)
                          }
                          className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center"
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          {showExactDuration
                            ? t("symptomDashboard.useCommonDurations")
                            : t("symptomDashboard.setExactDuration")}
                        </button>
                      </div>

                      {/* Exact Duration Input */}
                      {showExactDuration && (
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("symptomDashboard.howLong")}
                              </label>
                              <input
                                type="number"
                                min="0"
                                max="365"
                                value={durationValue}
                                onChange={(e) =>
                                  setDurationValue(
                                    Math.max(0, parseInt(e.target.value) || 0),
                                  )
                                }
                                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter number"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("symptomDashboard.unit")}
                              </label>
                              <select
                                value={durationUnit}
                                onChange={(e) =>
                                  setDurationUnit(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                              >
                                <option value="hours">Hours</option>
                                <option value="days">Days</option>
                                <option value="weeks">Weeks</option>
                                <option value="months">Months</option>
                              </select>
                            </div>
                          </div>
                          {durationValue > 0 && (
                            <div className="mt-3 p-3 bg-white rounded-lg border border-purple-100">
                              <p className="text-sm text-purple-700 font-medium">
                                Duration: {durationValue}{" "}
                                {durationValue === 1
                                  ? durationUnit.slice(0, -1)
                                  : durationUnit}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                {t("symptomDashboard.startedAgo", {
                                  duration: durationValue,
                                  unit:
                                    durationValue === 1
                                      ? durationUnit.slice(0, -1)
                                      : durationUnit,
                                })}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Custom Symptom Measurement Input */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-purple-100">
                    {renderCustomSymptomMeasurementInput()}
                  </div>

                  {/* Additional Notes */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-purple-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("symptomDashboard.additionalNotes")}
                    </label>
                    <textarea
                      placeholder={t("symptomDashboard.notesPlaceholder")}
                      value={symptomNotes}
                      onChange={(e) => setSymptomNotes(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition min-h-[100px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {t("symptomDashboard.examples")}: "Worse in the morning",
                      "Better with rest", "Started after eating", "Feels like
                      burning/tingling"
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className={`flex space-x-4 pt-4 ${flexDirectionClass}`}>
                    <button
                      onClick={resetCustomSymptom}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-purple-600 hover:text-purple-600 transition font-medium"
                    >
                      {t("symptomDashboard.cancel")}
                    </button>
                    <button
                      onClick={handleAddCustomSymptom}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition font-semibold flex items-center justify-center"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {t("symptomDashboard.addSymptomToList")}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Symptom Details */}
            {activeStep === "details" && selectedSymptom && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-5 shadow-sm">
                <div
                  className={`flex items-center justify-between mb-6 ${flexDirectionClass}`}
                >
                  <div className={textAlignClass}>
                    <button
                      onClick={() => setActiveStep("symptom")}
                      className="flex items-center text-gray-600 hover:text-purple-600 mb-2"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      {t("symptomDashboard.backToSymptoms")}
                    </button>
                    <h2 className="text-xl font-bold text-gray-900">
                      {t("symptomDashboard.addSymptomDetails")}:{" "}
                      {selectedSymptom.name}
                    </h2>
                    <p className="text-gray-600">
                      {selectedSymptom.description}
                    </p>
                    {selectedBodyPart && !selectedBodyPart.isGeneral && (
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {t("symptomDashboard.location")}:{" "}
                        {selectedBodyPart?.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Duration Selection */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-purple-100">
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {t("symptomDashboard.duration")}
                    </label>

                    <div className="space-y-4">
                      {/* Quick Duration Options */}
                      {!showExactDuration && (
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          {symptomsDatabase.durationOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setDuration({
                                  ...duration,
                                  type: option.value.includes("hours")
                                    ? "hours"
                                    : "days",
                                  value: option.label,
                                  exactValue: option.value,
                                });
                              }}
                              className={`px-3 py-3 rounded-xl text-sm font-medium transition ${
                                duration.value === option.label
                                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                                  : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Toggle for Exact Duration */}
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() =>
                            setShowExactDuration(!showExactDuration)
                          }
                          className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center"
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          {showExactDuration
                            ? t("symptomDashboard.useCommonDurations")
                            : t("symptomDashboard.setExactDuration")}
                        </button>
                      </div>

                      {/* Exact Duration Input */}
                      {showExactDuration && (
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("symptomDashboard.howLong")}
                              </label>
                              <input
                                type="number"
                                min="0"
                                max="365"
                                value={durationValue}
                                onChange={(e) =>
                                  setDurationValue(
                                    Math.max(0, parseInt(e.target.value) || 0),
                                  )
                                }
                                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter number"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("symptomDashboard.unit")}
                              </label>
                              <select
                                value={durationUnit}
                                onChange={(e) =>
                                  setDurationUnit(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                              >
                                <option value="hours">Hours</option>
                                <option value="days">Days</option>
                                <option value="weeks">Weeks</option>
                                <option value="months">Months</option>
                              </select>
                            </div>
                          </div>
                          {durationValue > 0 && (
                            <div className="mt-3 p-3 bg-white rounded-lg border border-purple-100">
                              <p className="text-sm text-purple-700 font-medium">
                                Duration: {durationValue}{" "}
                                {durationValue === 1
                                  ? durationUnit.slice(0, -1)
                                  : durationUnit}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                {t("symptomDashboard.startedAgo", {
                                  duration: durationValue,
                                  unit:
                                    durationValue === 1
                                      ? durationUnit.slice(0, -1)
                                      : durationUnit,
                                })}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Measurement Input */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-purple-100">
                    {renderMeasurementInput()}
                  </div>

                  {/* Additional Notes */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-purple-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("symptomDashboard.additionalNotes")}
                    </label>
                    <textarea
                      placeholder={t("symptomDashboard.notesPlaceholder")}
                      value={symptomNotes}
                      onChange={(e) => setSymptomNotes(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition min-h-[100px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {t("symptomDashboard.examples")}: "Worse in the morning",
                      "Better with rest", "Started after eating"
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className={`flex space-x-4 pt-4 ${flexDirectionClass}`}>
                    <button
                      onClick={() => setActiveStep("symptom")}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-purple-600 hover:text-purple-600 transition font-medium"
                    >
                      {t("symptomDashboard.cancel")}
                    </button>
                    <button
                      onClick={handleAddSymptom}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition font-semibold flex items-center justify-center"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {t("symptomDashboard.addSymptomToList")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Selected Symptoms Panel */}
          <div className="space-y-6">
            {/* Selected Symptoms */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-5 shadow-sm">
              <div
                className={`flex items-center justify-between mb-6 ${flexDirectionClass}`}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("symptomDashboard.yourSymptoms")} (
                  {selectedSymptoms.length})
                </h3>
                {selectedSymptoms.length > 0 && (
                  <div
                    className={`flex items-center space-x-3 ${spaceXReverse}`}
                  >
                    <button
                      onClick={() => {
                        localStorage.setItem(
                          "medisense_symptoms_draft",
                          JSON.stringify(selectedSymptoms),
                        );
                        alert("Draft saved!");
                      }}
                      className="text-sm text-purple-600 hover:text-purple-700 flex items-center"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      {t("symptomDashboard.save")}
                    </button>
                    <button
                      onClick={clearDraft}
                      className="text-sm text-red-600 hover:text-red-700 flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      {t("symptomDashboard.clear")}
                    </button>
                  </div>
                )}
              </div>

              {selectedSymptoms.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">
                    {t("symptomDashboard.noSymptomsAdded")}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {t("symptomDashboard.noSymptomsAddedDesc")}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {selectedSymptoms.map((symptom) => (
                    <div
                      key={symptom.id}
                      className={`p-4 rounded-xl border transition ${
                        symptom.isCustom
                          ? "bg-gradient-to-r from-purple-50/80 to-indigo-50/80 border-purple-300 hover:border-purple-400"
                          : "bg-gradient-to-r from-gray-50 to-white border-purple-200 hover:border-purple-300"
                      }`}
                    >
                      <div
                        className={`flex items-start justify-between mb-2 ${flexDirectionClass}`}
                      >
                        <div
                          className={`flex items-start space-x-3 ${spaceXReverse}`}
                        >
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              symptom.isCustom
                                ? "bg-gradient-to-br from-purple-200 to-indigo-200"
                                : "bg-gradient-to-br from-purple-100 to-indigo-100"
                            }`}
                          >
                            <span className="text-lg">
                              {getCategoryIcon(symptom.category)}
                            </span>
                          </div>
                          <div className={textAlignClass}>
                            <div className="flex items-center">
                              <h4 className="font-semibold text-gray-900">
                                {symptom.name}
                              </h4>
                              {symptom.isCustom && (
                                <span className="ml-2 text-xs px-2 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full">
                                  {t("symptomDashboard.customTag")}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatDuration(symptom.duration)}
                            </div>
                            {symptom.bodyPart &&
                              symptom.bodyPart !== "general" && (
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {symptom.bodyPart}
                                </div>
                              )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveSymptom(symptom.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-3 pt-3 border-t border-purple-200">
                        <div
                          className={`flex items-center justify-between text-sm mb-2 ${flexDirectionClass}`}
                        >
                          <span className="text-gray-700">
                            {symptom.measureLabel}:
                          </span>
                          <span className="font-semibold text-gray-900">
                            {symptom.measureValue}
                            {symptom.unit}
                          </span>
                        </div>
                        {symptom.measureType === "scale" && (
                          <div className="mt-2">
                            <div className="w-full bg-gradient-to-r from-gray-200 to-gray-100 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full"
                                style={{
                                  width: `${(symptom.measureValue / (symptom.customData?.maxValue || 10)) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                        {symptom.notes && (
                          <div className="mt-2 text-sm text-gray-600 bg-gradient-to-r from-gray-50 to-white p-2 rounded-lg border border-purple-100">
                            <div className="font-medium mb-1">
                              {t("symptomDashboard.notes")}:
                            </div>
                            {symptom.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Continue Button */}
              {selectedSymptoms.length > 0 && (
                <div className="mt-6 pt-6 border-t border-purple-200">
                  <button
                    onClick={handleSubmit}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 font-semibold text-lg flex items-center justify-center group"
                  >
                    <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                    {t("symptomDashboard.startAIAnalysis")}
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-3">
                    {t("symptomDashboard.symptomsReady", {
                      count: selectedSymptoms.length,
                      s: selectedSymptoms.length !== 1 ? "s" : "",
                    })}
                  </p>
                </div>
              )}
            </div>

            {/* Workflow Guide */}
            <div className="bg-gradient-to-br from-purple-50/80 to-indigo-50/80 border border-purple-200/50 rounded-2xl p-5">
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                {t("symptomDashboard.completeWorkflow")}
              </h4>
              <ol className="text-sm text-purple-700 space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs font-bold">
                    1
                  </div>
                  <span>
                    <strong>{t("symptomDashboard.workflowStep1")}</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs font-bold">
                    2
                  </div>
                  <span>
                    <strong>{t("symptomDashboard.workflowStep2")}</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs font-bold">
                    3
                  </div>
                  <span>
                    <strong>{t("symptomDashboard.workflowStep3")}</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs font-bold">
                    4
                  </div>
                  <span>
                    <strong>{t("symptomDashboard.workflowStep4")}</strong>
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(1000%);
          }
        }

        .animate-scan {
          animation: scan 2s linear infinite;
        }

        .rtl select {
          background-position: left 0.5rem center;
          padding-left: 2.5rem;
          padding-right: 0.75rem;
        }

        .rtl .space-x-2 > :not([hidden]) ~ :not([hidden]) {
          --tw-space-x-reverse: 1;
        }
      `}</style>
    </div>
  );
};

export default SymptomSelectionDashboard;
