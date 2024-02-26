import mongoose from "mongoose";

export interface Imessages {
  email: string;
  messages: string;
  reply: string;
}

const message = new mongoose.Schema<Imessages>({
  email: String,
  messages: String,
  reply: { type: String, default: "" },
});

const Message = mongoose.model<Imessages>("message", message);
export default Message;
