import mongoose from 'mongoose';
import validate from 'mongoose-validator';

const Schema = mongoose.Schema;
mongoose.promise = Promise;

const PartnerSchema = new Schema({
    name : {
        type : String,
    },
    email : {
        type : String
    },
    phone : {
        type : String
    },
    depatment : {
        type : String
    },
    picture : {
        type : String
    },
    created : {
        type : Date,
        default : Date.now()
    }
});


export default mongoose.model('Partner', PartnerSchema);