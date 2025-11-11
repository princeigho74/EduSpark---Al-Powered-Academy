import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, MessageCircle, Sparkles, Search, Menu, X, ChevronRight, GraduationCap, Brain, Zap, CreditCard, Star, Users, Award, TrendingUp, Play, Target, Eye, CheckCircle, BarChart, Trophy, Clock, Download } from 'lucide-react';

const PAYSTACK_PUBLIC_KEY = 'pk_test_xxxxxxxxxxxxx';
const LOGO_URL = "https://i.imgur.com/LsQEpvp.png";

const COURSES_DATA = {
  primary: {
    name: "Primary School",
    levels: "P1 - P6",
    plans: {
      trial: { name: "Free Trial", price: "$0", priceValue: 0, access: "3 lessons" },
      basic: { name: "Basic", price: "$1", priceValue: 1, access: "10 lessons" },
      standard: { name: "Standard", price: "$3", priceValue: 3, access: "Full course" },
      premium: { name: "Premium", price: "$5", priceValue: 5, access: "Full + AI tutoring" }
    },
    subjects: [
      { name: "English Language", icon: "📝", aiFeature: "AI-assisted spelling games", topics: 12, lessons: 24, trial: true },
      { name: "Mathematics", icon: "🔢", aiFeature: "Pattern recognition & logic games", topics: 15, lessons: 30, trial: true },
      { name: "Science", icon: "🔬", aiFeature: "AI simulations & experiments", topics: 10, lessons: 20, trial: true },
      { name: "ICT/Computer Studies", icon: "💻", aiFeature: "AI basics & Scratch Jr coding", topics: 8, lessons: 16, trial: true },
      { name: "Creative Arts", icon: "🎨", aiFeature: "AI coloring & music tools", topics: 6, lessons: 12, trial: true },
      { name: "Physical & Health Ed", icon: "⚽", aiFeature: "Smart health device demos", topics: 5, lessons: 10, trial: true }
    ]
  },
  jss: {
    name: "Junior Secondary",
    levels: "JSS1 - JSS3",
    plans: {
      trial: { name: "Free Trial", price: "$0", priceValue: 0, access: "3 lessons" },
      basic: { name: "Basic", price: "$1", priceValue: 1, access: "10 lessons" },
      standard: { name: "Standard", price: "$3", priceValue: 3, access: "Full course" },
      premium: { name: "Premium", price: "$5", priceValue: 5, access: "Full + AI tutoring" }
    },
    subjects: [
      { name: "English Language", icon: "📖", aiFeature: "AI storytelling & grammar", topics: 20, lessons: 40, trial: true },
      { name: "Mathematics", icon: "➗", aiFeature: "Pattern analysis & problem solving", topics: 25, lessons: 50, trial: true },
      { name: "Basic Science", icon: "🧪", aiFeature: "Interactive simulations", topics: 18, lessons: 36, trial: true },
      { name: "Social Studies", icon: "🌍", aiFeature: "AI-enhanced research", topics: 15, lessons: 30, trial: true },
      { name: "ICT", icon: "🖥️", aiFeature: "Python basics & simple chatbots", topics: 16, lessons: 32, trial: true },
      { name: "Agricultural Science", icon: "🌾", aiFeature: "Smart farming intro", topics: 12, lessons: 24, trial: true },
      { name: "Home Economics", icon: "🏠", aiFeature: "AI nutrition planning", topics: 10, lessons: 20, trial: true },
      { name: "Basic Technology", icon: "🔧", aiFeature: "Design simulations", topics: 14, lessons: 28, trial: true }
    ]
  },
  sss: {
    name: "Senior Secondary",
    levels: "SS1 - SS3",
    plans: {
      trial: { name: "Free Trial", price: "$0", priceValue: 0, access: "3 lessons" },
      basic: { name: "Basic", price: "$1", priceValue: 1, access: "10 lessons" },
      standard: { name: "Standard", price: "$3", priceValue: 3, access: "Full course" },
      premium: { name: "Premium", price: "$5", priceValue: 5, access: "Full + AI tutoring" }
    },
    streams: {
      science: [
        { name: "Physics", icon: "⚛️", aiFeature: "AI experiments & simulations", topics: 30, lessons: 60, trial: true },
        { name: "Chemistry", icon: "🧬", aiFeature: "Predictive analysis & lab simulations", topics: 28, lessons: 56, trial: true },
        { name: "Biology", icon: "🦠", aiFeature: "AI-powered experiments", topics: 26, lessons: 52, trial: true },
        { name: "Mathematics", icon: "📐", aiFeature: "Advanced problem solving", topics: 35, lessons: 70, trial: true },
        { name: "Further Mathematics", icon: "∞", aiFeature: "Pattern recognition", topics: 32, lessons: 64, trial: true }
      ],
      arts: [
        { name: "Literature", icon: "📚", aiFeature: "AI text analysis", topics: 22, lessons: 44, trial: true },
        { name: "History", icon: "🏛️", aiFeature: "AI research tools", topics: 20, lessons: 40, trial: true },
        { name: "Geography", icon: "🗺️", aiFeature: "Climate modeling", topics: 24, lessons: 48, trial: true },
        { name: "Government", icon: "⚖️", aiFeature: "Policy analysis", topics: 18, lessons: 36, trial: true },
        { name: "Economics", icon: "📊", aiFeature: "Market predictions", topics: 25, lessons: 50, trial: true }
      ],
      commercial: [
        { name: "Accounting", icon: "💰", aiFeature: "AI financial analysis", topics: 28, lessons: 56, trial: true },
        { name: "Commerce", icon: "🏪", aiFeature: "Business predictions", topics: 22, lessons: 44, trial: true },
        { name: "Business Studies", icon: "💼", aiFeature: "Marketing analytics", topics: 24, lessons: 48, trial: true },
        { name: "Economics", icon: "📈", aiFeature: "Economic modeling", topics: 25, lessons: 50, trial: true }
      ]
    }
  },
  preuni: {
    name: "Pre-University Tutorials",
    levels: "University Prep",
    plans: {
      trial: { name: "Free Trial", price: "$0", priceValue: 0, access: "3 lessons" },
      basic: { name: "Basic", price: "$3", priceValue: 3, access: "15 lessons" },
      standard: { name: "Standard", price: "$5", priceValue: 5, access: "Full course" },
      premium: { name: "Premium", price: "$20", priceValue: 20, access: "Full + AI tutoring + Mock exams" }
    },
    subjects: [
      { name: "Advanced Mathematics", icon: "🎓", aiFeature: "STEM exam prep", topics: 40, lessons: 80, trial: true },
      { name: "Physics Fundamentals", icon: "🔭", aiFeature: "University bridge course", topics: 35, lessons: 70, trial: true },
      { name: "Chemistry Essentials", icon: "⚗️", aiFeature: "Lab prep & theory", topics: 33, lessons: 66, trial: true },
      { name: "Biology Advanced", icon: "🧫", aiFeature: "Medical prep course", topics: 38, lessons: 76, trial: true },
      { name: "Academic English", icon: "✍️", aiFeature: "Essay writing & research", topics: 25, lessons: 50, trial: true },
      { name: "Coding & AI Basics", icon: "👨‍💻", aiFeature: "Tech course preparation", topics: 30, lessons: 60, trial: true }
    ]
  },
  university: {
    name: "University/Tertiary",
    levels: "Undergraduate & Postgraduate",
    plans: {
      trial: { name: "Free Trial", price: "$0", priceValue: 0, access: "3 lessons" },
      basic: { name: "Basic", price: "$5", priceValue: 5, access: "20 lessons" },
      standard: { name: "Standard", price: "$10", priceValue: 10, access: "Full course" },
      premium: { name: "Premium", price: "$20", priceValue: 20, access: "Full + AI tutoring + Research support" }
    },
    faculties: {
      tech: {
        name: "Science & Technology",
        courses: [
          { name: "Machine Learning", icon: "🤖", aiFeature: "Deep Learning projects", topics: 45, lessons: 90, trial: true },
          { name: "Computer Vision", icon: "👁️", aiFeature: "Image processing", topics: 40, lessons: 80, trial: true },
          { name: "NLP", icon: "💬", aiFeature: "Language models", topics: 42, lessons: 84, trial: true },
          { name: "Software Engineering", icon: "⚙️", aiFeature: "AI-assisted coding", topics: 50, lessons: 100, trial: true }
        ]
      },
      slt: {
        name: "Science Laboratory Technology",
        courses: [
          { name: "Analytical Chemistry", icon: "🔬", aiFeature: "AI data analysis", topics: 38, lessons: 76, trial: true },
          { name: "Microbiology", icon: "🦠", aiFeature: "Predictive modeling", topics: 35, lessons: 70, trial: true },
          { name: "Biotechnology", icon: "🧬", aiFeature: "Lab automation", topics: 40, lessons: 80, trial: true },
          { name: "Pharmacology", icon: "💊", aiFeature: "Drug discovery AI", topics: 36, lessons: 72, trial: true }
        ]
      },
      medical: {
        name: "Medicine & Health",
        courses: [
          { name: "Clinical Diagnostics", icon: "🏥", aiFeature: "AI diagnostics", topics: 48, lessons: 96, trial: true },
          { name: "Pharmacology", icon: "💉", aiFeature: "Drug interaction AI", topics: 42, lessons: 84, trial: true },
          { name: "Medical Imaging", icon: "📷", aiFeature: "Image analysis", topics: 40, lessons: 80, trial: true },
          { name: "Public Health", icon: "🩺", aiFeature: "Epidemiology modeling", topics: 35, lessons: 70, trial: true }
        ]
      },
      business: {
        name: "Business & Management",
        courses: [
          { name: "Data Analytics", icon: "📊", aiFeature: "Predictive analytics", topics: 38, lessons: 76, trial: true },
          { name: "Digital Marketing", icon: "📱", aiFeature: "AI marketing tools", topics: 35, lessons: 70, trial: true },
          { name: "Financial Technology", icon: "💳", aiFeature: "Algorithmic trading", topics: 40, lessons: 80, trial: true },
          { name: "Entrepreneurship", icon: "🚀", aiFeature: "Business AI tools", topics: 32, lessons: 64, trial: true }
        ]
      },
      agriculture: {
        name: "Agriculture & Environment",
        courses: [
          { name: "Precision Farming", icon: "🌱", aiFeature: "AI crop monitoring", topics: 36, lessons: 72, trial: true },
          { name: "Climate Modeling", icon: "🌦️", aiFeature: "Weather prediction", topics: 38, lessons: 76, trial: true },
          { name: "Soil Science", icon: "🏞️", aiFeature: "Resource management", topics: 34, lessons: 68, trial: true },
          { name: "Environmental Tech", icon: "♻️", aiFeature: "Sustainability AI", topics: 35, lessons: 70, trial: true }
        ]
      }
    }
  }
};

