import { useEffect, useState } from 'react';

const ShowEvent = () => {

    // states
    const [eventList, setEventList] = useState([]);

    // componentDidMount
    useEffect(() => {
        fetch(`${window.location.origin}/api/event`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json',
            })
        })
        .then((res) => res.json())
        .then((obj) => {
            setEventList(obj); //set the eventList to obj
        })
    }, []);

    //process date
    let convertDate = (date) => {
        let simplifiedDate = [];
        for (let d in date) {
            if (simplifiedDate.length === 0
                || simplifiedDate[simplifiedDate.length - 1].slice(4, 6) !== date[d].slice(4, 6)
                || (simplifiedDate[simplifiedDate.length - 1].slice(6).length === 2 && Number(simplifiedDate[simplifiedDate.length - 1].slice(6)) + 1 !== Number(date[d].slice(6)))
                || (simplifiedDate[simplifiedDate.length - 1].slice(6).length === 4 && Number(simplifiedDate[simplifiedDate.length - 1].slice(9)) + 1 !== Number(date[d].slice(6)))) {
                /* This matches 4 cases:
                (1) No elements in simplifiedDate 
                (2) New element's (d) month does not match that of last element
                (3) Last element's date is not a range (i.e. not xx~yy) and the new date (d) is not the next day
                    e.g. last element is 20220708 then d is 20220710
                (4) Last element's date is a range (i.e. xx~yy) and the new date (d) is not the next day
                    e.g. last element is 20220708~10 (i.e. 08~10/07/2022), then d is 20220712
                Any of these 4 cases results in a new element in simplifiedDate
                */
                simplifiedDate.push(date[d]);
            } else {
                //The remaining case must be the new date (d) is the next day of the last element of simplifiedDate
                if (simplifiedDate[simplifiedDate.length - 1].length === 8) {
                //date is not a range (i.e. not xx~yy)
                simplifiedDate[simplifiedDate.length - 1] += '~' + date[d].slice(6);
                //console.log('~' + date[d].slice(6));
                } else {
                //date is a range
                simplifiedDate[simplifiedDate.length - 1] = simplifiedDate[simplifiedDate.length - 1].slice(0, 9) + date[d].slice(6);
                //console.log(simplifiedDate[simplifiedDate.length - 1].slice(0, 9) + date[d].slice(6));
                }
                //console.log(simplifiedDate);
            }
        }
        return simplifiedDate.map((str) => `${str.slice(0, 4)}/${str.slice(4, 6)}/${str.slice(6)}`);
    }

    // retrieval, called when "Show Event" button is clicked
    return(
        <div>
            <h4>Event List:</h4><hr/>
            
            <table>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Event ID</th>
                        <th>Title</th>
                        <th>Venue</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Presenter</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {eventList.map(({eventId, title, venue, date, description, presenter, price}, index) => {
                        return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{eventId}</td>
                            <td>{title} </td>
                            <td>{venue.name} </td>
                            <td>{
                                convertDate(
                                    date.map((d) => {return `${d.slice(0, 10).replaceAll('-', '')}`})
                                )
                                .join(', ')
                            }</td>
                            <td>{description}</td>
                            <td>{presenter}</td>
                            <td>{price}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    ) 

}

export default ShowEvent;