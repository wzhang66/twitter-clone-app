import React,{Component} from 'react';
import {connect} from'react-redux';
import {handleAddTweet} from '../store/actions/tweets';

class NewTWeet extends Component{
    state = {
        text:''
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const {text} = this.state;
        const {dispatch, id} = this.props;

        dispatch(handleAddTweet(text,id))

        this.setState({
            text:''
        })
    }
    
    render(){
        let remainText = 280 - this.state.text.length;
        return(
            <div>
                <h3 className="center">
                    Compose new Tweet
                </h3>
                <form className="new-tweet" onSubmit={this.handleSubmit}>
                    <textarea 
                        placeholder="What's new" 
                        value={this.state.text}
                        onChange={(event)=>this.handleChange(event)}
                        className="textarea"
                        maxLength={280}/>
                    {remainText <= 100 && (
                        <div className="tweet-length">
                            {remainText}
                        </div>
                    )}
                    <button
                        className="btn"
                        type="submit"
                        disabled={this.state.text.length === 0}>
                        Submit
                    </button>                                  
                </form>
            </div>
        )
    }
}

export default connect()(NewTWeet);