import React from "react";
import _ from "lodash";

export class StateExample extends React.Component{
    state={
        userInput: "",
        previousInputs:[],
    };
    /*constructor(props){
        super(props);

        const name=props.name;
    }*/

    userTyped = (event) => this.setState({userInput: event.target.value});

    userSaved = () => {
        const{userInput, previousInputs} = this.state;
        const oldInputs = [...previousInputs, userInput];
        this.setState({userInput: "", previousInputs: oldInputs});
    }

    userDeleted = (index) => {
        const afterDeletion = _.filter(this.state.previousInputs, (input, idx) => {
            return index !== idx;
        })

        this.setState({previousInputs: afterDeletion});
    };

    render(){
        const {name} = this.props;
        const{userInput, previousInputs} = this.state;
        return (
        <div>
            <h1>{name}</h1>
            <input onChange={this.userTyped} value={userInput}/>
            <button onClick={this.userSaved}>Save</button>
            <ul>
                {_.map(previousInputs, (input, index) => (
                <li key={index} onClick={() => this.userDeleted(index)}>{`${name} says: ${input}`}</li>))}
            </ul>
        </div>
        );
    }
}
