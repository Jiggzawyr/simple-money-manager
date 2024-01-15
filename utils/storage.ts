import AsyncStorage from "@react-native-async-storage/async-storage";
import { Record } from "../models/record";
import { Summary } from "../models/summary";

export async function retrieveRecords(): Promise<Record[]> {
  console.log("retrieveRecords");
  const records = await AsyncStorage.getItem("records");
  return records ? JSON.parse(records) : [];
}

export async function saveRecords(records: Record[]): Promise<void> {
  console.log("saveRecords");
  AsyncStorage.setItem("records", JSON.stringify(records));
}

export async function retrieveSummaries(): Promise<Summary[]> {
  console.log("retrieveSummaries");
  const summaries = await AsyncStorage.getItem("summaries");
  return summaries ? JSON.parse(summaries) : [];
}

export async function saveSummaries(summaries: Summary[]): Promise<void> {
  console.log("saveSummaries");
  AsyncStorage.setItem("summaries", JSON.stringify(summaries));
}
