import { useEffect, useState } from "react";
import api from "../api/axios";

type Click = { x: number; y: number };

interface Props {
  url: string;
}

// Minimal heatmap container – subtle border, light background
export default function Heatmap({ url }: Props) {
  const [clicks, setClicks] = useState<Click[]>([]);

  useEffect(() => {
    api
      .get(`/clicks?url=${encodeURIComponent(url)}`)
      .then((res) => setClicks(res.data));
  }, [url]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        border: "1px solid #ccc",
        overflow: "hidden",
        background: "#fafafa",
      }}
    >
      {clicks.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: "8px",
            height: "8px",
            background: "rgba(255,0,0,0.6)",
            borderRadius: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      ))}
    </div>
  );
}
