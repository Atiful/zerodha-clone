import React from 'react';
import PageNotFound from '../PageNotFound';
export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: '' };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error.stack};
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error logged:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <PageNotFound error = {this.state.errorMessage}></PageNotFound>
            
            )
        }

        return this.props.children;
    }
}
