import mongoose from 'mongoose';
import validate from 'mongoose-validator';

const Schema = mongoose.Schema;
mongoose.promise = Promise;

const karmaValidator = [
    validate({
        validator: 'isInt',
        arguments: {min: 0, max : 3},
        message: 'should be between 0 and 3 int'
    })
];

const StringValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

const LocationSchema = new Schema({
    name : {
        type : String,
        required : true,
        default : "",
        validate : StringValidator
    },
    address : {
        type : String,
        required : true,
        default : "",
        validate : StringValidator
    },
    etg : {
        type : Number,
        required : true,
        default : "",
    },
    coordinates : {
        type : [Number],
        required : true,
        default : []
    },
});


export default mongoose.model('Location', LocationSchema);