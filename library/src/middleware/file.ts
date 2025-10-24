import multer from "multer";

const storage = multer.diskStorage({
  destination(req: any, file: any, cb: any) {
    cb(null, "public/books");
  },
  filename(req: any, file: any, cb: any) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "text/plain") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default multer({ storage, fileFilter });