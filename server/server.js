import express from 'express'
import expressFileUpload from 'express-fileupload'
import path from 'path'
const app = express();


app.use(expressFileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'temp')
}));

app.get('/', (req, res) => {
  res.send(`
    <form action="" method="POST" enctype="multipart/form-data">
    <input type="file" name="target_file" required>
    <input type="submit" value="Upload">
</form>
    `);
});

app.post('/', (req, res) => {
  if (Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploads')
  }

  let target_file = req.files.target_file;

  target_file.mv(path.join(__dirname, 'uploads', target_file.name), (err) => {
    if (err) throw err;
    res.send('File Uploaded');
  })
});

app.listen(3000, () => console.log('Your app listening on port 3000'));