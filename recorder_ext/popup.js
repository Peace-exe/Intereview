document.getElementById("start").onclick = async () => {
  await chrome.runtime.sendMessage({ type: "START_RECORDING" });
};

document.getElementById("stop").onclick = async () => {
  await chrome.runtime.sendMessage({ type: "STOP_RECORDING" });
};