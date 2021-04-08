import {React} from "react";

// import Realtime from './Realtime';
// import Input from './Input'

class Invite extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        return res.redirect('./Realtime');
    }
    
    render(){
      return(
          <div>
              <button onClick = {this.handleSubmit}> Accept Invite </button>
          </div>
        )     
    }               
}


// class Invite extends Component {
//     state = {
//       redirect: false
//     }
//     setRedirect = () => {
//       this.setState({
//         redirect: true
//       })
//     }
//     renderRedirect = () => {
//       if (this.state.redirect) {
//         return <Redirect to='/Input' />
//       }
//     }
//     render () {
//       return (
//          <div>
//           {this.renderRedirect()}
//           <button onClick={this.setRedirect}>Redirect</button>
//          </div>
//       )
//     }
//   }

export default Invite;