const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const path = require('path')
const serveIndex = require('serve-index');
const multer = require('multer');

app.use(express.static(path.resolve(__dirname, "public")));
app.use("/img", serveIndex(path.resolve(__dirname, "public/img")));

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))

app.use(express.static('public'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/');
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        console.log(extname);

        cb(null, `${Date.now()}-${file.originalname.replace(extname, '')}${extname}`);
    },
});

const upload = multer({ storage });


app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully!' });
});


app.get('/', (req, res) => {
    res.send('Trần Thành Nam Đần')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})