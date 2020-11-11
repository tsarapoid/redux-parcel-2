import React from "react"
import ReactDOM from "react-dom"
import { createStore, bindActionCreators } from 'redux'
import { connect, connectAdvanced, Provider } from 'react-redux'

const initialState = {
	firstName: '',
	lastName: '',
}

const CHANGE_FIRST_NAME = 'CHANGE_FIRST_NAME'
const CHANGE_LAST_NAME = 'CHANGE_LAST_NAME'

const changeFirstName = (newFirstName) => {
	return {
		type: CHANGE_FIRST_NAME,
		payload: newFirstName
	}
}

const changeLastName = (newLastName) => {
	return {	
		type: CHANGE_LAST_NAME,
		payload: newLastName,
	}
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_FIRST_NAME:
			return {...state, firstName: action.payload}
		case CHANGE_LAST_NAME:
			return {...state, lastName: action.payload}
		default:
			return state
	}
}

const store = createStore(rootReducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
		window.__REDUX_DEVTOOLS_EXTENSION__()
)

function App(props) {
	const {firstName, lastName, changeFirstName, changeLastName} = props
	return (
		<>
			<div>
				<input type='text'
				value={firstName}
				onChange={(event) => {
					changeFirstName(event.target.value)
				}}
				placeholder='First Name'/>
			</div>
			<div>
				<input type='text'
				value={lastName}
				onChange={(event) => {
					changeLastName(event.target.value)
				}}
				placeholder='Second Name'/>
			</div>
			<div>
				<br/>
				{firstName}
				<br/>
				{lastName}
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		firstName: state.firstName,
		lastName: state.lastName,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		changeFirstName: bindActionCreators(changeFirstName,dispatch),
		changeLastName: bindActionCreators(changeLastName,dispatch),
	}
}

const Main = connect(mapStateToProps,mapDispatchToProps)(App)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
			<Main/>
		</Provider>
  </React.StrictMode>,
  document.getElementById('app')
)








/* 

const initialState = {
	firstName: 'Petr',
	lastName: 'Petrov'
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CHANGE_FIRST_NAME':
			return {...state,
				firstName: action.payload}
		case 'CHANGE_LAST_NAME':
			return {...state,
				lastName: action.payload}
		default:
			return state
	}
}

//const store = createStore(reducer, initialState)

const store = createStore(reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
	window.__REDUX_DEVTOOLS_EXTENSION__()
)
console.log(store.getState())

const changeName = {
	type: 'CHANGE_FIRST_NAME',
	payload: 'Ivan'
}

const changeSecondName = {
	type: 'CHANGE_LAST_NAME',
	payload: 'Ivanov'
}

store.dispatch(changeName)
console.log(store.getState())

store.dispatch(changeSecondName)
console.log(store.getState())
 */