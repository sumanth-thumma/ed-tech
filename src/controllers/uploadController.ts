import { Request, Response } from 'express';

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  return res.status(201).json({
    message: 'Uploaded successfully',
    file: {
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      mimetype: req.file.mimetype,
      size: req.file.size
    }
  });
};
