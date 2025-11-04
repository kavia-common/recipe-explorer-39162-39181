import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { RecipesAPI } from "../api/client";

export default function RecipeDetail({ onEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true); setErr("");
    RecipesAPI.get(id)
      .then((data) => { if (mounted) setRecipe(data); })
      .catch((e) => { if (mounted) setErr(e.message || "Failed to load");})
      .finally(() => { if (mounted) setLoading(false);});
    return () => { mounted = false; };
  }, [id]);

  const onDelete = async () => {
    if (!window.confirm("Delete this recipe?")) return;
    await RecipesAPI.remove(id);
    navigate("/");
  };

  if (loading) {
    return <div className="detail skeleton-full" aria-busy="true" />;
  }
  if (err) {
    return <div className="alert error" role="alert">{err}</div>;
  }
  if (!recipe) return null;

  return (
    <article className="detail">
      <div className="detail-hero">
        <img src={recipe.imageUrl} alt={recipe.title} />
        <div className="detail-hero-overlay">
          <h1 className="detail-title">{recipe.title}</h1>
          <div className="detail-tags">
            {(recipe.tags || []).map(t => <span className="tag" key={t}>{t}</span>)}
          </div>
        </div>
      </div>

      <div className="detail-actions">
        <Link className="btn" to="/">← Back</Link>
        <div className="spacer" />
        <button className="btn" onClick={() => onEdit(recipe)}>Edit</button>
        <button className="btn danger" onClick={onDelete}>Delete</button>
      </div>

      <div className="detail-content">
        <section className="panel">
          <h2>Ingredients</h2>
          <ul className="bullets">
            {(recipe.ingredients || []).map((ing, i) => <li key={i}>{ing}</li>)}
          </ul>
        </section>
        <section className="panel">
          <h2>Instructions</h2>
          <ol className="steps">
            {(recipe.instructions || []).map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </section>
      </div>
    </article>
  );
}
