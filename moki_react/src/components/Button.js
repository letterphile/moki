import axios from 'axios'
function Button(props){

    return (
      <button className="bg-green-500
       p-2 text-bs rounded-xl 
       text-white subpixel-antialiased 
       font-medium hover:bg-green-600 w-full" onClick={props.sendData}>{props.children}</button>
    )
  }

  export default Button;