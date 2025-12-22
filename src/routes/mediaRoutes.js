import express from "express";
import { authenticate } from "../middleware/auth.js";
// import { mediaUpload } from "../middleware/mediaupload.js";
import { upload } from "../middleware/upload.js";
import { deleteMedia } from "../controllers/mediaController.js";
import { requireAdmin } from "../middleware/auth.js";
import {
  uploadMedia,
  getMedia,
  approveMedia,
} from "../controllers/mediaController.js";

const router = express.Router();

router.get("/", getMedia);

router.post(
  "/upload",
  authenticate,
  requireAdmin,
  upload.single("file"),
  uploadMedia
);
router.post("/:id/approve", authenticate, approveMedia);
router.delete("/:id", authenticate, deleteMedia);

export default router;
