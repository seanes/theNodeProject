import mongoose from 'mongoose';
import validate from 'mongoose-validator';

const Schema = mongoose.Schema;
mongoose.promise = Promise;

const PartnerSchema = Schema({
    name : {type: String, required: true},
    email : {type: String, required: true},
    phone : {type: String, required: true},
    picture : {type: String, default : ""},
    created : {type: Date, default : Date.now()},
    
});

export default mongoose.model('Partner', PartnerSchema);