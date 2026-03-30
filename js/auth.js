// FitSync — dist/auth.js
// Credentials are stored in localStorage so users can sign back in after
// closing the window. The "who is logged in" token (fs_current) stays in
// sessionStorage so closing the tab always forces a re-login.
// Plan data is stored per-user in localStorage under fs_<username>_<key>.

"use strict";

const USERS_KEY   = "fs_users";   // localStorage — persists across sessions
const CURRENT_KEY = "fs_current"; // sessionStorage — cleared on tab/window close

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "{}"); }
  catch { return {}; }
}

async function hashPassword(pw) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function register(username, password) {
  const users = getUsers();
  const key   = username.trim().toLowerCase();
  if (!key)                return { ok: false, error: "Username is required." };
  if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
  if (users[key])          return { ok: false, error: "That username is already registered." };
  users[key] = { username: username.trim(), hash: await hashPassword(password) };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  sessionStorage.setItem(CURRENT_KEY, username.trim());
  return { ok: true };
}

export async function signIn(username, password) {
  const users = getUsers();
  const key   = username.trim().toLowerCase();
  const user  = users[key];
  if (!user)                                      return { ok: false, error: "No account found with that username." };
  if (await hashPassword(password) !== user.hash) return { ok: false, error: "Incorrect password." };
  sessionStorage.setItem(CURRENT_KEY, user.username);
  return { ok: true };
}

export function getCurrentUser() {
  return sessionStorage.getItem(CURRENT_KEY);
}

// Delete all plan/app data for the current user (keeps their account).
export function clearUserData(username) {
  const prefix = `fs_${username.toLowerCase()}_`;
  Object.keys(localStorage)
    .filter(k => k.startsWith(prefix))
    .forEach(k => localStorage.removeItem(k));
}

// Permanently delete the account and all associated data.
export function deleteAccount(username) {
  clearUserData(username);
  const users = getUsers();
  delete users[username.toLowerCase()];
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  sessionStorage.removeItem(CURRENT_KEY);
  window.location.href = "index.html";
}

