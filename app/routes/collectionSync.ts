import { db, productsTable } from "~/db";
import { convertProductExcelFileToArray, normalizeProductToUploadDb } from "~/helpers";

export async function loader() {
  const gettingProductsCvs = await convertProductExcelFileToArray()
	console.log("TCL: loader -> gettingProductsCvs", gettingProductsCvs)
  const normalizeProducts = await normalizeProductToUploadDb(gettingProductsCvs)
	console.log("TCL: loader -> normalizeProducts", normalizeProducts)
  return normalizeProducts;
}

export const action = async (request: Request) => {
  const sheetData = await request.json();

  await db.insert(productsTable).values(sheetData);
  
  return Response.json({ message: 'Sync completed', count: sheetData.length });
};