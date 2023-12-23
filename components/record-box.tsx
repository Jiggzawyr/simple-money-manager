import { View, Text, StyleSheet } from "react-native";
import { Record } from "../models/record";

const RecordBox = ({ record }: { record: Record }) => {
  return (
    <View style={styles.box}>
      <Text>
        {record.id}: {record.name}
      </Text>
      <Text>
        {record.type} : {record.amount}
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
    padding: 5,
    marginTop: 5,
    backgroundColor: "goldenrod",
  },
});

export default RecordBox;
