import { LoadingServices } from ".";
import { BuildingsDS } from "../model";

export async function getAllBuildings() {
  let buildings = [];
  try {
    LoadingServices.setLoading("getAllBuildings", true);
    buildings = await BuildingsDS.getAllBuildings();
  } finally {
    LoadingServices.setLoading("getAllBuildings", false);
  }
  return buildings;
}