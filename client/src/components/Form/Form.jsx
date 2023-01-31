import React, {useEffect} from 'react'
import { useState } from 'react';
import './Form.css';
import { CODE_LIST } from '../../config/codeList';
import { Dropdown } from '../Dropdown/Dropdown';
import {useDispatch, useSelector} from "react-redux";
import {numAdded, numDelete} from "../../store/numSlice";
import {ADD_NUM, DELETE_NUM_BY_ID, GET_NUMBERS} from "../../sagas/types/type";

const URL = 'ws://127.0.0.1:3000';

export const Form = () => {
	const [inputValue, setInputValue] = useState('');
	const [ws, setWs] = useState(new WebSocket(URL));
	const posts = useSelector(state => state.numbers)
	const code = useSelector(state => state.code);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: GET_NUMBERS })
	},[]);

	useEffect(() => {
		ws.onopen = () => {
			console.log('WebSocket Connected');
		}
		ws.onmessage = async( e) => {
			let message = JSON.parse(await e.data.text());
			if (message.flag === 1) {
				dispatch(numAdded({id: message.id, number: message.value}));
			}
			if (message.flag === 2) {
				dispatch(numDelete(message.value));
			}
		}
		return () => {
			ws.onclose = () => {
				console.log('WebSocket Disconnected');
				setWs(new WebSocket(URL));
			}
		}
	}, [ws.onopen, ws.onclose, ws.onmessage]);

	function checkNumber(num) {
		const regex = /^[0-9]{3,10}$/;
		if (regex.test(num)) {
			return true
		}
		else {
			alert('Wrong number format!\nThe length of the phone number is from 3 to 10 digits, excluding the country code.\n' +
				'Any characters other than numbers are prohibited.')
			return false
		}
	}

	const handleSubmit = e => {
		e.preventDefault();
		let nextId = 0;
		if (posts.content.length) {
			nextId = parseInt(posts.content[posts.content.length - 1].id) + 1;
		}
		if (inputValue && checkNumber(inputValue)) {
			ws.send(JSON.stringify({value: code.value + inputValue, id: nextId.toString(), flag: 1}));
			dispatch((numAdded({id: nextId.toString(), number: code.value + inputValue})))
			dispatch({ type: ADD_NUM, num: { number: code.value + inputValue, id: nextId.toString()} })
			setInputValue('')
		}
	}

	const deleteNum = (numId) => {
		ws.send(JSON.stringify({value: numId, flag: 2}));
		dispatch({type: DELETE_NUM_BY_ID, id: numId})
		dispatch(numDelete(numId));
	}

	const onChangeHandler = e => {
		setInputValue(e.target.value);
	}

	return (
		<div>
			<form className='validation' onSubmit={handleSubmit}>
				<Dropdown options={CODE_LIST}/>
				<input className='input-text' type='text' name='phone' value={inputValue} onChange={onChangeHandler} />
				<input className='btn' type='submit' value='Add number' />
			</form>
			{posts.content.map((post) => {
				return (
					<div key={post.id} className='card'>
						<h3>Number: {post.number}</h3>
						<button onClick={() => deleteNum(post.id)}>Delete</button>
					</div>
				)
			})}
		</div>
	)
}
