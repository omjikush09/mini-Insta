import dotenv from "dotenv";
export const env = dotenv.config();
















//Other method to preload env in ES6 
// 1.
//in Package json
//"scripts": {
//     "start": "node -r dotenv/config app.js"
//   },


//2. Place env config in other file and import in form there in your app.js
