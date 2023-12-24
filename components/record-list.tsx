import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import NewRecordModal from "./new-record-modal";
import { Record, RecordType } from "../models/record";
import RecordBox from "./record-box";
import { Summary } from "../models/summary";
import SummaryBox from "./summary-box";
import { getSummary } from "../utils/calculations";

const RecordList = () => {
  const recordsTest: Record[] = [];
  for (let i = 0; i < 15; i++) {
    recordsTest.push({
      id: i,
      name: "Name " + i,
      type: RecordType.EXPENSE,
      amount: 1000 * i,
      date: new Date(),
    });
  }

  const [records, setRecords] = useState<Record[]>(recordsTest);
  const [newRecord, setNewRecord] = useState<Record>({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [summary, setSummary] = useState<Summary>({});

  useEffect(() => {
    setSummary(getSummary(records));
  }, [records]);

  const handlePress = () => {
    setNewRecord({
      type: RecordType.EXPENSE,
      date: new Date(),
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
            <RecordBox record={record} key={index}></RecordBox>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handlePress}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

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
    backgroundColor: "darkturquoise",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 15,
    bottom: 20,
    right: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
});

export default RecordList;
