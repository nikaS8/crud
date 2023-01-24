import React from 'react'
import './Dropdown.css'
import {useDispatch} from "react-redux";
import {codePrinted} from "../../store/phoneSlice";

export const Dropdown = ({options}) => {
	const initialCode = {code: options[0].code, value: options[0].value};
	const dispatch = useDispatch();

	const handleOnChange = (e) => {
		let opt = options.filter((el) => el.value === e.target.value);
		dispatch(codePrinted({value: opt[0].code}))
	}

	return (
		<div className="drop-container">
			<select onChange={handleOnChange} name="codes" className='drop-select' >
				<option>{initialCode.value}</option>
				{options.filter((el) => el.value !== initialCode.value).map((opt) => (<option key={opt.key} value={opt.value}>{opt.value}</option>))}
			</select>
		</div>
	)
}
  