browser.spacesToolbar.addButton('MicrosoftTeams', {
    title: "Microsoft Teams",
    defaultIcons: "teams.svg",
    url: "https://teams.microsoft.com/v2/"
});


browser.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    for (let header of details.requestHeaders) {
      if (header.name.toLowerCase() === "user-agent") {
        header.value = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0";
        break;
      }
    }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["https://teams.microsoft.com/*", "https://*.microsoft.com/*","https://teams.live.com/*", "https://*.live.com/*"] },
  ["blocking", "requestHeaders"]
);
