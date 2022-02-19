import { gql } from "@apollo/client"


export const ADD_USER = gql`
mutation addUser($username: String!, $email:String!, $password: String!){
  addUser(username: $username, email:$email, password: $password){
    token
    user{
       username 
       email 
    }
  }
}
 
`


export const LOGIN = gql`
mutation login($email: String!, $password: String!){
  login(email: $email, password: $password){
       token
    user{
       username 
       email 
    }
  }
}
`

export const SAVE_BOOK = gql`
mutation saveBook ($BookData: BookData ){
  saveBook (BookData: $BookData){
 
    username
    email

  }
}
`

export const REMOVE_BOOK = gql`
mutation removeBook ($bookId: String!){
  removeBook(bookId: $bookId){
    username
    email
  }
}
`