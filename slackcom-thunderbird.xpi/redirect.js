browser.spacesToolbar.addButton('Slack', {
    title: "Slack",
    defaultIcons: "slack.svg",
    url: "https://app.slack.com/client/"
});
const ua = navigator.userAgent.includes("Firefox")
  ? navigator.userAgent.slice(0, navigator.userAgent.lastIndexOf("Thunderbird"))
  : navigator.userAgent.replace("Thunderbird", "Firefox");

browser.webRequest.onBeforeSendHeaders.addListener(
  function(e) {
    e.requestHeaders.forEach(header => {
      if (header.name.toLowerCase() === "user-agent") {
        header.value = ua;
      }
    });
    return { requestHeaders: e.requestHeaders };
  },
  { urls: ["https://app.slack.com/*"] },
  ["blocking", "requestHeaders"]
);