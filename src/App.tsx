import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";

// Lazy load non-critical routes to reduce initial bundle size
const PatientDashboard = lazy(() => import("./pages/PatientDashboard"));
const Login = lazy(() => import("./pages/Login"));
const AmbulanceTracking = lazy(() => import("./pages/AmbulanceTracking"));
const AmbulanceBooking = lazy(() => import("./pages/AmbulanceBooking"));
const WardBooking = lazy(() => import("./pages/WardBooking"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PatientDashboard />} />
            <Route path="/ambulance-tracking" element={<AmbulanceTracking />} />
            <Route path="/ambulance-booking" element={<AmbulanceBooking />} />
            <Route path="/ward-booking" element={<WardBooking />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
