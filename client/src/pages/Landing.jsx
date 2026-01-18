import React, { useState, useEffect } from "react";
import {
  Brain,
  Shield,
  Clock,
  Globe,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  MapPin,
  Heart,
  ArrowRight,
  Star,
  Lock,
  Target,
  Globe2,
  FileText,
  Smartphone as Mobile,
  ChevronRight,
  Sparkles,
  Activity,
  Users,
  Zap,
  Bell,
  Stethoscope,
  Scan,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "../components/LanguageSelector";

const Landing = () => {
  const { language, direction, t } = useLanguage();
  const [stats, setstats] = useState({
    symptoms: 0,
    conditions: 0,
    users: 0,
    rating: 0,
  });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Animated counters
    const counters = [
      {
        target: 12480,
        setter: (val) => setstats((prev) => ({ ...prev, symptoms: val })),
      },
      {
        target: 582,
        setter: (val) => setstats((prev) => ({ ...prev, conditions: val })),
      },
      {
        target: 15320,
        setter: (val) => setstats((prev) => ({ ...prev, users: val })),
      },
      {
        target: 4.8,
        setter: (val) => setstats((prev) => ({ ...prev, rating: val })),
      },
    ];

    counters.forEach((counter) => {
      let current = 0;
      const increment = counter.target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= counter.target) {
          counter.setter(counter.target);
          clearInterval(timer);
        } else {
          counter.setter(Math.floor(current));
        }
      }, 20);
    });

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const gradientOffset = Math.min(scrollY / 1000, 0.3);

  // RTL/LTR conditional styling
  const rtlClass = direction === "rtl" ? "rtl" : "";
  const flexDirectionClass =
    direction === "rtl" ? "flex-row-reverse" : "flex-row";
  const textAlignClass = direction === "rtl" ? "text-right" : "text-left";
  const spaceXReverse = direction === "rtl" ? "space-x-reverse" : "";

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-indigo-950/10 via-white to-teal-50/50 ${rtlClass}`}
    >
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-lg z-50 border-b border-purple-100/50">
        <div className="container mx-auto px-4 py-3">
          <div
            className={`flex items-center justify-between ${flexDirectionClass}`}
          >
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-gradient-to-br bg-[url('/logo.png')] bg-center bg-cover bg-no-repeat rounded-xl flex items-center justify-center">
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                MediSense<span className="text-indigo-800">AI</span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a
                href="#features"
                className="text-sm text-gray-700 hover:text-purple-600 transition px-3 py-1 rounded-lg hover:bg-purple-50"
              >
                {t("nav.features")}
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-gray-700 hover:text-purple-600 transition px-3 py-1 rounded-lg hover:bg-purple-50"
              >
                {t("nav.howItWorks")}
              </a>
              <a
                href="#trust"
                className="text-sm text-gray-700 hover:text-purple-600 transition px-3 py-1 rounded-lg hover:bg-purple-50"
              >
                {t("nav.trust")}
              </a>
              <div
                className={`flex items-center space-x-3 pl-4 border-l border-gray-200 ${spaceXReverse}`}
              >
                <LanguageSelector compact />
                <Link to={"/symptoms"} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                  {t("nav.startCheck")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
     <section className="pt-24 pb-12 px-4">
  <div className="container mx-auto">
    <div
      className={`grid lg:grid-cols-2 gap-8 items-center ${flexDirectionClass}`}
    >
      <div className={`space-y-6 ${textAlignClass}`}>
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full text-sm">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-purple-700 font-medium">
            {t("hero.aiTagline")}
          </span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          {t("hero.titleLine1")}
          <span className="block bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
            {t("hero.titleLine2")}
          </span>
        </h1>

        <p className="text-gray-600 text-base leading-relaxed">
          {t("hero.description")}
        </p>

        {/* Primary CTA */}
        <div
          className={`flex flex-col sm:${flexDirectionClass} gap-3 pt-4`}
        >
          <Link
            to="/symptoms"
            className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center">
              {t("hero.startButton")}
              <ArrowRight
                className={`ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform ${
                  direction === "rtl" ? "rotate-180" : ""
                }`}
              />
            </span>
          </Link>

          <button className="px-6 py-3 border-2 border-purple-200 text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition">
            {t("hero.howItWorksButton")}
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-3 pt-6">
          {[
            {
              icon: Shield,
              text: t("hero.trustBadges.privacy"),
              color: "text-teal-600",
            },
            {
              icon: Clock,
              text: t("hero.trustBadges.speed"),
              color: "text-indigo-600",
            },
            {
              icon: Lock,
              text: t("hero.trustBadges.anonymous"),
              color: "text-purple-600",
            },
            {
              icon: CheckCircle,
              text: t("hero.trustBadges.evidence"),
              color: "text-emerald-600",
            },
          ].map((badge, idx) => (
            <div
              key={idx}
              className={`flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-100 ${spaceXReverse}`}
            >
              <badge.icon className={`w-4 h-4 ${badge.color}`} />
              <span className="text-sm text-gray-700">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Workflow Visualization */}
      <div className="relative">
        <div className="relative bg-gradient-to-br to-purple-50 rounded-2xl border border-purple-100 p-6 shadow-xl">
          {/* Workflow Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full">
              <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-sm font-medium text-indigo-700">
                {t("hero.workflow.title") || "AI Analysis Workflow"}
              </span>
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-indigo-500 to-teal-500">
              {/* Animated Progress Dot */}
              <div className="absolute w-4 h-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full -left-1.5 animate-progress-dot shadow-lg shadow-purple-500/50"></div>
            </div>

            {/* Steps Container */}
            <div className="space-y-6 pl-12">
              {[
                {
                  step: 1,
                  icon: (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: t("hero.workflow.step1") || "Start",
                  description: t("hero.workflow.step1Desc") || "Begin your symptom analysis",
                  color: "from-purple-500 to-indigo-500"
                },
                {
                  step: 2,
                  icon: (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                  title: t("hero.workflow.step2") || "Select Symptoms",
                  description: t("hero.workflow.step2Desc") || "Choose from body map or search",
                  color: "from-indigo-500 to-blue-500"
                },
                {
                  step: 3,
                  icon: (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                  title: t("hero.workflow.step3") || "AI Check",
                  description: t("hero.workflow.step3Desc") || "Intelligent pattern analysis",
                  color: "from-blue-500 to-teal-500"
                },
                {
                  step: 4,
                  icon: (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                  title: t("hero.workflow.step4") || "Medical History",
                  description: t("hero.workflow.step4Desc") || "Optional context for accuracy",
                  color: "from-teal-500 to-emerald-500"
                },
                {
                  step: 5,
                  icon: (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  ),
                  title: t("hero.workflow.step5") || "Follow-up Questions",
                  description: t("hero.workflow.step5Desc") || "AI-driven clarification",
                  color: "from-emerald-500 to-green-500"
                },
                {
                  step: 6,
                  icon: (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: t("hero.workflow.step6") || "Results",
                  description: t("hero.workflow.step6Desc") || "Personalized analysis & recommendations",
                  color: "from-green-500 to-cyan-500"
                }
              ].map((step) => (
                <div 
                  key={step.step} 
                  className="group flex items-start space-x-4 cursor-pointer hover:transform hover:-translate-x-1 transition-transform duration-200"
                >
                  {/* Step Number & Icon */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                      <span className="text-xs font-bold text-gray-700">{step.step}</span>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-sm group-hover:text-indigo-600 transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {step.description}
                    </p>
                    
                    {/* Progress Indicator (Mobile) */}
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${step.color} rounded-full transition-all duration-500 group-hover:w-full`}
                        style={{ width: `${(step.step / 6) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Arrow (Desktop) */}
                  <svg 
                    className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200 hidden lg:block" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Estimated Time */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">
                      {t("hero.workflow.timeLabel") || "Total time"}
                    </div>
                    <div className="text-sm font-semibold text-gray-800">
                      {t("hero.workflow.timeValue") || "Under 3 minutes"}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">
                    {t("hero.workflow.successRate") || "Success rate"}
                  </div>
                  <div className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    85%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Stats */}
          <div className="absolute -top-3 -right-3 bg-white rounded-xl shadow-lg border border-gray-200 p-3 hidden lg:block">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-500">
                  {t("hero.workflow.completed") || "Completed"}
                </div>
                <div className="text-sm font-bold text-gray-800">10K+</div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes progress-dot {
            0% {
              top: 0%;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              top: 100%;
              opacity: 0;
            }
          }
          
          .animate-progress-dot {
            animation: progress-dot 8s ease-in-out infinite;
          }
          
          @media (max-width: 768px) {
            .animate-progress-dot {
              animation: progress-dot 12s ease-in-out infinite;
            }
          }
        `}</style>
      </div>
    </div>
  </div>
</section>

      {/* stats. Bar */}
      <div className="bg-gradient-to-r from-purple-50/50 to-indigo-50/50 border-y border-purple-100/50">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                value: stats.symptoms,
                label: t("stats.symptoms"),
                suffix: "+",
              },
              {
                value: stats.conditions,
                label: t("stats.conditions"),
                suffix: "+",
              },
              { value: stats.users, label: t("stats.users"), suffix: "+" },
              { value: stats.rating, label: t("stats.rating"), suffix: "/5.0" },
            ].map((stat, idx) => (
              <div key={idx} className={`text-center ${textAlignClass}`}>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 px-4">
        <div className="container mx-auto">
          <div className={`text-center mb-8 ${textAlignClass}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t("howItWorks.title")}
            </h2>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              {t("howItWorks.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {Object.values(t("howItWorks.steps")).map((step, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className={`flex items-start space-x-4 ${spaceXReverse}`}>
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${
                      [
                        "from-purple-500 to-indigo-500",
                        "from-indigo-500 to-teal-500",
                        "from-teal-500 to-purple-500",
                      ][idx]
                    } rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    {[MapPin, Brain, MessageSquare][idx] &&
                      React.createElement([MapPin, Brain, MessageSquare][idx], {
                        className: "w-6 h-6 text-white",
                      })}
                  </div>
                  <div className={direction === "rtl" ? "text-right" : ""}>
                    <div className="text-xs font-semibold text-gray-500 mb-1">
                      STEP {step.number}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-12 px-4 bg-gradient-to-b from-white to-purple-50/30"
      >
        <div className="container mx-auto">
          <div className={`text-center mb-8 ${textAlignClass}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t("features.title")}
            </h2>
            <p className="text-gray-600 text-sm">{t("features.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(t("features.items")).map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-xl p-4 hover:border-purple-200 hover:shadow-sm transition-all group"
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${
                    [
                      "from-purple-100 to-indigo-100",
                      "from-indigo-100 to-blue-100",
                      "from-amber-100 to-orange-100",
                      "from-teal-100 to-emerald-100",
                      "from-blue-100 to-purple-100",
                      "from-purple-100 to-pink-100",
                    ][idx]
                  } rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  {[Scan, Brain, AlertTriangle, Globe2, Lock, Mobile][idx] &&
                    React.createElement(
                      [Scan, Brain, AlertTriangle, Globe2, Lock, Mobile][idx],
                      {
                        className: "w-5 h-5 text-gray-700",
                      }
                    )}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section id="trust" className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Privacy Card */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <div
                className={`flex items-center space-x-3 mb-5 ${flexDirectionClass}`}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-teal-600" />
                </div>
                <div className={textAlignClass}>
                  <h3 className="font-bold text-gray-900">
                    {t("trust.privacy.title")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t("trust.privacy.subtitle")}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {t("trust.privacy.points").map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start space-x-3 ${spaceXReverse}`}
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer Card */}
            <div className="bg-gradient-to-br from-red-50/50 to-orange-50/50 border border-red-100 rounded-xl p-5">
              <div
                className={`flex items-center space-x-3 mb-5 ${flexDirectionClass}`}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div className={textAlignClass}>
                  <h3 className="font-bold text-gray-900">
                    {t("trust.disclaimer.title")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t("trust.disclaimer.subtitle")}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white/50 border border-red-100 rounded-lg p-3">
                  <div
                    className={`flex items-start space-x-2 ${spaceXReverse}`}
                  >
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className={textAlignClass}>
                      <h4 className="text-sm font-semibold text-red-800">
                        {t("trust.disclaimer.emergency.title")}
                      </h4>
                      <p className="text-xs text-red-700 mt-1">
                        {t("trust.disclaimer.emergency.description")}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700">
                  {t("trust.disclaimer.note")}
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          {/* Trust Indicators - Redesigned with Gradient Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              {
                label: t("trust.indicators.evidence"),
                icon: FileText,
                gradient: "from-teal-500 to-emerald-500",
                bgGradient: "from-teal-50/60 to-emerald-50/40",
                iconGradient: "text-teal-600",
                pulse: false,
              },
              {
                label: t("trust.indicators.updates"),
                icon: Clock,
                gradient: "from-indigo-500 to-purple-500",
                bgGradient: "from-indigo-50/60 to-purple-50/40",
                iconGradient: "text-indigo-600",
                pulse: true,
              },
              {
                label: t("trust.indicators.expert"),
                icon: Users,
                gradient: "from-purple-500 to-violet-500",
                bgGradient: "from-purple-50/60 to-violet-50/40",
                iconGradient: "text-purple-600",
                pulse: false,
              },
              {
                label: t("trust.indicators.transparent"),
                icon: Shield,
                gradient: "from-amber-500 to-orange-500",
                bgGradient: "from-amber-50/60 to-orange-50/40",
                iconGradient: "text-amber-600",
                pulse: false,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`
        relative group bg-white/80 backdrop-blur-sm border border-gray-100 
        rounded-xl p-3 hover:shadow-md transition-all duration-300 
        hover:border-transparent hover:scale-[1.02]
        ${textAlignClass}
      `}
              >
                {/* Animated gradient background on hover */}
                <div
                  className={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
          bg-gradient-to-br ${item.gradient} transition-opacity duration-300 
          blur-xl -z-10
        `}
                />

                {/* Gradient border effect */}
                <div
                  className={`
          absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-30 
          bg-gradient-to-br ${item.gradient} transition-opacity duration-300 
          -z-10
        `}
                />

                {/* Icon with gradient background */}
                <div className="flex items-center mb-2">
                  <div
                    className={`
            relative w-9 h-9 rounded-lg flex items-center justify-center 
            bg-gradient-to-br ${item.bgGradient} border border-gray-100
            group-hover:shadow-sm transition-all
          `}
                  >
                    {/* Animated pulse effect for specific items */}
                    {item.pulse && (
                      <div
                        className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-400/20 to-purple-400/20 animate-pulse"
                        style={{ animationDelay: `${idx * 0.5}s` }}
                      />
                    )}

                    <item.icon
                      className={`w-4 h-4 ${item.iconGradient} group-hover:scale-110 transition-transform`}
                    />

                    {/* Subtle gradient accent */}
                    <div
                      className={`
              absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 
              bg-gradient-to-r ${item.gradient} rounded-full opacity-60
            `}
                    />
                  </div>

                  {/* Optional: Add a small status dot for "updates" */}
                  {item.pulse && (
                    <div className="ml-2 relative">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-ping" />
                      <div className="absolute top-0 w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                    </div>
                  )}
                </div>

                {/* Label with better typography */}
                <span
                  className="
          text-xs font-semibold bg-gradient-to-r from-gray-800 to-gray-600 
          bg-clip-text text-transparent group-hover:from-gray-900 
          group-hover:to-gray-700 transition-all block mt-1
        "
                >
                  {item.label}
                </span>

                {/* Micro-interaction indicator */}
                <div
                  className={`
          absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 
          transition-opacity duration-300
          ${direction === "rtl" ? "left-2 right-auto" : "right-2"}
        `}
                >
                  <div className="w-1.5 h-1.5 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-indigo-50/30">
        <div className="container mx-auto">
          <div className={`text-center mb-8 ${textAlignClass}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t("useCases.title")}
            </h2>
            <p className="text-gray-600 text-sm">{t("useCases.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(t("useCases.cases")).map((useCase, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-xl p-4 hover:border-purple-200 hover:shadow-sm transition-all"
              >
                <h3 className="font-bold text-gray-900 mb-2">
                  {useCase.title}
                </h3>
                <p className="text-sm text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-3">
              {t("cta.title")}
            </h2>
            <p className="text-purple-100 mb-6 text-sm">
              {t("cta.description")}
            </p>
            <Link
              to="/symptoms"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
            >
              {t("cta.button")}
              <ArrowRight
                className={`ml-2 w-4 h-4 ${
                  direction === "rtl" ? "rotate-180" : ""
                }`}
              />
            </Link>
            <p className="text-purple-200 text-xs mt-4">
              {t("cta.users", { count: stats.users })}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className={textAlignClass}>
              <div
                className={`flex items-center space-x-2 mb-4 ${flexDirectionClass}`}
              >
                <Brain className="w-6 h-6 text-purple-400" />
                <span className="text-lg font-bold">
                  MediSense<span className="text-purple-400">AI</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm">{t("footer.tagline")}</p>
            </div>

            {[
              { title: t("footer.product"), links: t("footer.productLinks") },
              {
                title: t("footer.resources"),
                links: t("footer.resourcesLinks"),
              },
              { title: t("footer.connect"), links: t("footer.connectLinks") },
            ].map((column, idx) => (
              <div key={idx} className={textAlignClass}>
                <h4 className="font-semibold mb-3">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href="#"
                        className="text-sm text-gray-400 hover:text-white transition"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-6 pt-6">
            <div
              className={`flex flex-col md:${flexDirectionClass} justify-between items-center space-y-3 md:space-y-0`}
            >
              <div className={`flex items-center space-x-3 ${spaceXReverse}`}>
                <LanguageSelector variant="button" />
                <span className="text-xs text-gray-400">
                  {t("footer.copyright")}
                </span>
              </div>
              <div
                className={`text-center text-xs text-gray-500 ${textAlignClass}`}
              >
                <p>{t("footer.disclaimer")}</p>
                <p className="mt-1">
                  {t("footer.builtWith").replace("❤️", "❤️")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.05);
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-scan {
          animation: scan 2s linear infinite;
        }

        /* RTL adjustments */
        .rtl select {
          background-position: left 0.5rem center;
          padding-left: 2.5rem;
          padding-right: 0.75rem;
        }

        .rtl .space-x-2 > :not([hidden]) ~ :not([hidden]) {
          --tw-space-x-reverse: 1;
        }

        .rtl .ltr\:space-x-2 {
          direction: ltr;
        }
      `}</style>
    </div>
  );
};

export default Landing;
