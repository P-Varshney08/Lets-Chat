const GenderCheckbox = ({onCheckboxChange, selectedGender}) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedGender==="MALE" ? "selected" : ""} `}>
					<span className='label-text'>Male</span>
					<input type="checkbox" defaultChecked className="checkbox border-slate-900" 
						checked={selectedGender==="MALE"}
						onChange={()=> onCheckboxChange("MALE")}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedGender==="FEMALE" ? "selected" : ""} `}>
					<span className='label-text'>Female</span>
					<input type="checkbox" className="checkbox border-slate-900" 
						checked={selectedGender==="FEMALE"}
						onChange={()=> onCheckboxChange("FEMALE")}
					/>
				</label>
			</div>
		</div>
	);
};

export default GenderCheckbox;
