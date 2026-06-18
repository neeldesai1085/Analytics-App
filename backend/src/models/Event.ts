import { Schema, model, Document } from "mongoose";

export interface IEvent extends Document {
    sessionId: string;
    type: "page_view" | "click";
    url: string;
    timestamp: Date;
    x?: number;
    y?: number;
}

const EventSchema = new Schema<IEvent>({
    sessionId: { type: String, required: true },
    type: { type: String, enum: ["page_view", "click"], required: true },
    url: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    x: Number,
    y: Number,
});

export const Event = model<IEvent>("Event", EventSchema);