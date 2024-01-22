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
import { getCategories } from "../../utils/categories";
import { COLORS } from "../../utils/color";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Summary, SummaryStatus } from "../../models/summary";
import { getSummary } from "../../utils/calculations";
import { saveSummaries } from "../../utils/storage";

const NewRecordModal = ({
  newRecord,
  setNewRecord,
  summary,
  setSummary,
  setSummaries,
  setModalVisible,
}: {
  newRecord: Record;
  setNewRecord: (arg0: any) => void;
  summary: Summary;
  setSummary: (arg0: any) => void;
  setSummaries: (arg0: any) => void;
  setModalVisible: (arg0: any) => void;
}) => {
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isAmountValid, setIsAmountValid] = useState<boolean>(true);
  const [isCategoryValid, setIsCategoryValid] = useState<boolean>(true);
  const [categories, setCategories] = useState<Array<String>>(
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
      (summary.records.sort((a: Record, b: Record) => b.id - a.id).at(0)?.id ??
        0) + 1;
    newRecord.date = new Date();
    let newRecords: Record[] = [...summary.records, newRecord];
    newRecords = newRecords.sort((a: Record, b: Record) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    const newSummary: Summary = getSummary(newRecords);
    newSummary.status = SummaryStatus.ACTIVE;
    setSummary(newSummary);
    setSummaries((prevSummaries: Summary[]) => {
      const newSummaries: Summary[] = [...prevSummaries];
      const index: number = newSummaries.findIndex(
        (summary) => summary.status === SummaryStatus.ACTIVE
      );
      newSummaries[index] = newSummary;
      saveSummaries(newSummaries);
      return newSummaries;
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
                <RadioButton
                  value={RecordType.EXPENSE}
                  color={COLORS.expense}
                />
                <Text style={{ fontWeight: "bold", color: COLORS.expense }}>
                  Expense
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton value={RecordType.INCOME} color={COLORS.income} />
                <Text style={{ fontWeight: "bold", color: COLORS.income }}>
                  Income
                </Text>
              </View>
            </View>
          </RadioButton.Group>

          <View style={styles.inputContainer}>
            <Text
              style={{
                color: COLORS.text,
                fontWeight: "bold",
              }}
            >
              Name:
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: isNameValid ? COLORS.text : "red",
                padding: 8,
                borderRadius: 5,
                color: COLORS.text,
              }}
              value={newRecord.name}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text
              style={{
                color: COLORS.text,
                fontWeight: "bold",
              }}
            >
              Amount:
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: isAmountValid ? COLORS.text : "red",
                padding: 8,
                borderRadius: 5,
                color: COLORS.text,
              }}
              keyboardType="numeric"
              value={newRecord.amount?.toString()}
              onChangeText={(text) => setAmount(text)}
            />
          </View>

          <View>
            <Text
              style={{
                color: COLORS.text,
                fontWeight: "bold",
              }}
            >
              Category:
            </Text>
            <SelectDropdown
              data={categories}
              onSelect={(selectedItem) => {
                setCategory(selectedItem);
              }}
              defaultButtonText={" "}
              buttonTextAfterSelection={(selectedItem) => selectedItem}
              rowTextForSelection={(item) => item}
              buttonStyle={{
                backgroundColor: COLORS.background,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: isCategoryValid ? COLORS.border : "red",
                padding: 8,
                width: "100%",
                height: 45,
              }}
              buttonTextStyle={{
                textAlign: "left",
                fontSize: 16,
                marginLeft: 0,
              }}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={{ backgroundColor: COLORS.background }}
              rowStyle={{}}
              rowTextStyle={{ textAlign: "left" }}
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
    backgroundColor: COLORS.background,
    padding: 20,
    borderRadius: 5,
    elevation: 5,
    width: "75%",
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  modalButton: {
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.button,
    padding: 15,
    marginLeft: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NewRecordModal;
