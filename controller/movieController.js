const Movie = require("../model/movie");

const getAllMovies = async (req, res) => {
    const { page = 1, limit = 8 } = req.query;
    try {
        const movies = await Movie.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      const count = await Movie.countDocuments();
  
 
        res.status(200).json({
            movies,
            totalPages: Math.ceil(count / limit),
            currentPage: page
          });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createMovie = async (req, res) => {
    try {
        const movie = await Movie.create({
            title: req?.body?.title,
            publish_year: req?.body?.publish_year,
            image: req?.file?.path?.replace("public",""),
            user_id: req?.user?._id
        });
        res.status(200).json(movie);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const editMovie = async (req, res) => {
    try {
        if (req?.file) {
            req.body.image = req?.file?.path;
        }
        const updateData = await Movie.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(updateData);

    } catch (e) {
        res.status(400).json({ message: err.message });

    }
}

const getOneMovie = async (req, res) => {
    try {
        await Movie.findById(req.params.id).then(data => {
            res.status(200).json(data)
        })
    } catch (err) {
        res.status(400).json({ message: err.message });
        
    } 
}

module.exports = { getAllMovies, createMovie,editMovie,getOneMovie }