import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    event_name : { type: String, require: true},
    description : { type: String, require: true},
    image : { type: String, require: false},
    capacity : { type: Number, require: true},
    event_date : { type: Date, require: true},
    participation_deadline : { type: Date, require: true},
    event_status : {type : String, enum: ['active', 'expired', 'cancelled'], require: true},
    event_type : {type : String, enum: ["workshop","talk", "party"], require: true},
    event_location : {type : String, require: true},
    participants : {type : Array, default : []},
    hosts : {type: Array, require: true}
});

export default mongoose.model('Event', EventSchema);