import { Router } from "express";
import { Event } from "../models/Event.js";

const router = Router();

// store a single event
router.post("/events", async (req, res) => {
  try {
    const ev = new Event(req.body);
    await ev.save();
    res.status(201).json({ success: true });
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
});

// list sessions with event counts
router.get("/sessions", async (_, res) => {
  const agg = await Event.aggregate([
    { $group: { _id: "$sessionId", count: { $sum: 1 } } },
    { $project: { sessionId: "$_id", count: 1, _id: 0 } },
    { $sort: { count: -1 } },
  ]);
  res.json(agg);
});

// events for a session
router.get("/sessions/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  const events = await Event.find({ sessionId }).sort({ timestamp: 1 });
  res.json(events);
});

// click coordinates for a page 
router.get("/clicks", async (req, res) => {
  const { url } = req.query as { url?: string };
  if (!url) return res.status(400).json({ error: "url query param required" });
  const clicks = await Event.find({ type: "click", url }, "x y");
  res.json(clicks);
});

export default router;
