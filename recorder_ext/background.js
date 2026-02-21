let recording = false;

async function createOffscreen() {
  const exists = await chrome.offscreen.hasDocument?.();
  if (exists) return;

  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["USER_MEDIA"],
    justification: "Recording interview media"
  });
}

chrome.runtime.onMessage.addListener(async (msg) => {

  if (msg.type === "START_RECORDING" && !recording) {
    await createOffscreen();
    chrome.runtime.sendMessage({ target: "offscreen", type: "START" });
    recording = true;
  }

  if (msg.type === "STOP_RECORDING" && recording) {
    chrome.runtime.sendMessage({ target: "offscreen", type: "STOP" });
    recording = false;
  }
});