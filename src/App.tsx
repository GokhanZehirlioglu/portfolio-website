import { lazy, Suspense } from "react";
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
const WindowsProjekte = lazy(() => import("./pages/WindowsProjekte"));
const ProjektWin10Upgrade = lazy(() => import("./pages/ProjektWin10Upgrade"));
const ProjektGoldenImage = lazy(() => import("./pages/ProjektGoldenImage"));
const ProjektDeployment = lazy(() => import("./pages/ProjektDeployment"));
const ProjektADSetup = lazy(() => import("./pages/ProjektADSetup"));
const ProjektUSMTMigration = lazy(() => import("./pages/ProjektUSMTMigration"));
const ProjektWindowsNetzwerk = lazy(() => import("./pages/ProjektWindowsNetzwerk"));
const ProjektRBACGPO = lazy(() => import("./pages/ProjektRBACGPO"));
const ProjektClientHardening = lazy(() => import("./pages/ProjektClientHardening"));
const Projekt09 = lazy(() => import("./pages/Projekt09"));
const ProjektModul3Intro = lazy(() => import("./pages/ProjektModul3Intro"));
const ProjektModul3Part1 = lazy(() => import("./pages/ProjektModul3Part1"));
const ProjektModul3Part2 = lazy(() => import("./pages/ProjektModul3Part2"));
const ProjektModul3Part3 = lazy(() => import("./pages/ProjektModul3Part3"));
const ProjektModul3Part4 = lazy(() => import("./pages/ProjektModul3Part4"));
const ProjektModul3Part5 = lazy(() => import("./pages/ProjektModul3Part5"));
const ProjektModul4Intro = lazy(() => import("./pages/ProjektModul4Intro"));
const ProjektModul4Part1 = lazy(() => import("./pages/ProjektModul4Part1"));
const ProjektModul4Part2 = lazy(() => import("./pages/ProjektModul4Part2"));
const ProjektModul4Part3 = lazy(() => import("./pages/ProjektModul4Part3"));
const ProjektModul4Part4 = lazy(() => import("./pages/ProjektModul4Part4"));
const ProjektModul4Part5 = lazy(() => import("./pages/ProjektModul4Part5"));
const ProjektOPNsenseIntro = lazy(() => import("./pages/ProjektOPNsenseIntro"));
const ProjektOPNsensePart1 = lazy(() => import("./pages/ProjektOPNsensePart1"));
const ProjektOPNsensePart2 = lazy(() => import("./pages/ProjektOPNsensePart2"));
const ProjektOPNsensePart3 = lazy(() => import("./pages/ProjektOPNsensePart3"));
const ProjektOPNsensePart4 = lazy(() => import("./pages/ProjektOPNsensePart4"));
const ProjektOPNsensePart5 = lazy(() => import("./pages/ProjektOPNsensePart5"));
const ProjektOPNsensePart6 = lazy(() => import("./pages/ProjektOPNsensePart6"));
const ProjektModul5Part1 = lazy(() => import("./pages/ProjektModul5Part1"));
const ProjektModul5Part2 = lazy(() => import("./pages/ProjektModul5Part2"));
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
              <Route path="/windows-projekte" element={<WindowsProjekte />} />
              <Route path="/projekt/windows/win10-upgrade" element={<ProjektWin10Upgrade />} />
              <Route path="/projekt/windows/golden-image" element={<ProjektGoldenImage />} />
              <Route path="/projekt/windows/deployment" element={<ProjektDeployment />} />
              <Route path="/projekt/windows/ad-setup" element={<ProjektADSetup />} />
              <Route path="/projekt/windows/usmt-migration" element={<ProjektUSMTMigration />} />
              <Route path="/projekt/windows/netzwerk-infrastruktur" element={<ProjektWindowsNetzwerk />} />
              <Route path="/projekt/windows/rbac-gpo" element={<ProjektRBACGPO />} />
              <Route path="/projekt/windows/client-hardening" element={<ProjektClientHardening />} />
              <Route path="/projekt/windows/storage-management" element={<Projekt09 />} />
              <Route path="/projekt/windows/modul-3" element={<ProjektModul3Intro />} />
              <Route path="/projekt/windows/modul-3/part-1" element={<ProjektModul3Part1 />} />
              <Route path="/projekt/windows/modul-3/part-2" element={<ProjektModul3Part2 />} />
              <Route path="/projekt/windows/modul-3/part-3" element={<ProjektModul3Part3 />} />
              <Route path="/projekt/windows/modul-3/part-4" element={<ProjektModul3Part4 />} />
              <Route path="/projekt/windows/modul-3/part-5" element={<ProjektModul3Part5 />} />
              <Route path="/projekt/windows/modul-4" element={<ProjektModul4Intro />} />
              <Route path="/projekt/windows/modul-4/part-1" element={<ProjektModul4Part1 />} />
              <Route path="/projekt/windows/modul-4/part-2" element={<ProjektModul4Part2 />} />
              <Route path="/projekt/windows/modul-4/part-3" element={<ProjektModul4Part3 />} />
              <Route path="/projekt/windows/modul-4/part-4" element={<ProjektModul4Part4 />} />
              <Route path="/projekt/windows/modul-4/part-5" element={<ProjektModul4Part5 />} />
              <Route path="/projekt/windows/modul-5/part-1" element={<ProjektModul5Part1 />} />
              <Route path="/projekt/windows/modul-5/part-2" element={<ProjektModul5Part2 />} />
              <Route path="/projekt/security/opnsense" element={<ProjektOPNsenseIntro />} />
              <Route path="/projekt/security/opnsense/part-1" element={<ProjektOPNsensePart1 />} />
              <Route path="/projekt/security/opnsense/part-2" element={<ProjektOPNsensePart2 />} />
              <Route path="/projekt/security/opnsense/part-3" element={<ProjektOPNsensePart3 />} />
              <Route path="/projekt/security/opnsense/part-4" element={<ProjektOPNsensePart4 />} />
              <Route path="/projekt/security/opnsense/part-5" element={<ProjektOPNsensePart5 />} />
              <Route path="/projekt/security/opnsense/part-6" element={<ProjektOPNsensePart6 />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  );
};

export default App;
