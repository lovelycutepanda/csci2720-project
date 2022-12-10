const eventxml2json = (xml, locationList) => {
  let event = xml.getElementsByTagName("event");
  const dataList = [];

  for (let e of event) {
    const venueId = parseInt(e.getElementsByTagName("venueid")[0].childNodes[0].nodeValue);
    if (!locationList.find((id) => id === venueId))
      continue;

    dataList.push({
      eventId: parseInt(e.getAttribute("id")),
      title: e.getElementsByTagName("titlee")[0].childNodes[0]?.nodeValue,
      description: e.getElementsByTagName("desce")[0].childNodes[0]?.nodeValue,
      venue: venueId,
      price: e.getElementsByTagName("pricee")[0].childNodes[0]?.nodeValue,
      presenter: e.getElementsByTagName("presenterorge")[0].childNodes[0]?.nodeValue
    });
  }
  return dataList;
}

const eventDatexml2json = (xml, eventList) => {
  let event = xml.getElementsByTagName("event");
  const dataList = [];
  for (let e of event) {
    const eventId = parseInt(e.getAttribute("id"));
    if (!eventList.find((num) => num === eventId))
      continue;
      
    const obj = {
      eventId: eventId,
      date: []
      // add more
    };

    for (let indate of e.getElementsByTagName("indate"))
      obj.date.push(indate.childNodes[0].nodeValue);

    dataList.push(obj);
  }
  return dataList;
}

const loadEvent = async (locationList) => {

  locationList.forEach((loc) => {loc.eventList = []});

  const locList = locationList.map((loc) => loc.locationId);

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
  let timestamp = await fetch(`https://api.data.gov.hk/v1/historical-archive/list-file-versions?url=${eventUrl}&start=${startdate}&end=${enddate}`)
  .then((res) => res.json())
  .then((data) => data.timestamps[data.timestamps.length-1]);

  // gets data 
  const event = await fetch(`https://api.data.gov.hk/v1/historical-archive/get-file?url=${eventUrl}&time=${timestamp}`)
  .then((res) => res.text())
  .then((data) => {
    data = data.substr(data.indexOf("\n") + 1);
    let parser = new DOMParser();
    let xml = parser.parseFromString(data, "application/xml");
    return eventxml2json(xml, locList);
  })

  timestamp = await fetch(`https://api.data.gov.hk/v1/historical-archive/list-file-versions?url=${eventDateUrl}&start=${startdate}&end=${enddate}`)
  .then((res) => res.json())
  .then((data) => data.timestamps[data.timestamps.length-1]);

  const eventDate = await fetch(`https://api.data.gov.hk/v1/historical-archive/get-file?url=${eventDateUrl}&time=${timestamp}`)
  .then((res) => res.text())
  .then((data) => {
    data = data.substr(data.indexOf("\n") + 1);
    let parser = new DOMParser();
    let xml = parser.parseFromString(data, "application/xml");
    const eventList = event.map((e) => e.eventId);
    return eventDatexml2json(xml, eventList);
  })

  event.map((e) => {
    const item = eventDate.find((d) => d.eventId === e.eventId);
    return { ...e,
      ...item
    }
  }).forEach((e) => {
    const index = locList.indexOf(e.venue);
    locationList[index].eventList.push(e);
  });
  return locationList;
}

module.exports.loadLocation = async () => {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/location/findall`, {
    method: "GET",
    headers: new Headers({
        "Content-Type": 'application/json',
    })
  })
  .then((res) => res.json())
  .then((obj) => loadEvent(obj))
  .then((locationList) => {
    uploadOnlineEvent(locationList);
    const today = new Date();
    return {
      locList: locationList,
      fetchTime: today.toLocaleString('en-US')
    };
  })
}

module.exports.loadUser = async (username) => {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/user/findone`, {
    method: "POST",
    headers: new Headers({
        "Content-Type": 'application/json',
    }),
    body: JSON.stringify({
        username: username
    })
  })
  .then((res) => res.json());
}

module.exports.loadComments = async (locationId) => {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/location/getcomment`, {
    method: "POST",
    headers: new Headers({
        "Content-Type": 'application/json',
    }),
    body: JSON.stringify({
        locationId: locationId
    })
  })
  .then((res) => res.json());
}

const uploadOnlineEvent = async (locationList) => {
  locationList.forEach((loc) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/event/uploadonlineevent`, {
      method: "POST",
      headers: new Headers({
          "Content-Type": 'application/json',
      }),
      body: JSON.stringify({
          locationId: loc.locationId,
          eventList: loc.eventList
      })
    })
    .then((res) => res.json())
    .then((obj) => {
      if (obj.err)
        console.log(obj.err);
      else
        console.log(obj.msg);
    })
  })
}