import { View, Text, StyleSheet } from "react-native";
import { Summary } from "../models/summary";
import { format } from "date-fns";

const SummaryBox = ({ summary }: { summary: Summary }) => {
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
});

export default SummaryBox;
