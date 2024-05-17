browser.spacesToolbar.addButton('Slack', {
    title: "Slack",
    defaultIcons: "slack.svg",
    url: "https://app.slack.com/client/"
});

browser.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    for (let header of details.requestHeaders) {
      if (header.name.toLowerCase() === "user-agent") {
        header.value = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/124.0";
        break;
      }
    }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["https://app.slack.com/*", "https://*.slack.com/*"] },
  ["blocking", "requestHeaders"]
);
