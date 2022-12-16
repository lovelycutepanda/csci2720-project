/*
 * Group members:
 * Tam King Man 1155160072
 * Ku Nok Tik 1155143829
 * Tung Yuen Lok 1155143226
 * Lai Cheuk Lam 1155159309
 * Wong Wai Chun 1155159536
 */

import './Spinner.css';

const Spinner = (props) => {

    return (
        <div id="spinner" style={{display: (props.display)? "flex" : "none"}}>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        
    );
}

export default Spinner;