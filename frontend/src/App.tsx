import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div>
        <div>Daily Tooth Brushing</div>
        {/* <div className="flex border-2 border-black"> */}
        <div className="flex min-h-45 w-full border-2 border-black items-center justify-around">
          <Button className="w-45 border-2 border-black cursor-pointer">
            Yes
          </Button>
          <Button className="w-45 border-2 border-black cursor-pointer">
            No
          </Button>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default App;
