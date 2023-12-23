import {
  Modal,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { RecordType } from "../models/record";

const NewRecordModal = ({
  newRecord,
  setNewRecord,
  handleModalComplete,
  handleModalClose,
}) => {
  const setName = (name: string) => {
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

  return (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name:</Text>
            <TextInput
              style={styles.input}
              value={newRecord.name}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Amount:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={newRecord.amount}
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
                <RadioButton value={RecordType.EXPENSE} color="red" />
                <Text style={{ fontWeight: "bold", color: "red" }}>
                  Expense
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton value={RecordType.INCOME} color="blue" />
                <Text style={{ fontWeight: "bold", color: "blue" }}>
                  Income
                </Text>
              </View>
            </View>
          </RadioButton.Group>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleModalClose()}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleModalComplete(newRecord)}
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
  inputLabel: {
    color: "black",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
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
