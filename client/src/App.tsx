import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Precios from "./pages/Precios";
import Galeria from "./pages/Galeria";
import { AnimatePresence } from "framer-motion";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/precios"} component={Precios} />
        <Route path={"/galeria"} component={Galeria} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
