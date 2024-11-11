const { google } = require('googleapis');

  

const OAuth2Client = new google.auth.OAuth2(
    "262177715421-0nh1vjd42ke322bd1hsa9t64mkuto7k1.apps.googleusercontent.com",
    "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",
    "http://localhost:3000/flowName=GeneralOAuthFlow"

);

OAuth2Client.setCredentials({
   
    access_token: "ya29.a0AeDClZA-yBt0M7XxvL7x0JExqMuABo7K0CruHFPQTxfE-ewbVH6qWAhmUXLs7U9jroNrMDHCuHE6zQqfb1RqtV6I_QpblRCqd5EeTPMAG8FDxxuVsazAj4xCLU2n4-S5u1jzGe-wjuSIAxClIAxU2SkxpHtrUzgTiujXA_etaCgYKAekSARISFQHGX2MitnF3QSIbjcgq6f0PcavN1Q0175", 
    scope : "https://www.googleapis.com/auth/drive, https://www.googleapis.com/auth/drive.file,https://www.googleapis.com/auth/spreadsheets", 
  token_type: "Bearer", 
  expires_in: 3599, 
  refresh_token: "1//04irVklzbXzyECgYIARAAGAQSNwF-L9IrTdU1Pym7h-DThncCgTmCXdzVaSnh0o4q3aNTPvnzwgNZsV-00kL7hop4wN3WEz7z67g"

});

const sheets = google.sheets({ version: 'v4', auth: OAuth2Client });

async function read() {

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: "1EkzA8vc9gAxA4zq_dm71KzasnV7LIolwlEel0fTpgA4",
        range: "products!A2:E",
        


    });


    const rows = response.data.values;


    const products = rows.map((row) => ({

        id: +row[0],
        name: row[1],
        price: +row[2],
        image: row[3],
        stock: +row[4],
    }));


    return products;
}





async function write(products) {
    let values = products.map((p) => [p.id, p.name, p.price, p.image, p.stock]);

    const resource = {
        values,
    };

    const result = await sheets.spreadsheets.values.update({
        spreadsheetId: "1EkzA8vc9gAxA4zq_dm71KzasnV7LIolwlEel0fTpgA4",
        range: "products!A2:E",
        valueInputOption: "RAW",  // Cambiado a minúsculas
        resource,
    });

    console.log(result.data.updatedCells);  // Acceder a la propiedad 'data'
}

//async function readAndWrite() {
    //const products = await read();
   // products[0].stock = 450;
  //  await write(products);
//}

//readAndWrite();

module.exports={
    read,
    write,
}

