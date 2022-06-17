import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChatSCreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>{route.params.chatName}</Text>
    </View>
  )
}

export default ChatSCreen

const styles = StyleSheet.create({})