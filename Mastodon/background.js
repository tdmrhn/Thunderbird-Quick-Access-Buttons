const BUTTON_ID = "Mastodon";
const DEFAULT_URL = "https://mastodon.social/";

async function getInstanceUrl() {
  try {
    const result = await browser.storage.local.get("instanceUrl");
    return (result && result.instanceUrl) ? result.instanceUrl : DEFAULT_URL;
  } catch (e) {
    return DEFAULT_URL;
  }
}

async function init() {
  const url = await getInstanceUrl();
  try {
    await browser.spacesToolbar.addButton(BUTTON_ID, {
      title: "Mastodon",
      defaultIcons: "mastodon.svg",
      url: url
    });
  } catch (e) {
    // Button may already exist on reload; try updating instead.
    try {
      await browser.spacesToolbar.updateButton(BUTTON_ID, { url: url });
    } catch (e2) {
      console.error("Mastodon quick access: failed to add button", e, e2);
    }
  }
}

init();

browser.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (!changes.instanceUrl) return;
  const url = changes.instanceUrl.newValue || DEFAULT_URL;
  browser.spacesToolbar.updateButton(BUTTON_ID, { url: url }).catch(function (e) {
    console.error("Mastodon quick access: failed to update button", e);
  });
});