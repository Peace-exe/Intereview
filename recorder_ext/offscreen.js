let mediaRecorder;
let recordedChunks = [];

chrome.runtime.onMessage.addListener(async (msg) => {

  if (msg.target !== "offscreen") return;

  if (msg.type === "START") {

    chrome.tabCapture.capture(
      {
        audio: true,
        video: true,
      },
      (stream) => {

        mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm; codecs=vp8,opus"
        });

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
          }
        };

        mediaRecorder.start(1000); // record continuously
        console.log("Recording started");
      }
    );
  }

  if (msg.type === "STOP") {

    mediaRecorder.stop();

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      chrome.downloads.download({
        url: url,
        filename: "interview_recording.webm"
      });

      recordedChunks = [];
    };
  }
});