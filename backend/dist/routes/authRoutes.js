"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const auth_1 = require("../controllers/auth");
// Authorization Routes for creating tokens
class AuthRoutes {
    constructor() {
        this.auth = new auth_1.AuthController();
    }
    route(app) {
        app.post('/api/auth', auth_1.AuthController.login);
        app.post('/api/createTemporaryToken', this.auth.checkLogin, this.auth.createTemporaryToken);
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aFJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3JvdXRlcy9hdXRoUm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDhDQUFxRDtBQUVyRCwyQ0FBMkM7QUFDM0MsTUFBYSxVQUFVO0lBQXZCO1FBQ1UsU0FBSSxHQUFtQixJQUFJLHFCQUFjLEVBQUUsQ0FBQztJQUt0RCxDQUFDO0lBSlMsS0FBSyxDQUFDLEdBQWdCO1FBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLHFCQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDaEcsQ0FBQztDQUNIO0FBTkQsZ0NBTUMifQ==