function RadioInput(props){
    console.log(props.value)
    console.log(props.chosen)
    if(props.value===props.chosen){
    
    
    return(

<input type="radio" className="form-radio" name="radio" 
value={props.value} onClick={()=>props.handleChange(props.value)} checked/>

    )
    }
    else{
        return(

            <input type="radio" className="form-radio" name="radio" 
            value={props.value} onClick={()=>props.handleChange(props.value)}/>
            
                )
    }
}

export default RadioInput;