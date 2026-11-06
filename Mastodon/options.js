const DEFAULT_URL = "https://mastodon.social/";

async function restore() {
  try {
    const result = await browser.storage.local.get("instanceUrl");
    document.getElementById("instanceUrl").value = (result && result.instanceUrl) ? result.instanceUrl : DEFAULT_URL;
  } catch (e) {
    document.getElementById("instanceUrl").value = DEFAULT_URL;
  }
}

async function save() {
  let url = document.getElementById("instanceUrl").value.trim();
  if (!url) {
    url = DEFAULT_URL;
  }
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }
  // Normalize: ensure a trailing slash for the root URL is not required; keep as entered.
  await browser.storage.local.set({ instanceUrl: url });
  const status = document.getElementById("status");
  status.textContent = "Saved.";
  setTimeout(function () { status.textContent = ""; }, 2000);
}

document.addEventListener("DOMContentLoaded", restore);
document.getElementById("save").addEventListener("click", save);