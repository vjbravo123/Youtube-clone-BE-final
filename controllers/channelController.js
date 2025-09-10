import mongoose from "mongoose";
import Channel from "../models/Channel.js";

// Get all channels
export const getChannels = async (req, res) => {
  try {
    const channels = await Channel.find(); // no populate since owner doesn't exist
    res.json(channels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get channel by ID or handle
export const getChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const idOrHandle = id;  
   
    

    const channel = mongoose.Types.ObjectId.isValid(idOrHandle)
      ? await Channel.findById(idOrHandle)
      : await Channel.findOne({ handle: idOrHandle });

    if (!channel) return res.status(404).json({ message: "Channel not found" });

    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get channel by user (now unnecessary if no owner, optional endpoint)
export const getChannelByUser = async (req, res) => {
  res.status(400).json({ message: "Channel owner data not available" });
};

// Create channel
export const createChannel = async (req, res) => {
  try {
    const { name, handle, description } = req.body;

    const newChannel = new Channel({ name, handle, description });
    await newChannel.save();

    res.status(201).json(newChannel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update channel
export const updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete channel
export const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findByIdAndDelete(req.params.id);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    res.json({ message: "Channel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
