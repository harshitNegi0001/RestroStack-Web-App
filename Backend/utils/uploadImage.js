import cloudinary from '../config/cloudinary.js';


export const uploadImage = async (req) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'RestroStack/res_logo',
                resource_type: 'image'
            },
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result.secure_url);
                }
            }
        );

        uploadStream.end(req.file.buffer);
    })
}