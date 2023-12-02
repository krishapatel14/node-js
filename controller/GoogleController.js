const path = require("path");
//const { google } = require("googleapis");
const { google } = require("googleapis");
const KEYFILEPATH = "./googlekeys.json";
const GOOGLE_DRIVE_FOLDER_ID = "1q9CULrwVRkNX4v4Pn_gfm24GrxR3H6nI";
const fs = require("fs");

async function uploadFile(file) {
  var p = path.basename(file);
  console.log(p);

  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  const driveService = google.drive({ version: "v3", auth });
  const fileMetadata = {
    name: p,
    parents: [GOOGLE_DRIVE_FOLDER_ID],
  };
  const media = {
    mimeType: "image/jpg",
    body: fs.createReadStream(file),
  };
  const response = await driveService.files.create({
    resource: fileMetadata,
    media: media,
    fields: "id",
  });
  console.log(".....id.",response.data.id);
  return response.data.id;
}

module.exports = {
    uploadFile,
}