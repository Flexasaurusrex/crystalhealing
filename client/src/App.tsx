import React, { Suspense } from "react";
import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "@/pages/home";
import SimpleAdminPage from "@/pages/simple-admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/admin" component={SimpleAdminPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </HelmetProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
