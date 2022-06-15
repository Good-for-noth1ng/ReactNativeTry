import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { ScrollView } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { auth } from '../firebase'

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
        title: "Signal",
        headerStyle: { backgroundColor: "#fff" },
        headerTitleStyle: { color: "black"},
        headerTintColor: "black",
        headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
                <Avatar source={{ uri: auth?.currentuser?.photoURL }} rounded/>
            </View>
        )
    });
  }, [])
    return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})