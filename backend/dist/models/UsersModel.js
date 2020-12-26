"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
        required: true
    },
    password: {
        type: String,
        required: true
    },
    filePath: {
        type: Object,
        required: true
    },
    created: {
        type: String,
        default: Date.now()
    }
});
const UsersModel = mongoose_1.model('UsersModel', UserSchema);
exports.default = UsersModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnNNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy9Vc2Vyc01vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQTBEO0FBRTFELE1BQU0sVUFBVSxHQUFXLElBQUksaUJBQU0sQ0FBQztJQUNsQyxTQUFTLEVBQUM7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsUUFBUSxFQUFDO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELFdBQVcsRUFBQztRQUNSLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxPQUFPLEVBQUM7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsUUFBUSxFQUFDO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELFFBQVEsRUFBQztRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxRQUFRLEVBQUM7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsT0FBTyxFQUFDO1FBQ0osSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtLQUN0QjtDQUNKLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFlLGdCQUFLLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQy9ELGtCQUFlLFVBQVUsQ0FBQyJ9