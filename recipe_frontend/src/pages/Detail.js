import React, { useState } from "react";
import RecipeDetail from "../components/RecipeDetail";
import Modal from "../components/Modal";
import RecipeForm from "../components/RecipeForm";
import { useRecipes } from "../context/RecipeContext";

export default function Detail() {
  const { updateRecipe } = useRecipes();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onEdit = (recipe) => {
    setEditing(recipe);
    setOpen(true);
  };

  const onSubmit = async (payload) => {
    try {
      setSubmitting(true);
      await updateRecipe(editing.id, payload);
      setOpen(false);
      setEditing(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <RecipeDetail onEdit={onEdit} />
      <Modal open={open} onClose={() => setOpen(false)} title="Edit Recipe">
        <RecipeForm
          initialValue={editing}
          onSubmit={onSubmit}
          onCancel={() => setOpen(false)}
          submitting={submitting}
        />
      </Modal>
    </>
  );
}
