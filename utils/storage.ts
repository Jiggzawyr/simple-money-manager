import AsyncStorage from "@react-native-async-storage/async-storage";
import { Record } from "../models/record";

export async function retrieveRecords(): Promise<Record[]> {
  console.log("retrieveRecords");
  const records = await AsyncStorage.getItem("records");
  return records ? JSON.parse(records) : [];
}

export async function saveRecords(records: Record[]): Promise<void> {
  console.log("saveRecords");
  AsyncStorage.setItem("records", JSON.stringify(records));
}
