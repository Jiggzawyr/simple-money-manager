import AsyncStorage from "@react-native-async-storage/async-storage";
import { Summary } from "../models/summary";

export async function retrieveSummaries(): Promise<Summary[]> {
  console.log("retrieveSummaries");
  const summaries = await AsyncStorage.getItem("summaries");
  return summaries ? JSON.parse(summaries) : [];
}

export async function saveSummaries(summaries: Summary[]): Promise<void> {
  console.log("saveSummaries");
  AsyncStorage.setItem("summaries", JSON.stringify(summaries));
}
