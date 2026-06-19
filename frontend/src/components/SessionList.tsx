import { useEffect, useState } from "react";
import api from "../api/axios";

type Session = { sessionId: string; count: number };

interface Props {
  onSelect: (id: string) => void;
}

export default function SessionList({ onSelect }: Props) {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    api.get("/sessions").then((res) => setSessions(res.data));
  }, []);

  return (
    <ul className="session-list">
      {sessions.map((s) => (
        <li
          key={s.sessionId}
          className="session-item"
          onClick={() => onSelect(s.sessionId)}
        >
          {s.sessionId.slice(0, 8)}… – {s.count} events
        </li>
      ))}
    </ul>
  );
}
