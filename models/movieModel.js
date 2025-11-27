import mongoose from "mongoose";
import UserModel from "./userModel.js";

const MovieSchema = new mongoose.Schema(
    {
        judul : {
            type : String,
            unique : true,
            required : true,
            trim : true,
        },
        tahunRilis : {
            type : String,
            required : true,
            trim : true,
        },
        sutradara : {
            type : String,
            required : true,
            trim : true,
        },

        // Field relasi
        createdBy: {
            type : mongoose.Types.ObjectId,
            ref : UserModel // referensi ke model user
        }
    },
    {
        timestamps : true,
    },
);
const movieModel = mongoose.model("movie", MovieSchema);

export default movieModel;