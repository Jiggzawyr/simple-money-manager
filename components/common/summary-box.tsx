import { View, Text, StyleSheet, Pressable } from "react-native";
import { Summary, SummaryStatus } from "../../models/summary";
import { format } from "date-fns";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../utils/color";

const SummaryBox = ({
  archive,
  summary,
  setSummaries,
  setRecords,
}: {
  archive: boolean;
  summary: Summary;
  setSummaries?: (arg0: any) => void;
  setRecords?: (arg0: any) => void;
}) => {
  const handlePressArchive = () => {
    console.log("Archive Summary Pressed");
    setSummaries((prevSummaries: Summary[]) => {
      let newSummaries: Summary[] = [...prevSummaries].filter(
        (summary) => summary.status === SummaryStatus.ARCHIVED
      );
      const id: number =
        (prevSummaries.sort((a, b) => (a.id || 0) - (b.id || 0)).pop().id ||
          0) + 1;
      console.log("id: " + id);
      const archivedSummary: Summary = {
        ...summary,
        status: SummaryStatus.ARCHIVED,
        id: id,
      };
      newSummaries.push(archivedSummary);
      newSummaries = newSummaries.sort((a, b) => (b.id || 0) - (a.id || 0));
      console.log(newSummaries);
      return newSummaries;
    });
    setRecords([]);
  };

  const handlePressRemove = (summary: Summary) => {
    console.log("Remove Summary Pressed");
    console.log(summary);
    setSummaries((prevSummaries: Summary[]) => {
      const newSummaries: Summary[] = [...prevSummaries].filter(
        (s) => s.id !== summary.id
      );
      console.log(newSummaries.length);
      return newSummaries;
    });
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
      <Text style={{ color: COLORS.income, fontWeight: "bold" }}>
        Total Income: {summary.totalIncome}
      </Text>
      <Text style={{ color: COLORS.expense, fontWeight: "bold" }}>
        Total Expenses: {summary.totalExpenses}
      </Text>
      <Text style={{ color: COLORS.text, fontWeight: "bold" }}>
        Change: {summary.totalIncome - summary.totalExpenses}
      </Text>
      {!archive && summary.records?.length > 0 && (
        <Pressable style={styles.archiveButton} onPress={handlePressArchive}>
          <Feather name="archive" size={28} color={COLORS.remove} />
        </Pressable>
      )}
      {archive && summary.status === SummaryStatus.ARCHIVED && (
        <Pressable
          style={styles.archiveButton}
          onPress={() => handlePressRemove(summary)}
        >
          <FontAwesome name="remove" size={28} color={COLORS.remove} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 10,
    overflow: "hidden",
    paddingTop: 2,
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginHorizontal: 15,
    marginTop: 25,
    marginBottom: 2,
    backgroundColor: COLORS.summaryBackground,
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dateHeaderText: {
    fontWeight: "bold",
    fontSize: 22,
    color: COLORS.summaryText,
  },
  archiveButton: {
    position: "absolute",
    bottom: 6,
    right: 12,
  },
});

export default SummaryBox;
