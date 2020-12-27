import app from "./app";
import * as dotenv from 'dotenv';

// To use enviornment Variable
dotenv.config();

// Listen to port on 3000 
app.listen(process.env.PORT || 3000, () => {
   console.log(`Express server listening on port ${process.env.PORT || 3000}`);
})