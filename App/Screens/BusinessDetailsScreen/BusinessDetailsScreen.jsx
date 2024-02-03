import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation,useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import BusinessPhotos from './BusinessPhotos';
import BusinessAboutMe from './BusinessAboutMe';
import BookingModal from './BookingModal';

export default function BusinessDetailsScreen() {
    const param = useRoute().params;
    const [business,setBusiness]=useState(param.business);
    const [showModal,setShowModal]=useState(false);
    const navigation=useNavigation();
    useEffect(()=>{
        param&&setBusiness(param.business)
    },[])
  return business&&(
    <View>
    <ScrollView style={{height:'91%'}}>
      <TouchableOpacity style={styles.backBtnContainer}
      onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={30} color="black" />
      </TouchableOpacity>
      <Image source={{uri:business?.images[0]?.url}}
        style={{width:'100%',height:300}}
       />
       <View style={styles.infoContainer}>
        <Text style={{fontFamily:'outfit-bold',
        fontSize:25}}>{business?.name}</Text>
        <View style={styles.subContainer}>
            <Text style={{fontFamily:'outfit-medium',
            color:Colors.PRIMARY,fontSize:20}}>{business?.contactPerson}  ⭐  </Text>
            <Text style={{color:Colors.PRIMARY,backgroundColor:Colors.PRIMARY_LIGHT,
            padding:5,borderRadius:5,fontSize:14}}>{business?.category.name}</Text>
        </View>
            <Text style={{fontSize:17,fontFamily:'outfit',color:Colors.GRAY}}>
            <Ionicons name="location-sharp" size={25} color={Colors.PRIMARY} />{business.address}
            </Text>
       
            {/* Horizontal Line */}

            <View style={{borderWidth:0.4, borderColor:Colors.GRAY, marginTop:20, marginBottom:20}}></View>

            {/* About Me Section */}

            <BusinessAboutMe business={business}/>
            {/* Horizontal Line */}

            <View style={{borderWidth:0.4, borderColor:Colors.GRAY, marginTop:20, marginBottom:20}}></View>       

            <BusinessPhotos business={business} />         
       </View>

    </ScrollView>
    <View style={{
        display:'flex',
        flexDirection:'row',
        margin:8,
        gap:8
    }}>
        <TouchableOpacity style={styles.messageBtn}>
            <Text style={{
                textAlign:'center',
                fontFamily:'outfit-medium',
                color:Colors.PRIMARY,
                fontSize:18
            }}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookingBtn}
        onPress={()=>setShowModal(true)}>
            <Text style={{
                textAlign:'center',
                fontFamily:'outfit-medium',
                color:Colors.WHITE,
                fontSize:18
            }}>Book Now</Text>
        </TouchableOpacity>
    </View>
    {/* Booking Screen Modal */}
    <Modal
        animationType='slide'
        visible={showModal}
    >
        <BookingModal hideModal={()=>setShowModal(false)}/>
    </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    backBtnContainer:{
        position:'absolute',
        zIndex:10,
        padding:20
    },
    infoContainer:{
        padding:20,
        display:'flex',
        gap:7
    },
    subContainer:{
        display:'flex',
        flexDirection:'row',
        gap:5,
        alignItems:'center'
    },
    messageBtn:{
        padding:10,
        backgroundColor:Colors.WHITE,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        flex:1        
    },
    bookingBtn:{
        padding:10,
        backgroundColor:Colors.PRIMARY,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        flex:1   
    }

})