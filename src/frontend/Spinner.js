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



