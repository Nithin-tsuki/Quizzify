import multer from 'multer';

const storage = multer.memoryStorage(); // keep files in memory for cloud upload

const upload = multer({ storage });

export default upload;
