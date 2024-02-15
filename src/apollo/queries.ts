import { gql } from "@apollo/client"

export const GET_ITEMS = gql(`
query{
  boards(ids:${process.env.REACT_APP_BOARD_ID}){
    columns(types: [status, name,numbers,text]){
      title
      
    }
    items_page {
      items {
        column_values {
          column {
            title
          }
          text
        }
        name
        id
      }
    }
    id
    name
  }
}
`)
