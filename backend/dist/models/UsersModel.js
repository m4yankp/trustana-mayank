"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Create User Schema
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: Object,
        required: true
    },
    lastName: {
        type: Object,
        required: true
    },
    dateOfBirth: {
        type: Object,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    created: {
        type: String,
        default: Date.now()
    }
});
const UsersModel = mongoose_1.model('UsersModel', UserSchema);
exports.default = UsersModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnNNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy9Vc2Vyc01vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQWdEO0FBRWhELHFCQUFxQjtBQUNyQixNQUFNLFVBQVUsR0FBVyxJQUFJLGlCQUFNLENBQUM7SUFDbEMsU0FBUyxFQUFDO1FBQ04sSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELFFBQVEsRUFBQztRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxXQUFXLEVBQUM7UUFDUixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsT0FBTyxFQUFDO1FBQ0osSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELFFBQVEsRUFBQztRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFDO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELFFBQVEsRUFBQztRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxRQUFRLEVBQUM7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsUUFBUSxFQUFDO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELE9BQU8sRUFBQztRQUNKLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7S0FDdEI7Q0FDSixDQUFDLENBQUM7QUFHSCxNQUFNLFVBQVUsR0FBZSxnQkFBSyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztBQUUvRCxrQkFBZSxVQUFVLENBQUMifQ==