import movieModel from "..//models/movieModel.js";

export const listMovie = async (req, res)=>{
    try {
        const movie = await movieModel.find({});;

        return res.status (200).json({
            message : "List semua movie",
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
        const request = req.body

        const response = await movieModel.create({
            judul : request.judul,
            tahunRilis : request.tahunRilis,
            sutradara : request.sutradara
        })
        res.status(201).json({
            message: "Movie berhasil dibuat",
            data: response
        })
    }catch (error) {
        res.status(500).json({
            message: error.message,
            data: null

        })
    }
}
export const updateMovie = async (req, res) => {
    try {
        const id = req.params?.id
        const request = req.body
        if (!id) {
            return res.status(500).json({
                message: "Id movie wajib di isi",
                data: null
            })
        }
        const response = await movieModel.findByIdAndUpdate(id, {
            judul : request.judul,
            tahunRilis : request.tahunRilis,
            sutradara : request.sutradara
        })

        if (!response) {
            return res.status(500).json({
                message: "Movie gagal di update",
                data: null
            })
        }
        return res.status(200).json({
            message: "Movie berhasil di update",
            data: null
        })
    } catch (error) {
        res.status(500).json({
            message: error,
            data: null
        })
    }

}

export const deleteMovie = async (req, res)=>{
    try{
        const id = req.params.id

        if(!id){
            return res.status (500).json({
                message : "ID move wajid di isi",
                data : null,
            })
        }
        const movie = await movieModel.findById(id);
        if (movie) {
            return res.status(200).json({
                message: "Movie berhasil dihapus",
                data: null
            })
        }
        return res.status(404).json({
            message: "Movie tidak ditemukan",
            data: null
        })
    }catch (error) {
        res.status(500).json({
            message: error,
            data: null
        })
    }
}

