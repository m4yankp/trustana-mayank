"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv = require("dotenv");
// To use enviornment Variable
dotenv.config();
// Listen to port on 3000 
app_1.default.listen(process.env.PORT || 3000, () => {
    console.log(`Express server listening on port ${process.env.PORT || 3000}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQXdCO0FBQ3hCLGlDQUFpQztBQUVqQyw4QkFBOEI7QUFDOUIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLDBCQUEwQjtBQUMxQixhQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMvRSxDQUFDLENBQUMsQ0FBQSJ9