const AI_KNOWLEDGE = {
  greetings: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
  math: ["math", "mathematics", "calculation", "algebra", "geometry", "calculus", "equation", "formula"],
  science: ["science", "physics", "chemistry", "biology", "experiment", "atom", "cell", "energy"],
  programming: ["code", "coding", "programming", "python", "javascript", "algorithm", "function", "variable"],
  help: ["help", "assist", "support", "guide", "explain", "teach", "learn"],
  courses: ["course", "subject", "class", "lesson", "module", "enroll", "study"]
};

const EduSpark = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI tutor. I can help you with Math, Science, Programming, and guide you through courses. What would you like to learn today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [trialCourses, setTrialCourses] = useState<Record<string, boolean>>({});
  const [enrolledCourses, setEnrolledCourses] = useState<Record<string, boolean>>({});
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});
  const [selectedPlan, setSelectedPlan] = useState<Record<string, string>>({});
  const [selectedCourse, setSelectedCourse] = useState<{course: any, levelData: any} | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const generateAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase();

    if (AI_KNOWLEDGE.greetings.some(g => input.includes(g))) {
      return "Hello! I'm excited to help you learn today. What subject would you like to explore?";
    }

    if (AI_KNOWLEDGE.math.some(m => input.includes(m))) {
      return "I can help with Mathematics! Whether it's basic arithmetic, algebra, geometry, or calculus, I'm here to guide you. What specific math concept would you like to understand better?";
    }

    if (AI_KNOWLEDGE.science.some(s => input.includes(s))) {
      return "Science is fascinating! I can explain concepts in Physics, Chemistry, and Biology. Which area interests you? Or would you like me to explain a specific scientific concept?";
    }

    if (AI_KNOWLEDGE.programming.some(p => input.includes(p))) {
      return "Great! I love teaching programming. We have courses in Python, JavaScript, and AI fundamentals. Would you like to start with coding basics, or dive into a specific programming topic?";
    }

    if (AI_KNOWLEDGE.courses.some(c => input.includes(c))) {
      return "We offer courses from Primary School to University level! All courses have free trials and cost just $5 per module. Would you like recommendations based on your level?";
    }

    if (AI_KNOWLEDGE.help.some(h => input.includes(h))) {
      return "I'm here to help! You can ask me about:\n• Math, Science, or Programming concepts\n• Course recommendations\n• Study tips and learning strategies\n• Specific homework questions\nWhat do you need help with?";
    }

    if (input.includes("how") || input.includes("what") || input.includes("why") || input.includes("explain")) {
      return "That's a great question! Let me break it down for you: I'll help explain this concept step-by-step. Could you provide more details about what you're trying to understand?";
    }

    const responses = [
      "Interesting question! Let me help you understand this better. Based on what you're asking, I recommend breaking it down into smaller steps.",
      "I can help with that! This is a common topic students ask about. Let's explore it together - would you like a simple explanation or a detailed one?",
      "Great thinking! To answer your question properly, let me share some key points and examples that will make this clearer.",
      "That's exactly the kind of question that shows you're thinking deeply! Let me guide you through the concept with practical examples."
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: aiResponse
      }]);
      setIsTyping(false);
    }, 800);
  };

  const handleFreeTrial = (courseName: string) => {
    setTrialCourses(prev => ({ ...prev, [courseName]: true }));
    setUserProgress(prev => ({ ...prev, [courseName]: 15 }));
    setSelectedCourse(null);
    alert(`🎉 Free trial activated for ${courseName}!\n\nYou now have access to:\n• First 3 lessons\n• AI tutor support\n• Interactive exercises\n• 15% course preview\n\nEnjoy your trial!`);
  };

  const handlePayment = (courseName: string, amount: number) => {
    if (!trialCourses[courseName]) {
      const tryTrial = window.confirm(`Would you like to try a FREE TRIAL first before enrolling in ${courseName}?`);
      if (tryTrial) {
        handleFreeTrial(courseName);
        return;
      }
    }

    const amountInNaira = amount * 1500;

    const handler = (window as any).PaystackPop?.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: 'student@example.com',
      amount: amountInNaira * 100,
      currency: 'NGN',
      ref: 'ESP-' + Math.floor(Math.random() * 1000000000 + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Course Name",
            variable_name: "course_name",
            value: courseName
          }
        ]
      },
      callback: function(response: any) {
        setEnrolledCourses(prev => ({ ...prev, [courseName]: true }));
        setUserProgress(prev => ({ ...prev, [courseName]: 0 }));
        setSelectedCourse(null);
        alert('✅ Payment successful!\n\nReference: ' + response.reference + '\n\nYou now have full access to ' + courseName + '!');
      },
      onClose: function() {
        alert('Payment window closed');
      }
    });

    if (handler) {
      handler.openIframe();
    } else {
      setEnrolledCourses(prev => ({ ...prev, [courseName]: true }));
      setUserProgress(prev => ({ ...prev, [courseName]: 0 }));
      setSelectedCourse(null);
      alert('✅ Enrollment successful!\n\nWelcome to ' + courseName + '!\n\nYou now have full access to all course materials.');
    }
  };

  const simulateProgress = (courseName: string) => {
    const currentProgress = userProgress[courseName] || 0;
    const newProgress = Math.min(currentProgress + 10, 100);
    setUserProgress(prev => ({ ...prev, [courseName]: newProgress }));

    if (newProgress === 100) {
      alert(`🎉 Congratulations! You've completed ${courseName}!\n\nYour certificate is now available for download.`);
    }
  };

  const handleCourseClick = (course: any, levelData: any) => {
    setSelectedCourse({ course, levelData });
  };

  const renderCourseCard = (course: any, level: string, levelData: any) => {
    const isEnrolled = enrolledCourses[course.name];
    const hasTrial = trialCourses[course.name];
    const progress = userProgress[course.name] || 0;

    return (
      <div
        key={course.name}
        onClick={() => handleCourseClick(course, levelData)}
        className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-gray-100 cursor-pointer"
      >
        <div className="text-3xl sm:text-4xl mb-3">{course.icon}</div>
        <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-800">{course.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3">{course.aiFeature}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span className="hidden sm:inline">{course.lessons} lessons</span>
            <span className="sm:hidden">{course.lessons}L</span>
          </span>
          <span className="flex items-center gap-1">
            <Target className="w-3 h-3" />
            <span className="hidden sm:inline">{course.topics} topics</span>
            <span className="sm:hidden">{course.topics}T</span>
          </span>
        </div>

        {isEnrolled && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-600">Progress</span>
              <span className="text-xs font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCourseClick(course, levelData);
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 rounded-lg font-medium text-sm sm:text-base hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 shadow-md"
        >
          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">View Details</span>
          <span className="sm:hidden">Details</span>
        </button>

        {hasTrial && !isEnrolled && (
          <div className="mt-2 text-xs text-center text-green-600 font-medium flex items-center justify-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span className="hidden sm:inline">Trial Active</span>
            <span className="sm:hidden">Trial</span>
          </div>
        )}

        {isEnrolled && (
          <div className="mt-2 text-xs text-center text-blue-600 font-medium flex items-center justify-center gap-1">
            <Trophy className="w-3 h-3" />
            Enrolled
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-5xl mb-3">{selectedCourse.course.icon}</div>
                <h2 className="text-3xl font-bold mb-2">{selectedCourse.course.name}</h2>
                <p className="text-gray-600">{selectedCourse.course.aiFeature}</p>
              </div>
              <button onClick={() => setSelectedCourse(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Lessons</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{selectedCourse.course.lessons}</div>
              </div>
              <div className="bg-cyan-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-5 h-5 text-cyan-600" />
                  <span className="font-semibold">Topics</span>
                </div>
                <div className="text-2xl font-bold text-cyan-600">{selectedCourse.course.topics}</div>
              </div>
            </div>

            {enrolledCourses[selectedCourse.course.name] ? (
              <div className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold">You're Enrolled!</h3>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-lg font-bold text-blue-600">{userProgress[selectedCourse.course.name] || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${userProgress[selectedCourse.course.name] || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      simulateProgress(selectedCourse.course.name);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Continue Learning
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Play className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-green-800">Try for Free First!</h4>
                  </div>
                  <p className="text-sm text-green-700 mb-3">Get instant access to the first 3 lessons to explore the course before subscribing.</p>
                  <button
                    onClick={() => handleFreeTrial(selectedCourse.course.name)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2.5 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Start Free Preview
                  </button>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-bold mb-3">Choose Your Plan</h3>
                  {Object.entries(selectedCourse.levelData.plans).map(([key, plan]: [string, any]) => {
                    const currentPlan = selectedPlan[selectedCourse.course.name] || 'trial';
                    if (key === 'trial') return null;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedPlan(prev => ({ ...prev, [selectedCourse.course.name]: key }))}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left mb-2 ${
                          currentPlan === key
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-bold text-lg">{plan.name}</div>
                            <div className="text-sm text-gray-600">{plan.access}</div>
                          </div>
                          <div className="text-2xl font-bold text-blue-600">{plan.price}</div>
                        </div>
                      </button>
                    );
                  })}

                  <button
                    onClick={() => {
                      const currentPlan = selectedPlan[selectedCourse.course.name] || 'basic';
                      const plan = selectedCourse.levelData.plans[currentPlan];
                      handlePayment(selectedCourse.course.name, plan.priceValue);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 shadow-lg mt-4"
                  >
                    <CreditCard className="w-5 h-5" />
                    Subscribe - {selectedCourse.levelData.plans[selectedPlan[selectedCourse.course.name] || 'basic'].price}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40 border-b-2 border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt="EduSpark Logo"
                className="w-14 h-14 rounded-xl object-contain bg-gradient-to-br from-blue-100 to-cyan-100 p-2 shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const nextSibling = (e.target as HTMLImageElement).nextSibling as HTMLElement;
                  if (nextSibling) nextSibling.style.display = 'block';
                }}
              />
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg" style={{ display: 'none' }}>
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  EduSpark
                </h1>
                <p className="text-xs text-gray-600 font-medium">Empowering Minds Through AI Learning</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => setActiveTab('home')} className={`font-medium transition-all ${activeTab === 'home' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-blue-600'}`}>
                Home
              </button>
              <button onClick={() => setActiveTab('courses')} className={`font-medium transition-all ${activeTab === 'courses' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-blue-600'}`}>
                Courses
              </button>
              <button onClick={() => setActiveTab('progress')} className={`font-medium transition-all ${activeTab === 'progress' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-blue-600'}`}>
                My Progress
              </button>
              <button onClick={() => setActiveTab('about')} className={`font-medium transition-all ${activeTab === 'about' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-blue-600'}`}>
                About
              </button>
              <button onClick={() => setChatOpen(true)} className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:shadow-xl transition-all font-medium">
                <Brain className="w-4 h-4" />
                AI Tutor
              </button>
            </nav>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {menuOpen && (
            <nav className="md:hidden mt-4 flex flex-col gap-3 pb-4 border-t pt-4">
              <button onClick={() => { setActiveTab('home'); setMenuOpen(false); }} className="text-left font-medium px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors">Home</button>
              <button onClick={() => { setActiveTab('courses'); setMenuOpen(false); }} className="text-left font-medium px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors">Courses</button>
              <button onClick={() => { setActiveTab('progress'); setMenuOpen(false); }} className="text-left font-medium px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors">My Progress</button>
              <button onClick={() => { setActiveTab('about'); setMenuOpen(false); }} className="text-left font-medium px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors">About</button>
              <button onClick={() => { setChatOpen(true); setMenuOpen(false); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">AI Tutor</button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-16 relative px-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-cyan-200 to-teal-200 blur-3xl opacity-30 -z-10"></div>
              <div className="flex justify-center mb-8">
                <img
                  src={LOGO_URL}
                  alt="EduSpark Logo"
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-3xl object-contain shadow-2xl bg-white p-4 sm:p-6 border-4 border-blue-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const nextSibling = (e.target as HTMLImageElement).nextSibling as HTMLElement;
                    if (nextSibling) nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-2xl border-4 border-blue-100" style={{ display: 'none' }}>
                  <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-white" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent leading-tight px-2">
                Learn Smarter with AI
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 font-medium px-4">
                From Primary School to University - AI-powered education for every level
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4">
                <button onClick={() => setActiveTab('courses')} className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-2xl transition-all transform hover:scale-105">
                  Explore Courses
                </button>
                <button onClick={() => setChatOpen(true)} className="w-full sm:w-auto bg-white text-blue-600 px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg border-3 border-blue-600 hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
                  Try AI Tutor
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 px-4">
              {[
                { icon: Play, title: "Free Trials", desc: "Try courses before subscribing", color: "green-600" },
                { icon: BookOpen, title: "Flexible Plans", desc: "$1, $3, $5, $20 options", color: "blue-600" },
                { icon: Brain, title: "Smart AI Tutor", desc: "Get instant help 24/7", color: "cyan-600" },
                { icon: CreditCard, title: "Easy Payment", desc: "Secure checkout", color: "teal-600" }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
                  <feature.icon className={`w-12 h-12 sm:w-14 sm:h-14 text-${feature.color} mx-auto mb-3 sm:mb-4`} />
                  <h3 className="font-bold text-base sm:text-lg mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 px-4">
              {[
                { icon: Users, value: "10,000+", label: "Active Students", gradient: "from-blue-500 to-blue-600" },
                { icon: BookOpen, value: "500+", label: "Courses Available", gradient: "from-cyan-500 to-cyan-600" },
                { icon: Award, value: "95%", label: "Success Rate", gradient: "from-teal-500 to-teal-600" },
                { icon: TrendingUp, value: "4.8/5", label: "Student Rating", gradient: "from-green-500 to-green-600" }
              ].map((stat, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${stat.gradient} rounded-xl p-4 sm:p-6 md:p-8 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105`}>
                  <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3" />
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Access */}
            <div className="mb-12 sm:mb-16 px-4">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Choose Your Level</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Object.entries(COURSES_DATA).map(([key, level]) => (
                  <button
                    key={key}
                    onClick={() => { setSelectedLevel(key); setActiveTab('courses'); }}
                    className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all text-left group transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-300"
                  >
                    <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="font-bold text-xl sm:text-2xl mb-2">{level.name}</h4>
                    <p className="text-sm text-gray-600 mb-3 sm:mb-4">{level.levels}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-bold text-xs sm:text-sm">Flexible plans</span>
                      <div className="flex items-center text-blue-600 font-semibold text-sm sm:text-base">
                        Explore <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl mb-12 sm:mb-16 mx-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">What Our Students Say</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { name: "Sarah Johnson", role: "University Student", text: "EduSpark's AI tutor helped me ace my exams! The personalized learning is amazing.", rating: 5 },
                  { name: "Michael Chen", role: "High School Student", text: "The free trials let me explore different subjects before committing. Best decision ever!", rating: 5 },
                  { name: "Dr. Amina Ibrahim", role: "Medical Student", text: "The SLT courses are incredibly detailed and the AI integration is cutting-edge.", rating: 5 }
                ].map((testimonial, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 sm:p-6 border-2 border-blue-200">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <div className="font-semibold text-sm sm:text-base">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'courses' && (
          <>
            <div className="mb-6 sm:mb-8 px-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 sm:mb-6">
                <img
                  src={LOGO_URL}
                  alt="EduSpark"
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-contain bg-white p-2 shadow-lg"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold">Browse Courses</h2>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg">All courses: Flexible plans • Free trials available</p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-3 sm:top-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                <button
                  onClick={() => setSelectedLevel(null)}
                  className={`px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg font-medium transition-all ${!selectedLevel ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-50 shadow'}`}
                >
                  All Levels
                </button>
                {Object.entries(COURSES_DATA).map(([key, level]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedLevel(key)}
                    className={`px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg font-medium transition-all ${selectedLevel === key ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-50 shadow'}`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary School */}
            {(!selectedLevel || selectedLevel === 'primary') && (
              <div className="mb-8 sm:mb-12 px-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold">{COURSES_DATA.primary.name}</h3>
                  <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold">
                    Flexible Plans
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {COURSES_DATA.primary.subjects.map(course => renderCourseCard(course, 'primary', COURSES_DATA.primary))}
                </div>
              </div>
            )}

            {/* JSS */}
            {(!selectedLevel || selectedLevel === 'jss') && (
              <div className="mb-12 px-4">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-3xl font-bold">{COURSES_DATA.jss.name}</h3>
                  <span className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-semibold">
                    Flexible Plans
                  </span>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {COURSES_DATA.jss.subjects.map(course => renderCourseCard(course, 'jss', COURSES_DATA.jss))}
                </div>
              </div>
            )}

            {/* SSS */}
            {(!selectedLevel || selectedLevel === 'sss') && (
              <div className="mb-12 px-4">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-3xl font-bold">{COURSES_DATA.sss.name}</h3>
                  <span className="bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 px-4 py-1.5 rounded-full text-sm font-semibold">
                    Flexible Plans
                  </span>
                </div>

                <div className="flex gap-3 mb-6 flex-wrap">
                  <button
                    onClick={() => setSelectedStream(null)}
                    className={`px-5 py-2 rounded-lg transition-all font-medium ${!selectedStream ? 'bg-blue-600 text-white shadow-lg' : 'bg-white hover:bg-gray-50 shadow'}`}
                  >
                    All Streams
                  </button>
                  <button
                    onClick={() => setSelectedStream('science')}
                    className={`px-5 py-2 rounded-lg transition-all font-medium ${selectedStream === 'science' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white hover:bg-gray-50 shadow'}`}
                  >
                    Science
                  </button>
                  <button
                    onClick={() => setSelectedStream('arts')}
                    className={`px-5 py-2 rounded-lg transition-all font-medium ${selectedStream === 'arts' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white hover:bg-gray-50 shadow'}`}
                  >
                    Arts/Humanities
                  </button>
                  <button
                    onClick={() => setSelectedStream('commercial')}
                    className={`px-5 py-2 rounded-lg transition-all font-medium ${selectedStream === 'commercial' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white hover:bg-gray-50 shadow'}`}
                  >
                    Commercial/Business
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {(selectedStream ? COURSES_DATA.sss.streams[selectedStream as keyof typeof COURSES_DATA.sss.streams] : Object.values(COURSES_DATA.sss.streams).flat()).map(course =>
                    renderCourseCard(course, 'sss', COURSES_DATA.sss)
                  )}
                </div>
              </div>
            )}

            {/* Pre-University */}
            {(!selectedLevel || selectedLevel === 'preuni') && (
              <div className="mb-12 px-4">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-3xl font-bold">{COURSES_DATA.preuni.name}</h3>
                  <span className="bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 px-4 py-1.5 rounded-full text-sm font-semibold">
                    Up to $20 Premium
                  </span>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {COURSES_DATA.preuni.subjects.map(course => renderCourseCard(course, 'preuni', COURSES_DATA.preuni))}
                </div>
              </div>
            )}

            {/* University */}
            {(!selectedLevel || selectedLevel === 'university') && (
              <div className="px-4">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-3xl font-bold">{COURSES_DATA.university.name}</h3>
                  <span className="bg-gradient-to-r from-red-100 to-rose-100 text-red-800 px-4 py-1.5 rounded-full text-sm font-semibold">
                    Up to $20 Premium
                  </span>
                </div>

                {Object.entries(COURSES_DATA.university.faculties).map(([key, faculty]) => (
                  <div key={key} className="mb-10">
                    <h4 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
                      <GraduationCap className="w-6 h-6" />
                      {faculty.name}
                    </h4>
                    <div className="grid md:grid-cols-3 gap-6">
                      {faculty.courses.map(course => renderCourseCard(course, 'university', COURSES_DATA.university))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'progress' && (
          <div className="px-4">
            <div className="flex items-center gap-4 mb-8">
              <img
                src={LOGO_URL}
                alt="EduSpark"
                className="w-16 h-16 rounded-xl object-contain bg-white p-2 shadow-lg"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div>
                <h2 className="text-4xl font-bold">My Learning Progress</h2>
                <p className="text-gray-600">Track your journey to success</p>
              </div>
            </div>

            {Object.keys(enrolledCourses).length === 0 && Object.keys(trialCourses).length === 0 ? (
              <div className="bg-white rounded-2xl p-16 shadow-xl text-center">
                <BarChart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-gray-700">No Courses Yet</h3>
                <p className="text-gray-600 mb-6">Start your learning journey by enrolling in a course or trying a free trial!</p>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
                >
                  Browse Courses
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {[...Object.keys(enrolledCourses), ...Object.keys(trialCourses)].filter((v, i, a) => a.indexOf(v) === i).map(courseName => {
                  const progress = userProgress[courseName] || 0;
                  const isEnrolled = enrolledCourses[courseName];
                  const isTrial = trialCourses[courseName];

                  return (
                    <div key={courseName} className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-100">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{courseName}</h3>
                          <div className="flex gap-2">
                            {isEnrolled && (
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                <Trophy className="w-3 h-3" />
                                Enrolled
                              </span>
                            )}
                            {isTrial && !isEnrolled && (
                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Trial Mode
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-4xl font-bold text-blue-600">{progress}%</div>
                          <div className="text-sm text-gray-600">Complete</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                            style={{ width: `${progress}%` }}
                          >
                            {progress > 10 && <span className="text-white text-xs font-bold">{progress}%</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => simulateProgress(courseName)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
                        >
                          <Play className="w-5 h-5" />
                          Continue Learning
                        </button>
                        {progress === 100 && (
                          <button
                            onClick={() => alert(`📜 Certificate for ${courseName}\n\nCongratulations on completing the course!\n\nYour certificate is ready for download.`)}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all flex items-center gap-2"
                          >
                            <Download className="w-5 h-5" />
                            Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <img
                src={LOGO_URL}
                alt="EduSpark Logo"
                className="w-32 h-32 rounded-2xl object-contain shadow-2xl bg-white p-4 mx-auto mb-6"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const nextSibling = (e.target as HTMLImageElement).nextSibling as HTMLElement;
                  if (nextSibling) nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-2xl mx-auto mb-6" style={{ display: 'none' }}>
                <Sparkles className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-5xl font-bold mb-4">About EduSpark</h2>
              <p className="text-xl text-gray-600">Transforming Education Through Artificial Intelligence</p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-10 shadow-2xl mb-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-10 h-10" />
                <h3 className="text-3xl font-bold">Our Vision</h3>
              </div>
              <p className="text-lg leading-relaxed mb-4">
                EduSpark envisions a world where quality education is accessible to everyone, regardless of location or economic status. We leverage artificial intelligence to create personalized learning experiences that adapt to each student's unique needs and pace.
              </p>
              <p className="text-lg leading-relaxed">
                Through our AI-powered platform, we're democratizing education by offering comprehensive curriculum coverage from Primary School to University level at an affordable price of just $5 per module, with free trials for every course.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-10 shadow-xl mb-8 border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-10 h-10 text-blue-600" />
                <h3 className="text-3xl font-bold text-blue-700">Our Mission</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Brain, title: "AI-Powered Learning", desc: "Leverage cutting-edge AI technology to provide personalized recommendations and intelligent tutoring support" },
                  { icon: Users, title: "Accessible Education", desc: "Make quality education affordable and accessible to students from primary school through postgraduate studies" },
                  { icon: Trophy, title: "Student Success", desc: "Empower students to achieve their full potential through interactive, engaging, and effective learning experiences" },
                  { icon: CheckCircle, title: "Inclusive Platform", desc: "Create an inclusive learning environment that caters to diverse learning styles and educational backgrounds" }
                ].map((mission, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <mission.icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{mission.title}</h4>
                      <p className="text-gray-600 text-sm">{mission.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-10 shadow-xl mb-8">
              <h3 className="text-3xl font-bold mb-8 text-center text-blue-700">Our Core Values</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: CheckCircle, title: "Excellence", desc: "We strive for excellence in every course, ensuring high-quality content and effective learning outcomes" },
                  { icon: Sparkles, title: "Innovation", desc: "We continuously innovate with AI technology to enhance the learning experience and stay ahead of educational trends" },
                  { icon: CheckCircle, title: "Integrity", desc: "We operate with transparency, honesty, and ethical practices in all our interactions with students and partners" }
                ].map((value, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-lg text-center border-2 border-blue-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-xl mb-3 text-blue-700">{value.title}</h4>
                    <p className="text-gray-600 text-sm">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-2xl p-10 shadow-xl mb-8">
              <h3 className="text-3xl font-bold mb-6 text-blue-700">Platform Features</h3>
              <ul className="space-y-4">
                {[
                  { icon: Brain, title: "Intelligent AI Tutor", desc: "24/7 chatbot support that answers questions, explains concepts in Math, Science, Programming, and more" },
                  { icon: Play, title: "Free Trial System", desc: "Try any course before enrolling with access to first 3 lessons and AI tutor support" },
                  { icon: BarChart, title: "Progress Tracking", desc: "Monitor your learning journey with detailed progress metrics and achievement certificates" },
                  { icon: CreditCard, title: "Affordable Pricing", desc: "Just $5 per module with secure Paystack payment integration" },
                  { icon: BookOpen, title: "Comprehensive Curriculum", desc: "500+ courses covering all subjects from Primary to University level" },
                  { icon: Award, title: "Certification", desc: "Earn certificates upon course completion to showcase your achievements" }
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 hover:bg-blue-50 rounded-lg transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who Can Use */}
            <div className="bg-white rounded-2xl p-10 shadow-xl">
              <h3 className="text-3xl font-bold mb-8 text-center text-blue-700">Who Can Use EduSpark?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Primary/Elementary Students", desc: "Build strong foundations with fun, interactive AI-powered learning tools and games" },
                  { title: "Secondary/High School Students", desc: "Master subjects with AI simulations, personalized study plans, and exam preparation" },
                  { title: "University Students", desc: "Advance your specialization with cutting-edge AI-integrated courses and research tools" },
                  { title: "Postgraduate Learners", desc: "Deep dive into advanced topics with AI assistance for research and professional development" }
                ].map((audience, idx) => (
                  <div key={idx} className="border-l-4 border-blue-600 pl-6 py-4 bg-gradient-to-r from-blue-50 to-transparent rounded-r-lg">
                    <h4 className="font-bold text-xl mb-2">{audience.title}</h4>
                    <p className="text-gray-600">{audience.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alumni' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 rainbow-text">Success Stories</h2>
              <p className="text-xl text-gray-600">Meet our outstanding alumni who transformed their lives through EduSpark</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Chioma Okafor", level: "SS3 to University", achievement: "Got 95% in Physics", story: "EduSpark's AI simulations helped me understand complex concepts that seemed impossible before.", image: "👩‍🎓" },
                { name: "Tunde Adeleke", level: "University Graduate", achievement: "Full Scholarship", story: "The advanced courses prepared me perfectly for my computer science degree at a top university.", image: "👨‍🎓" },
                { name: "Blessing Okoro", level: "JSS2 to Excellence", achievement: "Top 10 in Nation", story: "I went from struggling in math to becoming the best student in my state. Thank you EduSpark!", image: "👩‍🎓" },
                { name: "Emeka Nwosu", level: "University Postgrad", achievement: "Coding Expert", story: "The Machine Learning course launched my career as an AI engineer at a leading tech company.", image: "👨‍💼" },
                { name: "Zainab Ibrahim", level: "Primary to Secondary", achievement: "Confident Learner", story: "The free trials let me explore subjects before committing. Now I love learning!", image: "👧" },
                { name: "Kadir Hassan", level: "University Graduate", achievement: "Research Analyst", story: "The data analytics course gave me skills that got me a dream job in fintech.", image: "👨‍💼" }
              ].map((alumni, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-blue-600">
                  <div className="text-5xl mb-4 text-center">{alumni.image}</div>
                  <h3 className="text-xl font-bold mb-2">{alumni.name}</h3>
                  <p className="text-sm text-cyan-600 font-semibold mb-3">{alumni.level}</p>
                  <div className="bg-green-50 rounded-lg p-3 mb-4 border-l-4 border-green-600">
                    <p className="text-sm font-semibold text-green-700">{alumni.achievement}</p>
                  </div>
                  <p className="text-gray-600 italic">"{alumni.story}"</p>
                  <div className="mt-4 flex gap-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-8 md:p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h3>
              <p className="text-lg mb-8 opacity-95">Join thousands of students achieving their dreams with EduSpark</p>
              <button onClick={() => setActiveTab('courses')} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all">
                Explore Courses Now
              </button>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 rainbow-text">Course Gallery</h2>
              <p className="text-xl text-gray-600">Visual showcase of our comprehensive learning platform</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "📚", title: "AI-Powered Lessons", desc: "Interactive lessons with intelligent AI assistance" },
                { icon: "🧪", title: "Virtual Simulations", desc: "Hands-on experiments and science simulations" },
                { icon: "💻", title: "Coding Courses", desc: "From Python basics to advanced Machine Learning" },
                { icon: "📊", title: "Analytics Dashboard", desc: "Track your progress with detailed insights" },
                { icon: "🎓", title: "Expert Instructors", desc: "Learn from experienced educators and AI tutors" },
                { icon: "🏆", title: "Certifications", desc: "Earn recognized certificates upon completion" },
                { icon: "🌍", title: "Global Community", desc: "Connect with learners worldwide" },
                { icon: "⚡", title: "Fast Learning", desc: "Accelerated courses with AI optimization" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center border border-gray-100">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-8 md:p-12">
              <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">Platform Features</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { title: "Responsive Design", desc: "Learn on any device - desktop, tablet, or mobile" },
                  { title: "Free Trials", desc: "Try any course with 3 free lessons before subscribing" },
                  { title: "24/7 AI Tutor", desc: "Get instant help anytime with our smart AI assistant" },
                  { title: "Flexible Plans", desc: "Choose from FREE, $1, $3, $5, or $20 plans" },
                  { title: "Progress Tracking", desc: "Monitor your learning journey with detailed metrics" },
                  { title: "Secure Payment", desc: "Safe transactions via Paystack payment gateway" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { number: "50K+", label: "Active Learners", icon: Users },
                { number: "500+", label: "Courses Available", icon: BookOpen },
                { number: "95%", label: "Success Rate", icon: TrendingUp }
              ].map((stat, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all">
                  <stat.icon className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <div className="text-5xl font-bold mb-2">{stat.number}</div>
                  <p className="text-lg opacity-90">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* AI Chatbot */}
      {chatOpen && (
        <div className="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 left-2 sm:left-auto w-auto sm:w-full sm:max-w-md h-[500px] sm:h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border-2 border-blue-200">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 sm:p-5 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg">AI Tutor</h3>
                <p className="text-xs opacity-90">Smart Learning Assistant</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="hover:bg-white/20 rounded-lg p-1.5 sm:p-2 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4 bg-gradient-to-br from-blue-50 to-cyan-50">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 sm:p-4 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none shadow-lg'
                    : 'bg-white text-gray-800 rounded-bl-none shadow-md border border-blue-100'
                }`}>
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none shadow-md p-3 sm:p-4 border border-blue-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleChatSubmit} className="p-3 sm:p-5 border-t-2 border-blue-100 bg-white rounded-b-2xl">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">Try: "Explain photosynthesis" or "Help with algebra"</p>
          </form>
        </div>
      )}

      {/* Floating Chat Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 sm:p-5 rounded-full shadow-2xl hover:scale-110 transition-transform z-40 animate-pulse"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Flexible Plans Section */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Flexible Learning Plans for Everyone!</h2>
            <p className="text-sm sm:text-base opacity-95">Choose the plan that works best for your learning journey</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 sm:p-6 text-center hover:bg-white/30 transition-all transform hover:scale-105">
              <div className="text-3xl sm:text-4xl font-bold mb-2">FREE</div>
              <div className="text-xs sm:text-sm opacity-95">Trial Access</div>
              <p className="text-xs mt-2 opacity-85">First 3 lessons</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 sm:p-6 text-center hover:bg-white/30 transition-all transform hover:scale-105">
              <div className="text-3xl sm:text-4xl font-bold mb-2">$1</div>
              <div className="text-xs sm:text-sm opacity-95">Basic Plan</div>
              <p className="text-xs mt-2 opacity-85">10 lessons</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 sm:p-6 text-center hover:bg-white/30 transition-all transform hover:scale-105">
              <div className="text-3xl sm:text-4xl font-bold mb-2">$3-$5</div>
              <div className="text-xs sm:text-sm opacity-95">Standard Plan</div>
              <p className="text-xs mt-2 opacity-85">Full course access</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 sm:p-6 text-center hover:bg-white/30 transition-all transform hover:scale-105">
              <div className="text-3xl sm:text-4xl font-bold mb-2">$20</div>
              <div className="text-xs sm:text-sm opacity-95">Premium Plan</div>
              <p className="text-xs mt-2 opacity-85">Full + AI Tutor</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <button onClick={() => setActiveTab('courses')} className="bg-white text-green-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105">
              View All Courses
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={LOGO_URL}
                  alt="EduSpark"
                  className="w-12 h-12 rounded-lg object-contain bg-white p-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const nextSibling = (e.target as HTMLImageElement).nextSibling as HTMLElement;
                    if (nextSibling) nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center" style={{ display: 'none' }}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-2xl">EduSpark</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Empowering minds through AI-powered learning from Primary to University level.
              </p>
              <p className="text-green-400 font-bold text-lg">$5 per module</p>
              <p className="text-blue-400 font-semibold">Free Trials Available</p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-blue-400">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors hover:translate-x-1 inline-block">→ Home</button></li>
                <li><button onClick={() => setActiveTab('courses')} className="hover:text-white transition-colors hover:translate-x-1 inline-block">→ Courses</button></li>
                <li><button onClick={() => setActiveTab('progress')} className="hover:text-white transition-colors hover:translate-x-1 inline-block">→ My Progress</button></li>
                <li><button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors hover:translate-x-1 inline-block">→ About</button></li>
                <li><button onClick={() => setChatOpen(true)} className="hover:text-white transition-colors hover:translate-x-1 inline-block">→ AI Tutor</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-blue-400">Learning Levels</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  Primary School (P1-P6)
                </li>
                <li className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  Junior Secondary (JSS1-JSS3)
                </li>
                <li className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-teal-400" />
                  Senior Secondary (SS1-SS3)
                </li>
                <li className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-green-400" />
                  Pre-University Prep
                </li>
                <li className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-orange-400" />
                  University & Postgraduate
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-blue-400">Contact Us</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">📧</span>
                  Smartxpress74@gmail.com
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">📱</span>
                  +234 902 077 9297
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">📍</span>
                  Port Harcourt, Nigeria
                </li>
                <li className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-yellow-400" />
                  Secure Payment via Paystack
                </li>
              </ul>
              <div className="mt-6 flex gap-3">
                <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                  <span className="text-lg">f</span>
                </button>
                <button className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors">
                  <span className="text-lg">𝕏</span>
                </button>
                <button className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors">
                  <span className="text-lg">in</span>
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400 text-center md:text-left">
                &copy; 2025 EduSpark. All rights reserved. Powered by Artificial Intelligence.
              </p>
              <div className="flex gap-6 text-xs text-gray-400">
                <button className="hover:text-white transition-colors">Privacy Policy</button>
                <button className="hover:text-white transition-colors">Terms of Service</button>
                <button className="hover:text-white transition-colors">Cookie Policy</button>
              </div>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">
              🎓 Quality Education • 💰 Flexible Plans (FREE, $1, $3, $5, $20) • 🎁 Free Trials • 🤖 AI-Powered Learning
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EduSpark;

