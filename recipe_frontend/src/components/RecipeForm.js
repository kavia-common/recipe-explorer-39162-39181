import React, { useEffect, useMemo, useState } from "react";

const initial = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
  tags: "",
  ingredients: "",
  instructions: "",
};

export default function RecipeForm({ initialValue, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValue) {
      setForm({
        title: initialValue.title || "",
        description: initialValue.description || "",
        category: initialValue.category || "",
        imageUrl: initialValue.imageUrl || "",
        tags: (initialValue.tags || []).join(", "),
        ingredients: (initialValue.ingredients || []).join("\n"),
        instructions: (initialValue.instructions || []).join("\n"),
      });
    } else {
      setForm(initial);
    }
  }, [initialValue]);

  const validate = useMemo(() => (values) => {
    const e = {};
    if (!values.title.trim()) e.title = "Title is required";
    if (!values.description.trim()) e.description = "Description is required";
    if (!values.imageUrl.trim()) e.imageUrl = "Image URL is required";
    return e;
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const eobj = validate(form);
    setErrors(eobj);
    if (Object.keys(eobj).length) return;

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim() || "Other",
      imageUrl: form.imageUrl.trim(),
      tags: form.tags.split(",").map(s => s.trim()).filter(Boolean),
      ingredients: form.ingredients.split("\n").map(s => s.trim()).filter(Boolean),
      instructions: form.instructions.split("\n").map(s => s.trim()).filter(Boolean),
    };
    onSubmit(payload);
  };

  const bind = (key) => ({
    value: form[key],
    onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })),
  });

  return (
    <form onSubmit={submit} className="form">
      <div className="grid-2">
        <div className="field">
          <label>Title</label>
          <input type="text" placeholder="e.g., Creamy Tomato Pasta" {...bind("title")} aria-invalid={!!errors.title}/>
          {errors.title && <div className="field-error">{errors.title}</div>}
        </div>
        <div className="field">
          <label>Category</label>
          <input type="text" placeholder="e.g., Dinner" {...bind("category")} />
        </div>
      </div>

      <div className="field">
        <label>Description</label>
        <input type="text" placeholder="Short description" {...bind("description")} aria-invalid={!!errors.description}/>
        {errors.description && <div className="field-error">{errors.description}</div>}
      </div>

      <div className="field">
        <label>Image URL</label>
        <input type="url" placeholder="https://…" {...bind("imageUrl")} aria-invalid={!!errors.imageUrl}/>
        {errors.imageUrl && <div className="field-error">{errors.imageUrl}</div>}
      </div>

      <div className="field">
        <label>Tags (comma separated)</label>
        <input type="text" placeholder="quick, vegetarian" {...bind("tags")} />
      </div>

      <div className="grid-2">
        <div className="field">
          <label>Ingredients (one per line)</label>
          <textarea rows={6} placeholder="- 1 cup flour" {...bind("ingredients")} />
        </div>
        <div className="field">
          <label>Instructions (one step per line)</label>
          <textarea rows={6} placeholder="1. Mix ingredients…" {...bind("instructions")} />
        </div>
      </div>

      <div className="actions">
        <button type="button" className="btn" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn primary" disabled={submitting}>
          {submitting ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
