import { model, Schema, Model } from 'mongoose';

// Create User Schema
const UserSchema: Schema = new Schema({
    firstName:{
        type: Object,
        required: true
    },
    lastName:{
        type: Object,
        required: true
    },
    dateOfBirth:{
        type: Object,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    filePath:{
        type: String,
        required: true
    },
    fileType:{
        type: String,
        required: true
    },
    fileName:{
        type: String,
        required: true
    },
    created:{
        type: String,
        default: Date.now()
    }
});


const UsersModel: Model<any> = model('UsersModel', UserSchema);

export default UsersModel;