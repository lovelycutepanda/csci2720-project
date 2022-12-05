// under construction

const CreateLocation = () => {

    // creation, called when "Create" button is clicked
    const submitCreate = async (e) => {
        e.preventDefault();


        await fetch(`${process.env.REACT_APP_SERVER_URL}/location/create`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
            }),
            body: JSON.stringify({
                
            })
        })
        .then((res) => res.json())
        .then((obj) => {
            // if error is found
            if (obj.err)
                console.log(obj.err);
            else
                console.log(obj.msg);
        });
    }

    // displayed when "Create Location" button is clicked
    return(
        <form>
        Create location <br/>
        <br/>

        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <br/>

        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" />
        <br/>

        <button className="btn btn-success" onClick={(e) => {submitCreate(e)}}>Create</button>

        </form>
    )
}

export default CreateLocation;