import multer, { type StorageEngine } from "multer";
import { type Request } from "express";

interface FileFilter {
  (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void;
};

const storage: StorageEngine = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/books");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter: FileFilter = (req, file, cb) => {
  if (file.mimetype === "text/plain") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default multer({ storage, fileFilter });