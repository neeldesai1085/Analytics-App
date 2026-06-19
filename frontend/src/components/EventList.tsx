import { useEffect, useState } from "react";
import api from "../api/axios";

type Event = {
  type: "page_view" | "click";
  url: string;
  timestamp: string;
  x?: number;
  y?: number;
};

interface Props {
  sessionId: string;
}

// Clean, minimal list of events for a session
export default function EventList({ sessionId }: Props) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    api.get(`/sessions/${sessionId}`).then((res) => setEvents(res.data));
  }, [sessionId]);

  return (
    <ol style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
      {events.map((e, i) => (
        <li
          key={i}
          style={{
            marginBottom: "0.5rem",
            paddingBottom: "0.5rem",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <strong>{e.type}</strong> – {new Date(e.timestamp).toLocaleString()}
          <div style={{ fontSize: "0.9rem", color: "#555" }}>{e.url}</div>
          {e.type === "click" && (
            <div style={{ fontSize: "0.85rem", color: "#777" }}>
              Click at ({Math.round(e.x ?? 0)}, {Math.round(e.y ?? 0)})
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
