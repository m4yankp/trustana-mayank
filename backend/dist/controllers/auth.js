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
exports.AuthController = void 0;
class AuthController {
}
exports.AuthController = AuthController;
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
        res.status(400).send({
            "error": true,
            "message": "Unauthorized Access"
        });
    }
    if (!(username == "cnyapp" && password == "uukZ!AC8@!V%B+mG")) {
        res.status(401).send({
            "error": true,
            "message": "Unauthorized Access"
        });
    }
    // const token = jwt.sign(
    //   { userId: 1, username: username }, "2)3K_T@88YBfTSyT",
    //   { expiresIn: "30d" }
    // );
    //Send the jwt in the response
    res.send({
        "message": "Login Success", "success": true
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEsTUFBYSxjQUFjOztBQUEzQix3Q0E2QkM7QUE1QlEsb0JBQUssR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUNuRCx3Q0FBd0M7SUFDeEMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3RDLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsRUFBRTtRQUMzQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNmLE9BQU8sRUFBRSxJQUFJO1lBQ2IsU0FBUyxFQUFFLHFCQUFxQjtTQUNuQyxDQUFDLENBQUM7S0FDTjtJQUVELElBQUcsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLElBQUksUUFBUSxJQUFJLGtCQUFrQixDQUFDLEVBQzVEO1FBQ0ksR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakIsT0FBTyxFQUFFLElBQUk7WUFDYixTQUFTLEVBQUUscUJBQXFCO1NBQ25DLENBQUMsQ0FBQztLQUNOO0lBRUQsMEJBQTBCO0lBQzFCLDJEQUEyRDtJQUMzRCx5QkFBeUI7SUFDekIsS0FBSztJQUVMLDhCQUE4QjtJQUM5QixHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ0wsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsSUFBSTtLQUFDLENBQUMsQ0FBQztBQUVwRCxDQUFDLENBQUEsQ0FBQyJ9