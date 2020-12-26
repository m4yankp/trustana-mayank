"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv = require("dotenv");
dotenv.config();
app_1.default.listen(process.env.PORT || 3000, () => {
    console.log(`Express server listening on port ${process.env.PORT || 3000}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQXdCO0FBQ3hCLGlDQUFpQztBQUVqQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsYUFBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7QUFDL0UsQ0FBQyxDQUFDLENBQUEifQ==