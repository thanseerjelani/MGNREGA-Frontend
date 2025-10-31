export const translations = {
  en: {
    appTitle: 'Our Voice, Our Rights',
    appSubtitle: 'MGNREGA Performance Dashboard',
    selectState: 'Select State',
    selectDistrict: 'Select District',
    detectLocation: 'Detect My Location',
    loading: 'Loading...',
    noData: 'No data available',
    error: 'Something went wrong',
    offline: 'You are offline. Showing cached data.',
    
    // Performance metrics
    households: 'Households Employed',
    averageDays: 'Average Days Worked',
    wages: 'Wages Disbursed',
    ongoingProjects: 'Ongoing Projects',
    completedProjects: 'Completed Works',
    totalExpenditure: 'Total Expenditure',
    wageRate: 'Average Wage Rate',
    
    // Trends
    comparison: 'Monthly Comparison',
    current: 'Current Month',
    previous: 'Previous Month',
    change: 'Change',
    increased: 'Increased',
    decreased: 'Decreased',
    stable: 'Stable',
    
    // Performance levels
    aboveAverage: 'Excellent Performance',
    moderate: 'Good Performance',
    belowAverage: 'Needs Improvement',
    
    // Last updated
    lastUpdated: 'Last Updated',
    month: 'Month',
    year: 'Financial Year',
  },
  
  hi: {
    appTitle: 'हमारी आवाज़, हमारे अधिकार',
    appSubtitle: 'मनरेगा प्रदर्शन डैशबोर्ड',
    selectState: 'राज्य चुनें',
    selectDistrict: 'जिला चुनें',
    detectLocation: 'मेरा स्थान खोजें',
    loading: 'लोड हो रहा है...',
    noData: 'कोई डेटा उपलब्ध नहीं है',
    error: 'कुछ गलत हो गया',
    offline: 'आप ऑफ़लाइन हैं। संग्रहीत डेटा दिखाया जा रहा है।',
    
    // Performance metrics
    households: 'रोजगार प्राप्त परिवार',
    averageDays: 'औसत कार्य दिवस',
    wages: 'वितरित मजदूरी',
    ongoingProjects: 'चल रहे कार्य',
    completedProjects: 'पूर्ण कार्य',
    totalExpenditure: 'कुल व्यय',
    wageRate: 'औसत मजदूरी दर',
    
    // Trends
    comparison: 'मासिक तुलना',
    current: 'वर्तमान माह',
    previous: 'पिछला माह',
    change: 'परिवर्तन',
    increased: 'बढ़ा',
    decreased: 'घटा',
    stable: 'स्थिर',
    
    // Performance levels
    aboveAverage: 'उत्कृष्ट प्रदर्शन',
    moderate: 'अच्छा प्रदर्शन',
    belowAverage: 'सुधार की आवश्यकता',
    
    // Last updated
    lastUpdated: 'अंतिम अपडेट',
    month: 'महीना',
    year: 'वित्तीय वर्ष',
  },
};

export const useTranslation = (lang: 'en' | 'hi') => {
  return translations[lang];
};