import React from 'react';
import requireAuth from '../requireAuth';
import axios from 'axios'


class Page extends React.Component {
    constructor(props) {
        super(props);
        
    }

    componentWillMount() {
        axios.get('/api')
            .then((data) => {
                console.log(data.data.data)
                this.setState({
                    activities: data.data.data
                })
            })
    }

    render() {
        return (
            <>
            <h1>Page 2</h1>
            </>
        );
    }
}



export default requireAuth(Page)
