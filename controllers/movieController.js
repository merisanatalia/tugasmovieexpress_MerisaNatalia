import mongoose from "mongoose";
import MovieModel from "../models/movieModel.js"
import movieModel from "../models/movieModel.js";

export const movies = async (req, res)=>{
    try {
        const movies = await movieModel.find({
            createdBy: req.user?.user_id
        }).sort({createdAt : -1});

        return res.status (200).json({
            message : "daftar semua movie",
            data : movies,
        });
        
    }catch(error){
        return res.status(500).json({
            message : "Error",
            error : error.message,
            data : null,
        });
    }
};

export const detailMovie = async (req, res)=>{
    try {
        const id = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json ({
                message : "ID tidak valid",
                data : null
            });
        }

        const movie = await movieModel.findOne({
            _id: id,
            createdBy: req.user?.user_id,
        });

        if (!movie){
            return res.status(404).json ({
                message : "movie tidak valid",
                data : null
            })
        }

        return res.status (200).json({
            message : "detail semua movie",
            data : movie,
        });
        
    }catch(error){
        return res.status(500).json({
            message : "Error",
            error : error.message,
            data : null,
        });
    }
};

export const createMovie = async (req, res)=>{
    try {
        const {judul, tahunRilis, sutradara} = req.body;

        if (!judul || !tahunRilis || !sutradara){
            return res.status(400).json ({
                message : "semua field (judul, tahunRilis, sutradara) wajib di isi",
                data : null
            });        
        }

        const createdMovie = await movieModel.create({judul, tahunRilis, sutradara, createdBy: req.user?.user_id});

        res.status(201).json({
            message: "Movie berhasil dibuat",
            data: createdMovie,
        });
    }catch (error) {
        res.status(500).json({
            message : "Gagal menambahkan movie",
            error: error.message,
            data: null,

        })
    }

    
}
export const updateMovie = async (req, res) => {
    try {
        const id = req.params?.id
        const {judul, tahunRilis, sutradara} = req.body

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Id movie tidak valid",
                data: null
            })
        }
        const updatedMovie = await movieModel.findByIdAndUpdate(
            {
                _id : id,
                createdBy : req.user?.user_id,
            },
            {judul, tahunRilis, sutradara},
            {new: true},
        );

        if (!updatedMovie) {
             return res.status(404).json({
                message: "Movie tidak ditemukan atau akses ditolak",
                data: null,
            });
        }
        return res.status(200).json({
            message: "Movie berhasil di update",
            data: deletedMovie,
        });
    }catch (error) {
        res.status(500).json({
            message: "terjasi kesalahan pada server",
            error : error, message,
            data: null
        })
    }

}

export const deleteMovie = async (req, res)=>{
    try{
        const id = req.params.id

        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return res.status (400).json({
                message : "ID tidak valid",
                data : null,
            });
        }

        const deletedMovie = await movieModel.findOneAndDelete({
            _id: id,
            createdBy: req.user?.user.id,
        });

        if (!deletedMovie) {
            return res.status(404).json({
                message: "Movie tidak ditemukan atau akses ditolak",
                data: null,
            });
        }
        return res.status(200).json({
            message: "Movie berhasil di hapus",
            data: deletedMovie,
        });
    }catch (error) {
        res.status(500).json({
            message: "terjasi kesalahan pada server",
            error : error, message,
            data: null
        })
    }
};

