import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import NewRecordModal from "./new-record-modal";
import { Record, RecordType } from "../../models/record";
import RecordBox from "./record-box";
import { Summary, SummaryStatus } from "../../models/summary";
import SummaryBox from "../common/summary-box";
import { COLORS } from "../../utils/color";
import { Entypo } from "@expo/vector-icons";

const RecordList = ({
  summary,
  summaries,
  setSummary,
  setSummaries,
  navigation,
}: {
  summary: Summary;
  summaries: Summary[];
  setSummary: (arg0: any) => void;
  setSummaries: (arg0: any) => void;
  navigation: any;
}) => {
  const [newRecord, setNewRecord] = useState<Record>({});
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePressAdd = () => {
    setNewRecord({
      type: RecordType.EXPENSE,
    });
    setModalVisible(true);
    console.log("Modal Opened");
  };

  const handlePressBack = () => {
    const activeSummary: Summary = summaries.find(
      (summary: Summary) => summary.status === SummaryStatus.ACTIVE
    );
    setSummary(activeSummary);
  };

  return (
    <View style={styles.container}>
      <SummaryBox
        archive={false}
        summary={summary}
        setSummary={setSummary}
        setSummaries={setSummaries}
        navigation={navigation}
      ></SummaryBox>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          {summary.records.map((record, index) => (
            <RecordBox
              key={index}
              record={record}
              summary={summary}
              setSummary={setSummary}
              setSummaries={setSummaries}
            ></RecordBox>
          ))}
        </View>
      </ScrollView>

      {summary.status === SummaryStatus.ACTIVE && (
        <Pressable style={styles.addButton} onPress={handlePressAdd}>
          <Entypo name="plus" size={24} color="white" />
        </Pressable>
      )}

      {summary.status === SummaryStatus.ARCHIVED && (
        <Pressable style={styles.addButton} onPress={handlePressBack}>
          <Entypo name="back" size={24} color="white" />
        </Pressable>
      )}

      {isModalVisible && (
        <NewRecordModal
          newRecord={newRecord}
          setNewRecord={setNewRecord}
          summary={summary}
          setSummary={setSummary}
          setSummaries={setSummaries}
          setModalVisible={setModalVisible}
        ></NewRecordModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    borderColor: COLORS.border,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.button,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 15,
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: 24,
  },
});

export default RecordList;
