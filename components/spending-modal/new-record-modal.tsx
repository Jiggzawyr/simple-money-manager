import { Modal, Text, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const NewRecordModal = ({ newRecord, setNewRecord , handleModalClose }) => {

  const setName = (name: string) => {
    setNewRecord( (prevNewSpending) => {
      return {
        ...prevNewSpending,
        name: name,
      }
    })
  }

  const setAmount = (amount: string) => {
    // Remove non-numeric characters from the input
    const cleanedText = amount.replace(/[^0-9]/g, '');
    const numericAmount = parseInt(cleanedText, 10);
    setNewRecord( (prevNewSpending) => {
      return {
        ...prevNewSpending,
        amount: numericAmount,
      }
    })
  }

	return (
        <Modal
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Name:</Text>
            <TextInput
              style={styles.input}
              value={newRecord.name}
              onChangeText={(text) => setName(text)}
            />
            <Text>Amount:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={newRecord.amount}
              onChangeText={(text) => setAmount(text)}
            />
            <TouchableOpacity style={styles.modalButton} onPress={() => handleModalClose(newRecord)}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>  
    )
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'silver',
        padding: 20,
        borderRadius: 5,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        padding: 8,
        borderRadius: 5,
    },
    modalButton: {
        backgroundColor: 'gray',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default NewRecordModal;