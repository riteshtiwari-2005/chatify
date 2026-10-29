const { io, getReceiverSocketId } = require("../SocketIO/server");
const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

const sendMessage = async (req, res) => {
    try {
        const { message, latitude, longitude } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({ error: "Message is required" });
        }

        const hasLatitude = latitude !== undefined;
        const hasLongitude = longitude !== undefined;
        if (hasLatitude !== hasLongitude) {
            return res.status(400).json({ error: "Both latitude and longitude are required" });
        }

        if (
            hasLatitude &&
            (!Number.isFinite(latitude) ||
                !Number.isFinite(longitude) ||
                latitude < -90 ||
                latitude > 90 ||
                longitude < -180 ||
                longitude > 180)
        ) {
            return res.status(400).json({ error: "Invalid coordinates" });
        }

        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message: message.trim(),
            ...(hasLatitude ? { latitude, longitude } : {}),
        });

        conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        const senderSocketId = getReceiverSocketId(senderId); // Get sender's socket ID as well

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        if (senderSocketId) {
            io.to(senderSocketId).emit("newMessage", newMessage); // Emit to sender as well
        }

        res.status(200).json(newMessage);
    } catch (error) {
        console.error("Error sending message:", error.stack || error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getMessage = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id; // current logged-in user
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, chatUser] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error retrieving messages:", error.stack || error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { sendMessage, getMessage };
