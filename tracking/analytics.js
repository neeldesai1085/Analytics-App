(function () {
  const BACKENDS = [
    "http://localhost:3000/api/events",
    "https://analytics-app-8sov.onrender.com/api/events"
  ];
  const STORAGE_KEY = "analytics_session_id";

  let sessionId = localStorage.getItem(STORAGE_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, sessionId);
  }

  function sendEvent(event) {
    BACKENDS.forEach((url) => {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
      }).catch(() => {});
    });
  }

  sendEvent({
    sessionId,
    type: "page_view",
    url: location.href,
    timestamp: new Date().toISOString()
  });

  document.addEventListener("click", (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    sendEvent({
      sessionId,
      type: "click",
      url: location.href,
      timestamp: new Date().toISOString(),
      x,
      y
    });
  });
})();
