const {MockupClient} = require("./client");
const CloudinaryServices = require("./cloudinary");
const client = new MockupClient('mduc017@gmail.com', 'ducTruong808@');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
EMP_FILE_PATH = 'data/shopping_center_employees_final.csv';


const run = async () => {

    // const cloudinary = new CloudinaryServices();
    await client.signIn();
    console.log('token:', client.token);
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

    await client.empFaceMapping();
}

run();