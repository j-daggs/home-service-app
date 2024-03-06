import { request, gql } from 'graphql-request'

const MASTER_URL='https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clrzbj1yo1utw01utipmzn57t/master'

const getSlider=()=>{
    const query = gql`
    query GetSliders {
        sliders {
          id
          name
          image {
            url
          }
        }
      }
  `

  const result = request(MASTER_URL, query)
  return result;
}

const getCategories=async()=>{
    const query=gql`
    query GetCategory {
        categories {
          id
          name
          icon {
            url
          }
        }
      }   
    `

    const result = request(MASTER_URL, query)
    return result;
}

const getBusinessList=async()=>{
    const query=gql`
    query getBusinessList {
        businessLists {
          id
          name
          email
          contactPerson
          category {
            name
          }
          address
          about
          images {
            url
          }
        }
      }
         
    `

    const result = request(MASTER_URL, query)
    return result;
}

const getBusinessListByCategory=async(category)=>{
  const query=gql`
  query getBusinessList {
    businessLists(where: {category: {name: "`+category+`"}}) {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      about
      images {
        url
      }
    }
  }
  `

  const result = request(MASTER_URL, query)
  return result;
}

const createBooking=async(data)=>{
  const mutationQuery=gql`
  mutation createBooking {
    createBooking(
      data: {
        bookingStatus: Booked,
        business: {connect: {id: "`+data.businessId+`"}}, 
        date: "`+data.date+`", 
        time: "`+data.time+`", 
        userEmail: "`+data.userEmail+`", 
        userName: "`+data.userName+`"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  `
  const result = request(MASTER_URL, mutationQuery)
  return result;
  
}

const getUserBookings=async(userEmail)=>{
  const query=gql`
  query GetUserBookings {
    bookings(orderBy: updatedAt_DESC, where: {userEmail: "`+userEmail+`"}) {
      time
      userEmail
      userName
      bookingStatus
      date
      id
      business {
        id
        images {
          url
        }
        name
        address
        contactPerson
        about
      }
    }
  }
  
  `
  const result = request(MASTER_URL, query)
  return result;
  
}

export default{
    getSlider,
    getCategories,
    getBusinessList,
    getBusinessListByCategory,
    createBooking,
    getUserBookings
}

