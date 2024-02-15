import { gql } from "@apollo/client"

export const CREATE_ITEM = gql(`
mutation create_item($item_name:String!, $board_id: ID!, $column_values: JSON){
	create_item(item_name: $item_name, board_id: $board_id,column_values: $column_values){
    id
  }

}
`)

export const DELETE_ITEM = gql(`
mutation delete_item($item_id: ID!){

  delete_item(item_id:$item_id){
		id
  }
 
}
`)
