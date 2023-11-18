import React, { useEffect, useState } from "react";
import ButtonRow from "../../Shared/Buttons";
import Dropdown from './Components/Dropdown'

const Visualizer = () => {

  const [dropdownArray, setDropdownArray] = useState([1]);



  useEffect(() => {

  }, []);

  return (
    <div >
        <div className="my-8 mx-8">
            <ButtonRow />
        </div>
        <div className="my-8 mx-8">
            <Dropdown length={4} />
        </div>
    </div>
  )
}

export default Visualizer