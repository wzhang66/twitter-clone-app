import React,{Component} from 'react';
import {connect} from 'react-redux';
import { TiArrowBackOutline,TiHeartFullOutline,TiHeartOutline } from 'react-icons/ti/index';

import {formatTweet,formatDate} from '../utils/helper';
import {handleToggleTweet} from '../store/actions/tweets';


class Tweet extends Component {
    toParent = (e, id) => {
        e.preventDefault();
        // redirecting to the parent tweet
    }

    handleLike = (e) => {
        e.preventDefault();
        const {dispatch, tweet, authUser} = this.props;
        dispatch(handleToggleTweet({
            id:tweet.id,
            hasLiked:tweet.hasLiked,
            authUser
        }))
    }
    
    render(){
        const {tweet} = this.props;
        if(! tweet) {
            return <p>This Tweet does not exist</p>
        }

        const {
            name,
            avatar,
            timestamp,
            text,
            hasLiked,
            likes,
            replies,
            parent
        } = tweet;

        return(
            <div className='tweet'>
                <img 
                    src={avatar} 
                    alt={`Avatar of ${name}`}
                    className='avatar'/>
                <div className="tweet-info">
                    <span>{name}</span>
                    <div>{formatDate(timestamp)}</div>
                    {parent && (
                        <button 
                            className="replying-to" 
                            onClick={(e)=>this.toParent(e,parent.id)}>
                            Replying to @{parent.author}
                        </button>
                    )}
                    <p>{text}</p>
                    <div className="tweet-icons">
                        <TiArrowBackOutline className="tweet-icon" />
                        <span>{replies !== 0 && replies}</span>
                        <button className="heart-button" onClick={this.handleLike} >
                            {hasLiked === true ? 
                            <TiHeartFullOutline color="#E0245E" className="tweet-icon"/> 
                            : <TiHeartOutline className="tweet-icon"/>}
                        </button>
                        <span>{likes !==0 && likes}</span>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = ({authUser,users,tweets},{id}) => {
    const tweet = tweets[id];
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

    return {
        authUser,
        tweet: tweet ? formatTweet(tweet, users[tweet.author],authUser,parentTweet) : null
    }
}

export default connect(mapStateToProps)(Tweet);