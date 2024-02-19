import Message from "../models/Querys";
import { Request, Response } from "express";
import { Messagevalidation } from "../validation/validation";

export const Createmessage = async (req: Request, res: Response) => {
  try {
    const messagecheck = Messagevalidation(req.body);
    if (messagecheck.error) {
      res.send(messagecheck.error);
      return;
    }
    const message = new Message({
      email: req.body.email,
      messages: req.body.messages,
      reply: "",
    });
    await message.save();
    res.send(message);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const Getallmessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.find();
    res.send(message);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const Replymessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.findOne({ _id: req.params.id });

    if (!message) {
      res.status(404).send({ error: "these message are no longer Exist !" });
      return;
    }

    if (req.body.reply) {
      message.reply = req.body.reply;
    }
    await message.save();
    res.send(message);
  } catch (error: any) {
    console.log(error.message);
  }
};
