import { View, Text, StyleSheet, Pressable } from "react-native";
import { Record, RecordType } from "../models/record";
import { format } from "date-fns";

const RecordBox = ({
  record,
  setRecords,
}: {
  record: Record;
  setRecords: (arg0: any) => void;
}) => {
  const recordTypeColor =
    record.type === RecordType.EXPENSE ? "maroon" : "navy";

  const handlePress = () => {
    setRecords((prevRecords: Record[]) => {
      return prevRecords.filter((recordElem) => recordElem.id != record.id);
    });
    console.log("Delete Pressed");
  };

  return (
    <View style={styles.box}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
          {record.id}: {record.name}
        </Text>
      </View>

      <Pressable style={styles.deleteButton} onPress={handlePress}>
        <Text style={styles.minus}>-</Text>
      </Pressable>

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
  deleteButton: {
    position: "absolute",
    top: 4,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "indianred",
    justifyContent: "center",
    alignItems: "center",
  },
  minus: {
    fontWeight: "bold",
    color: "darkred",
    fontSize: 32,
    position: "absolute",
    top: -18,
  },
});

export default RecordBox;
