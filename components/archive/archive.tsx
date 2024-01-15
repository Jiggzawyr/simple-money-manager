import { ScrollView, View, StyleSheet } from "react-native";
import { Summary } from "../../models/summary";
import SummaryBox from "../common/summary-box";

const Archive = ({ summaries }: { summaries: Summary[] }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
        {summaries.map((summary, index) => (
          <SummaryBox
            key={index}
            enableArchive={false}
            summary={summary}
          ></SummaryBox>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 20,
  },
});

export default Archive;
