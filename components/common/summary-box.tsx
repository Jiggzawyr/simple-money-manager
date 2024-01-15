import { View, Text, StyleSheet, Pressable } from "react-native";
import { Summary, SummaryStatus } from "../../models/summary";
import { format } from "date-fns";
import { Feather } from "@expo/vector-icons";
import { getSummary } from "../../utils/calculations";

const SummaryBox = ({
  enableArchive,
  summary,
  setSummaries,
  setRecords,
}: {
  enableArchive: boolean;
  summary: Summary;
  setSummaries?: (arg0: any) => void;
  setRecords?: (arg0: any) => void;
}) => {
  const handlePress = () => {
    console.log("Archive Pressed");
    setSummaries((prevSummaries: Summary[]) => {
      const newSummaries: Summary[] = [...prevSummaries].filter(
        (summary) => summary.status === SummaryStatus.ARCHIVED
      );
      const archivedSummary = { ...summary, status: SummaryStatus.ARCHIVED };
      newSummaries.push(archivedSummary);
      return newSummaries;
    });
    setRecords([]);
  };

  return (
    <View style={styles.box}>
      <View style={styles.dateHeader}>
        <Text style={styles.dateHeaderText}>
          {summary.startDate && format(summary.startDate, "yyyy.MM.dd")}
        </Text>
        <Text style={styles.dateHeaderText}>{" - "}</Text>
        <Text style={styles.dateHeaderText}>
          {summary.endDate && format(summary.endDate, "yyyy.MM.dd")}
        </Text>
      </View>
      <Text style={{ color: "navy", fontWeight: "bold" }}>
        Total Income: {summary.totalIncome}
      </Text>
      <Text style={{ color: "maroon", fontWeight: "bold" }}>
        Total Expenses: {summary.totalExpenses}
      </Text>
      <Text style={{ color: "black", fontWeight: "bold" }}>
        Change: {summary.totalIncome - summary.totalExpenses}
      </Text>
      {enableArchive && (
        <Pressable style={styles.archiveButton} onPress={handlePress}>
          <Feather name="archive" size={28} color="orangered" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    overflow: "hidden",
    paddingTop: 2,
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginHorizontal: 15,
    marginTop: 25,
    marginBottom: 2,
    backgroundColor: "khaki",
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dateHeaderText: {
    fontWeight: "bold",
    fontSize: 22,
    color: "olivedrab",
  },
  archiveButton: {
    position: "absolute",
    bottom: 6,
    right: 12,
  },
});

export default SummaryBox;
