import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import NewRecordModal from '../spending-modal/new-record-modal';
import { Record } from '../../models/record';

const RecordList = () => {

  const recordsTest: Record[] = [];
  for(let i = 0; i < 20; i++){
    recordsTest.push({
      id: i,
      name: "Name " + i,
      type: "Type " + i,
      amount: 1000 * i,
      date: new Date(),
    })
  }

  const [records, setRecords] = useState<Record[]>(recordsTest);
  const [newRecord, setNewRecord] = useState<Record>({});

  const [isModalVisible, setModalVisible] = useState(false);


  const handlePress = () => {
    setNewRecord({});
    setModalVisible(true);
    console.log('Modal Opened');
  };

  const handleModalClose = (newRecord: Record) => {
    setModalVisible(false);
    newRecord.id = (records.sort( (a: Record, b: Record) => a.id - b.id ).at(0).id ?? 0 ) + 1;
    console.log(newRecord);
    setRecords( (prevSpending) => {
      return [...prevSpending, newRecord]
    })
    console.log('Modal Closed');
  };

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          {
            records.map( (record, index) => (
              <View key={index}>
                <Text>ID: {record.id}</Text>
                <Text>Name: {record.name}</Text>
                <Text>Amount1: {record.amount}</Text>
              </View>
            ))
          }
          
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      { isModalVisible && 
        <NewRecordModal 
          newRecord={newRecord} 
          setNewRecord={setNewRecord}
          handleModalClose={handleModalClose}
        ></NewRecordModal> 
      }
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  button: {
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RecordList;