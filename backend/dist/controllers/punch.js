"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Punch = void 0;
const Punch_1 = require("../models/Punch");
class Punch {
    constructor() {
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.locationID && req.body.bookletCode && isFinite(req.body.locationID) && (req.body.locationID == 1 || req.body.locationID == 2 || req.body.locationID == 3 || req.body.locationID == 4)) {
                const punch = yield Punch_1.default.create({
                    qrCode: req.body.locationID,
                    locationId: req.body.bookletCode
                });
                res.status(200).send({
                    "success": true,
                    "error": false,
                    "message": "Punch Successful!",
                    "data": punch
                });
            }
            else {
                res.status(422).send({
                    "success": false,
                    "error": true,
                    "message": "Please make sure you send valid locationID & bookletCode"
                });
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const punch = yield Punch_1.default.find({});
            res.status(200).send({
                "success": true,
                "error": false,
                "message": "Punch Data!",
                "data": punch
            });
        });
    }
}
exports.Punch = Punch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVuY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy9wdW5jaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBZ0Q7QUFFaEQsTUFBYSxLQUFLO0lBQWxCO1FBQ1csU0FBSSxHQUFHLENBQU0sR0FBVyxFQUFDLEdBQVksRUFBRSxFQUFFO1lBQzVDLElBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsRUFBQztnQkFDOUwsTUFBTSxLQUFLLEdBQVcsTUFBTSxlQUFPLENBQUMsTUFBTSxDQUFDO29CQUN2QyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVO29CQUMzQixVQUFVLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXO2lCQUNuQyxDQUFDLENBQUM7Z0JBRUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ2pCLFNBQVMsRUFBQyxJQUFJO29CQUNkLE9BQU8sRUFBRSxLQUFLO29CQUNkLFNBQVMsRUFBRSxtQkFBbUI7b0JBQzlCLE1BQU0sRUFBRSxLQUFLO2lCQUNoQixDQUFDLENBQUM7YUFDTjtpQkFFRDtnQkFDSSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDakIsU0FBUyxFQUFFLEtBQUs7b0JBQ2hCLE9BQU8sRUFBRSxJQUFJO29CQUNiLFNBQVMsRUFBRSwwREFBMEQ7aUJBQ3hFLENBQUMsQ0FBQTthQUNMO1FBQ0wsQ0FBQyxDQUFBLENBQUE7UUFDTSxXQUFNLEdBQUcsQ0FBTSxHQUFXLEVBQUUsR0FBWSxFQUFFLEVBQUU7WUFDL0MsTUFBTSxLQUFLLEdBQWEsTUFBTSxlQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNqQixTQUFTLEVBQUMsSUFBSTtnQkFDZCxPQUFPLEVBQUUsS0FBSztnQkFDZCxTQUFTLEVBQUUsYUFBYTtnQkFDeEIsTUFBTSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFBLENBQUE7SUFDTCxDQUFDO0NBQUE7QUFqQ0Qsc0JBaUNDIn0=