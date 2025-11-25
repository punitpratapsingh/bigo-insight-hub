import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/admin/Dashboard";
import Companies from "./pages/admin/Companies";
import Blogs from "./pages/admin/Blogs";
import Research from "./pages/admin/Research";
import CaseStudies from "./pages/admin/CaseStudies";
import Events from "./pages/admin/Events";
import Reviews from "./pages/admin/Reviews";
import DemoRequests from "./pages/admin/DemoRequests";
import Newsletter from "./pages/admin/Newsletter";
import Pricing from "./pages/admin/Pricing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/companies" element={<Companies />} />
          <Route path="/admin/blogs" element={<Blogs />} />
          <Route path="/admin/research" element={<Research />} />
          <Route path="/admin/case-studies" element={<CaseStudies />} />
          <Route path="/admin/events" element={<Events />} />
          <Route path="/admin/reviews" element={<Reviews />} />
          <Route path="/admin/demo-requests" element={<DemoRequests />} />
          <Route path="/admin/newsletter" element={<Newsletter />} />
          <Route path="/admin/pricing" element={<Pricing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
