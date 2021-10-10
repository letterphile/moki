function Input(props){
    return(


<input className=" focus:border-light-blue-500 
focus:ring-1 focus:ring-light-blue-500 
focus:outline-none w-full text-sm text-black 
placeholder-gray-500 border border-gray-200 rounded-md 
py-2 pl-10" type="text" aria-label="Filter projects" 
placeholder={props.placeholder} value={props.value} onChange={props.handleChange}/>
    )
}

export default Input;