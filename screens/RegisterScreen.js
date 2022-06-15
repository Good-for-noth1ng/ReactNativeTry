import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const register = () => {

  };
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Text h3 style={{marginBottom: 50}}>
        Create a Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input 
          placeholder='Full Name'
          autoFocus
          value={name}
          onChange={(text) => setName(text)}
        />
        <Input 
          placeholder='Email'
          value={email}
          onChange={(text) => setEmail(text)}
        />
        <Input 
          placeholder='Password'
          secureTextEntry={true}
          value={password}
          onChange={(text) => setPassword(text)}
        />
        <Input 
          placeholder='Profile Picture URL (optional)'
          value={imageUrl}
          onChange={(text) => setEmail(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button 
        style={styles.button}
        onPress={register} 
        title="Register" 
        raised
      />
      {/* <View style={{ height: 100 }}/> */}
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {  
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white"
  },
  inputContainer: {
    width: 300,
    
  },
  button: {
    width: 200,
    marginTop: 10,
  }
})