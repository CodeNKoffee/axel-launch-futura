import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Redirect root to default language
const RootRedirect = () => {
  const { i18n } = useTranslation();
  return <Navigate to={`/${i18n.language}`} replace />;
};

// Layout that validates/syncs language from URL
const LanguageLayout = ({ children }: { children: React.ReactNode }) => {
  const { lng } = useParams<{ lng: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // If language is valid and different from current i18n, update i18n
    if (lng && ['en', 'ro', 'ar'].includes(lng) && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
    // If language is invalid, redirect to 404 or default
    else if (lng && !['en', 'ro', 'ar'].includes(lng)) {
      // Optional: Redirect to 404 or fallback
      // For now, let's allow it to render (might show 404 from router if configured specific key)
      // But since we are wrapping, we should probably handle it or let child handle it.
      // Actually, simpler: if not valid, replace with current valid language.
      navigate(`/${i18n.language}`, { replace: true });
    }
  }, [lng, i18n, navigate]);

  return (
    <>
      <LanguageSwitcher />
      {children}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/:lng" element={<LanguageLayout><ComingSoon /></LanguageLayout>} />
          {/* Handle specific sub-routes if added later, e.g. /:lng/about */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
