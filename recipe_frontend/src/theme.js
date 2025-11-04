export const OceanProfessionalTheme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB",
    secondary: "#F59E0B",
    success: "#F59E0B",
    error: "#EF4444",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827",
    mutedText: "#6B7280",
    border: "#E5E7EB",
    subtleGradientFrom: "rgba(59,130,246,0.08)",
    subtleGradientTo: "rgba(243,244,246,1)",
    overlay: "rgba(17,24,39,0.5)"
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px"
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.06)",
    md: "0 4px 10px rgba(0,0,0,0.08)",
    lg: "0 10px 25px rgba(0,0,0,0.12)"
  },
  spacing: (n = 1) => `${n * 8}px`,
};

// PUBLIC_INTERFACE
export const applyThemeCSSVars = (theme = OceanProfessionalTheme) => {
  /** Applies CSS variables for the Ocean Professional theme to the document root. */
  const root = document.documentElement;
  const { colors, radius, shadow } = theme;
  root.style.setProperty("--color-primary", colors.primary);
  root.style.setProperty("--color-secondary", colors.secondary);
  root.style.setProperty("--color-success", colors.success);
  root.style.setProperty("--color-error", colors.error);
  root.style.setProperty("--color-bg", colors.background);
  root.style.setProperty("--color-surface", colors.surface);
  root.style.setProperty("--color-text", colors.text);
  root.style.setProperty("--color-muted", colors.mutedText);
  root.style.setProperty("--color-border", colors.border);
  root.style.setProperty("--gradient-from", colors.subtleGradientFrom);
  root.style.setProperty("--gradient-to", colors.subtleGradientTo);
  root.style.setProperty("--overlay", colors.overlay);
  root.style.setProperty("--radius-sm", radius.sm);
  root.style.setProperty("--radius-md", radius.md);
  root.style.setProperty("--radius-lg", radius.lg);
  root.style.setProperty("--radius-xl", radius.xl);
  root.style.setProperty("--shadow-sm", shadow.sm);
  root.style.setProperty("--shadow-md", shadow.md);
  root.style.setProperty("--shadow-lg", shadow.lg);
};
