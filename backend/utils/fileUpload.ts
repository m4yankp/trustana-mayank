// Common functions that can be called anywhere
import { NextFunction, Request, Response } from "express";
const mkdirp = require("mkdirp");
const multer = require('multer');
import slugify from "slugify";


// Validate if uploaded file extension is what we'll be processing
const validateFile = (
    req: Request,
    file: any,
    callBack: (argument1: Error, argument2: boolean) => void,
) => {
    
    if ( file.mimetype === "application/msword" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "application/pdf") {
        return callBack(null, true);
    } else {
        // Else return an error
        const err = new Error("Please make sure you upload only pdf, doc or docx files");
        return callBack(err, false);
    }
};


// Returns a string for folder structure
const getUploadPath = (): string => {
    const dt: Date = new Date();
    return `uplaods/${dt.getFullYear()}/${dt.getMonth()}`;
};

// Create storage engine as per multer documentation
const fileStorage: any = multer.diskStorage({
    destination(req, file, cb) {
        // create a unique path string for every video as per timestamp uploaded
        // so its easy to manage files
        const uploadPath: string = getUploadPath();
        // check if directory exists if not create one
        mkdirp(uploadPath).then((made: string) => {
            // send the file final upload path
            cb(null, uploadPath);
        });
    },
    filename(req: any, file: any, cb: any) {
        // create a slug of file name so its url friendly and save it in upload path
        cb(null, slugify(file.originalname));
    },
});

// Multer upload storage and filter
const upload = multer({
    storage: fileStorage,
    fileFilter: validateFile,
});

// Upload Single File Handler
export const uploadSingleFile = async (req: Request, res: Response, next: NextFunction) => {
    const uploadSingleFile = upload.single("filePath");
    uploadSingleFile(req, res, (err: any) => {
        if (err) {
            return res.status(500).send({
                message: err.message,
                error: true
            });
        } else {
            next();
        }
    });
};