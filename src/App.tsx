import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UeberMich from "./pages/UeberMich";
import Kontakt from "./pages/Kontakt";
import ProjektHomeServer from "./pages/ProjektHomeServer";
import ProjektHomeAssistant from "./pages/ProjektHomeAssistant";
import ProjektWebServer from "./pages/ProjektWebServer";
import ProjektWebHosting from "./pages/ProjektWebHosting";
import ProjektSwitchingVlanEintichten from "./pages/ProjektSwitchingVlanEintichten";
import Projekte from "./pages/Projekte";
import LinuxProjekte from "./pages/LinuxProjekte";
import ProjektLinuxUserManagement from "./pages/ProjektLinuxUserManagement";
import ProjektLinuxBashScripting from "./pages/ProjektLinuxBashScripting";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    document.title = "Gökhan Zehirlioglu — Portfolio";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ueber-mich" element={<UeberMich />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/projekt/home-server" element={<ProjektHomeServer />} />
              <Route path="/projekt/home-assistant" element={<ProjektHomeAssistant />} />
              <Route path="/projekt/web-server" element={<ProjektWebServer />} />
              <Route path="/projekt/web-hosting" element={<ProjektWebHosting />} />
              <Route path="/projekt/switching-vlan-einrichten" element={<ProjektSwitchingVlanEintichten />} />
              <Route path="/projekt/linux/user-management-lab" element={<ProjektLinuxUserManagement />} />
              <Route path="/projekt/linux/bash-scripting-lab" element={<ProjektLinuxBashScripting />} />
              <Route path="/linux-projekte" element={<LinuxProjekte />} />
              <Route path="/projekte" element={<Projekte />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
