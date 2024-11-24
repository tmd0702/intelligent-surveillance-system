const {MockupClient} = require("./client");
const CloudinaryServices = require("./cloudinary");
const client = new MockupClient('mduc017@gmail.com', 'ducTruong808@');

const run = async () => {
    const cloudinary = new CloudinaryServices();
    await client.signIn();
    console.log('token:', client.token);
    // const result = await cloudinary.uploadImage();
    // console.log(result.secure_url);
    const products = [
        {
            "name":"Durable Phone",
            "category_id":"5b98dbc6-a811-444b-9465-c0f34ceac2ef",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Clothing item.",
            "price":71.13,
            "sale_price":395.52,
            "stock":98,
            "image":[

            ]
        },
        {
            "name":"Premium Table",
            "category_id":"04772945-7f43-4c90-9623-a402eb0d6f18",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Clothing item.",
            "price":218.38,
            "sale_price":120.28,
            "stock":88,
            "image":[

            ]
        },
        {
            "name":"Premium Wallet",
            "category_id":"51384a21-7667-4934-89ec-7e123020092a",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Clothing item.",
            "price":387.36,
            "sale_price":239.48,
            "stock":40,
            "image":[

            ]
        },
        {
            "name":"Premium Wallet",
            "category_id":"f3f91720-e317-4465-8abd-5500ab2cf527",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Clothing item.",
            "price":104.84,
            "sale_price":379.75,
            "stock":20,
            "image":[

            ]
        },
        {
            "name":"Modern Cookies",
            "category_id":"5b98dbc6-a811-444b-9465-c0f34ceac2ef",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Clothing item.",
            "price":361.16,
            "sale_price":416.4,
            "stock":36,
            "image":[

            ]
        },
        {
            "name":"Compact Tea",
            "category_id":"9743ad02-8cc5-49f9-912f-90906601c729",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Clothing item.",
            "price":173.76,
            "sale_price":188.63,
            "stock":15,
            "image":[

            ]
        },
        {
            "name":"Durable Necklace",
            "category_id":"1cfc72ab-de10-4a29-95cc-0a4b7b2bc498",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Clothing item.",
            "price":88.46,
            "sale_price":204.35,
            "stock":32,
            "image":[

            ]
        },
        {
            "name":"Compact Wallet",
            "category_id":"63871074-5ebd-4cbb-ae01-4156fcef3379",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Clothing item.",
            "price":288.46,
            "sale_price":23.66,
            "stock":91,
            "image":[

            ]
        },
        {
            "name":"Classic Phone",
            "category_id":"a669b6f6-4144-492f-8e21-89b5b03910a7",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Clothing item.",
            "price":368.44,
            "sale_price":399.32,
            "stock":26,
            "image":[

            ]
        },
        {
            "name":"Stylish Headphones",
            "category_id":"f8f262c4-f726-439e-8ce3-0cb2ec12c2f3",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Accessories item.",
            "price":217.58,
            "sale_price":10.24,
            "stock":39,
            "image":[

            ]
        },
        {
            "name":"Elegant T-Shirt",
            "category_id":"a669b6f6-4144-492f-8e21-89b5b03910a7",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Accessories item.",
            "price":120.47,
            "sale_price":425.42,
            "stock":70,
            "image":[

            ]
        },
        {
            "name":"Compact Cookies",
            "category_id":"3c2b83c9-6be9-498a-9317-78abecb73992",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Accessories item.",
            "price":208.64,
            "sale_price":52.32,
            "stock":53,
            "image":[

            ]
        },
        {
            "name":"Stylish Headphones",
            "category_id":"501bdae1-7123-4d50-96ec-6cec14ad9922",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Accessories item.",
            "price":29.31,
            "sale_price":387.09,
            "stock":99,
            "image":[

            ]
        },
        {
            "name":"Elegant Cream",
            "category_id":"aaae10c3-6f81-491b-a92f-d466fce818c5",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Accessories item.",
            "price":99.33,
            "sale_price":150.88,
            "stock":45,
            "image":[

            ]
        },
        {
            "name":"Premium Headphones",
            "category_id":"5b98dbc6-a811-444b-9465-c0f34ceac2ef",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Accessories item.",
            "price":494.2,
            "sale_price":330.25,
            "stock":63,
            "image":[

            ]
        },
        {
            "name":"Durable Yoga Mat",
            "category_id":"501bdae1-7123-4d50-96ec-6cec14ad9922",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Accessories item.",
            "price":351.08,
            "sale_price":439.66,
            "stock":19,
            "image":[

            ]
        },
        {
            "name":"Elegant Smartwatch",
            "category_id":"51384a21-7667-4934-89ec-7e123020092a",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Accessories item.",
            "price":354.71,
            "sale_price":139.76,
            "stock":49,
            "image":[

            ]
        },
        {
            "name":"Premium Ring",
            "category_id":"501bdae1-7123-4d50-96ec-6cec14ad9922",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Accessories item.",
            "price":204.58,
            "sale_price":214.72,
            "stock":76,
            "image":[

            ]
        },
        {
            "name":"Durable Smartwatch",
            "category_id":"314a1823-64d5-4b88-afdd-9aad6fbffa95",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Accessories item.",
            "price":456.95,
            "sale_price":14.36,
            "stock":27,
            "image":[

            ]
        },
        {
            "name":"Advanced Cookies",
            "category_id":"aaae10c3-6f81-491b-a92f-d466fce818c5",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Footwear item.",
            "price":80.94,
            "sale_price":40.53,
            "stock":56,
            "image":[

            ]
        },
        {
            "name":"Modern Cookies",
            "category_id":"f8f262c4-f726-439e-8ce3-0cb2ec12c2f3",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Footwear item.",
            "price":478.58,
            "sale_price":86.98,
            "stock":85,
            "image":[

            ]
        },
        {
            "name":"Classic Tea",
            "category_id":"0c439ae8-82b7-491d-bc06-239211944286",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Footwear item.",
            "price":102.86,
            "sale_price":118.2,
            "stock":92,
            "image":[

            ]
        },
        {
            "name":"Compact Wallet",
            "category_id":"bc46cffc-0030-4d10-a8c1-9ff96d074b1f",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Footwear item.",
            "price":73.89,
            "sale_price":35.14,
            "stock":81,
            "image":[

            ]
        },
        {
            "name":"Modern Perfume",
            "category_id":"b120189c-6ef7-4e6d-9e4f-beea08b2119a",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Footwear item.",
            "price":414.07,
            "sale_price":185.39,
            "stock":100,
            "image":[

            ]
        },
        {
            "name":"Modern Watch",
            "category_id":"b120189c-6ef7-4e6d-9e4f-beea08b2119a",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Footwear item.",
            "price":380.96,
            "sale_price":446.98,
            "stock":51,
            "image":[

            ]
        },
        {
            "name":"Modern Table",
            "category_id":"e277cd48-b835-40d5-89d2-4180c55d9c09",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Footwear item.",
            "price":6.03,
            "sale_price":261.78,
            "stock":72,
            "image":[

            ]
        },
        {
            "name":"Stylish Watch",
            "category_id":"501bdae1-7123-4d50-96ec-6cec14ad9922",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Footwear item.",
            "price":411.3,
            "sale_price":373.7,
            "stock":21,
            "image":[

            ]
        },
        {
            "name":"Elegant Smartwatch",
            "category_id":"314a1823-64d5-4b88-afdd-9aad6fbffa95",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Footwear item.",
            "price":35.05,
            "sale_price":7.82,
            "stock":56,
            "image":[

            ]
        },
        {
            "name":"Durable Tea",
            "category_id":"0c439ae8-82b7-491d-bc06-239211944286",
            "store_id":"ef6c2f38-aa84-4e6e-b330-3c1102c3d89a",
            "description":"This is a description for Footwear item.",
            "price":397.45,
            "sale_price":198.67,
            "stock":27,
            "image":[

            ]
        },
        {
            "name":"Advanced Headphones",
            "category_id":"1cfc72ab-de10-4a29-95cc-0a4b7b2bc498",
            "store_id":"684e2867-f281-4836-85dc-511dc8b5fc3f",
            "description":"This is a description for Smartphones item.",
            "price":182.21,
            "sale_price":130.43,
            "stock":87,
            "image":[

            ]
        },
        {
            "name":"Elegant Perfume",
            "category_id":"314a1823-64d5-4b88-afdd-9aad6fbffa95",
            "store_id":"684e2867-f281-4836-85dc-511dc8b5fc3f",
            "description":"This is a description for Smartphones item.",
            "price":433.67,
            "sale_price":12.83,
            "stock":90,
            "image":[

            ]
        },
        {
            "name":"Elegant T-Shirt",
            "category_id":"f8f262c4-f726-439e-8ce3-0cb2ec12c2f3",
            "store_id":"684e2867-f281-4836-85dc-511dc8b5fc3f",
            "description":"This is a description for Smartphones item.",
            "price":304.83,
            "sale_price":124.68,
            "stock":63,
            "image":[

            ]
        },
        {
            "name":"Modern Cookies",
            "category_id":"314a1823-64d5-4b88-afdd-9aad6fbffa95",
            "store_id":"684e2867-f281-4836-85dc-511dc8b5fc3f",
            "description":"This is a description for Smartphones item.",
            "price":179.34,
            "sale_price":162.11,
            "stock":60,
            "image":[

            ]
        },
        {
            "name":"Stylish Toy",
            "category_id":"e277cd48-b835-40d5-89d2-4180c55d9c09",
            "store_id":"684e2867-f281-4836-85dc-511dc8b5fc3f",
            "description":"This is a description for Smartphones item.",
            "price":312.87,
            "sale_price":158.71,
            "stock":15,
            "image":[

            ]
        },
        {
            "name":"Modern Wallet",
            "category_id":"04772945-7f43-4c90-9623-a402eb0d6f18",
            "store_id":"684e2867-f281-4836-85dc-511dc8b5fc3f",
            "description":"This is a description for Smartphones item.",
            "price":484.83,
            "sale_price":355.55,
            "stock":75,
            "image":[

            ]
        },
        {
            "name":"Durable Ring",
            "category_id":"1cfc72ab-de10-4a29-95cc-0a4b7b2bc498",
            "store_id":"684e2867-f281-4836-85dc-511dc8b5fc3f",
            "description":"This is a description for Smartphones item.",
            "price":269.16,
            "sale_price":204.72,
            "stock":72,
            "image":[

            ]
        },
        {
            "name":"Modern Perfume",
            "category_id":"51384a21-7667-4934-89ec-7e123020092a",
            "store_id":"684e2867-f281-4836-85dc-511dc8b5fc3f",
            "description":"This is a description for Smartphones item.",
            "price":200.91,
            "sale_price":164.22,
            "stock":67,
            "image":[

            ]
        },
        {
            "name":"Premium Cookies",
            "category_id":"0c439ae8-82b7-491d-bc06-239211944286",
            "store_id":"684e2867-f281-4836-85dc-511dc8b5fc3f",
            "description":"This is a description for Smartphones item.",
            "price":217.17,
            "sale_price":189.58,
            "stock":62,
            "image":[

            ]
        },
        {
            "name":"Compact Ring",
            "category_id":"04772945-7f43-4c90-9623-a402eb0d6f18",
            "store_id":"684e2867-f281-4836-85dc-511dc8b5fc3f",
            "description":"This is a description for Smartphones item.",
            "price":408.55,
            "sale_price":315.71,
            "stock":30,
            "image":[

            ]
        },
        {
            "name":"Elegant Wallet",
            "category_id":"e277cd48-b835-40d5-89d2-4180c55d9c09",
            "store_id":"a4efb462-0980-4d8f-8f2a-4963fb9823fb",
            "description":"This is a description for Fragrances item.",
            "price":412.01,
            "sale_price":294.24,
            "stock":97,
            "image":[

            ]
        },
        {
            "name":"Durable Camera",
            "category_id":"04772945-7f43-4c90-9623-a402eb0d6f18",
            "store_id":"a4efb462-0980-4d8f-8f2a-4963fb9823fb",
            "description":"This is a description for Fragrances item.",
            "price":391.3,
            "sale_price":71.49,
            "stock":91,
            "image":[

            ]
        },
        {
            "name":"Durable Camera",
            "category_id":"5b98dbc6-a811-444b-9465-c0f34ceac2ef",
            "store_id":"a4efb462-0980-4d8f-8f2a-4963fb9823fb",
            "description":"This is a description for Fragrances item.",
            "price":394.67,
            "sale_price":243.58,
            "stock":31,
            "image":[

            ]
        },
        {
            "name":"Stylish Book",
            "category_id":"5b98dbc6-a811-444b-9465-c0f34ceac2ef",
            "store_id":"a4efb462-0980-4d8f-8f2a-4963fb9823fb",
            "description":"This is a description for Fragrances item.",
            "price":62.38,
            "sale_price":53.66,
            "stock":57,
            "image":[

            ]
        },
        {
            "name":"Compact Cream",
            "category_id":"b120189c-6ef7-4e6d-9e4f-beea08b2119a",
            "store_id":"a4efb462-0980-4d8f-8f2a-4963fb9823fb",
            "description":"This is a description for Fragrances item.",
            "price":13.28,
            "sale_price":201.49,
            "stock":56,
            "image":[

            ]
        },
        {
            "name":"Elegant Yoga Mat",
            "category_id":"b727f5e7-157a-4428-baca-3b0b750a80ba",
            "store_id":"a4efb462-0980-4d8f-8f2a-4963fb9823fb",
            "description":"This is a description for Fragrances item.",
            "price":117.05,
            "sale_price":377.73,
            "stock":51,
            "image":[

            ]
        },
        {
            "name":"Advanced Book",
            "category_id":"b120189c-6ef7-4e6d-9e4f-beea08b2119a",
            "store_id":"a4efb462-0980-4d8f-8f2a-4963fb9823fb",
            "description":"This is a description for Fragrances item.",
            "price":203.98,
            "sale_price":163.09,
            "stock":37,
            "image":[

            ]
        },
        {
            "name":"Elegant Wallet",
            "category_id":"3c2b83c9-6be9-498a-9317-78abecb73992",
            "store_id":"a4efb462-0980-4d8f-8f2a-4963fb9823fb",
            "description":"This is a description for Fragrances item.",
            "price":304.5,
            "sale_price":199.54,
            "stock":23,
            "image":[

            ]
        },
        {
            "name":"Stylish Shoe",
            "category_id":"0c439ae8-82b7-491d-bc06-239211944286",
            "store_id":"a4efb462-0980-4d8f-8f2a-4963fb9823fb",
            "description":"This is a description for Fragrances item.",
            "price":127.49,
            "sale_price":250.64,
            "stock":24,
            "image":[

            ]
        },
        {
            "name":"Classic Wallet",
            "category_id":"9743ad02-8cc5-49f9-912f-90906601c729",
            "store_id":"a4efb462-0980-4d8f-8f2a-4963fb9823fb",
            "description":"This is a description for Fragrances item.",
            "price":40.17,
            "sale_price":279.83,
            "stock":82,
            "image":[

            ]
        },
        {
            "name":"Stylish Shoe",
            "category_id":"bc46cffc-0030-4d10-a8c1-9ff96d074b1f",
            "store_id":"51e850e0-36a3-4480-ab9a-55d310cf7a07",
            "description":"This is a description for Necklaces item.",
            "price":184.45,
            "sale_price":118.32,
            "stock":50,
            "image":[

            ]
        },
        {
            "name":"Classic Yoga Mat",
            "category_id":"04772945-7f43-4c90-9623-a402eb0d6f18",
            "store_id":"51e850e0-36a3-4480-ab9a-55d310cf7a07",
            "description":"This is a description for Necklaces item.",
            "price":237.46,
            "sale_price":377.33,
            "stock":87,
            "image":[

            ]
        },
        {
            "name":"Premium Perfume",
            "category_id":"5b98dbc6-a811-444b-9465-c0f34ceac2ef",
            "store_id":"51e850e0-36a3-4480-ab9a-55d310cf7a07",
            "description":"This is a description for Necklaces item.",
            "price":216.97,
            "sale_price":448.51,
            "stock":78,
            "image":[

            ]
        },
        {
            "name":"Classic Watch",
            "category_id":"aaae10c3-6f81-491b-a92f-d466fce818c5",
            "store_id":"51e850e0-36a3-4480-ab9a-55d310cf7a07",
            "description":"This is a description for Necklaces item.",
            "price":341.66,
            "sale_price":354.71,
            "stock":67,
            "image":[

            ]
        },
        {
            "name":"Compact Cookies",
            "category_id":"63871074-5ebd-4cbb-ae01-4156fcef3379",
            "store_id":"51e850e0-36a3-4480-ab9a-55d310cf7a07",
            "description":"This is a description for Necklaces item.",
            "price":281.19,
            "sale_price":427.91,
            "stock":29,
            "image":[

            ]
        },
        {
            "name":"Compact Ring",
            "category_id":"aaae10c3-6f81-491b-a92f-d466fce818c5",
            "store_id":"51e850e0-36a3-4480-ab9a-55d310cf7a07",
            "description":"This is a description for Necklaces item.",
            "price":347.74,
            "sale_price":378.48,
            "stock":57,
            "image":[

            ]
        },
        {
            "name":"Classic Camera",
            "category_id":"b120189c-6ef7-4e6d-9e4f-beea08b2119a",
            "store_id":"51e850e0-36a3-4480-ab9a-55d310cf7a07",
            "description":"This is a description for Necklaces item.",
            "price":479.45,
            "sale_price":212.51,
            "stock":53,
            "image":[

            ]
        },
        {
            "name":"Modern Necklace",
            "category_id":"f3f91720-e317-4465-8abd-5500ab2cf527",
            "store_id":"51e850e0-36a3-4480-ab9a-55d310cf7a07",
            "description":"This is a description for Necklaces item.",
            "price":112.11,
            "sale_price":90.2,
            "stock":40,
            "image":[

            ]
        },
        {
            "name":"Elegant Bracelet",
            "category_id":"b120189c-6ef7-4e6d-9e4f-beea08b2119a",
            "store_id":"51e850e0-36a3-4480-ab9a-55d310cf7a07",
            "description":"This is a description for Necklaces item.",
            "price":141.81,
            "sale_price":358.88,
            "stock":64,
            "image":[

            ]
        },
        {
            "name":"Modern Cookies",
            "category_id":"9743ad02-8cc5-49f9-912f-90906601c729",
            "store_id":"51e850e0-36a3-4480-ab9a-55d310cf7a07",
            "description":"This is a description for Necklaces item.",
            "price":266.72,
            "sale_price":307.33,
            "stock":39,
            "image":[

            ]
        }
    ]

    products.forEach(async(product) => {
        await client.addItem(product, client.token);
    })
    //await client.addItem(products[0], client.token);

}

run();