import {
  Modal,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Record, RecordType } from "../models/record";
import { useState } from "react";

const NewRecordModal = ({
  newRecord,
  setNewRecord,
  records,
  setRecords,
  setModalVisible,
}: {
  newRecord: Record;
  setNewRecord: (any) => void;
  records: Record[];
  setRecords: (any) => void;
  setModalVisible: (any) => void;
}) => {
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isAmountValid, setIsAmountValid] = useState<boolean>(true);

  const setName = (name: string) => {
    if (name) setIsNameValid(true);
    setNewRecord((prevNewSpending) => {
      return {
        ...prevNewSpending,
        name: name,
      };
    });
  };

  const setAmount = (amount: string) => {
    // Remove non-numeric characters from the input
    const cleanedText = amount.replace(/[^0-9]/g, "");
    const numericAmount = parseInt(cleanedText, 10);
    if (numericAmount && numericAmount !== 0) setIsAmountValid(true);
    setNewRecord((prevNewSpending) => {
      return {
        ...prevNewSpending,
        amount: numericAmount,
      };
    });
  };

  const setType = (type: string) => {
    setNewRecord((prevNewSpending) => {
      return {
        ...prevNewSpending,
        type: type,
      };
    });
  };

  const handleModalComplete = () => {
    if (!newRecord.name) setIsNameValid(false);
    if (!newRecord.amount || newRecord.amount === 0) setIsAmountValid(false);
    if (!newRecord.name || !newRecord.amount || newRecord.amount === 0) return;
    setModalVisible(false);
    newRecord.id =
      (records.sort((a: Record, b: Record) => b.id - a.id).at(0).id ?? 0) + 1;
    setRecords((prevRecords: Record[]) => {
      let records = [...prevRecords, newRecord];
      records = records.sort(
        (a: Record, b: Record) => a.date.getTime() - b.date.getTime()
      );
      return records;
    });
    console.log("Modal Completed");
  };
  return (
    <Modal animationType="fade" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.modalContent}>
          <View style={styles.inputContainer}>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              Name:
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: isNameValid ? "gray" : "red",
                padding: 8,
                borderRadius: 5,
              }}
              value={newRecord.name}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              Amount:
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: isAmountValid ? "gray" : "red",
                padding: 8,
                borderRadius: 5,
              }}
              keyboardType="numeric"
              value={newRecord.amount?.toString()}
              onChangeText={(text) => setAmount(text)}
            />
          </View>

          <RadioButton.Group
            onValueChange={(type) => setType(type)}
            value={newRecord.type}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton value={RecordType.EXPENSE} color="maroon" />
                <Text style={{ fontWeight: "bold", color: "maroon" }}>
                  Expense
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton value={RecordType.INCOME} color="navy" />
                <Text style={{ fontWeight: "bold", color: "navy" }}>
                  Income
                </Text>
              </View>
            </View>
          </RadioButton.Group>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleModalComplete()}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "beige",
    padding: 20,
    borderRadius: 5,
    elevation: 5,
    width: "75%",
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "darkturquoise",
    padding: 15,
    marginLeft: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NewRecordModal;
