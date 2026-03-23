import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  name: "Prasanna Venkatesh",
  title: "Senior React Native Developer",
  yearsOfExperience: "6+",
  summary: "Senior React Native Developer with over 6 years of experience in building, deploying, and maintaining scalable cross-platform mobile applications for Android and iOS platforms. Strong expertise in React Native, Expo, JavaScript, TypeScript, Redux, Context API, and Firebase. Proven track record of delivering end-to-end mobile solutions including requirement analysis, architecture design, third-party integrations, performance optimization, app store deployment, and post-release support.",
  skills: [
    {
      category: "Programming Languages",
      skills: ["JavaScript", "TypeScript"]
    },
    {
      category: "Mobile Frameworks",
      skills: ["React Native", "Expo", "ReactJS", "Redux", "Context API"]
    },
    {
      category: "Backend & Integration",
      skills: ["RESTful APIs", "ExpressJS", "Firebase", "Sendbird Chat", "FCM"]
    },
    {
      category: "Databases",
      skills: ["MongoDB", "SQLite", "Realm"]
    },
    {
      category: "Maps & Auth",
      skills: ["Google Maps API", "Google Places API", "OAuth", "Facebook Login"]
    },
    {
      category: "Payment Gateways",
      skills: ["PayPal", "Stripe", "Cashfree"]
    },
    {
      category: "AI & Tools",
      skills: ["GitHub Copilot", "Cursor IDE", "ChatGPT", "Google Gemini", "Prompt Engineering"]
    }
  ],
  experience: [
    {
      company: "Colan Infotech Private Limited",
      url: "https://colaninfotech.com/portfolio/",
      designation: "Senior React Native Developer",
      duration: "Dec 2021 – Present",
      responsibilities: [
        "Designed and developed multiple production-grade React Native applications across healthcare, e-commerce, food delivery, and utilities.",
        "Built reusable UI components and implemented clean, maintainable architecture using Redux and Context API.",
        "Integrated third-party SDKs and APIs including Google Maps, Firebase, and Sendbird.",
        "Led requirement gathering sessions, estimated tasks, and mentored junior developers.",
        "Handled full app lifecycle from development to store deployment."
      ]
    },
    {
      company: "Uplogic Technologies Private Limited",
      url: "https://www.uplogictech.com/portfolio",
      designation: "React Native Developer",
      duration: "Dec 2019 – Dec 2021",
      responsibilities: [
        "Developed cross-platform mobile applications for Android and iOS.",
        "Implemented Firebase Cloud Messaging for push notifications, increasing user engagement by 15%.",
        "Optimized app performance and reduced crashes.",
        "Participated in technical interviews and candidate evaluations."
      ]
    }
  ],
  socials: {
    github: "https://github.com/prasanna-col",
    linkedin: "https://www.linkedin.com/in/prasanna-venkatesh-m-p-774834174/",
    email: "prasanna.colan@gmail.com",
    whatsapp: "8838345451",
    phone: "+91 8838345451"
  },
  projects: [
    {
      title: "SkewbWorks",
      description: "Utilities & Street Works Management Platform. A super app for managing utilities such as leakage management, digital connections, and energy efficiency.",
      technologies: ["TypeScript", "React Native", "Redux", "Context API", "Realm"],
      duration: "11 Months",
      teamSize: 5
    },
    {
      title: "Mother Goose",
      description: "Pregnancy & Healthcare Application to monitor pregnancy health through surveys and personalized care pathways. Integrated real-time chat and video consultations.",
      technologies: ["JavaScript", "Expo", "React Native", "Context API", "Sendbird Chat"],
      duration: "1.5 Years",
      teamSize: 5
    },
    {
      title: "Horfay",
      description: "Service Booking Platform for booking and managing on-demand services. Implemented scheduling, notifications, and service listings.",
      technologies: ["JavaScript", "React Native", "Context API", "Sendbird Chat"],
      duration: "6 Months",
      teamSize: 3
    },
    {
      title: "Spotneats",
      description: "Food & Grocery Delivery Ecosystem with three applications for customers, vendors, and delivery partners. Real-time order tracking and delivery assignment.",
      technologies: ["JavaScript", "React Native", "Redux", "Firebase", "Google Maps"],
      duration: "4 Months",
      teamSize: 2
    },
    {
      title: "Facia",
      description: "Emergency Assistance & Missing Person Tracking. Emergency alert applications for users, security personnel, and vendors.",
      technologies: ["JavaScript", "React Native", "Redux", "Firebase"],
      duration: "5 Months",
      teamSize: 2
    }
  ]
};
