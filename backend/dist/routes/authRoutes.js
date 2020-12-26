"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const auth_1 = require("../controllers/auth");
class AuthRoutes {
    constructor() {
        this.auth = new auth_1.AuthController();
    }
    route(app) {
        app.post('/api/auth', auth_1.AuthController.login);
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aFJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3JvdXRlcy9hdXRoUm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDhDQUFxRDtBQUNyRCxNQUFhLFVBQVU7SUFBdkI7UUFDVSxTQUFJLEdBQW1CLElBQUkscUJBQWMsRUFBRSxDQUFDO0lBSXRELENBQUM7SUFIUyxLQUFLLENBQUMsR0FBZ0I7UUFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUscUJBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQ0g7QUFMRCxnQ0FLQyJ9