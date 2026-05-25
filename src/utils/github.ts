import { promises as fs } from "node:fs";
import { createHash } from "node:crypto";
import { resolve, dirname } from "node:path";

export interface RepoStats {
  stars: number;
  forks: number;
  language: string | null;
}

export interface UserStats {
  publicRepos: number;
  followers: number;
}

const CACHE_TTL_MS = 60 * 60 * 1000;

function cacheDir(): string {
  // Vercel build cache persists `.vercel/cache/` between builds
  // Fall back to node_modules/.cache locally
  return resolve(process.cwd(), ".vercel", ".cache", "github");
}

function cacheKey(url: string): string {
  return createHash("md5").update(url).digest("hex");
}

async function cachePath(): Promise<string> {
  const dir = cacheDir();
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

async function readCache(key: string): Promise<unknown | null> {
  try {
    const dir = await cachePath();
    const path = resolve(dir, `${key}.json`);
    const raw = await fs.readFile(path, "utf-8");
    const entry = JSON.parse(raw);
    if (Date.now() - entry.timestamp < CACHE_TTL_MS) {
      return entry.data;
    }
    return null;
  } catch {
    return null;
  }
}

async function writeCache(key: string, data: unknown): Promise<void> {
  try {
    const dir = await cachePath();
    const path = resolve(dir, `${key}.json`);
    await fs.writeFile(path, JSON.stringify({ timestamp: Date.now(), data }), "utf-8");
  } catch {
    // cache write failure is non-fatal
  }
}

function githubHeaders(): Record<string, string> {
  const token =
    import.meta.env.GITHUB_PAT ?? import.meta.env.GITHUB_TOKEN ?? "";

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "dev-dami-portfolio",
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  return headers;
}

async function cachedFetch<T>(url: string, headers: Record<string, string>): Promise<T | null> {
  const key = cacheKey(url);

  // Check cache first
  const cached = await readCache(key);
  if (cached) return cached as T;

  // Fetch from API
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return null;
    const data = (await res.json()) as T;
    // Cache the result (don't await)
    writeCache(key, data);
    return data;
  } catch {
    return null;
  }
}

export async function fetchRepoStats(githubUrl: string): Promise<RepoStats | null> {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+?)(?:\/|$)/);
  if (!match) return null;

  const [, owner, repo] = match;
  const data = await cachedFetch<{ stargazers_count: number; forks_count: number; language: string | null }>(
    `https://api.github.com/repos/${owner}/${repo}`,
    githubHeaders(),
  );

  if (!data) return null;
  return {
    stars: data.stargazers_count ?? 0,
    forks: data.forks_count ?? 0,
    language: data.language ?? null,
  };
}

export async function fetchUserStats(username: string): Promise<UserStats | null> {
  const data = await cachedFetch<{ public_repos: number; followers: number }>(
    `https://api.github.com/users/${username}`,
    { Accept: "application/vnd.github.v3+json", "User-Agent": "dev-dami-portfolio" },
  );

  if (!data) return null;
  return {
    publicRepos: data.public_repos ?? 0,
    followers: data.followers ?? 0,
  };
}

export async function fetchCommitCount(username: string): Promise<number | null> {
  const data = await cachedFetch<{ total_count: number }>(
    `https://api.github.com/search/commits?q=author:${username}&per_page=1`,
    { Accept: "application/vnd.github.v3+json", "User-Agent": "dev-dami-portfolio" },
  );

  if (!data) return null;
  return data.total_count;
}

export function computeYearsCoding(startYear: number): number {
  return new Date().getFullYear() - startYear;
}
