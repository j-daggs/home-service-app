import { View, Text } from 'react-native'
import React from 'react'
import Slider from './Slider'
import Header from './Header'

export default function HomeScreen() {
  return (
    <View>
        {/* Header   */}
        <Header/>
      <View style={{padding:20}}>
        {/* Slider */}
        <Slider/>
      </View>
    </View>
  )
}