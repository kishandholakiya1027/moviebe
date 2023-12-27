var express = require('express');
const movie = require('../model/movie');
const { getAllMovies, createMovie, editMovie, getOneMovie } = require('../controller/movieController');
var router = express.Router();
const multer = require('multer');
const { validate } = require('express-validation');
const movieValidation = require('../validation/movies');
const verifyToken = require('../middleware/authMiddleware');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file?.fieldname + '-' + uniqueSuffix + '.' + file?.originalname?.split('.')?.pop());
    }
});

const upload = multer({ storage: storage });

/* GET movies listing. */
router.get('/', verifyToken,getAllMovies);
router.get('/:id', verifyToken,getOneMovie);

router.post('/add',verifyToken,  upload.single('image'), createMovie);
// router.post('/add',verifyToken, validate(movieValidation.createMovie), upload.single('image'), createMovie);

router.put('/edit/:id',verifyToken, upload.single('image'), editMovie);

module.exports = router;
