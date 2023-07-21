const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
    region: process.env.AWS_REGION_NAME,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    bucket: process.env.AWS_BUCKET_NAME,
    secretAccessKey: process.env.AWS_SECRET_KEY
})

console.log(s3)

const multerStorage = multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key(request, file, cb) {
      console.log(file.originalname);
      const imageName = file.originalname;
      const ext = file.originalname.split(".")[1];
      const imageKey = `${imageName}.${ext}`;
      request.imageName = imageKey;
      cb(null, imageKey);
    }
})

const multerFilter = (req, file, callback) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("only jpg & png file supported!!");
      callback(null, false);
      throw new Error("only jpg & png file  are supported");
    }
}

exports.upload = multer({
    storage: multerStorage,
    limit: 3000,
    fileFilter: multerFilter
});

exports.getFile = (fileKey) => {
    try {
        console.log(fileKey)
        const params = {
            Key: fileKey,
            Bucket: process.env.AWS_BUCKET_NAME,
        }
        const image = s3.getObject(params).createReadStream().on('error', error => {
            console.log(error.message)    
        });
        return image;
    } catch (error) {
        console.log(error)
    }
}

exports.deleteFile = (fileKey) => {
    const params = {
        Key: fileKey,
        Bucket: process.env.AWS_BUCKET_NAME
    }
  
    return s3.deleteObject(params).createReadStream()
}
