import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [biography, setBiography] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (!email || !password || !name || !country || !gender || !biography) {
      Alert.alert('Error', 'Please fill out all fields');
    } else {
      console.log({
        email, password, name, birthdate, country, gender, biography
      });
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Birthdate:</Text>
      <Button title="Select Birthdate" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={birthdate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || birthdate;
            setShowDatePicker(false);
            setBirthdate(currentDate);
          }}
        />
      )}

      <Text style={styles.label}>Country:</Text>
      <Picker
        selectedValue={country}
        onValueChange={(itemValue) => setCountry(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Country" value="" />
        <Picker.Item label="USA" value="USA" />
        <Picker.Item label="India" value="India" />
        <Picker.Item label="Canada" value="Canada" />
      </Picker>

      <Text style={styles.label}>Gender:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      <TextInput
        placeholder="Biography"
        value={biography}
        onChangeText={setBiography}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
    borderRadius: 5,
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 15,
  },
});
