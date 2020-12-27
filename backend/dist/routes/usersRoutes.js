"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const users_1 = require("../controllers/users");
const auth_1 = require("../controllers/auth");
// Users Routes
class UserRoutes {
    constructor() {
        this.user = new users_1.Users();
        this.auth = new auth_1.AuthController();
    }
    route(app) {
        app.post('/api/user', this.user.validateData, this.user.post);
        app.get('/api/myData', this.auth.checkLogin, this.user.getDecryptedData);
        app.get('/api/getPublicData', this.auth.checkPublicAccess, this.user.getDataForPublic);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnNSb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9yb3V0ZXMvdXNlcnNSb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQTZDO0FBQzdDLDhDQUFxRDtBQUVyRCxlQUFlO0FBQ2YsTUFBYSxVQUFVO0lBQXZCO1FBQ1UsU0FBSSxHQUFVLElBQUksYUFBSyxFQUFFLENBQUM7UUFDMUIsU0FBSSxHQUFtQixJQUFJLHFCQUFjLEVBQUUsQ0FBQztJQU90RCxDQUFDO0lBTFMsS0FBSyxDQUFDLEdBQWdCO1FBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pFLEdBQUcsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDeEYsQ0FBQztDQUNIO0FBVEQsZ0NBU0MifQ==