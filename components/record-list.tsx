import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import NewRecordModal from "./new-record-modal";
import { ExpensesCategory, Record, RecordType } from "../models/record";
import RecordBox from "./record-box";
import { Summary } from "../models/summary";
import SummaryBox from "./summary-box";
import { getSummary } from "../utils/calculations";
import { retrieveRecords, saveRecords } from "../utils/storage";

const RecordList = () => {
  const recordsTest: Record[] = [];
  for (let i = 0; i < 15; i++) {
    recordsTest.push({
      id: i,
      name: "Name " + i,
      type: RecordType.EXPENSE,
      category: ExpensesCategory.RENT_MORTGAGE,
      amount: 1000 * i,
      date: new Date(),
    });
  }

  const [records, setRecords] = useState<Record[]>([]);
  const [newRecord, setNewRecord] = useState<Record>({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [summary, setSummary] = useState<Summary>({});

  // Load records when the component mounts
  useEffect(() => {
    retrieveRecords().then((records) => setRecords(records));
  }, []);

  useEffect(() => {
    saveRecords(records);
    setSummary(getSummary(records));
  }, [records]);

  const handlePress = () => {
    setNewRecord({
      type: RecordType.EXPENSE,
    });
    setModalVisible(true);
    console.log("Modal Opened");
  };

  return (
    <View style={styles.container}>
      <SummaryBox summary={summary}></SummaryBox>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          {records.map((record, index) => (
            <RecordBox
              record={record}
              setRecords={setRecords}
              key={index}
            ></RecordBox>
          ))}
        </View>
      </ScrollView>

      <Pressable style={styles.addButton} onPress={handlePress}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>

      {isModalVisible && (
        <NewRecordModal
          newRecord={newRecord}
          setNewRecord={setNewRecord}
          records={records}
          setRecords={setRecords}
          setModalVisible={setModalVisible}
        ></NewRecordModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "beige",
    paddingTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  addButton: {
    borderWidth: 2,
    borderColor: "black",
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "darkturquoise",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
});

export default RecordList;
