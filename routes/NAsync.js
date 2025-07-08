// const { google } = require("googleapis");
// const { MongoClient } = require("mongodb");
// require("dotenv").config({ path: "../.env" });
// const fs = require("fs");

// // Auth setup
// const auth = new google.auth.GoogleAuth({
//   keyFile: "../auth/credentials.json",
//   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
// });

// async function syncData() {
//   const authClient = await auth.getClient();
//   const sheets = google.sheets({ version: "v4", auth: authClient });

//   // Connect to MongoDB
//   const client = new MongoClient(process.env.MONGODB_URI);
//   await client.connect();
//   const db = client.db(); // default DB
//   const submissions = await db.collection("submissions").find().toArray();

//   // Convert to rows
//   const header = ["Name", "Email", "Message", "Status", "createdAt"]; // customize to your form fields
//   const rows = submissions.map((doc) => [
//     doc.name,
//     doc.email,
//     doc.message,
//     doc.status,
//     doc.createdAt,
//   ]);

//   // Clear old data and write new
//   await sheets.spreadsheets.values.clear({
//     spreadsheetId: process.env.SHEET_ID,
//     range: "Sheet1!A1:Z1000",
//   });

//   await sheets.spreadsheets.values.update({
//     spreadsheetId: process.env.SHEET_ID,
//     range: "Sheet1!A1",
//     valueInputOption: "RAW",
//     requestBody: {
//       values: [header, ...rows],
//     },
//   });

//   console.log("Data synced to Google Sheets.");
//   await client.close();
// }

// syncData().catch(console.error);


