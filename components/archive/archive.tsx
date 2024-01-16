import { ScrollView, View, StyleSheet } from "react-native";
import { Summary } from "../../models/summary";
import SummaryBox from "../common/summary-box";
import { COLORS } from "../../utils/color";

const Archive = ({
  summaries,
  setSummaries,
}: {
  summaries: Summary[];
  setSummaries: (arg0: any) => void;
}) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          {summaries.map((summary, index) => (
            <SummaryBox
              key={index}
              archive={true}
              summary={summary}
              setSummaries={setSummaries}
            ></SummaryBox>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 20,
    backgroundColor: COLORS.background,
  },
});

export default Archive;
