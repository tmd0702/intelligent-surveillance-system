const cloudinary = require('cloudinary').v2;
cloudinary.config({
    secure: true
});
const config = require('config');

class CloudinaryServices {
    constructor() {
        cloudinary.config({
            cloud_name: "dozymxbn0",
            api_key: "163165859167951",
            api_secret: "pqD5GU9iDpbUzUDYfbCOZ8w0lI8"
        });
    }

    async uploadImage(imageData="https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg") {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            upload_preset: "kltn-preset"
        };

        try {
            const result = await cloudinary.uploader.upload(imageData, options);
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async destroyImage(publicId) {
        try {
            await cloudinary.uploader.destroy(publicId);
            return true;
        } catch(err) {
            console.log(err)
            return false;
        }

    }

    fetchUrl(publicId) {
        const url = cloudinary.url(publicId);
        return url;
    }
}

module.exports = CloudinaryServices;