import mongoose from 'mongoose';
import validate from 'mongoose-validator';

const Schema = mongoose.Schema;
mongoose.promise = Promise;

const EventCounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

export default mongoose.model('Counter', EventCounterSchema);