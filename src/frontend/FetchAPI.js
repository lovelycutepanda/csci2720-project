const eventxml2json = (xml, locationList) => {
  let event = xml.getElementsByTagName("event");
  let dataList = [];

  for (let e of event) {
    const venueId = parseInt(e.getElementsByTagName("venueid")[0].childNodes[0].nodeValue);
    if (!locationList.find((num) => num === venueId))
      continue;

    let obj = {
        event_id: parseInt(e.getAttribute("id")),
        title: e.getElementsByTagName("titlee")[0].childNodes[0].nodeValue,
        venueid: venueId
      }

    if (e.getElementsByTagName("desce")[0].childNodes[0])
      obj.description = e.getElementsByTagName("desce")[0].childNodes[0].nodeValue;

    if (e.getElementsByTagName("pricee")[0].childNodes[0])
      obj.price = e.getElementsByTagName("pricee")[0].childNodes[0].nodeValue;

    if (e.getElementsByTagName("presenterorge")[0].childNodes[0])
      obj.presenter = e.getElementsByTagName("presenterorge")[0].childNodes[0].nodeValue;

    dataList.push(obj);
  }
  return dataList;
}

const eventDatexml2json = (xml, eventList) => {
  let event = xml.getElementsByTagName("event");
  let dataList = [];
  for (let e of event) {
    const eventId = parseInt(e.getAttribute("id"));
    if (!eventList.find((num) => num === eventId))
      continue;

    let obj = {
        event_id: eventId,
        time: []
        // add more
      }

    for (let indate of e.getElementsByTagName("indate"))
      obj.time.push(indate.childNodes[0].nodeValue);

    dataList.push(obj);
  }
  return dataList;
}

const loadEvent = async (locationList) => {

  const locList = locationList.map((loc) => loc.locationId);

  let timestamp;
  let event, eventDate;

  const eventUrl = "https%3A%2F%2Fwww.lcsd.gov.hk%2Fdatagovhk%2Fevent%2Fevents.xml";
  const eventDateUrl = "https%3A%2F%2Fwww.lcsd.gov.hk%2Fdatagovhk%2Fevent%2FeventDates.xml";

  // get start date and end date
  let date = new Date();
  date.setDate(date.getDate()-1);
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0');
  let yyyy = date.getFullYear();
  const enddate = yyyy + mm + dd;
  date.setDate(date.getDate()-1);
  dd = String(date.getDate()).padStart(2, '0');
  mm = String(date.getMonth() + 1).padStart(2, '0');
  yyyy = date.getFullYear();
  const startdate = yyyy + mm + dd;

  // gets latest data timestamp
  await fetch(`https://api.data.gov.hk/v1/historical-archive/list-file-versions?url=${eventUrl}&start=${startdate}&end=${enddate}`)
  .then((res) => res.json())
  .then((data) => {
    timestamp = data.timestamps[data.timestamps.length-1];
  });

  // gets data 
  await fetch(`https://api.data.gov.hk/v1/historical-archive/get-file?url=${eventUrl}&time=${timestamp}`)
  .then((res) => res.text())
  .then((data) => {
    data = data.substr(data.indexOf("\n") + 1);
    let parser = new DOMParser();
    let xml = parser.parseFromString(data, "application/xml");
    event = eventxml2json(xml, locList);
  })

  await fetch(`https://api.data.gov.hk/v1/historical-archive/list-file-versions?url=${eventDateUrl}&start=${startdate}&end=${enddate}`)
  .then((res) => res.json())
  .then((data) => {
    timestamp = data.timestamps[data.timestamps.length-1];
  });

  await fetch(`https://api.data.gov.hk/v1/historical-archive/get-file?url=${eventDateUrl}&time=${timestamp}`)
  .then((res) => res.text())
  .then((data) => {
    data = data.substr(data.indexOf("\n") + 1);
    let parser = new DOMParser();
    let xml = parser.parseFromString(data, "application/xml");
    const eventList = event.map((e) => e.event_id);
    eventDate = eventDatexml2json(xml, eventList);
  })
  .then(() => {
    const merged = event.map(e => {
      const item = eventDate.find(d => d.event_id === e.event_id);
    
      return { ...e,
        ...item
      }
    });
    console.log(merged);
  })
}

const loadLocation = () => {
  fetch(`${process.env.REACT_APP_SERVER_URL}/location/findall`, {
    method: "GET",
    headers: new Headers({
        "Content-Type": 'application/json',
    })
  })
  .then((res) => res.json())
  .then((obj) => loadEvent(obj));
}

export default loadLocation;