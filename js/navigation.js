"use strict";

window.goToDashboard = () => {
    if (!sessionStorage.getItem("fs_current")) { window.location.href = "index.html"; return; }
    window.location.href = "dashboard.html";
};

window.goToMeals = () => {
    if (!sessionStorage.getItem("fs_current")) { window.location.href = "index.html"; return; }
    window.location.href = "meals.html";
};

window.goToProfile = () => {
    if (!sessionStorage.getItem("fs_current")) { window.location.href = "index.html"; return; }
    window.location.href = "profile.html";
};

window.goHome = () => {
    window.location.href = "index.html";
};

window.goToCommunity = () => {
    if (!sessionStorage.getItem("fs_current")) { window.location.href = "index.html"; return; }
    window.location.href = "community.html";
};

// Sign out: removes the session token only.
// Credentials and plan data remain in localStorage for next sign-in.
window.doSignOut = () => {
    sessionStorage.removeItem("fs_current");
    window.location.href = "index.html";
};

// Populate nav welcome text + highlight active page
document.addEventListener("DOMContentLoaded", () => {
    const user = sessionStorage.getItem("fs_current");
    const el = document.getElementById("navWelcomeName");
    if (el && user) el.textContent = "Hi, " + user;
});
