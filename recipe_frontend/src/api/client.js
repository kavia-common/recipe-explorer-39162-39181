const FEATURES = (process.env.REACT_APP_FEATURE_FLAGS || "").split(",").map(s => s.trim().toLowerCase());
const useMock = FEATURES.includes("mock") || FEATURES.includes("mock-api");

const resolveBaseUrl = () => {
  // PUBLIC_INTERFACE
  // Resolves backend base URL from environment; falls back to relative '/api'
  const envBase = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL;
  if (envBase && typeof envBase === "string" && envBase.trim().length > 0) {
    return envBase.replace(/\/+$/, "");
  }
  return "/api";
};

const BASE_URL = resolveBaseUrl();

async function http(path, { method = "GET", body, headers } = {}) {
  const url = `${BASE_URL}${path}`;
  const init = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };
  const res = await fetch(url, init);
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`Request failed (${res.status}): ${msg || res.statusText}`);
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
}

// Mock Data and service
let MOCK_DB = [
  {
    id: "1",
    title: "Grilled Lemon Herb Chicken",
    description: "Juicy chicken breasts marinated with lemon and herbs.",
    category: "Main",
    tags: ["grill", "chicken", "healthy"],
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop",
    ingredients: [
      "2 chicken breasts",
      "2 tbsp olive oil",
      "1 lemon (zest and juice)",
      "2 cloves garlic, minced",
      "1 tsp dried oregano",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Whisk marinade ingredients together.",
      "Marinate chicken 30 minutes.",
      "Grill 6-7 minutes per side until cooked through.",
      "Rest 5 minutes and serve."
    ]
  },
  {
    id: "2",
    title: "Classic Avocado Toast",
    description: "Crispy toast topped with creamy avocado and chili flakes.",
    category: "Breakfast",
    tags: ["quick", "vegetarian"],
    imageUrl: "https://images.unsplash.com/photo-1551183053-8b83b47a97b3?q=80&w=1200&auto=format&fit=crop",
    ingredients: [
      "2 slices sourdough bread",
      "1 ripe avocado",
      "Salt, pepper, chili flakes",
      "Lemon juice"
    ],
    instructions: [
      "Toast bread.",
      "Mash avocado with lemon juice, salt, pepper.",
      "Spread on toast, top with chili flakes."
    ]
  }
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const mockService = {
  async list(params) {
    await wait(200);
    const q = (params?.q || "").toLowerCase();
    const category = params?.category || "";
    let items = [...MOCK_DB];
    if (q) {
      items = items.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.join(" ").toLowerCase().includes(q)
      );
    }
    if (category) {
      items = items.filter(r => (r.category || "").toLowerCase() === category.toLowerCase());
    }
    return items;
  },
  async get(id) {
    await wait(150);
    const item = MOCK_DB.find(r => r.id === id);
    if (!item) throw new Error("Not found");
    return item;
  },
  async create(data) {
    await wait(200);
    const id = (Date.now()).toString();
    const recipe = { ...data, id };
    MOCK_DB.unshift(recipe);
    return recipe;
  },
  async update(id, data) {
    await wait(200);
    const idx = MOCK_DB.findIndex(r => r.id === id);
    if (idx === -1) throw new Error("Not found");
    MOCK_DB[idx] = { ...MOCK_DB[idx], ...data, id };
    return MOCK_DB[idx];
  },
  async remove(id) {
    await wait(150);
    MOCK_DB = MOCK_DB.filter(r => r.id !== id);
    return { success: true };
  },
};

// PUBLIC_INTERFACE
export const RecipesAPI = {
  /** List recipes with optional search and category filter. */
  async list({ q = "", category = "" } = {}) {
    if (useMock) return mockService.list({ q, category });
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    return http(`/recipes?${params.toString()}`, { method: "GET" });
  },
  /** Get a single recipe by id. */
  async get(id) {
    if (useMock) return mockService.get(id);
    return http(`/recipes/${encodeURIComponent(id)}`, { method: "GET" });
  },
  /** Create a new recipe. */
  async create(payload) {
    if (useMock) return mockService.create(payload);
    return http(`/recipes`, { method: "POST", body: payload });
  },
  /** Update an existing recipe. */
  async update(id, payload) {
    if (useMock) return mockService.update(id, payload);
    return http(`/recipes/${encodeURIComponent(id)}`, { method: "PUT", body: payload });
  },
  /** Delete a recipe. */
  async remove(id) {
    if (useMock) return mockService.remove(id);
    return http(`/recipes/${encodeURIComponent(id)}`, { method: "DELETE" });
  },
};

// PUBLIC_INTERFACE
export const getApiBaseUrl = () => BASE_URL;
