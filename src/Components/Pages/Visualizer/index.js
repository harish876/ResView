import React, { useEffect, useState } from "react";
import ButtonRow from "../../Shared/Buttons";
import Dropdown from './Components/Dropdown'
import Wrapper from "../../Shared/Wrapper";

const Visualizer = () => {

  const [dropdownArray, setDropdownArray] = useState([1]);



  useEffect(() => {

  }, []);

  return (
    <Wrapper>
        <div className="mt-[5em] mb-4 mx-8">
            <ButtonRow />
        </div>
        <div className="my-8 mx-8">
            <Dropdown length={4} />
        </div>
    </Wrapper>
  )
}

export default Visualizer