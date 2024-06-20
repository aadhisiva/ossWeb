import { IsAuthenticated } from "../../Authentication/useAuth";

export default function ResuableHeaders() {
  const [{ accessOfMasters }] = IsAuthenticated();

  const fetchType = accessOfMasters && accessOfMasters[0]?.TypeOfData;
  const paceHolders =
    fetchType == "Rural"
      ? {
          HTaluk: "Taluk",
          HGp: "Gp",
          HVillage: "Village",
        }
      : fetchType == "Urban"
      ? {
          HTaluk: "ULB",
          HGp: "ULB Ward",
          HVillage: "Ward",
        }
      : {
          HTaluk: "Zone",
          HGp: "Division",
          HVillage: "Ward",
        };

  return [paceHolders];
}
