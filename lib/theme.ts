export const theme = {
  colors: {
    background: {
      DEFAULT: '#1a1a1a',
    },
    foreground: {
      DEFAULT: '#ffffff',
    },
    primary: {
      DEFAULT: '#a855f7',
      hover: '#9333ea',
    },
    secondary: {
      DEFAULT: '#2acfcf',
    },
    accent: {
      DEFAULT: '#3b3b3b',
    },
    muted: {
      DEFAULT: '#2d2d2d',
      foreground: '#a3a3a3',
    },
    border: {
      DEFAULT: '#333333',
    },
    destructive: {
      DEFAULT: '#EF4444',
      hover: '#DC2626',
    },
  },
  spacing: {
    container: '2rem',
    section: '2rem',
  },
  borderRadius: {
    DEFAULT: '0.5rem',
    lg: '0.75rem',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
  },
} as const;

// Common class combinations
export const commonClasses = {
  card: 'border border-[var(--border)] rounded-lg bg-[var(--card)] p-4',
  input: 'w-full px-3 py-2 rounded-md bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]',
  button: {
    primary: 'bg-[var(--primary)] text-white px-4 py-2 rounded-md',
    secondary: 'bg-[var(--accent)] text-white px-4 py-2 rounded-md',
    destructive: 'bg-[var(--destructive)] text-white px-4 py-2 rounded-md',
  },
  text: {
    heading: 'text-2xl font-bold text-[var(--foreground)]',
    subheading: 'text-xl font-semibold text-[var(--foreground)]',
    body: 'text-[var(--foreground)]',
    muted: 'text-[var(--muted)]',
  },
} as const; 