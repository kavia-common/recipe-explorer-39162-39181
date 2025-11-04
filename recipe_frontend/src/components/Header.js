import React from "react";
import { Link } from "react-router-dom";
import { getApiBaseUrl } from "../api/client";

export default function Header({ onOpenCreate }) {
  const apiBase = getApiBaseUrl();

  return (
    <header className="app-header" role="banner">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Recipe Explorer Home">
          <div className="brand-mark" aria-hidden="true">🍳</div>
          <div className="brand-text">
            <span className="brand-title">Recipe Explorer</span>
            <span className="brand-subtitle">Ocean Professional</span>
          </div>
        </Link>

        <div className="header-actions">
          <div className="api-chip" title={`API Base: ${apiBase}`}>
            API: {apiBase}
          </div>
          <button className="btn primary" onClick={onOpenCreate} aria-haspopup="dialog" aria-expanded="false">
            + New Recipe
          </button>
        </div>
      </div>
    </header>
  );
}
