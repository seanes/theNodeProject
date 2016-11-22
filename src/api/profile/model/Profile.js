import mongoose from 'mongoose';
import validate from 'mongoose-validator';

const karmaValidator = [
    validate({
        validator: 'isInt',
        arguments: {min: 0, max : 3},
        message: 'should be between 0 and 3 int'
    })
];

const isArray = (value) => {
    return Array.isArray(value)
}

const isBinaryStr = [
    validate({
        validate : 'isBase64',
        message : "should be a base64 string"
    })
]

const descriptionValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 1250],
        message: 'should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

const ProfileSchema = new Schema({
    karma : {
        type : Number,
        required : true,
        default : 3,
        validate : karmaValidator
    },
    event_history : {
        type : Array,
        required : true,
        default : [],
        validate : {
            validator: isArray,
            message : 'should be an Array'
        }
    },
    profile_img : {
        type : String,
        required : true,
        default : "",
        validate : isBinaryStr 
    },
    description : {
        type : String,
        required : true,
        default : "",
        validate : descriptionValidator
    }
});


export default mongoose.model('Profile', ProfileSchema);