import { connect } from 'react-redux'
// import { addTodo, removeTodo, completeTodo } from '../modules/todos'

import Signup from '../components/Signup'

const mapDispatchToProps = {
  // addTodo : (text) => addTodo(text),
  // removeTodo : (id) => removeTodo(id),
  // completeTodo : (id) => completeTodo(id)
}

const mapStateToProps = (state) => ({
  // auth : state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
