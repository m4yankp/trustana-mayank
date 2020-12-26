"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const users_1 = require("../controllers/users");
class UserRoutes {
    constructor() {
        this.user = new users_1.Users();
    }
    route(app) {
        app.post('/api/user', this.user.validateData, this.user.post);
        app.get('/api/user', this.user.getAll);
        app.get('/api/jwt', this.user.createToken);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnNSb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9yb3V0ZXMvdXNlcnNSb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQTZDO0FBRTdDLE1BQWEsVUFBVTtJQUF2QjtRQUNVLFNBQUksR0FBVSxJQUFJLGFBQUssRUFBRSxDQUFDO0lBT3BDLENBQUM7SUFMUyxLQUFLLENBQUMsR0FBZ0I7UUFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5RCxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNIO0FBUkQsZ0NBUUMifQ==