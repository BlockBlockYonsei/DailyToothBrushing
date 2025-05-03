import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div>
        <div>Daily Tooth Brushing</div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button className="border-2 border-black">Popup Button</Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="text-2xl bg-white">
                Are you Ready to brush?
              </DialogTitle>
            </DialogHeader>
            <Card className="flex justify-between">
              <Button className="border-2 border-black cursor-pointer">
                Yes
              </Button>
              <Button className="border-2 border-black cursor-pointer">
                No
              </Button>
            </Card>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default App;
