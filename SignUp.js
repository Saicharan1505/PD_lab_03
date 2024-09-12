import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; // Updated import

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState(null); // Allow birthdate to be null for clear date option
  const [showDatePicker, setShowDatePicker] = useState(false); // Control visibility of the date picker
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [biography, setBiography] = useState('');

  const handleSignUp = () => {
    console.log('User Details:', {
      email,
      password,
      name,
      birthdate: birthdate ? birthdate.toLocaleDateString() : null, // Handle null birthdate
      country,
      gender,
      biography,
    });
  };

  // Show the DatePicker when the birthdate field is focused
  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  // Handle the date change from the DateTimePicker
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Close the picker
    setBirthdate(selectedDate || birthdate); // Update birthdate state or keep it the same
  };

  // Clear the birthdate field
  const clearBirthdate = () => {
    setBirthdate(null); // Reset birthdate to null
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />

      {/* DatePicker for Birthdate with consistent TextInput style */}
      <TouchableOpacity onPress={showDatePickerModal}>
        <TextInput
          placeholder="Select Birthdate"
          value={birthdate ? birthdate.toLocaleDateString() : ''}
          style={styles.input}
          editable={false} // Prevent manual input
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={birthdate || new Date()} // Show current date if birthdate is null
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Clear Date Button */}
      {birthdate && (
        <TouchableOpacity onPress={clearBirthdate} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear Date</Text>
        </TouchableOpacity>
      )}

      {/* Country Dropdown Picker */}
      <Picker selectedValue={country} onValueChange={(itemValue) => setCountry(itemValue)} style={styles.picker}>
        <Picker.Item label="Select Country" value="" />
        <Picker.Item label="USA" value="USA" />
        <Picker.Item label="India" value="India" />
        <Picker.Item label="Canada" value="Canada" />
      </Picker>

      {/* Gender Dropdown Picker */}
      <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)} style={styles.picker}>
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>

      <TextInput placeholder="Biography" value={biography} onChangeText={setBiography} style={styles.input} multiline />

      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  clearButton: {
    backgroundColor: '#ff6961',
    padding: 10,
    marginTop: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  picker: {
    borderWidth: 1,
    marginVertical: 8,
  },
});
