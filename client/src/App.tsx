import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Sessions from "@/pages/Sessions";
import Invoices from "@/pages/Invoices";
import Cases from "@/pages/Cases";
import Reports from "@/pages/Reports";
import SmartMemory from "@/pages/SmartMemory";
import CalendarPage from "@/pages/CalendarPage";
import Clients from "@/pages/Clients";
import Settings from "@/pages/Settings";
import Documents from "@/pages/Documents";
import Login from "@/pages/Login";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/sessions" component={Sessions} />
      <Route path="/invoices" component={Invoices} />
      <Route path="/cases" component={Cases} />
      <Route path="/reports" component={Reports} />
      <Route path="/smart-memory" component={SmartMemory} />
      <Route path="/calendar" component={CalendarPage} />
      <Route path="/clients" component={Clients} />
      <Route path="/settings" component={Settings} />
      <Route path="/documents" component={Documents} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div dir="rtl">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
