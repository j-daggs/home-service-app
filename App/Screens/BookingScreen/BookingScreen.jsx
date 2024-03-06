import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import {PageHeading} from './../../Components/PageHeading';
import GlobalApi from './../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import BusinessListItem from './../BusinessListByCategoryScreen/BusinessListItem';
export default function BookingScreen() {

  const {user}=useUser();
  const [bookingList,setBookingList]=useState([])
  useEffect(()=>{
    user&&getUserBookings();
  },[user])
/**
 * Get user Bookings
 */

  const getUserBookings=()=>{
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then(resp=>{
      console.log(resp);
      setBookingList(resp.bookings);
    })
  }
  return (
    <View style={{padding:20}}>
      <Text style={{fontFamily:'outfit-medium',
      fontSize:26}}>My Bookings</Text>

      <View>
      <FlatList
      data={bookingList}
      renderItem={({item,index})=>(
        <BusinessListItem 
        business={item?.business}
        booking={item}
         />
      )}        
      />
      </View>
    </View>
  )
}