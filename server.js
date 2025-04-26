const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// アップロード先の設定（uploadsフォルダ）
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Multerミドルウェアのセットアップ
const upload = multer({ storage: storage });

// 静的ファイルの提供（HTMLなど）
app.use(express.static('public'));

// ファイルアップロード処理
app.post('/upload', upload.single('iso'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'ファイルがありません' });
  }

  // 成功時にアップロードされたファイル名を返す
  res.json({ message: 'ファイルがアップロードされました', filename: req.file.filename });
});

// サーバー起動
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`サーバーがポート${PORT}で起動しています`);
});
