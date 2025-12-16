import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UeberMich from "./pages/UeberMich";
import Kontakt from "./pages/Kontakt";
import ProjektHomeAssistant from "./pages/ProjektHomeAssistant";
import ProjektWebServer from "./pages/ProjektWebServer";
import ProjektWebHosting from "./pages/ProjektWebHosting";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ueber-mich" element={<UeberMich />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/projekt/home-assistant" element={<ProjektHomeAssistant />} />
          <Route path="/projekt/web-server" element={<ProjektWebServer />} />
          <Route path="/projekt/web-hosting" element={<ProjektWebHosting />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
