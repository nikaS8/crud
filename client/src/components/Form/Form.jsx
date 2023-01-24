import React, {useEffect} from 'react'
import { useState } from 'react';
import './Form.css';
import { CODE_LIST } from '../../config/codeList';
import { Dropdown } from '../Dropdown/Dropdown';
import {useDispatch, useSelector} from "react-redux";
import {numAdded, initList, numDelete} from "../../store/numSlice";
import axios from 'axios';

export const Form = () => {
	const [inputValue, setInputValue] = useState('');
	const posts = useSelector(state => state.numbers)
	const code = useSelector(state => state.code);
	const dispatch = useDispatch();

	useEffect(() => {
		axios.get("http://localhost:3000/api/get").then((responce) => {
			dispatch(initList(responce.data));
		})
	});

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
			dispatch((numAdded({id: nextId.toString(), number: code.value + inputValue})))
			axios.post("http://localhost:3000/api/insert", {
				number: code.value + inputValue,
				id: nextId,
			}).then((responce) => {
				console.log(responce, 'responce');
			})
			setInputValue('')
		}
	}

	const deleteNum = (numId) => {
		axios.delete(`http://localhost:3000/api/delete/${numId}`);
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
