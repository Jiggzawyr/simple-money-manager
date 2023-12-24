import { View, Text, StyleSheet } from "react-native";
import { Record, RecordType } from "../models/record";
import { format } from "date-fns";

const RecordBox = ({ record }: { record: Record }) => {
  const recordTypeColor =
    record.type === RecordType.EXPENSE ? "maroon" : "navy";

  return (
    <View style={styles.box}>
      <Text style={{ fontWeight: "bold" }}>
        {record.id}: {record.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
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
            }}
          >
            {format(record.date, "yyyy-MMM-dd HH:mm")}
          </Text>
        </View>
      </View>
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
