import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import NewRecordModal from "./new-record-modal";
import { Record, RecordType } from "../models/record";
import RecordBox from "./record-box";
import { Summary } from "../models/summary";
import SummaryBox from "./summary-box";

const RecordList = ({
  records,
  setRecords,
  summary,
}: {
  records: Record[];
  setRecords: (arg0: any) => void;
  summary: Summary;
}) => {
  const [newRecord, setNewRecord] = useState<Record>({});
  const [isModalVisible, setModalVisible] = useState(false);

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
