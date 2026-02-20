import { lazy, Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const UeberMich = lazy(() => import("./pages/UeberMich"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const ProjektHomeServer = lazy(() => import("./pages/ProjektHomeServer"));
const ProjektHomeAssistant = lazy(() => import("./pages/ProjektHomeAssistant"));
const ProjektWebServer = lazy(() => import("./pages/ProjektWebServer"));
const ProjektWebHosting = lazy(() => import("./pages/ProjektWebHosting"));

const Projekte = lazy(() => import("./pages/Projekte"));
const LinuxProjekte = lazy(() => import("./pages/LinuxProjekte"));
const ProjektLinuxUserManagement = lazy(() => import("./pages/ProjektLinuxUserManagement"));
const ProjektLinuxBashScripting = lazy(() => import("./pages/ProjektLinuxBashScripting"));
const ProjektLinuxLabC = lazy(() => import("./pages/ProjektLinuxLabC"));
const ProjektLinuxLabD = lazy(() => import("./pages/ProjektLinuxLabD"));
const CiscoProjekte = lazy(() => import("./pages/CiscoProjekte"));
const ProjektCiscoLab162 = lazy(() => import("./pages/ProjektCiscoLab162"));
const Lab361VlansUndTrunking = lazy(() => import("./pages/Lab361VlansUndTrunking"));
const ProjektOpenVPN = lazy(() => import("./pages/ProjektOpenVPN"));
const ProjektSSDUpgrade = lazy(() => import("./pages/ProjektSSDUpgrade"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm">Laden...</p>
    </div>
  </div>
);

const App = () => {
  useEffect(() => {
    document.title = "Gökhan Zehirlioglu — Portfolio";
  }, []);

  return (
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ueber-mich" element={<UeberMich />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/projekt/home-server" element={<ProjektHomeServer />} />
              <Route path="/projekt/home-assistant" element={<ProjektHomeAssistant />} />
              <Route path="/projekt/web-server" element={<ProjektWebServer />} />
              <Route path="/projekt/web-hosting" element={<ProjektWebHosting />} />

              <Route path="/projekt/linux/user-management-lab" element={<ProjektLinuxUserManagement />} />
              <Route path="/projekt/linux/bash-scripting-lab" element={<ProjektLinuxBashScripting />} />
              <Route path="/projekt/linux/lab-c" element={<ProjektLinuxLabC />} />
              <Route path="/projekt/linux/lab-d" element={<ProjektLinuxLabD />} />
              <Route path="/linux-projekte" element={<LinuxProjekte />} />
              <Route path="/projekte" element={<Projekte />} />
              <Route path="/cisco-projekte" element={<CiscoProjekte />} />
              <Route path="/projekt/cisco/lab-1-6-2" element={<ProjektCiscoLab162 />} />
              <Route path="/projekt/cisco/lab-3-6-1" element={<Lab361VlansUndTrunking />} />
              <Route path="/projekt/openvpn-gateway" element={<ProjektOpenVPN />} />
              <Route path="/projekt/ssd-upgrade" element={<ProjektSSDUpgrade />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  );
};

export default App;
