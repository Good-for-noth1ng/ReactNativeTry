import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOutuser = () => {
    auth.signOut().then(() => {
      navigation.replace('Login');
    });
  };

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
      setChat(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    ))
    return unsubscribe; 
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
        title: "Signal",
        headerStyle: { backgroundColor: "#fff" },
        headerTitleStyle: { color: "black"},
        headerTintColor: "black",
        headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
                <TouchableOpacity onPress={signOutuser} activeOpacity={0.5}>
                  <Avatar source={{ uri: auth?.currentuser?.photoURL }} rounded/>
                </TouchableOpacity>
            </View>
        ),
        headerRight: () => (
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20,
          }}>
            <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name='camerao' size={24} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AddChat') }>
              <SimpleLineIcons name='pencil' size={24} color='black'/>
            </TouchableOpacity>
          </View>
        )
    });
  }, [navigation]);
  
  return (
    <SafeAreaView>
      <ScrollView>
        {chats.map(({id, data: { chatName }}) => (
          <CustomListItem key={id} id={id} chatName={chatName}/>  
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})