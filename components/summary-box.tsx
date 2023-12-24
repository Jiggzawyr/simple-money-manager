import { View, Text, StyleSheet } from "react-native";
import { Summary } from "../models/summary";
import { format } from "date-fns";

const SummaryBox = ({ summary }: { summary: Summary }) => {
  return (
    <View style={styles.box}>
      <View style={{}}>
        <Text>
          {summary.startDate && format(summary.startDate, "yyyy-MMM-dd")}{" "}
          {" - "}
          {summary.endDate && format(summary.endDate, "yyyy-MMM-dd")}
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
    padding: 15,
    marginHorizontal: 15,
    marginTop: 25,
    marginBottom: 2,
    backgroundColor: "khaki",
  },
});

export default SummaryBox;
