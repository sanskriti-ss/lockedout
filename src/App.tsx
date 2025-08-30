import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import IntenseStudy from "./components/IntenseStudy";
import CasualStudy from "./components/CasualStudy";
import CasualBrowsing from "./components/CasualBrowsing";
import Meditation from "./components/Meditation";
import Puzzles from "./components/Puzzles";
import NotFound from "./pages/NotFound";
import ContentFilterConfig from "./pages/ContentFilterConfig";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const queryClient = new QueryClient();

function CallbackHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      
      if (accessToken) {
        localStorage.setItem('spotify_access_token', accessToken);
        navigate('/'); // Redirect back to main page
      }
    }
  }, [navigate]);

  return <div>Authenticating with Spotify...</div>;
}


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intense-study" element={<IntenseStudy />} />
          <Route path="/casual-study" element={<CasualStudy />} />
          <Route path="/casual-browsing" element={<CasualBrowsing />} />
          <Route path="/casual-browsing/content-filter" element={<ContentFilterConfig />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/puzzles" element={<Puzzles />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
