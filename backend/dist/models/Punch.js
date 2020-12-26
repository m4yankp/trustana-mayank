"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PunchSchema = new mongoose_1.Schema({
    qrCode: {
        type: String,
        required: true
    },
    locationId: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true
    },
    created: {
        type: String,
        default: Date.now()
    }
});
const PunchDB = mongoose_1.model('PunchDB', PunchSchema);
exports.default = PunchDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHVuY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9tb2RlbHMvUHVuY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBMEQ7QUFFMUQsTUFBTSxXQUFXLEdBQVcsSUFBSSxpQkFBTSxDQUFDO0lBQ25DLE1BQU0sRUFBQztRQUNILElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxVQUFVLEVBQUM7UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsT0FBTyxFQUFDO1FBQ0osSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtLQUN0QjtDQUNKLENBQUMsQ0FBQTtBQU9GLE1BQU0sT0FBTyxHQUFrQixnQkFBSyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUM3RCxrQkFBZSxPQUFPLENBQUMifQ==