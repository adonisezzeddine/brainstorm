import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

// Define route types for better type safety and maintainability
type RouteType = 'public' | 'auth' | 'protected';

interface RouteConfig {
  path: string;
  type: RouteType;
  redirect?: string;
}

// Define all routes with their types and redirects
const ROUTES: RouteConfig[] = [
  // Public routes
  { path: '/', type: 'public' },
  { path: '/about', type: 'public' },
  { path: '/blog', type: 'public' },
  { path: '/careers', type: 'public' },
  { path: '/press', type: 'public' },
  { path: '/privacy', type: 'public' },
  { path: '/terms', type: 'public' },
  { path: '/security', type: 'public' },
  { path: '/cookies', type: 'public' },
  { path: '/contact', type: 'public' },
  { path: '/features', type: 'public' },
  { path: '/pricing', type: 'public' },
  { path: '/resources', type: 'public' },
  { path: '/community', type: 'public' },
  
  // Auth routes
  { path: '/login', type: 'auth', redirect: '/' },
  { path: '/register', type: 'auth', redirect: '/' },
  { path: '/forgot-password', type: 'auth', redirect: '/' },
  { path: '/reset-password', type: 'auth', redirect: '/' },
];

// Create sets for O(1) lookup
const PUBLIC_PATHS = new Set(ROUTES.filter(r => r.type === 'public').map(r => r.path));
const AUTH_PATHS = new Set(ROUTES.filter(r => r.type === 'auth').map(r => r.path));

function normalizePath(path: string): string {
  // Remove trailing slashes and ensure path starts with /
  const normalized = path.replace(/\/+$/, '');
  return normalized === '' ? '/' : normalized;
}

function isPublicPath(path: string): boolean {
  const normalized = normalizePath(path);
  return (
    PUBLIC_PATHS.has(normalized) ||
    Array.from(PUBLIC_PATHS).some(publicPath => normalized.startsWith(publicPath + '/'))
  );
}

function isAuthPath(path: string): boolean {
  const normalized = normalizePath(path);
  return AUTH_PATHS.has(normalized);
}

function getRedirectUrl(request: NextRequest, path: string): URL {
  const url = new URL(path, request.url);
  // Preserve the original URL as callbackUrl for post-login redirect
  url.searchParams.set('callbackUrl', request.url);
  return url;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalized = normalizePath(pathname);

  // Allow public paths
  if (isPublicPath(normalized)) {
    return NextResponse.next();
  }

  // Handle auth paths
  if (isAuthPath(normalized)) {
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (session) {
      // If user is already logged in, redirect to home or specified redirect
      const route = ROUTES.find(r => r.path === normalized);
      return NextResponse.redirect(getRedirectUrl(request, route?.redirect || '/'));
    }
    return NextResponse.next();
  }

  // Handle protected routes
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!session) {
    // Redirect to login with callback URL
    return NextResponse.redirect(getRedirectUrl(request, '/login'));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files, API routes, and assets
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\..*).*)',
  ],
}; 