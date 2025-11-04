import React, { useEffect } from "react";
import { useRecipes } from "../context/RecipeContext";
import RecipeList from "../components/RecipeList";
import LeftMenu from "../components/LeftMenu";

export default function Home() {
  const {
    recipes, loading, error,
    search, setSearch,
    activeCategory, setActiveCategory,
    categories, reload
  } = useRecipes();

  useEffect(() => { reload({}); }, []); // ensure initial load

  useEffect(() => {
    const debounce = setTimeout(() => {
      reload({ q: search, category: activeCategory });
    }, 300);
    return () => clearTimeout(debounce);
  }, [search, activeCategory, reload]);

  return (
    <div className="layout">
      <LeftMenu
        categories={categories}
        active={activeCategory}
        onSelect={setActiveCategory}
      />
      <main className="content">
        <RecipeList
          items={recipes}
          loading={loading}
          error={error}
          search={search}
          setSearch={setSearch}
        />
      </main>
    </div>
  );
}
