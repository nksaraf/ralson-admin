import { NextApiHandler } from "next";
import { GoogleSpreadsheet } from "google-spreadsheet";
import serviceAccount from "../../service-account.json";
import type { AxiosInstance, AxiosStatic } from "axios";
const RALSON_DISCOUNTS_ID = "12wA3z86cnqmnjmevzuOKL93Lka80kuUMb2YgwUqfleE";

async function getSpreadSheet(id: string) {
  const doc = new GoogleSpreadsheet(id);

  doc.useServiceAccountAuth({
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key
  });

  await doc.loadInfo();

  return doc;
}

export default (async function (req, res) {
  try {
    const doc = await getSpreadSheet(RALSON_DISCOUNTS_ID);

    let ax = (doc as any).axios as AxiosInstance;
    console.log(ax.name);

    // for (var id in doc.sheetsById) {
    //   var sheet = doc.sheetsById[id];
    //   await sheet.loadCells();
    //   await sheet.loadHeaderRow();

    //   const rows = [
    //     sheet.headerValues,
    //     ...(await sheet.getRows()).map((r) => r._rawData)
    //   ];

    //   const schemeName = rows[0][1];
    //   const period = rows[1][1];

    //   const startRowIndex = rows[4].length == 0 ? 5 : 4;

    //   for (var row of rows.slice(startRowIndex)) {
    //     if (partyNames[row[0]] == undefined) {
    //       partyNames[row[0]] = [];
    //     }

    //     partyNames[row[0]].push({ schemeName, period, value: row[1] });
    //   }
    // }
    res.json({
      data: await ax
        .get("/", {
          params: {
            includeGridData: true
          }
        })
        .then((d) => d.data)
    });
  } catch (e) {
    console.log(e.message);
  }
} as NextApiHandler);
