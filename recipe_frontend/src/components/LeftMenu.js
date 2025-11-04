import React from "react";

export default function LeftMenu({ categories = [], active = "", onSelect }) {
  return (
    <nav className="left-menu" aria-label="Recipe categories">
      <div className="menu-title">Categories</div>
      <ul className="menu-list">
        {categories.map((c) => {
          const val = c === "All" ? "" : c;
          const isActive = (val || "") === (active || "");
        return (
          <li key={c}>
            <button
              className={`menu-item ${isActive ? "active" : ""}`}
              onClick={() => onSelect(val)}
              aria-current={isActive ? "true" : "false"}
            >
              {c}
            </button>
          </li>
        );})}
      </ul>
    </nav>
  );
}
