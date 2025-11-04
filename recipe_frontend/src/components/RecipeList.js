import React, { useMemo } from "react";
import { Link } from "react-router-dom";

export default function RecipeList({ items = [], loading, error, search, setSearch }) {
  const empty = !loading && items.length === 0;

  const placeholderCards = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => (
      <div className="recipe-card skeleton" key={`s-${i}`} />
    ));
  }, []);

  return (
    <section className="recipe-list-section">
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search recipes…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search recipes"
        />
      </div>

      {error && <div className="alert error" role="alert">{error}</div>}

      <div className="grid">
        {loading ? placeholderCards : items.map((r) => (
          <article className="recipe-card" key={r.id}>
            <Link to={`/recipes/${r.id}`} className="card-thumb" aria-label={`View recipe ${r.title}`}>
              <img src={r.imageUrl} alt={r.title} />
            </Link>
            <div className="card-body">
              <h3 className="card-title">
                <Link to={`/recipes/${r.id}`}>{r.title}</Link>
              </h3>
              <p className="card-desc">{r.description}</p>
              <div className="card-tags">
                {(r.tags || []).map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {empty && <div className="empty">No recipes found. Try adjusting your search or filters.</div>}
    </section>
  );
}
