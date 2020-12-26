import { model, Schema, Model, Document } from 'mongoose';

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
        required: true
    },
    password:{
        type: String,
        required: true
    },
    filePath:{
        type: Object,
        required: true
    },
    created:{
        type: String,
        default: Date.now()
    }
});

const UsersModel: Model<any> = model('UsersModel', UserSchema);
export default UsersModel;