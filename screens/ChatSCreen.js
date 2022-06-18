import { 
  TouchableWithoutFeedback, 
  KeyboardAvoidingView, 
  Platform, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  DatePickerIOSBase} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native-gesture-handler'
import { Keyboard } from 'react-native'
import { db, auth } from '../firebase'
import * as firebase from "firebase"

const ChatSCreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerTitleAlign: 'left',
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Avatar 
            rounded 
            source={{uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}}
          />
          <Text
            style={{
              color: "white",
              marginLeft: 10,
              fontWeight: "700"
            }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => {
        <TouchableOpacity
          style={{
            marginLeft:10
          }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowLeft" size={24} color="white"/>
        </TouchableOpacity>
      },
      headerRight: () => {
        <View
          style={{
            flexDirection: "row",
            justifyContent: 'space-between',

            width: 20,
            marginRight: 20, 
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='call' size={24} color="white"/>
          </TouchableOpacity>
        </View>
      }
    })
  }, [navigation]);

  const sendMessage = () => {
    Keyboard.dismiss();
    
    db.collection('chats').doc(route.params.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimeStamp(),
      message: input,
      displayName: auth.currentUser.displayname,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    })

    setInput('')
  };

  useLayoutEffect(() => {
    const unsubscribe = db.collection('chats')
      .doc(route.params.id)
      .collections('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => setMessages(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      ));
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white", 
      }}
    >
      <StatusBar style='light'/>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={
          Keyboard.dismiss
        }>
          <>
            <ScrollView>
              {messages.map((id, data) => (
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar />
                    <Text style={styles.recieverText}>
                      {data.message}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.sender}>
                    <Avatar />
                    <Text style={styles.senderText}>{data.message}</Text>
                  </View>
                )
              ))}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput 
                value={input} 
                onChange={text => setInput(text)} 
                placeholder='Signal Message' 
                style={styles.textInput}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons name='send' size={24} color="#2B68E6"/>
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatSCreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15
  },

  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30
  },

  recieverText: {

  },
  senderText: {},
  reciever: {},
  sender: {},
})