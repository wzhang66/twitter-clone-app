import React,{Component} from 'react';
import { connect } from 'react-redux';

import Tweet from './Tweet';

class Dashboard extends Component {
    render(){
        console.log(this.props)
        return(
            <div>
                <h3 className="center">
                    Your Timeline
                </h3>
                <ul className="dashboard-list">
                    {this.props.tweetIds.map((id) => (
                        <li key={id}>
                            <div>
                                <Tweet id={id} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({tweets}) => {
    return {
        tweetIds: Object.keys(tweets)
            .sort((a,b)=>tweets[b].timestamp-tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard);