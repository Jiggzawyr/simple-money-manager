import { ScrollView, View, StyleSheet } from "react-native";
import { Summary } from "../../models/summary";
import SummaryBox from "../common/summary-box";
import { COLORS } from "../../utils/color";

const Archive = ({
  summaries,
  setSummary,
  setSummaries,
  navigation,
}: {
  summaries: Summary[];
  setSummary: (arg0: any) => void;
  setSummaries: (arg0: any) => void;
  navigation: any;
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
              setSummary={setSummary}
              setSummaries={setSummaries}
              navigation={navigation}
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
