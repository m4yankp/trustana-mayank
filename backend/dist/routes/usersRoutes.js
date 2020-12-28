"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const users_1 = require("../controllers/users");
const auth_1 = require("../controllers/auth");
const fileUpload_1 = require("../utils/fileUpload");
// Users Routes
class UserRoutes {
    constructor() {
        this.user = new users_1.Users();
        this.auth = new auth_1.AuthController();
    }
    route(app) {
        app.post('/api/user', fileUpload_1.uploadSingleFile, this.user.validateData, this.user.post);
        app.post('/api/myData', this.auth.checkLogin, this.user.getDecryptedData);
        app.get('/api/getPublicData', this.auth.checkPublicAccess, this.user.getDataForPublic);
        app.get('/api/decryptedFilePublic/:token', this.auth.checkFileToken, this.user.getDecryptedFile);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnNSb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9yb3V0ZXMvdXNlcnNSb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQTZDO0FBQzdDLDhDQUFxRDtBQUNyRCxvREFBdUQ7QUFFdkQsZUFBZTtBQUNmLE1BQWEsVUFBVTtJQUF2QjtRQUNVLFNBQUksR0FBVSxJQUFJLGFBQUssRUFBRSxDQUFDO1FBQzFCLFNBQUksR0FBbUIsSUFBSSxxQkFBYyxFQUFFLENBQUM7SUFRdEQsQ0FBQztJQU5TLEtBQUssQ0FBQyxHQUFnQjtRQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSw2QkFBZ0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hGLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMxRSxHQUFHLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JGLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7Q0FDSDtBQVZELGdDQVVDIn0=