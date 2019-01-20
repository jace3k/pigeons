import React, {Component} from 'react';

class Auction extends Component {
    render() {
        return (
            <div>
                AUCTION! - {' '} {this.props.match.params.id}
            </div>
        );
    }
}

export default Auction;