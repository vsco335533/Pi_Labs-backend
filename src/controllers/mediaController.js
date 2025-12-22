import fs from "fs";
import path from "path";
import Media from "../models/media.js";
import { saveLocalFile } from "../services/mediastorage.js";

export const uploadMedia = async (req, res) => {
  try {
    const { title, type } = req.body;
            if (!req.file) {
            return res.status(400).json({ error: "File missing" });
          }

          const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;


    const media = await Media.create({
      title,
      type,
      url,
      uploadedBy: req.user.id,
      status: req.user.role === "super_admin" ? "approved" : "pending",
    });

    res.status(201).json(media);
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ error: "Media not found" });
    }

    // Only admin can delete
    if (req.user.role !== "super_admin") {
      return res.status(403).json({ error: "Not allowed" });
    }

    // Delete file from uploads
    const filePath = path.join(
      process.cwd(),
      media.url.replace(`${req.protocol}://${req.get("host")}`, "")
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await media.deleteOne();

    res.json({ message: "Media deleted successfully" });
  } catch (err) {
    console.error("Delete media error:", err);
    res.status(500).json({ error: "Failed to delete media" });
  }
};


export const getMedia = async (req, res) => {
  const { type } = req.query;
  const media = await Media.find({
    ...(type && { type }),
    status: "approved",
  }).sort({ createdAt: -1 });

  res.json(media);
};

export const approveMedia = async (req, res) => {
  await Media.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ message: "Approved" });
};
