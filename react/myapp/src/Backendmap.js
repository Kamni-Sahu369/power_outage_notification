import React, { useEffect, useState } from "react";
import { GEtLoginData,PostCategories } from "./CoreApi"; 
import { Form, Input, Button } from "antd";

function App() {
  const [responsedata, setdata] = useState([]);

  const Demo1 = async () => {
    const response = await GEtLoginData();
    console.log(response);
    setdata(response); 
  };

  const Demo = (values) => {
    alert(JSON.stringify(values));
   PostCategories(values);
  };

  useEffect(() => {
    Demo1();
  }, [data]); 

  return (
    <div>
      <Form onFinish={Demo}>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">submit</Button>
        </Form.Item>
      </Form>
      
      {responsedata.map((i) => (
        <div key={i.id}> 
          <p>{i.id}</p>
          <h2>{i.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default App;
