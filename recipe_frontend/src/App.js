import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles.css";
import { applyThemeCSSVars } from "./theme";
import Header from "./components/Header";
import Modal from "./components/Modal";
import RecipeForm from "./components/RecipeForm";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { RecipeProvider, useRecipes } from "./context/RecipeContext";

function AppShell() {
  const { createRecipe } = useRecipes();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onCreate = async (payload) => {
    try {
      setSubmitting(true);
      await createRecipe(payload);
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-root">
      <Header onOpenCreate={() => setOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<Detail />} />
      </Routes>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Recipe">
        <RecipeForm
          initialValue={null}
          onSubmit={onCreate}
          onCancel={() => setOpen(false)}
          submitting={submitting}
        />
      </Modal>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  /** Root application entry with theme setup and providers. */
  const [themeReady, setThemeReady] = useState(false);
  useEffect(() => {
    applyThemeCSSVars();
    setThemeReady(true);
  }, []);
  if (!themeReady) return null;

  return (
    <Router>
      <RecipeProvider>
        <AppShell />
      </RecipeProvider>
    </Router>
  );
}
