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
    res.status(200).json({ status: "success", message });
  } catch (error: any) {
    res.status(400).json({
      status: "Success",
      message: "fail to create a message",
      Error: error,
    });
  }
};

export const Getallmessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.find();
    res.status(200).json({ status: "Success", message });
  } catch (error: any) {
    res.status(400).json({
      status: "Success",
      message: "fail to Get all message",
      Error: error,
    });
  }
};

export const Replymessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.findOne({ _id: req.params.id });

    if (!message) {
      return res
        .status(404)
        .json({ status: "Fail", error: "these message are no longer Exist !" });
    }

    if (req.body.reply) {
      message.reply = req.body.reply;
    }
    await message.save();
    res.status(200).json({ status: "Success", message });
  } catch (error: any) {
    res
      .status(404)
      .json({ status: "Success", message: "fail to reply", Error: error });
  }
};
