import express from 'express';
import path from 'path';
const router = express.Router();

router.route('/')
.get( (req, res) => {
  //todo: create html
  res.sendFile(path.dirname(process.mainModule.filename) + '/public/admin.html');
});

export default router;