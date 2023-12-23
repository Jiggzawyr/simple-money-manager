import { useState } from "react";
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

const RecordList = () => {
  const recordsTest: Record[] = [];
  for (let i = 0; i < 5; i++) {
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

  const handlePress = () => {
    setNewRecord({
      type: RecordType.EXPENSE,
    });
    setModalVisible(true);
    console.log("Modal Opened");
  };

  const handleModalComplete = (newRecord: Record) => {
    setModalVisible(false);
    newRecord.id =
      (records.sort((a: Record, b: Record) => a.id - b.id).at(0).id ?? 0) + 1;
    console.log(newRecord);
    setRecords((prevSpending) => {
      return [...prevSpending, newRecord];
    });
    console.log("Modal Completed");
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
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
          handleModalComplete={handleModalComplete}
          handleModalClose={handleModalClose}
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
