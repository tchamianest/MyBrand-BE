import mongoose from "mongoose";

export interface Imessages {
  email: string;
  messages: string;
  reply: string;
}

const message = new mongoose.Schema<Imessages>({
  email: String,
  messages: String,
  reply: String,
});

const Message = mongoose.model<Imessages>("message", message);
export default Message;
