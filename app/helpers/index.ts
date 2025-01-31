import { Product } from "~/types"
import { google } from 'googleapis';

export const convertProductExcelFileToArray = async (productQuantityInjection?: string)=>{
    console.log(process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_SECRET_KEY,
        process.env.REDIRECT_URI, 'process.env.GOOGLE_CLIENT_ID')
    
    const auth = await new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_SECRET_KEY,
        process.env.REDIRECT_URI,

    )
    
    auth.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
    
    try {
        const range = `product!A1:K${productQuantityInjection || '60'}`
        const spreadsheetId = '11_qhp_CbensoFSfoeG6K_kr1yVyGUljaUlLz4yWhLP8'

        const sheets = google.sheets({ version: "v4", auth });

        const response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range, // e.g., "Sheet1!A1:D10"
        });
        
        const data = response.data.values
		console.log("TCL: convertProductExcelFileToArray -> data", data)

        return data
    } catch (error) {
        console.error(error)
    }
}

export const normalizeProductToUploadDb = (productsArray: Product[]) : Product[] =>{
    console.log("TCL: normalizeProductToUploadDb -> productsArray", productsArray)
    
        const productProperties = [
            "CODIGO",
            "REFERENCIA",
            "COD COLOR",
            "COLOR",
            "PRODUCTO",
            "COSTO",
            "PRECIO",
            "CANTIDAD",
            "MARCA",
            "IMAGENES",
            "IMPORTADO",
            "TALLA",
            "GENERO"
        ]
    
        const normalizedProductList : Product[] = []
    
        productsArray.forEach((product: Product)=>{
            const productObj = {}
            const productNormalizer = product.map((property, index)=>{
                if(productProperties[index].toLocaleLowerCase() === 'imagenes'){
                    const images = property.split(',')
                    productObj[productProperties[index].toLocaleLowerCase()] = images
                    return
                }
                productObj[productProperties[index].toLocaleLowerCase()] = property
            })
            normalizedProductList.push(productObj)
        })
        normalizedProductList.shift()
        return normalizedProductList
    }