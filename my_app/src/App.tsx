import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

// interface UserData {
//   username: string;
//   name: string;
// }

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    email:"",
    name:"",
  });

  useEffect(() => {
    axios
      .get(
        "https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details"
      )
      .then((res) => {
        setLoading(false);
        setData(res.data);
      });
  }, []);

  if (loading) {
    return "loading...";
  }

  return (
    <div>
      {data.email}
      {data.name}
    </div>
  );
}

export default App;
