import { View, Text, StyleSheet, Pressable } from "react-native";
import { Record, RecordType } from "../../models/record";
import { format } from "date-fns";
import Category from "./category";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../utils/color";

const RecordBox = ({
  record,
  setRecords,
}: {
  record: Record;
  setRecords: (arg0: any) => void;
}) => {
  const recordTypeColor =
    record.type === RecordType.EXPENSE ? COLORS.expense : COLORS.income;

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
          justifyContent: "flex-start",
        }}
      >
        <Category recordCategory={record.category}></Category>
        <Text style={{ fontWeight: "bold", paddingLeft: 3 }}>
          {record.name}
        </Text>
      </View>

      <Pressable style={styles.deleteButton} onPress={handlePress}>
        <Feather name="minus-circle" size={22} color={COLORS.remove} />
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
    backgroundColor: COLORS.recordBackground,
  },
  deleteButton: {
    position: "absolute",
    top: 4,
    right: 10,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RecordBox;
