import { gql } from '@apollo/client'

export const ALL_PRODUCTS = gql`
  query allProducts {
    products {
      id
      name
      price
      quantity
    }
  }
`

export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      name
      price
      quantity
    }
  }
`

export const CREATE_PRODUCT = gql`
  mutation createProduct($name: String!, $price: Float!, $quantity: Float!) {
    createProduct(name: $name, price: $price, quantity: $quantity) {
      id
      name
      price
      quantity
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: ID!
    $name: String
    $price: Float
    $quantity: Float
  ) {
    updateProduct(id: $id, name: $name, price: $price, quantity: $quantity) {
      id
      name
      price
      quantity
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      price
      quantity
    }
  }
`

export const USER_SIGNUP = gql`
  mutation UserSignUp($name: String!, $email: String!, $password: String!) {
    userSignUp(name: $name, email: $email, password: $password) {
      id
      name
      email
      password
    }
  }
`

export const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      id
      token
    }
  }
`
