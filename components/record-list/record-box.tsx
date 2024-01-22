import { View, Text, StyleSheet, Pressable } from "react-native";
import { Record, RecordType } from "../../models/record";
import { format } from "date-fns";
import Category from "./category";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../utils/color";
import { Summary, SummaryStatus } from "../../models/summary";
import { getSummary } from "../../utils/calculations";
import { saveSummaries } from "../../utils/storage";

const RecordBox = ({
  record,
  summary,
  setSummary,
  setSummaries,
}: {
  record: Record;
  summary: Summary;
  setSummary: (arg0: any) => void;
  setSummaries: (arg0: any) => void;
}) => {
  const recordTypeColor =
    record.type === RecordType.EXPENSE ? COLORS.expense : COLORS.income;

  const handlePress = () => {
    console.log("Delete Record Pressed");
    const newRecords: Record[] = summary.records.filter(
      (recordElem) => recordElem.id != record.id
    );
    const newSummary: Summary = getSummary(newRecords);
    newSummary.status = SummaryStatus.ACTIVE;
    setSummary(newSummary);
    setSummaries((prevSummaries: Summary[]) => {
      const newSummaries: Summary[] = [...prevSummaries];
      const index: number = newSummaries.findIndex(
        (summary) => summary.status === SummaryStatus.ACTIVE
      );
      newSummaries[index] = newSummary;
      saveSummaries(newSummaries);
      return newSummaries;
    });
  };

  return (
    <View style={styles.box}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Category recordCategory={record.category}></Category>
        <Text
          style={{ fontWeight: "bold", paddingLeft: 3, color: COLORS.text }}
        >
          {record.name}
        </Text>
      </View>

      {summary.status === SummaryStatus.ACTIVE && (
        <Pressable style={styles.deleteButton} onPress={handlePress}>
          <FontAwesome name="remove" size={24} color={COLORS.remove} />
        </Pressable>
      )}

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: recordTypeColor, fontWeight: "bold" }}>
          {record.type} : {record.amount}
        </Text>
        <Text
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingLeft: 4,
            color: COLORS.text,
          }}
        >
          {format(record.date, "yyyy-MMM-dd HH:mm")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
    marginTop: 5,
    backgroundColor: COLORS.recordBackground,
  },
  deleteButton: {
    position: "absolute",
    top: 4,
    right: 10,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RecordBox;
