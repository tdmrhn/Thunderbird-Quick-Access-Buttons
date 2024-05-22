browser.spacesToolbar.addButton('Trello', {
    title: "Trello",
    defaultIcons: "trello.svg",
    url: "https://trello.com/"
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
  { urls: ["https://*.trello.com/*"] },
  ["blocking", "requestHeaders"]
);