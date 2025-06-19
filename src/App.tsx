import { Toaster } from "./shared/ui/toaster";
import { Toaster as Sonner } from "./shared/ui/sonner";
import { TooltipProvider } from "./shared/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import LandingPageA from "./pages/LandingPageA";
import LandingPageB from "./pages/LandingPageB";
import LandingPageC from "./pages/LandingPageC";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ 
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}>
        <Routes>
          <Route path="/" element={<Navigate to="/a" replace />} />
          <Route path="/a" element={<LandingPageA />} />
          <Route path="/b" element={<LandingPageB />} />
          <Route path="/c" element={<LandingPageC />} />
          {/* Keep the original Index route for reference */}
          <Route path="/original" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
