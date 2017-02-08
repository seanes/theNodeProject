import mongoose from 'mongoose';
import validate from 'mongoose-validator';

const Schema = mongoose.Schema;
mongoose.promise = Promise;


const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

const descValidator = [
    validate({
        validator: 'isLength',
        arguments: [10, 350],
        message: 'should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

const isNumber = [
    validate({
        validator: 'isNumeric',
        message: 'should be a number'
    })
];

const isEnum = [
    validate({
        validator: 'matches'
    })
];

const isAfter = (value) => {
    return new Date() < new Date(value);
}

const isDate = [
    validate({
        validator: "isDate",
        message: "should be a date"
    })
];


const EventSchema = new Schema({
    user_code: {
        type: String
    },
    event_name : { 
        type: String, 
        require: true, 
        default:"", 
        validate: nameValidator
    },
    description : { 
        type: String, 
        require: true, 
        default:"", 
        validate: descValidator
    },
    duration_hours : {
      type: Number,
      required: true,
      default: 2,
      validate: isNumber
    },
    image : {
        type: String, 
        require: false,
        default: ""
    },
    capacity : {
        type: String, 
        require: true, 
        default: "", 
        validate: isNumber
    },
    event_date : { 
        type: Date, 
        require: true, 
        default: "",
        validate : {
            validator : isAfter,
            message : 'should be a date before, ' + new Date().toString()
        }
    },
    participation_deadline : { 
        type: Date, 
        require: true,
        default: "",
        validate : {
            validator : isAfter,
            message : 'should be a date before, ' + new Date().toString()
        }
    },
    event_status : {
        type : String, 
        enum: ['active', 'expired', 'cancelled'], 
        require: true,
        default: "",
        validate: isEnum
    },
    event_type : {
        type : String, 
        enum: ["workshop","talk", "party"], 
        require: true,
        default : "",
        validate: isEnum
    },
    event_location : { type: Schema.Types.ObjectId, ref: 'Location' },
    participants : [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
    hosts : [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
    attended_participants: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
    created: {
        type: Date,
        default: new Date()
    },
    modified: {
        type: Date,
        default: new Date()
    },
    hidden: {
        type: Boolean,
        default: false
    }
});

/*EventSchema.pre('save', (next) => {
    Counter.findByIdAndUpdate({_id: 'eventCounter'}, {$inc: { seq: 1} }, (error, counter) => {
        if(error)
            return next(error);
        next();
    });
})*/

export default mongoose.model('Event', EventSchema);