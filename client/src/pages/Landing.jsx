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
  Search,
  GraduationCap,
  TrendingUp,
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
  const [activeBodyPart, setActiveBodyPart] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  useEffect(() => {
    const counters = [
      { target: 12480, setter: (val) => setstats((prev) => ({ ...prev, symptoms: val })) },
      { target: 582, setter: (val) => setstats((prev) => ({ ...prev, conditions: val })) },
      { target: 15320, setter: (val) => setstats((prev) => ({ ...prev, users: val })) },
      { target: 4.8, setter: (val) => setstats((prev) => ({ ...prev, rating: val })) },
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

  const rtlClass = direction === "rtl" ? "rtl" : "";
  const flexDirectionClass = direction === "rtl" ? "flex-row-reverse" : "flex-row";
  const textAlignClass = direction === "rtl" ? "text-right" : "text-left";
  const spaceXReverse = direction === "rtl" ? "space-x-reverse" : "";

  const toggleSymptom = (sym) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const bodyParts = [
    { id: "head", label: "Head", tooltip: "Headache, Migraine, Sinus" },
    { id: "neck", label: "Neck", tooltip: "Throat, Thyroid, Stiffness" },
    { id: "chest", label: "Chest & Cardiac", tooltip: "Heart, Lungs, Ribs" },
    { id: "abdomen", label: "Abdomen", tooltip: "Stomach, Liver, Intestines" },
    { id: "hips", label: "Hips & Pelvis", tooltip: "Bladder, Reproductive" },
    { id: "left-leg", label: "Left Leg", tooltip: "Knee, Ankle, Foot" },
    { id: "right-leg", label: "Right Leg", tooltip: "Knee, Ankle, Foot" },
  ];

  const generalSymptoms = ["Fever", "Fatigue", "Nausea", "Dizziness", "Chills"];

  return (
    <div className={`min-h-screen bg-gradient-to-b from-indigo-950/10 via-white to-teal-50/50 ${rtlClass}`}>

      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-lg z-50 border-b border-purple-100/50">
        <div className="container mx-auto px-4 py-3">
          <div className={`flex items-center justify-between ${flexDirectionClass}`}>
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                MediSense<span className="text-indigo-800">AI</span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#features" className="text-sm text-gray-700 hover:text-purple-600 transition px-3 py-1 rounded-lg hover:bg-purple-50">
                {t("nav.features")}
              </a>
              <a href="#how-it-works" className="text-sm text-gray-700 hover:text-purple-600 transition px-3 py-1 rounded-lg hover:bg-purple-50">
                {t("nav.howItWorks")}
              </a>
              <a href="#trust" className="text-sm text-gray-700 hover:text-purple-600 transition px-3 py-1 rounded-lg hover:bg-purple-50">
                {t("nav.trust")}
              </a>
              <div className={`flex items-center space-x-3 pl-4 border-l border-gray-200 ${spaceXReverse}`}>
                <LanguageSelector compact />
                <Link to={"/symptoms"} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                  {t("nav.startCheck")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        {/* Animated background blobs */}
        <div
          className="absolute top-10 left-10 w-96 h-96 opacity-[0.06] bg-purple-500 animate-float-blob pointer-events-none"
          style={{ borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%" }}
        />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 opacity-[0.05] bg-indigo-500 pointer-events-none"
          style={{ borderRadius: "40% 60% 30% 70% / 60% 40% 50% 60%", animation: "float-blob 14s ease-in-out infinite", animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 opacity-[0.04] bg-teal-400 animate-float-blob pointer-events-none"
          style={{ borderRadius: "50% 50% 70% 30% / 40% 60% 50% 60%", animationDelay: "6s" }}
        />

        <div className="container mx-auto">
          <div className={`grid lg:grid-cols-2 gap-12 items-center ${flexDirectionClass}`}>
            {/* Left copy */}
            <div className={`space-y-6 ${textAlignClass}`}>
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full text-sm">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-purple-700 font-medium">{t("hero.aiTagline")}</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {t("hero.titleLine1")}
                <span className="block bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                  {t("hero.titleLine2")}
                </span>
              </h1>

              <p className="text-gray-600 text-base leading-relaxed">{t("hero.description")}</p>

              <p className="text-lg font-semibold text-gray-800 tracking-tight">
                No typing.&nbsp; No jargon.&nbsp; No waiting.
              </p>

              <div className={`flex flex-col sm:${flexDirectionClass} gap-3 pt-2`}>
                <Link
                  to="/symptoms"
                  className="group relative px-7 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center justify-center">
                    {t("hero.startButton")}
                    <ArrowRight className={`ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform ${direction === "rtl" ? "rotate-180" : ""}`} />
                  </span>
                </Link>
                <button className="px-7 py-3.5 border-2 border-purple-200 text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition">
                  {t("hero.howItWorksButton")}
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                {[
                  { icon: Shield, text: t("hero.trustBadges.privacy"), color: "text-teal-600" },
                  { icon: Clock, text: t("hero.trustBadges.speed"), color: "text-indigo-600" },
                  { icon: Lock, text: t("hero.trustBadges.anonymous"), color: "text-purple-600" },
                  { icon: CheckCircle, text: t("hero.trustBadges.evidence"), color: "text-emerald-600" },
                ].map((badge, idx) => (
                  <div key={idx} className={`flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-100 shadow-sm ${spaceXReverse}`}>
                    <badge.icon className={`w-4 h-4 ${badge.color}`} />
                    <span className="text-sm text-gray-700">{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* Floating proof cards */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { icon: Clock, color: "text-indigo-500", text: "Avg. response: 2m 47s" },
                  { icon: Globe, color: "text-teal-500", text: "Available in 12 languages" },
                  { icon: Lock, color: "text-purple-500", text: "Zero data stored" },
                ].map((card, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-md border border-gray-100 px-3 py-2 flex items-center gap-2">
                    <card.icon className={`w-4 h-4 ${card.color}`} />
                    <span className="text-xs text-gray-700 font-medium">{card.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Workflow visualization */}
            <div className="relative">
              <div className="relative bg-gradient-to-br to-purple-50 rounded-2xl border border-purple-100 p-6 shadow-xl animate-glow-pulse">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-sm font-medium text-indigo-700">{t("hero.workflow.title") || "AI Analysis Workflow"}</span>
                  </div>
                </div>

                <div className="relative">
                  {/* Progress line with glow */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-indigo-500 to-teal-500" style={{ boxShadow: "0 0 8px rgba(139,92,246,0.5)" }}>
                    <div className="absolute w-4 h-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full -left-1.5 animate-progress-dot shadow-lg shadow-purple-500/50" />
                  </div>

                  <div className="space-y-6 pl-12">
                    {[
                      { step: 1, icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: t("hero.workflow.step1") || "Start", description: t("hero.workflow.step1Desc") || "Begin your symptom analysis", color: "from-purple-500 to-indigo-500" },
                      { step: 2, icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>, title: t("hero.workflow.step2") || "Select Symptoms", description: t("hero.workflow.step2Desc") || "Choose from body map or search", color: "from-indigo-500 to-blue-500" },
                      { step: 3, icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, title: t("hero.workflow.step3") || "AI Check", description: t("hero.workflow.step3Desc") || "Intelligent pattern analysis", color: "from-blue-500 to-teal-500" },
                      { step: 4, icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, title: t("hero.workflow.step4") || "Medical History", description: t("hero.workflow.step4Desc") || "Optional context for accuracy", color: "from-teal-500 to-emerald-500" },
                      { step: 5, icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>, title: t("hero.workflow.step5") || "Follow-up Questions", description: t("hero.workflow.step5Desc") || "AI-driven clarification", color: "from-emerald-500 to-green-500" },
                      { step: 6, icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: t("hero.workflow.step6") || "Results", description: t("hero.workflow.step6Desc") || "Personalized analysis & recommendations", color: "from-green-500 to-cyan-500" },
                    ].map((step) => (
                      <div key={step.step} className="group flex items-start space-x-4 cursor-pointer hover:transform hover:-translate-x-1 transition-transform duration-200">
                        <div className="relative flex-shrink-0">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>{step.icon}</div>
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                            <span className="text-xs font-bold text-gray-700">{step.step}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm group-hover:text-indigo-600 transition-colors">{step.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${step.color} rounded-full transition-all duration-500 group-hover:w-full`} style={{ width: `${(step.step / 6) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">{t("hero.workflow.timeLabel") || "Total time"}</div>
                          <div className="text-sm font-semibold text-gray-800">{t("hero.workflow.timeValue") || "Under 3 minutes"}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{t("hero.workflow.successRate") || "Success rate"}</div>
                        <div className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">85%</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CSS Animations */}
                <style jsx>{`
                  @keyframes progress-dot {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                  }
                  .animate-progress-dot { animation: progress-dot 8s ease-in-out infinite; }
                `}</style>
              </div>

              {/* Floating stats badge */}
              <div className="absolute -top-3 -right-3 bg-white rounded-xl shadow-lg border border-gray-200 p-3 hidden lg:block">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{t("hero.workflow.completed") || "Completed"}</div>
                    <div className="text-sm font-bold text-gray-800">10K+</div>
                  </div>
                </div>
              </div>

              {/* Mobile proof card */}
              <div className="absolute -bottom-4 left-4 bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-2 flex items-center gap-2 lg:hidden">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold text-gray-700">4.8 / 5.0 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-white/60 backdrop-blur-sm border-y border-purple-100/50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: stats.symptoms, label: t("stats.symptoms"), suffix: "+", icon: Activity, iconColor: "text-purple-500" },
              { value: stats.conditions, label: t("stats.conditions"), suffix: "+", icon: FileText, iconColor: "text-indigo-500" },
              { value: stats.users, label: t("stats.users"), suffix: "+", icon: Users, iconColor: "text-teal-500" },
              { value: stats.rating, label: t("stats.rating"), suffix: "/5.0", icon: Star, iconColor: "text-amber-500" },
            ].map((stat, idx) => (
              <div key={idx} className={`text-center relative ${idx < 3 ? "md:border-r md:border-purple-100/60" : ""}`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor} mx-auto mb-1`} />
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-16 px-4">
        <div className="container mx-auto">
          <div className={`text-center mb-10 ${textAlignClass}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t("howItWorks.title")}</h2>
            <p className="text-gray-600 text-sm max-w-md mx-auto">{t("howItWorks.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {Object.values(t("howItWorks.steps")).map((step, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                <div className={`flex items-start space-x-4 ${spaceXReverse}`}>
                  <div className={`w-12 h-12 bg-gradient-to-br ${["from-purple-500 to-indigo-500", "from-indigo-500 to-teal-500", "from-teal-500 to-purple-500"][idx]} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    {[MapPin, Brain, MessageSquare][idx] && React.createElement([MapPin, Brain, MessageSquare][idx], { className: "w-6 h-6 text-white" })}
                  </div>
                  <div className={direction === "rtl" ? "text-right" : ""}>
                    <div className="text-xs font-semibold text-gray-500 mb-1">STEP {step.number}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Science Behind It */}
          <div className="mt-10 bg-gray-900 text-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">Three data layers. One intelligent answer.</h3>
            <p className="text-gray-400 text-sm mb-6">Here's what happens under the hood when you tap a symptom.</p>
            <div className="space-y-4">
              {[
                { label: "Your symptom location", desc: "cross-referenced against an anatomical database of 12,480+ mapped symptoms", accent: "text-purple-400" },
                { label: "Your follow-up answers", desc: "fed into a differential diagnosis model trained on peer-reviewed medical literature", accent: "text-indigo-400" },
                { label: "Your optional history", desc: "weighted contextually — never stored, never shared", accent: "text-teal-400" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 border-l-2 border-gray-700 pl-4">
                  <div className="flex-1">
                    <span className={`font-mono text-sm font-bold ${item.accent}`}>{item.label}</span>
                    <span className="text-gray-400 text-sm"> → {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-700">
              <p className="text-gray-300 text-sm">
                The result: a <span className="text-purple-300 font-semibold">ranked probability report</span> with matched/unmatched symptoms, severity scores, and dual-system treatment guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY MAP SHOWCASE ── */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-indigo-50/40">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 rounded-full text-sm text-purple-700 font-medium mb-4">
              <Scan className="w-4 h-4" /> Core Interaction
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Point. Don't Describe.</h2>
            <p className="text-gray-600 max-w-lg mx-auto">The world's first tap-to-diagnose interface. No forms. No drop-downs. Just your body.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Body Map */}
            <div className="bg-white rounded-2xl border border-purple-100 p-8 shadow-lg">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 font-medium">Tap a region to select</p>
              </div>

              {/* CSS Body Map */}
              <div className="relative w-48 mx-auto select-none">
                {/* Head */}
                <div
                  className={`w-20 h-20 mx-auto rounded-full border-2 flex items-center justify-center cursor-pointer transition-all group relative ${activeBodyPart === "head" ? "border-purple-500 bg-purple-100 ring-2 ring-purple-400" : "border-purple-300 bg-purple-50 hover:bg-purple-100"}`}
                  onClick={() => setActiveBodyPart(activeBodyPart === "head" ? null : "head")}
                  role="button" tabIndex={0} aria-label="Select head region"
                >
                  <span className="text-xs font-semibold text-purple-700">Head</span>
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-purple-500 animate-ping opacity-60" />
                  {activeBodyPart === "head" && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap z-10">Headache, Migraine, Sinus</div>
                  )}
                </div>

                {/* Neck */}
                <div className="w-8 h-5 mx-auto bg-purple-100 border border-purple-200" />

                {/* Shoulders + Chest area */}
                <div className="relative">
                  <div className="flex justify-center gap-1">
                    <div className={`w-12 h-10 rounded-lg border cursor-pointer transition-all ${activeBodyPart === "left-shoulder" ? "border-indigo-500 bg-indigo-100 ring-2 ring-indigo-400" : "border-indigo-200 bg-indigo-50 hover:bg-indigo-100"}`} onClick={() => setActiveBodyPart(activeBodyPart === "left-shoulder" ? null : "left-shoulder")} role="button" tabIndex={0} aria-label="Left shoulder">
                      <span className="text-xs text-indigo-600 flex items-center justify-center h-full font-medium">L</span>
                    </div>
                    {/* Chest */}
                    <div
                      className={`w-28 h-24 rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-all relative ${activeBodyPart === "chest" ? "border-indigo-500 bg-indigo-100 ring-2 ring-indigo-400" : "border-indigo-300 bg-indigo-50 hover:bg-indigo-100"}`}
                      onClick={() => setActiveBodyPart(activeBodyPart === "chest" ? null : "chest")}
                      role="button" tabIndex={0} aria-label="Chest and cardiac region"
                    >
                      <div className="text-center">
                        <Heart className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                        <span className="text-xs font-semibold text-indigo-700">Chest</span>
                      </div>
                      <div className="absolute -top-1 right-2 w-3 h-3 rounded-full bg-indigo-400 animate-ping opacity-50" />
                      {activeBodyPart === "chest" && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap z-10">Heart, Lungs, Ribs</div>
                      )}
                    </div>
                    <div className={`w-12 h-10 rounded-lg border cursor-pointer transition-all ${activeBodyPart === "right-shoulder" ? "border-indigo-500 bg-indigo-100 ring-2 ring-indigo-400" : "border-indigo-200 bg-indigo-50 hover:bg-indigo-100"}`} onClick={() => setActiveBodyPart(activeBodyPart === "right-shoulder" ? null : "right-shoulder")} role="button" tabIndex={0} aria-label="Right shoulder">
                      <span className="text-xs text-indigo-600 flex items-center justify-center h-full font-medium">R</span>
                    </div>
                  </div>
                </div>

                {/* Abdomen */}
                <div
                  className={`w-36 h-20 mx-auto rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all mt-1 relative ${activeBodyPart === "abdomen" ? "border-teal-500 bg-teal-100 ring-2 ring-teal-400" : "border-teal-300 bg-teal-50 hover:bg-teal-100"}`}
                  onClick={() => setActiveBodyPart(activeBodyPart === "abdomen" ? null : "abdomen")}
                  role="button" tabIndex={0} aria-label="Abdomen region"
                >
                  <span className="text-xs font-semibold text-teal-700">Abdomen</span>
                  {activeBodyPart === "abdomen" && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap z-10">Stomach, Liver, Intestines</div>
                  )}
                </div>

                {/* Hips */}
                <div
                  className={`w-40 h-10 mx-auto rounded-xl border cursor-pointer transition-all mt-1 flex items-center justify-center ${activeBodyPart === "hips" ? "border-purple-500 bg-purple-100 ring-2 ring-purple-400" : "border-purple-200 bg-purple-50 hover:bg-purple-100"}`}
                  onClick={() => setActiveBodyPart(activeBodyPart === "hips" ? null : "hips")}
                  role="button" tabIndex={0} aria-label="Hips and pelvis region"
                >
                  <span className="text-xs font-semibold text-purple-700">Hips & Pelvis</span>
                </div>

                {/* Legs */}
                <div className="flex justify-center gap-3 mt-2">
                  {["left-leg", "right-leg"].map((legId) => (
                    <div
                      key={legId}
                      className={`w-16 h-32 rounded-2xl border-2 flex items-end justify-center pb-2 cursor-pointer transition-all ${activeBodyPart === legId ? "border-indigo-500 bg-indigo-100 ring-2 ring-indigo-400" : "border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100"}`}
                      onClick={() => setActiveBodyPart(activeBodyPart === legId ? null : legId)}
                      role="button" tabIndex={0} aria-label={`${legId === "left-leg" ? "Left" : "Right"} leg region`}
                    >
                      <span className="text-xs font-semibold text-indigo-600">{legId === "left-leg" ? "L" : "R"}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search mockup */}
              <div className="mt-6 flex items-center gap-2 bg-white border border-purple-200 rounded-xl px-4 py-3 shadow-sm">
                <Search className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="text-sm text-gray-400 italic">Search symptoms by name...</span>
              </div>

              {/* General symptom chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {generalSymptoms.map((sym) => (
                  <button
                    key={sym}
                    onClick={() => toggleSymptom(sym)}
                    className={`px-4 py-1.5 rounded-full border text-sm transition-all ${selectedSymptoms.includes(sym) ? "bg-purple-600 text-white border-purple-600" : "border-purple-200 text-purple-700 hover:bg-purple-50"}`}
                  >
                    {sym}
                  </button>
                ))}
              </div>

              {(activeBodyPart || selectedSymptoms.length > 0) && (
                <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
                  <p className="text-xs text-purple-700 font-medium">
                    ✓ Selected: {[activeBodyPart, ...selectedSymptoms].filter(Boolean).join(", ")}
                  </p>
                </div>
              )}
            </div>

            {/* Right copy */}
            <div className="space-y-6 py-4">
              <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                <p className="text-sm font-bold text-red-700 mb-2">How others do it:</p>
                <p className="text-sm text-red-600">Type symptoms into a chatbot. Answer 20 questions. Get a generic result.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5">
                <p className="text-sm font-bold text-purple-700 mb-2">How MediSense does it:</p>
                <p className="text-sm text-purple-700">Tap where it hurts. In 3 minutes, know what it might be.</p>
              </div>
              <div className="space-y-3">
                {[
                  "12,480 symptoms mapped across the human body",
                  "Organ-level precision — not just \"head\" but \"left temporal region\"",
                  "Works for symptoms with no location — fever, fatigue, chills",
                  "Multilingual — available in 12 languages",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              <Link to="/symptoms" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all text-sm">
                Try the Body Map <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI ANALYSIS RESULT ── */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 rounded-full text-sm text-indigo-700 font-medium mb-4">
              <Brain className="w-4 h-4" /> Sample Output
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Not a guess. A ranked diagnosis.</h2>
            <p className="text-gray-600 max-w-lg mx-auto">MediSense AI returns a structured medical report — not a list of scary Google results.</p>
          </div>

          {/* Mock terminal result */}
          <div className="max-w-3xl mx-auto bg-gray-950 rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(139,92,246,0.4)", boxShadow: "0 0 40px rgba(139,92,246,0.15), 0 20px 60px rgba(0,0,0,0.4)" }}>
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-3 text-xs text-gray-500 font-mono">medisense-report.json — Patient Report (Sample)</span>
            </div>

            <div className="p-6 font-mono text-sm space-y-5">
              <div>
                <p className="text-purple-400 text-xs mb-2">// PRIMARY COMPLAINT</p>
                <p className="text-white">Primary Symptom: <span className="text-indigo-300">Chest tightness + shortness of breath</span></p>
                <p className="text-white">Secondary: <span className="text-gray-400">Fatigue, mild dizziness</span></p>
              </div>

              <div className="border-t border-gray-800 pt-5">
                <p className="text-purple-400 text-xs mb-3">// POSSIBLE CONDITIONS</p>
                <div className="space-y-2">
                  {[
                    { num: "①", name: "Costochondritis", prob: 68, severity: "Low", dots: 1 },
                    { num: "②", name: "Anxiety-related chest pain", prob: 21, severity: "Low", dots: 1 },
                    { num: "③", name: "Pleuritis (early stage)", prob: 11, severity: "Medium", dots: 2 },
                  ].map((c, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-gray-300">{c.num} <span className="text-white">{c.name}</span></span>
                      <div className="flex items-center gap-4">
                        <div className="w-24 bg-gray-800 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" style={{ width: `${c.prob}%` }} />
                        </div>
                        <span className="text-emerald-400 w-8 text-right">{c.prob}%</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${c.severity === "Low" ? "text-teal-400 bg-teal-950" : "text-amber-400 bg-amber-950"}`}>{c.severity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-800 pt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-emerald-400 text-xs mb-2">// MATCHED SYMPTOMS ✓</p>
                  <div className="space-y-1">
                    {["Chest wall tenderness", "Worsens with movement", "Shortness of breath"].map((s, i) => (
                      <p key={i} className="text-gray-300 text-xs">✓ {s}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-red-400 text-xs mb-2">// NON-MATCHED ✗</p>
                  <div className="space-y-1">
                    {["Radiating arm pain", "Jaw pain", "Cold sweats"].map((s, i) => (
                      <p key={i} className="text-gray-400 text-xs">✗ {s}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-5 space-y-3">
                <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                  <p className="text-teal-400 text-xs mb-1">// TRADITIONAL CHINESE MEDICINE VIEW</p>
                  <p className="text-gray-300 text-xs">Qi stagnation pattern detected. Recommend: Acupressure (CV17), regulated breathing, Dan Shen root tea.</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                  <p className="text-purple-400 text-xs mb-1">// SASANG CONSTITUTIONAL VIEW</p>
                  <p className="text-gray-300 text-xs">Taeyang type indicator. Avoid cold foods. Focus on chest-opening exercises.</p>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-amber-400/80 text-xs">This is not a medical diagnosis. Please consult a physician if symptoms persist or worsen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DUAL HEALING SYSTEMS ── */}
      <section className="py-16 px-4 bg-gradient-to-b from-indigo-50/30 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-100 rounded-full text-sm text-teal-700 font-medium mb-4">
              <Sparkles className="w-4 h-4" /> Unique Differentiator
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">5,000 Years of Healing. Decoded by AI.</h2>
            <p className="text-gray-600 max-w-xl mx-auto">MediSense is the only symptom checker that bridges modern diagnostic AI with two ancient healing traditions.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* TCM Card */}
            <div className="bg-white border border-teal-100 rounded-2xl p-7 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group">
              <div className="flex items-center gap-4 mb-5">
                {/* CSS Yin-Yang */}
                <div className="relative w-14 h-14 rounded-full border-4 border-purple-700 overflow-hidden flex-shrink-0">
                  <div className="absolute left-0 top-0 w-1/2 h-full bg-purple-700" />
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-purple-700 border-4 border-white" style={{ borderColor: "white" }} />
                  <div className="absolute bottom-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-white border-4 border-purple-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Traditional Chinese Medicine</h3>
                  <p className="text-xs text-gray-500">China · Est. ~200 BCE</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <p><span className="font-semibold text-gray-800">Core Belief:</span> Health is the balance of Qi (vital energy) through 12 meridian pathways</p>
                <p><span className="font-semibold text-gray-800">MediSense applies:</span> Organ pattern analysis, Qi stagnation detection, meridian-based treatment pathways</p>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-3 mt-3">
                  <p className="text-xs text-teal-700 font-mono">"Liver Qi stagnation pattern detected. Recommend: Chai Hu Shu Gan San formula, acupressure at LV3."</p>
                </div>
              </div>
            </div>

            {/* Sasang Card */}
            <div className="bg-white border border-indigo-100 rounded-2xl p-7 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group">
              <div className="flex items-center gap-4 mb-5">
                {/* Four-quadrant grid */}
                <div className="w-14 h-14 grid grid-cols-2 gap-0.5 rounded-lg overflow-hidden border-2 border-indigo-400 flex-shrink-0">
                  <div className="bg-purple-600" />
                  <div className="bg-indigo-400" />
                  <div className="bg-teal-500" />
                  <div className="bg-purple-300" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Sasang Medicine (사상의학)</h3>
                  <p className="text-xs text-gray-500">Korea · Est. 1894 by Lee Je-ma</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <p><span className="font-semibold text-gray-800">Core Belief:</span> Humans are one of 4 constitutional types — each with different strengths, weaknesses, and ideal treatments</p>
                <p><span className="font-semibold text-gray-800">MediSense applies:</span> Constitutional type inference from symptom patterns, personalized food and lifestyle recommendations</p>
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 mt-3">
                  <p className="text-xs text-indigo-700 font-mono">"Soeum type profile. Avoid cold/raw foods. Recommended herbs: Gwakhyang Jeonggi-san."</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-5 text-white text-center">
            <p className="text-sm font-medium leading-relaxed">
              Why does this matter? Because the same symptom in two different bodies may have different root causes — and require different solutions.{" "}
              <span className="font-bold">MediSense understands both.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR / USE CASES ── */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-indigo-50/30">
        <div className="container mx-auto">
          <div className={`text-center mb-10 ${textAlignClass}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t("useCases.title")}</h2>
            <p className="text-gray-600 text-sm">{t("useCases.subtitle")}</p>
          </div>

          {/* Archetype cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: GraduationCap, label: "The Student", desc: "No insurance, no time, no money for a clinic visit. Get answers before your 9am lecture.", color: "from-purple-100 to-indigo-100", iconColor: "text-purple-600", border: "border-purple-200" },
              { icon: Heart, label: "The Parent", desc: "Your child has a fever at 2am. Know if it needs an ER or just rest.", color: "from-pink-100 to-rose-100", iconColor: "text-rose-500", border: "border-rose-200" },
              { icon: Users, label: "The Elder", desc: "Navigate symptoms without confusing medical jargon. Simple answers, dignified care.", color: "from-teal-100 to-emerald-100", iconColor: "text-teal-600", border: "border-teal-200" },
              { icon: MapPin, label: "Rural Communities", desc: "Nearest clinic is 3 hours away. MediSense bridges the gap.", color: "from-amber-100 to-orange-100", iconColor: "text-amber-600", border: "border-amber-200" },
            ].map((card, idx) => (
              <div key={idx} className={`bg-white border-t-4 ${card.border} rounded-xl p-5 hover:shadow-md hover:-translate-y-1 transition-all text-center`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mx-auto mb-4`}>
                  <card.icon className={`w-7 h-7 ${card.iconColor}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{card.label}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Existing use case cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(t("useCases.cases")).map((useCase, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-purple-200 hover:shadow-sm transition-all">
                <h3 className="font-bold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-sm text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES (BENTO GRID) ── */}
      <section id="features" className="py-16 px-4 bg-gradient-to-b from-white to-purple-50/30">
        <div className="container mx-auto">
          <div className={`text-center mb-10 ${textAlignClass}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t("features.title")}</h2>
            <p className="text-gray-600 text-sm">{t("features.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-6 gap-4">
            {Object.values(t("features.items")).map((feature, idx) => {
              const icons = [Scan, Brain, AlertTriangle, Globe2, Lock, Mobile];
              const gradients = ["from-purple-100 to-indigo-100", "from-indigo-100 to-blue-100", "from-amber-100 to-orange-100", "from-teal-100 to-emerald-100", "from-blue-100 to-purple-100", "from-purple-100 to-pink-100"];
              const howWeDifferent = [
                "We map symptoms to exact anatomical regions, not vague categories.",
                "Our model cross-references peer-reviewed literature, not just symptom databases.",
                "We show probability ranges, never false certainty.",
                "12 languages supported with culturally-aware recommendations.",
                "Zero PII stored. Session data destroyed on close.",
                "Optimized for mobile-first, one-handed use.",
              ];
              const isDouble = idx === 0;
              return (
                <div key={idx} className={`group bg-white border border-gray-100 rounded-xl p-5 hover:border-purple-200 hover:shadow-md transition-all relative overflow-hidden ${isDouble ? "md:col-span-3" : "md:col-span-3 lg:col-span-2"}`}>
                  <div className={`w-10 h-10 bg-gradient-to-br ${gradients[idx]} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    {icons[idx] && React.createElement(icons[idx], { className: "w-5 h-5 text-gray-700" })}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity px-5 py-3">
                    <p className="text-xs text-indigo-600 font-medium">↳ {howWeDifferent[idx]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRUST & SAFETY ── */}
      <section id="trust" className="py-16 px-4">
        <div className="container mx-auto">
          <div className={`text-center mb-10 ${textAlignClass}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t("trust.title")}</h2>
            <p className="text-gray-600 text-sm">{t("trust.subtitle")}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Privacy Card */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <div className={`flex items-center space-x-3 mb-5 ${flexDirectionClass}`}>
                <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-teal-600" />
                </div>
                <div className={textAlignClass}>
                  <h3 className="font-bold text-gray-900">{t("trust.privacy.title")}</h3>
                  <p className="text-sm text-gray-600">{t("trust.privacy.subtitle")}</p>
                </div>
              </div>
              <div className="space-y-4">
                {t("trust.privacy.points").map((item, idx) => (
                  <div key={idx} className={`flex items-start space-x-3 ${spaceXReverse}`}>
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer Card */}
            <div className="bg-gradient-to-br from-red-50/50 to-orange-50/50 border border-red-100 rounded-xl p-5">
              <div className={`flex items-center space-x-3 mb-5 ${flexDirectionClass}`}>
                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div className={textAlignClass}>
                  <h3 className="font-bold text-gray-900">{t("trust.disclaimer.title")}</h3>
                  <p className="text-sm text-gray-600">{t("trust.disclaimer.subtitle")}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-white/50 border border-red-100 rounded-lg p-3">
                  <div className={`flex items-start space-x-2 ${spaceXReverse}`}>
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className={textAlignClass}>
                      <h4 className="text-sm font-semibold text-red-800">{t("trust.disclaimer.emergency.title")}</h4>
                      <p className="text-xs text-red-700 mt-1">{t("trust.disclaimer.emergency.description")}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{t("trust.disclaimer.note")}</p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { label: t("trust.indicators.evidence"), icon: FileText, gradient: "from-teal-500 to-emerald-500", bgGradient: "from-teal-50/60 to-emerald-50/40", iconGradient: "text-teal-600", pulse: false },
              { label: t("trust.indicators.updates"), icon: Clock, gradient: "from-indigo-500 to-purple-500", bgGradient: "from-indigo-50/60 to-purple-50/40", iconGradient: "text-indigo-600", pulse: true },
              { label: t("trust.indicators.expert"), icon: Users, gradient: "from-purple-500 to-violet-500", bgGradient: "from-purple-50/60 to-violet-50/40", iconGradient: "text-purple-600", pulse: false },
              { label: t("trust.indicators.transparent"), icon: Shield, gradient: "from-amber-500 to-orange-500", bgGradient: "from-amber-50/60 to-orange-50/40", iconGradient: "text-amber-600", pulse: false },
            ].map((item, idx) => (
              <div key={idx} className={`relative group bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl p-3 hover:shadow-md transition-all duration-300 hover:border-transparent hover:scale-[1.02] ${textAlignClass}`}>
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-br ${item.gradient} transition-opacity duration-300 blur-xl -z-10`} />
                <div className={`absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-30 bg-gradient-to-br ${item.gradient} transition-opacity duration-300 -z-10`} />
                <div className="flex items-center mb-2">
                  <div className={`relative w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br ${item.bgGradient} border border-gray-100 group-hover:shadow-sm transition-all`}>
                    {item.pulse && <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-400/20 to-purple-400/20 animate-pulse" style={{ animationDelay: `${idx * 0.5}s` }} />}
                    <item.icon className={`w-4 h-4 ${item.iconGradient} group-hover:scale-110 transition-transform`} />
                  </div>
                </div>
                <div className="relative">
                  <span className="text-xs font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-gray-900 group-hover:to-gray-700 transition-all block mt-1">
                    {item.label}
                  </span>
                </div>
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r ${item.gradient} rounded-full opacity-60`} />
              </div>
            ))}
          </div>

          {/* Hallucination Prevention */}
          <div className="mt-10 bg-white border border-indigo-100 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">We built against hallucination from day one.</h3>
            <p className="text-gray-600 text-sm mb-6">AI medical tools can confidently give wrong answers. MediSense prevents this through four mechanisms:</p>
            <div className="space-y-5">
              {[
                { num: "1", title: "Structured Follow-Up Questions", desc: "Every symptom triggers a curated question set. You answer before the AI concludes — not the other way around." },
                { num: "2", title: "Probability Scoring, Not Certainty", desc: 'Results are always presented as probability ranges (e.g., "68% match") — never as definitive diagnoses.' },
                { num: "3", title: "Matched vs. Unmatched Symptom Transparency", desc: "We show you which symptoms fit a condition AND which ones don't. Full picture, always." },
                { num: "4", title: "Emergency Flag System", desc: "If your symptoms suggest acute emergency (chest pain + arm pain + sweating), MediSense flags it immediately and redirects you to emergency services." },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-5 border-l-4 border-indigo-500 pl-5">
                  <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{item.num}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 px-4 bg-gradient-to-b from-purple-50/30 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-full text-sm text-amber-700 font-medium mb-4">
              <Star className="w-4 h-4" /> Real Stories
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Trusted by 15,000+ users worldwide</h2>
            <p className="text-gray-600">Real people. Real symptoms. Real answers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "I used MediSense at 1am when my daughter had a high fever and rash. It flagged it as potentially serious and told me to go to the ER. The doctor confirmed it was roseola. The speed saved us hours of anxiety.",
                name: "Fatima A.",
                role: "Parent, Lahore",
                initial: "F",
                color: "from-purple-500 to-indigo-500",
              },
              {
                quote: "As a medical student, I use MediSense to cross-check my own clinical reasoning. The TCM layer always surprises me with insights I wouldn't have considered.",
                name: "James K.",
                role: "Medical Student, Nairobi",
                initial: "J",
                color: "from-teal-500 to-emerald-500",
              },
              {
                quote: "I live 4 hours from the nearest hospital. MediSense told me my symptoms were consistent with a UTI, not a kidney infection. I treated it at home and followed up with a tele-doctor. Spot on.",
                name: "Maria S.",
                role: "Rural Community, Philippines",
                initial: "M",
                color: "from-indigo-500 to-purple-500",
              },
            ].map((t, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 text-base">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">MediSense vs. Traditional Checkers</h2>
            <p className="text-gray-600">Not all symptom checkers are built the same.</p>
          </div>

          <div className="max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-lg border border-gray-200">
            <div className="grid grid-cols-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold">
              <div className="px-4 py-3 text-left">Feature</div>
              <div className="px-4 py-3 text-center border-x border-purple-500/40">MediSense AI</div>
              <div className="px-4 py-3 text-center text-purple-200">Traditional Checkers</div>
            </div>
            {[
              { feature: "Interaction Method", us: "Body Map Tap", them: "Text Form", usCheck: null, themCheck: null },
              { feature: "Typing Required", us: "Never", them: "Always", usCheck: false, themCheck: true },
              { feature: "TCM Integration", us: "Yes", them: "No", usCheck: true, themCheck: false },
              { feature: "Sasang Medicine", us: "Yes", them: "No", usCheck: true, themCheck: false },
              { feature: "Hallucination Prevention", us: "Structured", them: "None", usCheck: true, themCheck: false },
              { feature: "Probability Scoring", us: "Per Disease", them: "Rarely", usCheck: true, themCheck: false },
              { feature: "Matched/Unmatched Symptoms", us: "Always", them: "Never", usCheck: true, themCheck: false },
              { feature: "Medical History", us: "Truly Optional", them: "Required", usCheck: true, themCheck: false },
              { feature: "Languages Supported", us: "12+", them: "1–3", usCheck: null, themCheck: null },
              { feature: "Results Time", us: "< 3 minutes", them: "5–10 minutes", usCheck: null, themCheck: null },
              { feature: "Data Stored", us: "Zero", them: "Often", usCheck: false, themCheck: true },
            ].map((row, idx) => (
              <div key={idx} className={`grid grid-cols-3 text-sm border-t border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                <div className="px-4 py-3 text-gray-700 font-medium">{row.feature}</div>
                <div className="px-4 py-3 text-center border-x border-gray-100">
                  {row.usCheck === true ? (
                    <span className="text-emerald-500 font-bold">✓</span>
                  ) : row.usCheck === false ? (
                    <span className="text-red-400 font-bold">✗</span>
                  ) : (
                    <span className="text-purple-700 font-semibold">{row.us}</span>
                  )}
                  {row.usCheck !== null && row.usCheck !== undefined && <span className="ml-1 text-gray-600">{row.us}</span>}
                </div>
                <div className="px-4 py-3 text-center">
                  {row.themCheck === true ? (
                    <span className="text-emerald-500 font-bold">✓</span>
                  ) : row.themCheck === false ? (
                    <span className="text-red-400 font-bold">✗</span>
                  ) : (
                    <span className="text-gray-500">{row.them}</span>
                  )}
                  {row.themCheck !== null && row.themCheck !== undefined && <span className="ml-1 text-gray-400">{row.them}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden" style={{ animation: "glow-pulse 4s ease-in-out infinite" }}>
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-4 w-32 h-32 rounded-full bg-white" style={{ filter: "blur(40px)" }} />
              <div className="absolute bottom-4 right-4 w-40 h-40 rounded-full bg-teal-300" style={{ filter: "blur(50px)" }} />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-3">{t("cta.title")}</h2>
              <p className="text-purple-100 mb-2 text-sm">{t("cta.description")}</p>
              <p className="text-purple-200 text-sm mb-8">Join 15,000+ users who got answers in under 3 minutes.</p>
              <Link
                to="/symptoms"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-base"
              >
                {t("cta.button")}
                <ArrowRight className={`ml-2 w-5 h-5 ${direction === "rtl" ? "rotate-180" : ""}`} />
              </Link>
              <p className="text-purple-200/80 text-xs mt-5">No account needed · No data stored · No medical jargon</p>
              <p className="text-purple-300/60 text-xs mt-2">{t("cta.users", { count: stats.users })}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className={textAlignClass}>
              <div className={`flex items-center space-x-2 mb-4 ${flexDirectionClass}`}>
                <Brain className="w-6 h-6 text-purple-400" />
                <span className="text-lg font-bold">MediSense<span className="text-purple-400">AI</span></span>
              </div>
              <p className="text-gray-400 text-sm">{t("footer.tagline")}</p>
            </div>
            {[
              { title: t("footer.product"), links: t("footer.productLinks") },
              { title: t("footer.resources"), links: t("footer.resourcesLinks") },
              { title: t("footer.connect"), links: t("footer.connectLinks") },
            ].map((column, idx) => (
              <div key={idx} className={textAlignClass}>
                <h4 className="font-semibold mb-3">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="text-sm text-gray-400 hover:text-white transition">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6">
            <div className={`flex flex-col md:${flexDirectionClass} justify-between items-center space-y-3 md:space-y-0`}>
              <div className={`flex items-center space-x-3 ${spaceXReverse}`}>
                <LanguageSelector variant="button" />
                <span className="text-xs text-gray-400">{t("footer.copyright")}</span>
              </div>
              <div className={`text-center text-xs text-gray-500 ${textAlignClass}`}>
                <p>{t("footer.disclaimer")}</p>
                <p className="mt-1">{t("footer.builtWith").replace("❤️", "❤️")}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ── GLOBAL STYLES ── */}
      <style jsx>{`
        @keyframes float-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), 0 20px 60px rgba(0,0,0,0.2); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6), 0 20px 60px rgba(0,0,0,0.3); }
        }

        @keyframes scan-line {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.05); }
        }

        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-scan { animation: scan 2s linear infinite; }
        .animate-float-blob { animation: float-blob 12s ease-in-out infinite; }
        .animate-glow-pulse { animation: glow-pulse 4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-float-blob,
          .animate-glow-pulse,
          .animate-float,
          .animate-ping {
            animation: none;
          }
        }

        .rtl select {
          background-position: left 0.5rem center;
          padding-left: 2.5rem;
          padding-right: 0.75rem;
        }
        .rtl .space-x-2 > :not([hidden]) ~ :not([hidden]) {
          --tw-space-x-reverse: 1;
        }
        .rtl .ltr\:space-x-2 { direction: ltr; }
      `}</style>
    </div>
  );
};

export default Landing;