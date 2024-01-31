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

export default{
    getSlider,
    getCategories
}

