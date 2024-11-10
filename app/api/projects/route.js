// app/api/projects/route.js
import { prisma } from "@/lib/prisma";
import multer from "multer";
import path from "path";

// Setup file storage menggunakan multer (simpan di public/uploads)
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads"); // Gambar disimpan di public/uploads
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
}).single("image");  // Field 'image' untuk upload gambar

export async function POST(req, res) {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ error: "File upload failed" });
    }

    const { title, description, tech, bg, slug, category } = req.body;
    const image = req.file ? "/uploads/" + req.file.filename : null; // Simpan path gambar

    try {
      const project = await prisma.project.create({
        data: {
          title,
          description,
          image,
          tech,
          bg,
          slug,
          category,
        },
      });

      return res.status(201).json(project);
    } catch (err) {
      return res.status(500).json({ error: "Failed to create project" });
    }
  });
}
