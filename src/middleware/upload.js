import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// export const upload = multer({
//   storage,
//   limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
// });
export const upload = multer({
  storage: multer.memoryStorage(), // ✅ Vercel-safe
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
});
