import React, { createContext, useContext, useState } from 'react';
import { LanguageCode } from '../types';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    brandName: 'TheDesi.news',
    tagline: 'Portugal Desi News, Immigration & Community Platform',
    home: 'Home',
    news: 'News',
    immigration: 'Immigration & AIMA',
    helpCentre: 'Help Centre',
    directory: 'Resource Directory',
    events: 'Events & Workshops',
    community: 'Community',
    theDesiAI: 'TheDesi AI',
    dashboard: 'My Dashboard',
    login: 'Log In',
    join: 'Join Platform',
    helpBannerTitle: 'I am an immigrant in Portugal and I need help.',
    helpBannerSubtitle: 'How can TheDesi.news help you within 30 seconds?',
    searchPlaceholder: 'What do you need help with in Portugal? (e.g. NIF, NISS, AIMA, SNS, Legal)',
    summary60Badge: '60-Word Summary',
    officialSource: 'Official Source',
    verified: 'Verified',
    bookHelp: 'Book Help Appointment',
    savedNews: 'Saved News',
    savedResources: 'Saved Resources',
    cmsPortal: 'CMS & Admin Panel',
  },
  pt: {
    brandName: 'TheDesi.news',
    tagline: 'Plataforma de Notícias e Apoio à Comunidade Desi em Portugal',
    home: 'Início',
    news: 'Notícias',
    immigration: 'Imigração e AIMA',
    helpCentre: 'Centro de Ajuda',
    directory: 'Diretório de Recursos',
    events: 'Eventos e Formação',
    community: 'Comunidade',
    theDesiAI: 'TheDesi AI',
    dashboard: 'Meu Painel',
    login: 'Entrar',
    join: 'Registar',
    helpBannerTitle: 'Sou imigrante em Portugal e preciso de ajuda.',
    helpBannerSubtitle: 'Como pode TheDesi.news ajudar em 30 segundos?',
    searchPlaceholder: 'Com o que precisa de ajuda em Portugal? (ex: NIF, NISS, AIMA, SNS, Apoio Jurídico)',
    summary60Badge: 'Resumo em 60 Palavras',
    officialSource: 'Fonte Oficial',
    verified: 'Verificado',
    bookHelp: 'Agendar Apoio',
    savedNews: 'Notícias Guardadas',
    savedResources: 'Recursos Guardados',
    cmsPortal: 'Painel CMS e Gestão',
  },
  bn: {
    brandName: 'TheDesi.news',
    tagline: 'পর্তুগাল দেশি সংবাদ, ইমিগ্রেশন ও সাহায্য প্ল্যাটফর্ম',
    home: 'হোম',
    news: 'সংবাদ',
    immigration: 'ইমিগ্রেশন ও AIMA',
    helpCentre: 'হেল্প সেন্টার',
    directory: 'রিসোর্স ডিরেক্টরি',
    events: 'ইভেন্ট ও ওয়ার্কশপ',
    community: 'কমিউনিটি',
    theDesiAI: 'দিদেশি AI',
    dashboard: 'মাই ড্যাশবোর্ড',
    login: 'লগ ইন',
    join: 'রেজিস্ট্রেশন করুন',
    helpBannerTitle: 'আমি পর্তুগালে একজন অভিবাসী এবং আমার সাহায্য প্রয়োজন।',
    helpBannerSubtitle: 'TheDesi.news ৩০ সেকেন্ডের মধ্যে আপনাকে কীভাবে সাহায্য করতে পারে?',
    searchPlaceholder: 'পর্তুগালে আপনার কী সাহায্য দরকার? (যেমন NIF, NISS, AIMA, SNS, আইনি সহায়তা)',
    summary60Badge: '৬০ শব্দে সারসংক্ষেপ',
    officialSource: 'অফিসিয়াল সোর্স',
    verified: 'যাচাইকৃত',
    bookHelp: 'সাহায্যের জন্য অ্যাপয়েন্টমেন্ট নিন',
    savedNews: 'সংরক্ষিত সংবাদ',
    savedResources: 'সংরক্ষিত রিসোর্স',
    cmsPortal: 'সিএমএস অ্যাডমিন প্যানেল',
  },
  hi: {
    brandName: 'TheDesi.news',
    tagline: 'पुर्तगाल देसी समाचार, इमिग्रेशन और समुदाय सहायता मंच',
    home: 'होम',
    news: 'समाचार',
    immigration: 'इमिग्रेशन और AIMA',
    helpCentre: 'सहायता केंद्र',
    directory: 'संसाधन डायरेक्टरी',
    events: 'कार्यक्रम और वर्कशॉप',
    community: 'कम्युनिटी',
    theDesiAI: 'द देसी AI',
    dashboard: 'मेरा डैशबोर्ड',
    login: 'लॉगिन',
    join: 'रजिस्टर करें',
    helpBannerTitle: 'मैं पुर्तगाल में एक अप्रवासी हूँ और मुझे मदद चाहिए।',
    helpBannerSubtitle: 'TheDesi.news 30 सेकंड में आपकी सहायता कैसे कर सकता है?',
    searchPlaceholder: 'आपको पुर्तगाल में क्या मदद चाहिए? (जैसे NIF, NISS, AIMA, SNS, कानूनी सहायता)',
    summary60Badge: '60 शब्दों में सारांश',
    officialSource: 'आधिकारिक स्रोत',
    verified: 'सत्यापित',
    bookHelp: 'मदद के लिए अपॉइंटमेंट लें',
    savedNews: 'सहेजे गए समाचार',
    savedResources: 'सहेजे गए संसाधन',
    cmsPortal: 'सीएमएस एडमिन पैनल',
  },
  ur: {
    brandName: 'TheDesi.news',
    tagline: 'پرتگال دیسی نیوز، امیگریشن اور کمیونٹی ہیلپ پلیٹ فارم',
    home: 'ہوم',
    news: 'خبریں',
    immigration: 'امیگریشن اور AIMA',
    helpCentre: 'ہیلپ سینٹر',
    directory: 'وسائل کی ڈائریکٹری',
    events: 'ورکشاپس اور تقریبات',
    community: 'کمیونٹی',
    theDesiAI: 'دی دیسی AI',
    dashboard: 'میرا ڈیش بورڈ',
    login: 'لاگ ان',
    join: 'رجسٹر ہوں',
    helpBannerTitle: 'میں پرتگال میں ایک تارکین وطن ہوں اور مجھے مدد کی ضرورت ہے۔',
    helpBannerSubtitle: 'TheDesi.news 30 سیکنڈ میں آپ کی مدد کیسے کر سکتا ہے؟',
    searchPlaceholder: 'آپ کو پرتگال میں کس چیز میں مدد چاہیے؟ (مثلاً NIF, NISS, AIMA, SNS, قانونی مدد)',
    summary60Badge: '60 الفاظ میں خلاصہ',
    officialSource: 'سرکاری ذریعہ',
    verified: 'تصدیق شدہ',
    bookHelp: 'مدد کے لیے اپائنٹمنٹ بک کریں',
    savedNews: 'محفوظ شدہ خبریں',
    savedResources: 'محفوظ شدہ وسائل',
    cmsPortal: 'سی ایم ایس ایڈمن پینل',
  },
  ar: {
    brandName: 'TheDesi.news',
    tagline: 'منصة الأخبار والهجرة ودعم مجتمع المهاجرين في البرتغال',
    home: 'الرئيسية',
    news: 'الأخبار',
    immigration: 'الهجرة و AIMA',
    helpCentre: 'مركز المساعدة',
    directory: 'دليل الموارد',
    events: 'الفعاليات والورش',
    community: 'المجتمع',
    theDesiAI: 'ذا ديسي AI',
    dashboard: 'لوحتي',
    login: 'تسجيل الدخول',
    join: 'الانضمام',
    helpBannerTitle: 'أنا مهاجر في البرتغال وأحتاج إلى مساعدة.',
    helpBannerSubtitle: 'كيف يمكن لـ TheDesi.news مساعدتك خلال 30 ثانية؟',
    searchPlaceholder: 'ما الذي تحتاج المساعدة فيه في البرتغال؟ (مثل NIF, NISS, AIMA, SNS, الدعم القانوني)',
    summary60Badge: 'ملخص في 60 كلمة',
    officialSource: 'مصدر رسمي',
    verified: 'موثق',
    bookHelp: 'حجز موعد مساعدة',
    savedNews: 'الأخبار المحفوظة',
    savedResources: 'الموارد المحفوظة',
    cmsPortal: 'لوحة التحكم CMS',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
