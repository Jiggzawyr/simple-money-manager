import {
  Modal,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Record, RecordType } from "../../models/record";
import { useState } from "react";
import RNSingleSelect, {
  ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";
import { getCategories } from "../../utils/categories";

const NewRecordModal = ({
  newRecord,
  setNewRecord,
  records,
  setRecords,
  setModalVisible,
}: {
  newRecord: Record;
  setNewRecord: (arg0: any) => void;
  records: Record[];
  setRecords: (arg0: any) => void;
  setModalVisible: (arg0: any) => void;
}) => {
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isAmountValid, setIsAmountValid] = useState<boolean>(true);
  const [isCategoryValid, setIsCategoryValid] = useState<boolean>(true);
  const [categories, setCategories] = useState<Array<ISingleSelectDataType>>(
    getCategories(RecordType.EXPENSE)
  );

  const setName = (name: string) => {
    if (name) setIsNameValid(true);
    setNewRecord((prevNewRecord: Record) => {
      return {
        ...prevNewRecord,
        name: name,
      };
    });
  };

  const setAmount = (amount: string) => {
    // Remove non-numeric characters from the input
    const cleanedText = amount.replace(/[^0-9]/g, "");
    const numericAmount = parseInt(cleanedText, 10);
    if (numericAmount && numericAmount !== 0) setIsAmountValid(true);
    setNewRecord((prevNewRecord: Record) => {
      return {
        ...prevNewRecord,
        amount: numericAmount,
      };
    });
  };

  const setType = (type: string) => {
    setCategories(getCategories(type as RecordType));
    setNewRecord((prevNewRecord: Record) => {
      return {
        ...prevNewRecord,
        type: type,
        category: undefined,
      };
    });
  };

  const setCategory = (category: string) => {
    if (category) setIsCategoryValid(true);
    setNewRecord((prevNewRecord: Record) => {
      return {
        ...prevNewRecord,
        category: category,
      };
    });
  };

  const handleModalComplete = () => {
    if (!newRecord.name) setIsNameValid(false);
    if (!newRecord.amount || newRecord.amount === 0) setIsAmountValid(false);
    if (!newRecord.category) setIsCategoryValid(false);
    if (
      !newRecord.name ||
      !newRecord.amount ||
      newRecord.amount === 0 ||
      !newRecord.category
    )
      return;
    setModalVisible(false);
    newRecord.id =
      (records.sort((a: Record, b: Record) => b.id - a.id).at(0)?.id ?? 0) + 1;
    newRecord.date = new Date();
    setRecords((prevRecords: Record[]) => {
      let records = [...prevRecords, newRecord];
      records = records.sort((a: Record, b: Record) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
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

          <View>
            <RNSingleSelect
              placeholder="Select Category"
              buttonContainerStyle={{
                backgroundColor: "beige",
                borderWidth: 1,
                borderColor: isCategoryValid ? "gray" : "red",
              }}
              menuBarContainerStyle={styles.categorySelectOption}
              menuItemTextStyle={styles.categorySelectOptionText}
              data={categories}
              searchEnabled={false}
              onSelect={(selectedItem: ISingleSelectDataType) => {
                setCategory(selectedItem.value);
              }}
            />
          </View>

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
  categorySelectOption: {
    backgroundColor: "beige",
  },
  categorySelectOptionText: {
    color: "black",
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
