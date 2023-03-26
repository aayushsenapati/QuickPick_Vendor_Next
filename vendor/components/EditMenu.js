import axios from "axios";


export default function EditMenu(props) {
      axios.get('/api/getClientRest/'+props.user.email)
    .then((e)=>{console.log(e)},()=>{console.log("There was an error in api/getClientRest")})
      return (
            <><div>{props.user.email}</div>
            <h1>Test</h1></>
      )
}