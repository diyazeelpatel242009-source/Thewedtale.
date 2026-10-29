
"use strict";

const $ = (id) => document.getElementById(id);

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[c]));
}

function showNotice(id, message, type = "") {
  const el = $(id);
  if (!el) return;
  el.textContent = message;
  el.className = "notice show" + (type ? " " + type : "");
}

function clearNotice(id) {
  const el = $(id);
  if (!el) return;
  el.textContent = "";
  el.className = "notice";
}

function configured() {
  return !!window.supabaseClient;
}

function configMessage() {
  return "Supabase is not configured. Check your Project URL and publishable/anon key in supabase.js.";
}

async function getSession() {
  if (!configured()) return null;

  const { data, error } =
    await window.supabaseClient.auth.getSession();

  if (error) throw error;

  return data.session || null;
}

async function getProfile(userId) {
  const { data, error } = await window.supabaseClient
    .from("profiles")
    .select("id, role, full_name")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;

  return data;
}

async function routeByRole(user) {
  if (!user) {
    location.href = "auth.html";
    return;
  }

  const profile = await getProfile(user.id);

  if (!profile) {
    showNotice(
      "authNotice",
      "Your account exists, but its profile is missing. Please contact the site administrator.",
      "error"
    );
    return;
  }

  if (profile.role === "business") {
    location.href = "business-dashboard.html";
  } else if (profile.role === "couple") {
    location.href = "couple-dashboard.html";
  } else if (profile.role === "admin") {
    location.href = "admin-dashboard.html";
  } else {
    showNotice(
      "authNotice",
      "Your account type is not recognised. Please contact the site administrator.",
      "error"
    );
  }
}

async function logout() {
  if (!configured()) {
    location.href = "index.html";
    return;
  }

  const { error } =
    await window.supabaseClient.auth.signOut();

  if (error) {
    alert("Could not log out: " + error.message);
  } else {
    location.href = "index.html";
  }
}

window.twtLogout = logout;

document.addEventListener("DOMContentLoaded", () => {
  const toggle = $("navToggle");
  const links = $("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }

  document.querySelectorAll("[data-logout]").forEach(button => {
    button.addEventListener("click", logout);
  });
});
