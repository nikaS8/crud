import React from 'react'
import { useState } from 'react';
import './Dropdown.css'
import {useDispatch, useSelector} from "react-redux";
// import {numAdded} from "../../store/numSlice";
import {codePrinted} from "../../store/phoneSlice";

// export const Dropdown = ({options}) => {
// 	const [inputValue, setInputValue] = useState([options[0].value, options[0].code] );
// 	const [showMenu, setShowMenu] = useState(false);
//
// 	const code = useSelector(state => state.code)
// 	const dispatch = useDispatch();
//
// 	useEffect(() => {
// 		const handler = () => setShowMenu(false);
//
// 		window.addEventListener('click', handler);
// 		return () => {
// 			window.removeEventListener('click', handler);
// 		};
// 	});
//
// 	const handleClick = (e) => {
// 		e.stopPropagation();
// 		setShowMenu(!showMenu);
// 	}
//
// 	const selectedClick = (option) => {
// 		setInputValue([option.value, option.code]);
// 		dispatch(
// 			codePrinted({
// 				code: option.value
// 			})
// 		)
// 		// console.log(code.value, 'option code')
// 	}
//
// 	const handleChange = (e) => {
// 		console.log(e.target.value,'change');
// 	}
//
// 	return(
// 		<div className='drop-container' >
// 			<input className='drop drop-input' type='button' value={inputValue[0]} onClick={handleClick}/>
// 			{showMenu && (<div className='drop-menu'>
// 				{options.filter((el) => el.value !== inputValue[0]).map((option) => (
// 					<input
// 						className=' drop drop-item'
// 						type='button'
// 						key={option.key}
// 						value={option.value}
// 						onClick={() => selectedClick(option)}
// 					/>
// 				))}
// 			</div>
// 			)}
// 			{/*{console.log(code.value, 'render')}*/}
// 			{/*<div>*/}
// 			{/*	<label htmlFor="cars">Choose a car:</label>*/}
// 			{/*	<select*/}
// 			{/*		onChange={() => console.log("onchange is triggered")} name="codes" className="form-control">*/}
// 			{/*		<option>Select a Role</option>*/}
// 			{/*		<option value="ABC" >ABC</option>*/}
// 			{/*		<option value="DEF" >DEF</option>*/}
// 			{/*		<option value="GHI" >GHI</option>*/}
// 			{/*	</select>*/}
// 			{/*	<label htmlFor="cars">Choose a car:</label>*/}
// 			{/*</div>*/}
// 		</div>
// 	)
// };

export const Dropdown = ({options}) => {
	const [inputValue, setInputValue] = useState({
		code: options[0].code,
		value: options[0].value
	});

	const code = useSelector(state => state.code)
	const dispatch = useDispatch();

	const handleOnChange = (e) => {
		let opt = options.filter((el) => el.value === e.target.value);
		console.log(opt[0].code, 'code')
		dispatch(
			codePrinted({
				value: opt[0].code
			})
		)
	}

	return (
		<div className="drop-container">
			<select onChange={handleOnChange} name="codes" className='drop-select' >
				<option>{inputValue.value}</option>
				{options.filter((el) => el.value !== inputValue.value).map((opt) => (<option key={opt.key} value={opt.value}>{opt.value}</option>))}
			</select>
		</div>
	)
}
  