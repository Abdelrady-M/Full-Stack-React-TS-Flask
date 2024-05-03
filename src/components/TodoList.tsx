import { useQuery } from "@tanstack/react-query";
// import Button from "./ui/Button";
// import Input from "./ui/Input";
import Table from "./ui/Table";
import axiosInstance from "../config/axios.config";
import { useState } from "react";


interface Item {
  id: number;
  name: string;
  quantity: number;
}

const TodoList = () => {
  const [inputValues, setInputValues] = useState<{ [key: number]: number }>({});
  const [percentageValues, setPercentageValues] = useState<{ [key: number]: number }>({});

  //localstorage 
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  console.log(userData);

  // fetch data using react query
  const { data } = useQuery<Item[], Error>({
    queryKey: ['items'],
    queryFn: async () => {
      const response = await axiosInstance.get('/items', {
        headers: {
          Authorization: `Bearer ${userData?.access_token}`
        }
      })
      return response.data;
    }
  })
  console.log(data)

//handeler

const handleInputChange = (itemId: number, value: string ) => {
  setInputValues({ ...inputValues, [itemId]: parseFloat(value) });
  const item = data?.find((item) => item.id === itemId);
  if (item) {
    const existingValue = item.quantity;
    const calculatedPercentage = (parseFloat(value) / existingValue) * 100;
    setPercentageValues({ ...percentageValues, [itemId]: calculatedPercentage });
  }
};
  return (
    <div>
            <div
              className="flex items-center space-y-3 flex-col justify-center hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
            >
              <label className="w-full font-semibold">
                  Enter your Numerical value
              </label>
              <div className="flex items-center flex-col justify-center text-center w-full space-y-3">
                  {data &&
                    data.map((item) => (
                      <input
                        key={item.id}
                        className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent"
                        value={inputValues[item.id] || ""}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder={item.name}
                      />
                    ))}
             </div>
              <div className="flex items-center justify-end w-full space-y-3">
              <Table>
            <thead >
              <tr>
                <th>Name</th>
                <th>Existing Value</th>
                <th>Input Value</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody  style={{ padding: '10px' }}>
              {data &&
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <input
                        type="number"
                        value={inputValues[item.id] || ""}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                      />
                    </td>
                    {/* Display percentage value from state */}
                    <td>{percentageValues[item.id] ? percentageValues[item.id].toFixed(2) : ""}%</td>
                  </tr>
                ))}
            </tbody>
          </Table>
              </div>
            </div>
    
    
        {/* <h3>No Todos Yet</h3> */}
    
    </div>
  )
}

export default TodoList