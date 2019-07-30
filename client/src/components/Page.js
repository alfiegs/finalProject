import React from 'react';
import requireAuth from '../requireAuth';


class Page extends React.Component {
    constructor(props) {
        super(props);
        
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
