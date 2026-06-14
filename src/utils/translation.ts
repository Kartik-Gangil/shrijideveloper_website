export type Language = "en" | "hi";

export interface TranslationDict {
  navbar: {
    projects: string;
    emiPlans: string;
    process: string;
    contact: string;
    call: string;
    verifiedLayouts: string;
    brand: string;
  };
  hero: {
    badge: string;
    titlePart1: string;
    titlePart2: string;
    description: string;
    exploreBtn: string;
    brochureBtn: string;
    legalRegistry: string;
    interestFree: string;
    happyClients: string;
    statRegistry: string;
    statEmi: string;
    statClients: string;
  };
  trust: {
    badge: string;
    heading: string;
    description: string;
    badgeTitle: string;
    badgeDesc: string;
    cards: {
      title: string;
      desc: string;
    }[];
    emi: {
      pBadge: string;
      pTitle: string;
      pDesc: string;
      estimatedPrice: string;
      lakhs: string;
      downpayment: string;
      min: string;
      max: string;
      tenure: string;
      months: string;
      summaryTitle: string;
      immediateDownpayment: string;
      principal: string;
      roi: string;
      roiFree: string;
      monthlyPayment: string;
      zeroInterestText: string;
    };
  };
  projects: {
    badge: string;
    heading: string;
    pDesc: string;
    requestCab: string;
    teaserAyodhya: string;
    teaserLucknow: string;
    dimensions: string;
    pricing: string;
    detailsBtn: string;
    mapBtn: string;
    specsBadge: string;
    roadWidth: string;
    priceIndex: string;
    amenitiesTitle: string;
    landmarksTitle: string;
    inquireTitle: string;
    interactiveTitle: string;
    interactiveDesc: string;
    entranceGate: string;
    availableLabel: string;
    soldLabel: string;
    reservedLabel: string;
    parkLabel: string;
    roadLabel: string;
    indexAvailable: string;
    indexSold: string;
    indexReserved: string;
    selPlotHead: string;
    legalClearance: string;
    clearTitle: string;
    statusLabel: string;
    inquirePlotBtn: string;
    securePrice: string;
    selectPlotPrompt: string;
    selectPlotDesc: string;
    ayodhyaTitle: string;
    lucknowTitle: string;
    ayodhyaPricing: string;
    lucknowPricing: string;
    specRoadsAyodhya: string;
    specRoadsLucknow: string;
    amenitiesListAyodhya: string[];
    amenitiesListLucknow: string[];
    landmarksAyodhya: string[];
    landmarksLucknow: string[];
  };
  journey: {
    badge: string;
    heading: string;
    pDesc: string;
    tip: string;
    steps: {
      title: string;
      desc: string;
      details: string;
    }[];
  };
  contact: {
    badge: string;
    heading: string;
    pDesc: string;
    testimonials: {
      text: string;
      author: string;
      role: string;
    }[];
    cabVisits: string;
    cabVisitsDesc: string;
    specialists: string;
    specialistsDesc: string;
    secureConnection: string;
    formTitle: string;
    formDesc: string;
    labelName: string;
    placeholderName: string;
    labelPhone: string;
    placeholderPhone: string;
    labelProject: string;
    placeholderProject: string;
    projectOpt1: string;
    projectOpt2: string;
    projectOpt3: string;
    errName: string;
    errPhone: string;
    errPhoneDigits: string;
    errProject: string;
    submitBtn: string;
    successTitle: string;
    successTicket: string;
    successDetailsName: string;
    successDetailsPhone: string;
    successDetailsProject: string;
    successDetailsStatus: string;
    closeBtn: string;
  };
  footer: {
    desc: string;
    clearanceRera: string;
    clearanceBoundary: string;
    clearanceRegistry: string;
    clearanceCabs: string;
    copyright: string;
    referenceDisclaimer: string;
  };
  brochure: {
    formTitle: string;
    formDesc: string;
    labelName: string;
    placeholderName: string;
    labelPhone: string;
    placeholderPhone: string;
    errName: string;
    errPhone: string;
    submitBtn: string;
    successMsg: string;
    progressBar: string;
    downloadSuccess: string;
    forceDownload: string;
  };
  whatsapp: {
    title: string;
    status: string;
    typing: string;
    placeholder: string;
    welcomeMsg: string;
    resRates: string;
    resLocations: string;
    resEmi: string;
    resRegistry: string;
    resWelcome: string;
  };
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    navbar: {
      projects: "Townships",
      emiPlans: "EMI Plans",
      process: "Ownership Process",
      contact: "Contact Us",
      call: "Call",
      verifiedLayouts: "Govt. Verified & RERA Approved Layouts",
      brand: "ShriJi Developer",
    },
    hero: {
      badge: "RERA Approved & Govt. Verified Layouts",
      titlePart1: "Your Dream Plot",
      titlePart2: "Now in Your Budget",
      description: "Premium residential plots with modern amenities, 100% legal security, and easy payment plans. Invest in your family's future today in North India's most rapidly expanding hubs.",
      exploreBtn: "Explore Projects",
      brochureBtn: "Download Brochure",
      legalRegistry: "100% Legal Registry",
      interestFree: "0% Interest EMI",
      happyClients: "5000+ Happy Clients",
      statRegistry: "Legal Registry",
      statEmi: "Interest EMI",
      statClients: "Happy Clients",
    },
    trust: {
      badge: "Developer Credentials",
      heading: "Why Choose ShriJi Developer?",
      description: "We combine traditional family-first values with bulletproof legal security, modern physical boundary layouts, and transparent pricing to give you the perfect land investment in developing smart corridors.",
      badgeTitle: "Secure Investments Only",
      badgeDesc: "We do not offer disputed or unverified lands.",
      cards: [
        {
          title: "100% Registry",
          desc: "Immediate registry and mutation (Khatauni/Dakhil Kharij) for complete peace of mind.",
        },
        {
          title: "Easy EMI",
          desc: "Flexible 12 to 36 months 100% interest-free payment plans available directly from developers.",
        },
        {
          title: "Prime Location",
          desc: "Premium developments placed directly near active expressways, smart corridors, and transit hubs.",
        },
        {
          title: "RERA Approved",
          desc: "Fully compliant with local government guidelines, transparent plotting layout, and physical boundaries.",
        }
      ],
      emi: {
        pBadge: "Live EMI Estimation",
        pTitle: "Planner: Custom Interest-Free EMI",
        pDesc: "Estimate your monthly budget. Choose physical size & flexible duration directly with zero hidden costs.",
        estimatedPrice: "Estimated Plot Price",
        lakhs: "Lakhs",
        downpayment: "Downpayment",
        min: "Minimum",
        max: "Max",
        tenure: "Payment Tenure (Interest-Free)",
        months: "Months",
        summaryTitle: "Estimated Summary Breakdown",
        immediateDownpayment: "Immediate Downpayment",
        principal: "Installment Principal",
        roi: "Rate of Interest",
        roiFree: "0% (Free of Cost)",
        monthlyPayment: "Your Monthly Payment",
        zeroInterestText: "For {duration} months with zero processing interest charges",
      },
    },
    projects: {
      badge: "Premium Townships",
      heading: "Our Featured Townships",
      pDesc: "Meticulously planned layouts designed for a modern lifestyle while preserving traditional community values. Fully compliant and possession-ready.",
      requestCab: "Request Site Consultation",
      ayodhyaTitle: "Ayodhya Heritage Greens",
      lucknowTitle: "Lucknow Smart Enclave",
      teaserAyodhya: "Near Ram Mandir Corridor | 1000 - 3500 Sq.Ft. Premium development with themed gardens and 24/7 security.",
      teaserLucknow: "Shaheed Path | 1200 - 2500 Sq.Ft. A modern oasis featuring smart infrastructure and family-focused amenities.",
      dimensions: "Plot Dimensions",
      pricing: "Value Range",
      detailsBtn: "Details",
      mapBtn: "Map Layout",
      specsBadge: "Verified Specifications",
      roadWidth: "Main Road Width",
      priceIndex: "Price Indexation",
      ayodhyaPricing: "Starting from ₹1,800 / Sq.Ft.",
      lucknowPricing: "Starting from ₹2,200 / Sq.Ft.",
      specRoadsAyodhya: "40 Feet Main road, 30 Feet Link roads",
      specRoadsLucknow: "45 Feet Decorative Main Gate Road",
      amenitiesTitle: "Modern Amenities Included",
      landmarksTitle: "Proximity & Key Distances",
      inquireTitle: "Inquire About",
      interactiveTitle: "Interactive Plotting Map Layout",
      interactiveDesc: "Tap a specific layout plot to view size dimension details, availability status and reserve instantly.",
      entranceGate: "🚧 MAIN ENTRANCE GATE & SECURITY COMPOUND (40FT ROAD)",
      availableLabel: "Available",
      soldLabel: "Sold",
      reservedLabel: "Reserved",
      parkLabel: "🌳 Vedic Park Corridor & Green belt layout",
      roadLabel: "30ft secondary access roads",
      indexAvailable: "Available for Registry",
      indexSold: "Already Registered (Sold)",
      indexReserved: "Under Inquiry (Reserved)",
      selPlotHead: "Selected Plot Details",
      legalClearance: "Legal Clearance",
      clearTitle: "Clear Title",
      statusLabel: "Status",
      inquirePlotBtn: "Inquire Plot",
      securePrice: "Secure price block layout instantly",
      selectPlotPrompt: "Select an active Plot",
      selectPlotDesc: "Tap any plot on the layout grid to inspect detailed possession info.",
      amenitiesListAyodhya: ["Gated Compound with Boundary", "Themed Vedic Gardens", "30ft & 40ft Tar Roads", "Dedicated Water Reservoir", "Underground Electricity Pipes"],
      amenitiesListLucknow: ["Kid's Playground Park", "Solar Powered Streetlights", "Grand Entrance Archway", "Rainwater Harvesting Pit", "24/7 Security CCTV surveillance"],
      landmarksAyodhya: ["Ram Mandir Entrance: 10 Mins", "National Highway 27: 3 Mins", "International Airport: 15 Mins"],
      landmarksLucknow: ["Shaheed Path Junction: 2 Mins", "Medanta Super Speciality: 8 Mins", "Phoenix Palassio Mall: 7 Mins"],
    },
    journey: {
      badge: "Seamless Legal Process",
      heading: "Ownership Journey",
      pDesc: "Standard offline registry is complex. We simplify it beautifully in 4 client-friendly phases.",
      tip: "Instant Registry: Complete Registry documents are drafted, printed, and signed physically at the Local Registrar's Office near our townships for 100% legal enforcement.",
      steps: [
        {
          title: "Site Visit",
          desc: "Schedule a free guided visit with our site coordinator in our dedicated secure luxury cabs to your selected layout location.",
          details: "🕒 Duration: 45 Mins | Weekend & weekday options with pickup & drop available.",
        },
        {
          title: "Token & Booking",
          desc: "Select your active preferred layout plot from our layout maps and book it with a min. nominal token amount of ₹21,000.",
          details: "📁 Document checklist: PAN CARD, Aadhar Card, and 2 passport photos.",
        },
        {
          title: "EMI / Payment Planner",
          desc: "Choose from our easy flexible interest-free monthly installment layouts that fits your physical household cash flow comfortably.",
          details: "💳 Support: Custom plans from 12 to 36 months directly with ShriJi Developers.",
        },
        {
          title: "Registry & Mutation",
          desc: "Upon final installment realization, fast track your legal transfer of ownership (immediate Registry & Dakhil Kharij guaranteed).",
          details: "⚖️ Complete legal assurance: Clear Title, Government Verified, RERA Approved.",
        }
      ],
    },
    contact: {
      badge: "Client Testimonials",
      heading: "Trusted by 5000+ Happy Indian Families",
      pDesc: "Read direct reviews of clear title real estate land investments from actual government officers, business professionals, and teachers.",
      testimonials: [
        {
          text: "Investing with Shriji Developers was the best decision for my children's future. The process was transparent, all land papers were government verified, and the staff guided us at every sub-registrar office registration step.",
          author: "Rajesh Kumar",
          role: "Govt. Officer, Owner at Heritage Greens Plot #108"
        },
        {
          text: "I was extremely worried about Registry fraud in Uttar Pradesh. ShriJi Developers provided the complete Registry documents and Dakhil Kharij papers online prior to booking. Truly transparent and professional developers.",
          author: "Sanjay Mishra",
          role: "Retired Professor, Owner at Lucknow Smart Enclave"
        },
        {
          text: "Very comfortable payment terms. The interest-free installment options helped me purchase active commercial plots on Shaheed Path without taking banking loans. Recommended family developers!",
          author: "Preeti Sharma",
          role: "Business Owner, Owner at Lucknow Smart Enclave"
        }
      ],
      cabVisits: "Cab Visits",
      cabVisitsDesc: "Free Pick & Drop on Saturdays & Sundays",
      specialists: "Specialists",
      specialistsDesc: "1-on-1 Legal Verification Officers",
      secureConnection: "Secure Connection",
      formTitle: "Request a Callback",
      formDesc: "Submit your active correct detail parameters. A Land Planning Specialist will call you directly with legal documentation papers.",
      labelName: "Full Name",
      placeholderName: "Enter your name",
      labelPhone: "Phone Number",
      placeholderPhone: "Enter 10-digit mobile number",
      labelProject: "Preferred Project Block",
      placeholderProject: "Select a Project",
      projectOpt1: "Ayodhya Heritage Greens (Near Ram Mandir Corridor)",
      projectOpt2: "Lucknow Smart Enclave (Shaheed Path)",
      projectOpt3: "General Commercial Layouts",
      errName: "Please enter your full name.",
      errPhone: "Please enter your active mobile number.",
      errPhoneDigits: "Please enter a valid 10-digit phone number.",
      errProject: "Please select your preferred project block.",
      submitBtn: "Submit Interest & Request Consultation",
      successTitle: "Interest Logged Successfully!",
      successTicket: "Ticket Ref ID",
      successDetailsName: "Client Name",
      successDetailsPhone: "Phone",
      successDetailsProject: "Requested Block",
      successDetailsStatus: "Land Specialist has been notified. Expected response within 2 hours.",
      closeBtn: "Close Ticket Window",
    },
    footer: {
      desc: "Registered Real Estate Developers specializing in Government-Verified residential and commercially-zoned express plot developments with clean titles and fast transfer.",
      clearanceRera: "100% RERA Registered Layouts",
      clearanceBoundary: "Clear Physical Boundary Walls",
      clearanceRegistry: "Certified Khatauni Title Deed",
      clearanceCabs: "Dedicated Site Cabs Verification",
      copyright: "ShriJi Developer. Govt. Verified & RERA Approved Layouts.",
      referenceDisclaimer: "All images, blueprints, landmarks shown are reference representations of actual developments and subject to mutual final registry contracts.",
    },
    brochure: {
      formTitle: "Get PDF Layout Brochure",
      formDesc: "Enter your parameters. The brochure contains clear plot configurations, pricing indexes, and exact legal RERA certifications.",
      labelName: "Your Name",
      placeholderName: "e.g. Sunil Dwivedi",
      labelPhone: "Active Mobile Number",
      placeholderPhone: "e.g. 9876543210",
      errName: "Please enter your name to register.",
      errPhone: "Please enter a valid 10-digit mobile number.",
      submitBtn: "Generate Portfolio Brochure",
      successMsg: "Authorizing Brochure Download...",
      progressBar: "Compiling Layout Maps",
      downloadSuccess: "Success! Your high quality file is executing. If the download did not start automatically, tap the button down below:",
      forceDownload: "Force Manual Download",
    },
    whatsapp: {
      title: "Plot Assistance Desk",
      status: "Offline registry officers • Online",
      typing: "Desk Officer typing...",
      placeholder: "Ask a plot specialist...",
      welcomeMsg: "नमस्ते! Welcome to ShriJi Developers Online Assist Desk. How can I guide you on your plot ownership journey today?",
      resRates: "Plots start at ₹1,800/Sq.Ft. in Ayodhya Heritage Greens, and ₹2,200/Sq.Ft. in Lucknow Smart Enclave. We offer interest-free EMIs up to 36 months directly with standard bookings!",
      resLocations: "Our featured townships are located strategically inside: \n1. Near Ram Mandir Corridor Corridor (Ayodhya)\n2. Shaheed Path Extension (Lucknow) near landmarks. Cab pickup visits are free!",
      resEmi: "Yes! We run direct flexible interest-free developer financing from 12 to 36 months duration with zero bank clearance hassle and minimum booking advance.",
      resRegistry: "Both townships are 100% RERA Registered and Government Approved. Copy of legal titles, Khatauni Dakhil Kharij certificates are provided directly prior to registry.",
      resWelcome: "Hello! Namaste. I can guide you regarding current plot pricing, layout sizes, RERA certificates, or direct EMI structures. What are you looking to buy today?",
    }
  },
  hi: {
    navbar: {
      projects: "टाउनशिप",
      emiPlans: "ईएमआई योजनाएं",
      process: "स्वामित्व प्रक्रिया",
      contact: "संपर्क करें",
      call: "कॉल करें",
      verifiedLayouts: "शासन द्वारा सत्यापित व रेरा स्वीकृत लेआउट",
      brand: "श्रीजी डेवलपर",
    },
    hero: {
      badge: "रेरा स्वीकृत और सरकार द्वारा सत्यापित स्थान",
      titlePart1: "अपने सपनों का प्लॉट",
      titlePart2: "अब आपके बजट में",
      description: "आधुनिक सुविधाओं, 100% कानूनी सुरक्षा और आसान भुगतान योजनाओं के साथ प्रीमियम आवासीय प्लॉट। उत्तर भारत के सबसे तेजी से विकसित हो रहे क्षेत्रों में आज ही अपने परिवार के भविष्य में सुरक्षित और ठोस निवेश करें।",
      exploreBtn: "प्रोजेक्ट्स देखें",
      brochureBtn: "विवरणिका डाउनलोड करें",
      legalRegistry: "100% वैध रजिस्ट्री",
      interestFree: "0% ब्याज ईएमआई",
      happyClients: "5000+ खुश ग्राहक",
      statRegistry: "रजिस्ट्री सुरक्षा",
      statEmi: "ब्याज मुक्त किस्त",
      statClients: "संतुष्ट परिवार",
    },
    trust: {
      badge: "डेवलपर साख विवरण",
      heading: "श्रीजी डेवलपर को क्यों चुनें?",
      description: "हम आधुनिक स्मार्ट कॉरिडोर में आपको सर्वश्रेष्ठ भूमि देने के लिए ठोस कानूनी सुरक्षा, स्पष्ट सीमांकन और पारदर्शी कीमतों के साथ पारंपरिक ग्राहक-प्रथम मूल्यों का एक अनूठा संगम प्रदान करते हैं।",
      badgeTitle: "केवल सुरक्षित एवं स्पष्ट निवेश",
      badgeDesc: "हम किसी भी प्रकार संदेहास्पद या असत्यापित भूमि का सौदा नहीं करते हैं।",
      cards: [
        {
          title: "100% रजिस्ट्री",
          desc: "पूर्ण मानसिक शांति के लिए तत्काल रजिस्ट्री और दाखिल-खारिज (खतौनी/दाखिल ख़ारिज) की त्वरित सुविधा।",
        },
        {
          title: "आसान ईएमआई",
          desc: "शून्य अतिरिक्त प्रभार के साथ डेवलपर द्वारा सीधे प्रदत्त 12 से 36 महीने की ब्याज-मुक्त समान किस्तें।",
        },
        {
          title: "सर्वश्रेष्ठ स्थान",
          desc: "सक्रिय एक्सप्रेसवे, सुगम हाईवे, स्मार्ट कॉरिडोर और आगामी ट्रांजिट हब के अत्यंत समीप विकसित टाउनशिप।",
        },
        {
          title: "रेरा स्वीकृत",
          desc: "स्थानीय विकास प्राधिकरणों व शासन के दिशा-निर्देशों के पूर्णतः अनुरूप, पारदर्शी नक्शा और पक्के पिलर।",
        }
      ],
      emi: {
        pBadge: "लाइव किस्त कैलकुलेटर",
        pTitle: "योजनाकार: अनुकूलित ब्याज-मुक्त समान किस्त",
        pDesc: "अपना मासिक बजट निर्धारित करें। बिना किसी अतिरिक्त या हिडन चार्जेस के सीधे प्लॉट का दाम व किस्त अवधि चुनें।",
        estimatedPrice: "अनुमानित प्लॉट का मूल्य",
        lakhs: "लाख",
        downpayment: "डाउनपेमेंट राशि",
        min: "न्यूनतम",
        max: "अधिकतम",
        tenure: "किस्त की समय अवधि (ब्याज मुक्त)",
        months: "महीने",
        summaryTitle: "अनुमानित लागत विवरण",
        immediateDownpayment: "तत्काल डाउनपेमेंट भुगतान",
        principal: "किस्त हेतु शेष मूल राशि",
        roi: "लागू ब्याज दर",
        roiFree: "0% (पूर्णतः ब्याज मुक्त)",
        monthlyPayment: "आपका मासिक किस्त मूल्य",
        zeroInterestText: "बिना किसी सर्विस चार्ज व ब्याज के पूरे {duration} महीनों के लिए समान भुगतान",
      },
    },
    projects: {
      badge: "प्रीमियम टाउनशिप योजनाएं",
      heading: "हमारी मुख्य टाउनशिप",
      pDesc: "पारंपरिक पारिवारिक मूल्यों और सुरक्षा को संजोए हुए आधुनिक जीवन शैली की जरूरतों के अनुसार योजनाबद्ध रूप से तैयार लेआउट। कब्जे के साथ तत्काल उपलब्ध।",
      requestCab: "निःशुल्क साइट विजिट गाड़ी बुक करें",
      ayodhyaTitle: "अयोध्या हेरिटेज ग्रीन्स",
      lucknowTitle: "लखनऊ स्मार्ट एन्क्लेव",
      teaserAyodhya: "राम मंदिर कॉरिडोर के निकट | 1000 - 3500 वर्ग फीट। सुंदर वैदिक वाटिका और 24 घंटे सुरक्षा के साथ उत्तम आवासीय टाउनशिप।",
      teaserLucknow: "शहीद पथ विस्तार | 1200 - 2500 वर्ग फीट। आधुनिक स्मार्ट इन्फ्रास्ट्रक्चर और परिवार अनुकूल पार्क से सुसज्जित स्वर्ग।",
      dimensions: "प्लॉट आकार",
      pricing: "मूल्य का दायरा",
      detailsBtn: "विस्तृत विवरण",
      mapBtn: "लेआउट नक्शा",
      specsBadge: "सत्यापित तकनीकी विनिर्देश",
      roadWidth: "मुख्य मार्ग की चौड़ाई",
      priceIndex: "मूल्य मानक",
      ayodhyaPricing: "₹1,800 / वर्ग फीट से शुरू",
      lucknowPricing: "₹2,200 / वर्ग फीट से शुरू",
      specRoadsAyodhya: "40 फीट मुख्य चौड़ा रास्ता, 30 फीट आंतरिक संपर्क सड़कें",
      specRoadsLucknow: "45 फीट भव्य द्वार चौड़ा रास्ता, 30 फीट आंतरिक सड़कें",
      amenitiesTitle: "शामिल आधुनिक नागरिक सुविधाएं",
      landmarksTitle: "नजदीकी दूरी और संपर्क मार्ग",
      inquireTitle: "के विषय में संपर्क करें",
      interactiveTitle: "इंटरैक्टिव प्लॉट मानचित्र",
      interactiveDesc: "प्लॉट का आकार, उपलब्धता की वास्तविक स्थिति और टोकन द्वारा बुकिंग हेतु नीचे दिए ग्रिड में किसी प्लॉट पर टैप करें।",
      entranceGate: "🚧 मुख्य प्रवेश द्वार और सुरक्षा पोस्ट (40 फीट मुख्य सड़क)",
      availableLabel: "उपलब्ध",
      soldLabel: "रजिस्ट्रीशुदा (Sold)",
      reservedLabel: "आरक्षित (Reserved)",
      parkLabel: "🌳 वैदिक पार्क और सुंदर हरित पट्टी बेल्ट",
      roadLabel: "30 फीट आंतरिक चौड़े संपर्क मार्ग",
      indexAvailable: "रजिस्ट्री के लिए उपलब्ध",
      indexSold: "पंजीकृत व आवंटित (Sold)",
      indexReserved: "पूछताछ व होल्ड पर (Reserved)",
      selPlotHead: "चयनित प्लॉट का पूरा विवरण",
      legalClearance: "कानूनी मंजूरी की स्थिति",
      clearTitle: "विवाद-मुक्त खतौनी हक",
      statusLabel: "प्लॉट की स्थिति",
      inquirePlotBtn: "इस प्लॉट हेतु पूछताछ करें",
      securePrice: "अपनी पसंद का प्लॉट तुरंत आरक्षित करें",
      selectPlotPrompt: "एक सक्रिय प्लॉट को चुनें",
      selectPlotDesc: "आबंटन स्थिति और क्षेत्रफल देखने के लिए लेआउट मानचित्र में किसी भी प्लॉट पर क्लिक करें।",
      amenitiesListAyodhya: ["चहारदीवारी युक्त सुरक्षित गेटेड टाउनशिप", "थीम आधारित वैदिक पार्क और वाटिका", "30 और 40 फीट चौड़ी डामर सड़कें", "स्वतंत्र जल संग्रहण जलाशय टंकी", "भूमिगत विद्युत प्रदाय केबल लाइन"],
      amenitiesListLucknow: ["बच्चों के खेलने हेतु खुला बहुउपयोगी पार्क", "सौर ऊर्जा संचालित ऑटो स्ट्रीट लाइट्स", "भव्य स्वागत प्रवेश द्वार मार्ग", "वर्षा जल संचयन हेतु सोख्ता गड्ढा", "24 घंटे सीसीटीवी और सुरक्षा गार्ड"],
      landmarksAyodhya: ["राम मंदिर परिसर द्वार: 10 मिनट", "राष्ट्रीय राजमार्ग 27: 3 मिनट", "अयोध्या अंतर्राष्ट्रीय हवाई अड्डा: 15 मिनट"],
      landmarksLucknow: ["शहीद पथ मुख्य चौराहा: 2 मिनट", "मेदांता अस्पताल: 8 मिनट", "फ़ीनिक्स पलासियो मॉल: 7 मिनट"],
    },
    journey: {
      badge: "सरल व कानूनी प्रक्रिया",
      heading: "स्वामित्व का सफर",
      pDesc: "उत्तर प्रदेश में प्लॉट की रजिस्ट्री अक्सर जटिल होती है। हम इसे आपके लिए 4 आसान चरणों में बेहद व्यावहारिक बनाते हैं।",
      tip: "तत्काल रजिस्ट्री: आपके पूर्ण वैधानिक अधिकार के लिए सभी दस्तावेज स्थानीय उप-निबंधक (Registrar) कार्यालय में आपके समक्ष सत्यापित और पंजीकृत किए जाते हैं।",
      steps: [
        {
          title: "साइट विजिट",
          desc: "हमारी तरफ से विशेष सुरक्षित लक्जरी गाड़ियों द्वारा अपने सपरिवार टाउनशिप स्थल के लिए निःशुल्क साइट विजिट का समय तय करें।",
          details: "🕒 अवधि: 45 मिनट | शनिवार और रविवार सहित पूरे सप्ताह सुगम पिक व ड्रॉप सेवा उपलब्ध।",
        },
        {
          title: "टोकन व बुकिंग",
          desc: "मानचित्र से अपने मनपसंद प्लॉट का चुनाव करें और मात्र ₹21,000 की न्यूनतम टोकन राशि देकर इसे आरक्षित करवाएं।",
          details: "📁 आवश्यक दस्तावेज: पैन कार्ड, आधार कार्ड और 2 रंगीन पासपोर्ट आकार के फोटो।",
        },
        {
          title: "किस्त भुगतान योजना",
          desc: "बिना किसी वित्तीय बोझ के, हमारे विशेष ब्याज-मुक्त मासिक किस्तों की योजना में से अपने अनुकूल विकल्प चुनें।",
          details: "💳 सुविधा: 12 से 36 महीने की आसान अवधि सीधे श्रीजी डेवलपर्स के साथ अनुबंधित करें।",
        },
        {
          title: "रजिस्ट्री और दाखिल-खारिज",
          desc: "अंतिम देय किस्त प्राप्त होने पर आपके नाम पर सरकारी रजिस्ट्री कराई जाएगी व खतौनी में नाम चढ़वाया जाएगा।",
          details: "⚖️ कानूनी शुद्धता: विवाद-मुक्त मालिकाना हक, शासन द्वारा मान्य एवं रेरा स्वीकृत लेआउट।",
        }
      ],
    },
    contact: {
      badge: "संतुष्ट ग्राहकों के अनुभव",
      heading: "5000+ खुशहाल भारतीय परिवारों का अटूट भरोसा",
      pDesc: "सेना के अधिकारियों, सेवानिवृत्त शिक्षकों और व्यापारियों आदि वास्तविक प्लॉट मालिकों के सत्य एवं पारदर्शी अनुभव पढ़ें।",
      testimonials: [
        {
          text: "श्रीजी डेवलपर्स के साथ निवेश करना मेरे बच्चों के उज्जवल भविष्य के लिए लिया गया सर्वश्रेष्ठ निर्णय था। सारी प्रक्रिया शीशे की तरह साफ थी, सरकारी दस्तावेज पूर्ण थे और कर्मचारियों ने रजिस्ट्री कार्यालय में खुद साथ रहकर काम कराया।",
          author: "राजेश कुमार",
          role: "शासकीय अधिकारी, हेरिटेज ग्रीन्स प्लॉट #108 के स्वामी"
        },
        {
          text: "मुझे पहले जमीन खरीद और धोखाधड़ी का बहुत डर था। पर श्रीजी की टीम ने बुकिंग से पूर्व ही सारे सत्यापित स्वामित्व दस्तावेज़ और खतौनी हमें ऑनलाइन उपलब्ध करा दी। बेहद ईमानदार और पेशेवर लोग हैं।",
          author: "संजय मिश्रा",
          role: "सेवानिवृत्त प्रोफेसर, लखनऊ स्मार्ट एन्क्लेव के स्वामी"
        },
        {
          text: "बहुत ही आरामदायक भुगतान विकल्प हैं। बिना बैंक लोन के ब्याज-मुक्त किस्तों की अनूठी योजना ने मुझे शहीद पथ पर व्यावसायिक उपयोग के लिए प्लॉट खरीदने में बड़ी मदद दी। उत्तर प्रदेश के सबसे भरोसेमंद डेवलपर!",
          author: "प्रीति शर्मा",
          role: "महिला उद्यमी, लखनऊ स्मार्ट एन्क्लेव की स्वामी"
        }
      ],
      cabVisits: "साइट विजिट सेवा",
      cabVisitsDesc: "प्रत्येक शनिवार और रविवार को सपरिवार निःशुल्क पिक और ड्रॉप",
      specialists: "विशेषज्ञ परामर्श",
      specialistsDesc: "1-on-1 दस्तावेज़ जांच परामर्श हेतु समर्पित अफसर",
      secureConnection: "सुरक्षित प्रमाणीकरण",
      formTitle: "कॉल बैक करने की प्रार्थना",
      formDesc: "कृपया अपना सही फोन नंबर व विवरण नीचे प्रविष्ट करें। हमारे भूमि नियोजन विशेषज्ञ शीघ्र ही सरकारी दस्तावेजों के साथ आपसे संपर्क करेंगे।",
      labelName: "आपका पूरा नाम",
      placeholderName: "अपना नाम दर्ज करें",
      labelPhone: "सक्रिय मोबाइल नंबर",
      placeholderPhone: "10- अंकों का मोबाइल नंबर प्रविष्ट करें",
      labelProject: "आपकी पसंदीदा टाउनशिप योजना",
      placeholderProject: "एक टाउनशिप योजना चुनें",
      projectOpt1: "अयोध्या हेरिटेज ग्रीन्स (राम मंदिर मुख्य कॉरिडोर के निकट)",
      projectOpt2: "लखनऊ स्मार्ट एन्क्लेव (शहीद पथ विस्तार)",
      projectOpt3: "सामान्य व्यावसायिक व हाईवे प्लॉट योजनाएं",
      errName: "कृपया अपना पूरा नाम दर्ज करें।",
      errPhone: "कृपया अपना मोबाइल नंबर दर्ज करें।",
      errPhoneDigits: "कृपया एक वैध 10-अंकों का मोबाइल नंबर प्रविष्ट करें।",
      errProject: "कृपया एक पसंदीदा टाउनशिप योजना का चयन करें।",
      submitBtn: "मासिक संपर्क व परामर्श हेतु अनुरोध भेजें",
      successTitle: "अनुरोध सफलतापूर्वक दर्ज किया गया!",
      successTicket: "टिकट संख्या (Reference ID)",
      successDetailsName: "आवेदक का नाम",
      successDetailsPhone: "मोबाइल नंबर",
      successDetailsProject: "चयनित टाउनशिप",
      successDetailsStatus: "भूमि सलाहकार को संज्ञान दे दिया गया है। आगामी 2 घंटे के भीतर आपसे संपर्क किया जाएगा।",
      closeBtn: "टिकट विंडो बंद करें",
    },
    footer: {
      desc: "शासन द्वारा सत्यापित, विवाद-मुक्त व तत्काल कब्जा योग आवासीय और व्यावसायिक प्लाटिंग योजनाओं के विकास में अग्रणी एवं प्रतिष्ठित सरकारी पंजीकृत रियल एस्टेट डेवलपर।",
      clearanceRera: "100% रेरा पंजीकृत पारदर्शी लेआउट",
      clearanceBoundary: "नक्शानुसार पक्के पिलर व बाउंड्री",
      clearanceRegistry: "सत्यापित मालिकाना खतौनी प्रति",
      clearanceCabs: "निःशुल्क सपरिवार साइट अवलोकन",
      copyright: "श्रीजी डेवलपर। शासन द्वारा सत्यापित एवं रेरा स्वीकृत लेआउट योजनाएं।",
      referenceDisclaimer: "दर्शन कराए गए सभी थ्री-डी चित्र, लैंडमार्क दूरियां केवल निरूपण मात्र हैं और यह अंतिम वैध विक्रय अनुबंधों व रजिस्ट्री शर्तो के अधीन होंगे।",
    },
    brochure: {
      formTitle: "पीडीएफ लेआउट बुकलेट प्राप्त करें",
      formDesc: "अपना विवरण साझा करें। इस विवरणिका में आपको सभी प्लाटों के आकार, मूल्य सूचकांक और रेरा पंजीकरण की ठोस प्रतियां मिलेंगी।",
      labelName: "आपका नाम",
      placeholderName: "जैसे: सुनील द्विवेदी",
      labelPhone: "सक्रिय मोबाइल नंबर",
      placeholderPhone: "जैसे: 9876543210",
      errName: "विवरणिका पंजीकरण हेतु कृपया नाम दर्ज करें।",
      errPhone: "कृपया एक वैध 10-अंकों का मोबाइल नंबर दर्ज करें।",
      submitBtn: "परियोजना विवरणिका तैयार करें",
      successMsg: "दस्तावेज डाउनलोड अधिकृत किया जा रहा है...",
      progressBar: "मानचित्र और लेआउट समायोजित हो रहे हैं",
      downloadSuccess: "बधाई हो! आपकी उच्च गुणवत्ता वाली फाइल सहेज ली गई है। यदि डाउनलोड स्वतः आरंभ नहीं हुआ तो नीचे क्लिक करें:",
      forceDownload: "विवरणिका स्वतः डाउनलोड करने हेतु बल दें",
    },
    whatsapp: {
      title: "प्लॉट पूछताछ सहायता पटल",
      status: "ऑफलाइन रजिस्ट्री सलाहकार • ऑनलाइन उपलब्ध",
      typing: "सपोर्ट अधिकारी टाइप कर रहे हैं...",
      placeholder: "अपने सवाल पूछें...",
      welcomeMsg: "नमस्ते! श्रीजी डेवलपर्स ऑनलाइन पूछताछ सहायता पटल पर आपका स्वागत है। आज मैं आपको प्लॉट चयन या किस्त योजना के बारे में क्या जानकारी प्रदान करूँ?",
      resRates: "प्लॉट के रेट अयोध्या हेरिटेज ग्रीन्स में ₹1,800/वर्ग फीट और लखनऊ स्मार्ट एन्क्लेव में ₹2,200/वर्ग फीट से शुरू हैं। बिना किसी बैंक लोन के आपको 36 महीने की ब्याज-मुक्त आसान किस्तें मिल सकती हैं!",
      resLocations: "हमारी योजनाएं इन स्थानों पर हैं:\n1. राम मंदिर कॉरिडोर के पास (अयोध्या)\n2. शहीद पथ विस्तार (लखनऊ)\nहमारी गाड़ियों द्वारा सपरिवार साइट विजिट बिल्कुल मुफ्त है!",
      resEmi: "जी हाँ! हम सीधे श्रीजी डेवलपर्स के माध्यम से बिना किसी बैंक चक्कर के 12 से 36 महीने की न्यूनतम अग्रिम बुकिंग राशि पर ब्याज-मुक्त किस्तें प्रदान करते हैं।",
      resRegistry: "दोनों टाउनशिप 100% रेरा और यूपी सरकार से मान्यता प्राप्त हैं। बुकिंग के पूर्व आपको सभी कानूनी दस्तावेज, खतौनी और रजिस्ट्री की प्रति आपके अवलोकन हेतु मिलेगी।",
      resWelcome: "नमस्ते। मैं आपको हमारे प्लॉट की कीमतों, उपलब्ध आकार, रेरा पंजीकरण सरकारी दस्तावेजों और किस्त संरचना के बारे में पूरी जानकारी दे सकता हूँ। आप किस स्थान हेतु प्लॉट देख रहे हैं?",
    }
  }
};
