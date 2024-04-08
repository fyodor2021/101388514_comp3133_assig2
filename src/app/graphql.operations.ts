import { gql } from 'apollo-angular'

const login = gql`
query Login($password: String!, $email: String) {
    login(password: $password, email: $email) {
      email
      password
    }
  }
`

const getAllEmployees = gql`
query Query {
  getAllEmployees {
    _id
    first_name
    last_name
    email
    gender
    salary
  }
}
`
const addEmployee = gql`
mutation AddNewEmployee($input: EmployeeInput) {
    addNewEmployee(input: $input) {
      _id
      first_name
      last_name
      email
      gender
      salary
    }
  }
`
const editEmployee = gql`
mutation Mutation($id: String!, $input: EmployeeInput) {
  updateEmployeeById(_id: $id, input: $input) {
    _id
    first_name
    last_name
    email
    gender
    salary
  }
}
`
const deleteEmployee = gql`
mutation DeleteEmployeeById($id: String!) {
  deleteEmployeeById(_id: $id)
}
`
const signup = gql`
mutation Mutation($input: UserInput) {
  signup(input: $input)
}
`
export { login, getAllEmployees, addEmployee, editEmployee, deleteEmployee,signup }