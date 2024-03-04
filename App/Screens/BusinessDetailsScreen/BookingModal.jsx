import { View, Text, TouchableOpacity,Modal, StyleSheet, FlatList, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import PageHeading from '../../Components/PageHeading';
import CalendarPicker from 'react-native-calendar-picker';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';

export default function BookingModal({businessId,hideModal}) {

    const [timeList,setTimeList]=useState();
    const [selectedTime,setSelectedTime]=useState();
    const [selectedDate,setSelectedDate]=useState();
    const [note,setNote]=useState();
    const {user}=useUser();
    useEffect(()=>{
        getTime();
    },[])

    const getTime=()=>{
        const timeList=[];
        for(let i=8;i<=12;i++)
        {
            timeList.push({
                time:i+':00 AM'
            })
            timeList.push({
                time:i+':30 AM'
            })
        }
        for(let i=1;i<=7;i++)
        {
            timeList.push({
                time:i+':00 PM'
            })
            timeList.push({
                time:i+':30 PM'
            })
        }
        setTimeList(timeList);
    }

    // Create Booking Method
    const createNewBooking=()=>{
        if(!selectedTime||!selectedDate){
            ToastAndroid.show('Please Select Date and Time', ToastAndroid.LONG)
            return;
        }
        const data={
            userName:user?.fullName,
            userEmail:user?.primaryEmailAddress.emailAddress,
            time:selectedTime,
            date:moment(selectedDate).format('DD-MMM-yyyy'),
            note:note,
            businessId:businessId
        }
        GlobalApi.createBooking(data).then(resp=>{
            console.log("Resp",resp);
            ToastAndroid.show('Booking Created Successfully!', ToastAndroid.LONG)
            hideModal();
        })
    }
  return (
    <ScrollView>
    <KeyboardAvoidingView style={{padding:20,paddingTop:50}} keyboardVerticalOffset={10} behavior={"position"}>
                <TouchableOpacity style={{display:'flex',flexDirection:'row',gap:10,alignItems:'center',marginBottom:20}}
            onPress={()=>hideModal()}>
            <Ionicons name="arrow-back-outline" size={30} color="black" />
            <Text style={{fontSize:25,fontFamily:'outfit-medium'}}>{'Booking'}</Text>
        </TouchableOpacity>

        {/* Calendar Section */}
        <Heading text={'Select Date'}/>
        <View style={styles.calenderContainer}>
            <CalendarPicker
                onDateChange={setSelectedDate}
                width={340}
                minDate={Date.now()}
                todayBackgroundColor={Colors.BLACK}
                todayTextStyle={{color:Colors.WHITE}}
                selectedDayColor={Colors.PRIMARY}
                selectedDayTextColor={Colors.WHITE}
            />
        </View>

        {/* Time Select Section */}
        <View style={{marginTop:20}}>
            <Heading text={'Select Time Slot'}/>
            <FlatList
                data={timeList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item,index})=>(
                    <TouchableOpacity style={{marginRight:10,borderRadius:99}}
                    onPress={()=>setSelectedTime(item.time)}>
                        <Text style={[selectedTime==item.time?
                         styles.selectedTime:styles.unSelectedTime]}>
                         {item.time}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
        {/* Note Section */}
        <View style={{paddingTop:20}}>
            <Heading text={'Any Suggestion Note'}/>
            <TextInput placeholder='Note' placeholderTextColor={Colors.GRAY}
            numberOfLines={4} multiline={true}
            style={styles.noteTextArea}
            onChange={(text)=>setNote(text)}
            />

            {/* confirmation Button */}
            <TouchableOpacity style={{marginTop:15}}
            onPress={()=>createNewBooking()}>
                <Text style={styles.confirmBtn}
                
                >Confirm and Book</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    calenderContainer:{
        backgroundColor:Colors.PRIMARY_LIGHT,
        padding:20,
        borderRadius:15
    },
    selectedTime:{
        padding:10,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:15,
        paddingHorizontal:18,
        backgroundColor:Colors.PRIMARY,
        color:Colors.WHITE
    },
    unSelectedTime:{
        padding:10,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:15,
        paddingHorizontal:18,
        color:Colors.PRIMARY
    },
    noteTextArea:{
        borderWidth:1,
        borderRadius:15,
        textAlignVertical:'top',
        padding:20,
        fontSize:16,
        fontFamily:'outfit',
        borderColor:Colors.PRIMARY_LIGHT,
        height:150
    },
    confirmBtn:{
        textAlign:'center',
        borderRadius:99,
        fontFamily:'outfit-medium',
        fontSize:17,
        backgroundColor:Colors.PRIMARY,
        color:Colors.WHITE,
        padding:13,
        elevation:2
    }
})