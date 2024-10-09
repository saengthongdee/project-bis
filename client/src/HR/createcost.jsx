import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import './style.css';
import Axios from 'axios';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';

function CreateCost() {
  const [cost, setCost] = useState([]);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [date, setdate] = useState("");
  const [time_start, settime_start] = useState("");
  const [time_end, settime_end] = useState("");
  const [location, setlocation] = useState("");
  const [department, setdepartment] = useState("");
  const [status, setstatus] = useState(0);
  const [deletecost,setdeletecost] = useState(0);
  
  // image 

  const [image_cost, setimage_cost] = useState("");
  const [images, setimage] = useState([]);
  const [imageURL, setimageURL] = useState([]);



  useEffect(() => {
    getCost();

    if (images.length < 1) return;
    const newimageURL = [];
    images.forEach(image => newimageURL.push(URL.createObjectURL(image)))
    setimageURL(newimageURL);

  }, [images, image_cost]);

  const onImageChange = (e) => {
    setimage([...e.target.files]);

    const file = e.target.files[0];
    if (file) {
      setimage_cost(file.name);
      console.log(image_cost);
    }
  }
  const getCost = () => {
    Axios.get('http://localhost:3003/costs')
      .then((response) => {
        setCost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching costs:", error);
      });
  };

  const filteredData = cost.filter((item) => item.status === 0);

  const deleteCost = (id) => {
    let con = confirm("คุณต้องการลบไหม");
    if (con) {
      Axios.delete(`http://localhost:3003/delete/${id}`).then((response) =>{
        
      })
      setdeletecost(id);
      const updatedData = cost.filter((item) => item.id !== id);
      setCost(updatedData);
    }
  };
  console.log(deletecost);

  const addCost = (e) => {

    e.preventDefault();

    Axios.post('http://localhost:3003/create', {
      title: title,
      description: description,
      date: date,
      time_start: time_start,
      time_end: time_end,
      location: location,
      department: department,
      image_cost: image_cost,
      status: status
    })
      .then(() => {
        setCost((prevCost) => [
          ...prevCost,
          {
            title: title,
            description: description,
            date: date,
            time_start: time_start,
            time_end: time_end,
            location: location,
            department: department,
            image_cost: image_cost,
            status: status
          },
        ]);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding cost:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="main-create-cost">
        <h1>Create Cost</h1>
        <div className="box-create">
          <div className="left">
            <div className="box-images">
              {imageURL.map(imageSrc => (
                <img width="100%" height="100%" src={imageSrc} />
              ))}
            </div>
            <input type="file" multiple accept="image/*" onChange={onImageChange} />

          </div>

          <div className="right">
            <form>
              <div>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter title"
                  onChange={(event) => {
                    settitle(event.target.value)
                  }}
                />
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  onChange={(event) => {
                    setdescription(event.target.value)
                  }}
                />
              </div>

              <div>
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  onChange={(event) => {
                    setdate(event.target.value)
                  }}
                />
              </div>

              <div>
                <label htmlFor="time">Time</label>
                <div className="time-zone">
                  <input
                    type="time"
                    id="time-start"
                    name="timeStart"
                    onChange={(event) => {
                      settime_start(event.target.value)
                    }}
                  />
                  <p>to</p>
                  <input
                    type="time"
                    id="time-end"
                    name="timeEnd"
                    onChange={(event) => {
                      settime_end(event.target.value)
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location">Location</label>
                <select
                  name="location"
                  id="location"
                  value={location}
                  onChange={(event) => {
                    setlocation(event.target.value);
                  }}
                >
                  <option value="online">Online</option>
                  <option value="onsite">Onsite</option>
                </select>
              </div>

              <div>
                <label htmlFor="department">Department</label>
                <select 
                name="department" 
                id="department"
                value={department}

                  onChange={(event) => {
                    setdepartment(event.target.value)
                  }}
                >
                  <option value="IT">IT</option>
                  <option value="Sales">Sales</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <button onClick={addCost}>submit</button>
            </form>
          </div>
        </div>
        <div className="show-cost-create">
          <h1>Total Cost</h1>
          {filteredData.map((item) => (
            <div className="box-cost" key={item.id}>
              <div
                className="left"
                style={{
                  backgroundImage:
                    item.image === '1.jpg' ? `url(${img1})` :
                      item.image === '2.jpg' ? `url(${img2})` :
                        item.image === '3.jpg' ? `url(${img3})` :
                          'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100px',
                  height: '100px',
                }}
              ></div>
              <div className="right">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <p>Time: {item.time_start} - {item.time_end}</p>
                <p>date : {new Date(item.date).toISOString().split('T')[0]}</p>
                <div className="delete">
                  <button onClick={() => deleteCost(item.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateCost;
