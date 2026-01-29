import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ro', label: 'RO', name: 'Română' },
  { code: 'ar', label: 'AR', name: 'العربية' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const navigate = useNavigate();

  // Update local state when i18n language changes
  useEffect(() => {
    setCurrentLang(i18n.language);
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const toggleLanguage = (langCode: string) => {
    navigate(`/${langCode}`);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:border-primary/50 hover:bg-black/60 transition-all duration-300 group"
        >
          <Globe className="w-4 h-4 text-white/70 group-hover:text-primary transition-colors" />
          <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors uppercase">
            {currentLang.split('-')[0]}
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-32 py-2 rounded-xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => toggleLanguage(lang.code)}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between ${currentLang === lang.code
                    ? 'text-primary bg-primary/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <span className="font-medium">{lang.label}</span>
                  <span className="text-xs opacity-50">{lang.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
