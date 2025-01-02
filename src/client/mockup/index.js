const {MockupClient} = require("./client");
const CloudinaryServices = require("./cloudinary");
const client = new MockupClient('mduc017@gmail.com', 'ducTruong808@');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
EMP_FILE_PATH = 'data/shopping_center_employees_final.csv';

function convertImageToBase64(filePath) {
    try {
        // Read the file from the given path
        const fileBuffer = fs.readFileSync(filePath);
        // Convert the file buffer to a Base64 string
        const base64String = fileBuffer.toString('base64');
        return base64String;
    } catch (err) {
        console.error("Error reading or converting the image:", err);
        throw err;
    }
}
const run = async () => {

    // const cloudinary = new CloudinaryServices();
    await client.signIn();
    console.log('token:', client.token);
    const platesDir = "/home/duc-softzone/intelligent-surveillance-system/src/plate-recog/src/datasets/test/images";
    const facesDir = "/home/duc-softzone/intelligent-surveillance-system/src/client/mockup/data/faces";

// Read all files from the plates directory
    fs.readdir(platesDir, async (err, plateFiles) => {
        if (err) {
            console.error("Error reading plates directory:", err);
            return;
        }

        // Loop through each plate file
        for (const plateFile of plateFiles) {
            const platePath = path.join(platesDir, plateFile);

            // Ensure it's a file
            if (fs.statSync(platePath).isFile()) {
                // Use a corresponding face image (replace this logic as needed)
                const faceFile = "150520.jpg"; // Replace with your desired logic for matching face files
                const facePath = path.join(facesDir, faceFile);

                // Ensure the face file exists
                if (fs.existsSync(facePath)) {
                    const data = {
                        plate_b64: convertImageToBase64(platePath),
                        face_b64: convertImageToBase64(facePath)
                    };

                    try {
                        // Call the vehicleCheckIn function
                        const result = await client.vehicleCheckIn(data, client.token);
                        console.log(`Result for ${plateFile}:`, result);
                    } catch (err) {
                        console.error(`Error processing ${plateFile}:`, err);
                    }
                } else {
                    console.error(`Face file not found for ${plateFile}`);
                }
            }

        }
    });
    // const result = await cloudinary.uploadImage();
    // console.log(result.secure_url);
    // fs.createReadStream(EMP_FILE_PATH)
    //     .pipe(csv())
    //     .on('data', (row) => {
    //         console.log(row);
    //         client.addEmployee(row, client.token);
    //     })
    //     .on('end', () => {
    //         console.log('CSV file successfully processed.');
    //     })
    //     .on('error', (error) => {
    //         console.error('Error reading CSV file:', error);
    //     });

    // products.forEach(async(product) => {
    //     await client.addItem(product, client.token);
    // })
    //await client.addItem(products[0], client.token);

    // await client.empFaceMapping();
}

run();