"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv = require("dotenv");
// To use enviornment Variable
dotenv.config();
app_1.default.listen(process.env.PORT || 3000, () => {
    console.log(`Express server listening on port ${process.env.PORT || 3000}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQXdCO0FBQ3hCLGlDQUFpQztBQUVqQyw4QkFBOEI7QUFDOUIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLGFBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQy9FLENBQUMsQ0FBQyxDQUFBIn0=