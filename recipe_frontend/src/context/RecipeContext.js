import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { RecipesAPI } from "../api/client";

// PUBLIC_INTERFACE
export const RecipeContext = createContext(null);

// PUBLIC_INTERFACE
export const useRecipes = () => {
  /** Access recipe context state and actions. */
  const ctx = useContext(RecipeContext);
  if (!ctx) throw new Error("useRecipes must be used within RecipeProvider");
  return ctx;
};

// PUBLIC_INTERFACE
export function RecipeProvider({ children }) {
  /** Provides recipe list, filters, and CRUD operations to the app. */
  const [recipes, setRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (params = {}) => {
    setLoading(true); setError("");
    try {
      const data = await RecipesAPI.list({
        q: params.q ?? search,
        category: params.category ?? activeCategory
      });
      setRecipes(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load recipes");
    } finally {
      setLoading(false);
    }
  }, [search, activeCategory]);

  const categories = useMemo(() => {
    const set = new Set(recipes.map(r => r.category || "Other"));
    return ["All", ...Array.from(set)];
  }, [recipes]);

  const createRecipe = useCallback(async (payload) => {
    const created = await RecipesAPI.create(payload);
    await load();
    return created;
  }, [load]);

  const updateRecipe = useCallback(async (id, payload) => {
    const updated = await RecipesAPI.update(id, payload);
    await load();
    return updated;
  }, [load]);

  const deleteRecipe = useCallback(async (id) => {
    await RecipesAPI.remove(id);
    await load();
  }, [load]);

  useEffect(() => { load(); }, [load]);

  const value = {
    // state
    recipes, loading, error,
    search, setSearch,
    activeCategory, setActiveCategory,
    categories,
    // actions
    reload: load,
    createRecipe, updateRecipe, deleteRecipe,
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
}
