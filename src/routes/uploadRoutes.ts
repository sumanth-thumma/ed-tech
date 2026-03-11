import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { protect } from '../middleware/authMiddleware';
import { uploadFile } from '../controllers/uploadController';
import { asyncHandler } from '../utils/asyncHandler';

const uploadDir = path.resolve('src/uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`)
});

const upload = multer({ storage });
const router = Router();

router.post('/', protect, upload.single('file'), asyncHandler(uploadFile));

export default router;
