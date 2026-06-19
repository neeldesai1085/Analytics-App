import { useState } from "react";
import SessionList from "./components/SessionList";
import EventList from "./components/EventList";
import Heatmap from "./components/Heatmap";
import Header from "./components/Header";
import Card from "./components/Card";

export default function App() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [heatmapUrl, setHeatmapUrl] = useState<string>("");

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="grid">
          <Card>
            <h2>Sessions</h2>
            <SessionList onSelect={setSelectedSession} />
          </Card>

          {selectedSession && (
            <Card>
              <h2>Session Journey</h2>
              <EventList sessionId={selectedSession} />
            </Card>
          )}

          <Card>
            <h2>Heatmap</h2>
            <input
              type="text"
              placeholder="Enter page URL"
              value={heatmapUrl}
              onChange={(e) => setHeatmapUrl(e.target.value)}
              className="heatmap-input"
            />
            {heatmapUrl && <Heatmap url={heatmapUrl} />}
          </Card>
        </div>
      </div>

    </>
  );
}
