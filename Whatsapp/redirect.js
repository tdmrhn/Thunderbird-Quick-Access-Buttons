browser.spacesToolbar.addButton('Whatsapp', {
	title: "Whatsapp",
	defaultIcons: "whatsapp.svg",
	onClick: function() {
		browser.tabs.create({
			url: "https://web.whatsapp.com",
			active: true,
			openInReaderMode: true,
		});
	},
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
  { urls: ["https://web.whatsapp.com/*"] },
  ["blocking", "requestHeaders"]
);
