import { getAppModel } from "../AppModel";
import { DatasourceNames } from "../../utils";

export async function getAllBuildings() {
  const response = await getAppModel().getRecord(
    DatasourceNames.BUILDINGS_DS_NAME
  );
  return response.data;
}