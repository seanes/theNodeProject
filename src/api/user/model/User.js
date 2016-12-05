import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;
mongoose.promise = Promise;

const pwValidator = [
    validate({
        validator: 'isLength',
        arguments: [4, 250],
        message: 'should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

const isEmail = [
    validate({
        validator: 'isEmail',
        message: 'should be a mail'
    }),
    validate({
        validator : 'matches',
        arguments : /^[A-Z0-9._%+-]+@soprasteria.com$/i,
        messge : 'should be a soprasteria mail'
    })
];

const hashValidation = [
    validate({
        validator: 'isLength',
        arguments: [50],
        message: "should have a hash, we know who you are!"
    })
];

const isEnum = [
    validate({
        validator: 'matches'
    })
];


const UserSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        default : "",
        validate : isEmail
    },
    pw : {
        type : String,
        required : true,
        default : "",
        validate : pwValidator 
    },
    role : {
        type : String,
        enum: ['admin', 'member'], 
        required : true,
        default : "",
        validate : isEnum
    },
    active : {
        type : Boolean,
        required : true,
        default : false
    },
    activationHash : {
        type : String,
        required : true,
        default : "",
        validate : hashValidation
    },
    resetPwToken : {
        type : String,
        required : false,
        default : ""
    },
    resetPwExpires : {
        type : String,
    },
    created : {
        type : Date,
        required : true,
        default : new Date()
    }
});

const user = this;

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = (password, userPassword) => {
    return bcrypt.compareSync(password, userPassword);
}

export default mongoose.model('User', UserSchema);