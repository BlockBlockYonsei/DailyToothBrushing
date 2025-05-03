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
            <Button>Select Collection</Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="text-2xl bg-white">
                Pick your Collection
              </DialogTitle>
            </DialogHeader>
            <Card>
              <div>
                <div>안녕하세요!</div>
              </div>
            </Card>
          </DialogContent>
        </Dialog>
        <div className="h-45 cursor-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAACUCAMAAABY3hBoAAAAYFBMVEX///8AAAB3d3cpKSnf39/r6+umpqZHR0ecnJyysrI/Pz/m5uYXFxePj48SEhLy8vJiYmL4+PjX19fFxcU5OTkbGxuCgoJNTU0kJCTR0dG9vb2srKxsbGwLCwtdXV0xMTE4fYBSAAAClUlEQVR4nO3ci3KiMBiGYQ0HQUVAIXgC7v8uFxLGhkVXf0iabPu9nemMDOrTiggh7WqFkIvlvlJgW6Pkl96jfWhbo+SvlSLbGiXAqDkIy9O8y9+fH9VubPxxk2VZkxyVQiayDIvEqzdShPIVtSUaegnb2xINAUYNMGqAUQOMGmDUAKMGGDXAqAFGDTBq/x+stCUaen1eeb93p8JZ971pqqtLMDULowaAAWYNVnP2iCc3UfzVbWcLNtrBJtNf4sUW7AAYYN8PO1RfFZdUKbcL20wXDZ3swravYDVgPwXm4jZW1/267sG28mp10nRVsUOwSt7g4obWgyPAABvB2FxYfovC5K9SjbCTOOoOed/wwJ8VbNeTAo0wWSzXosx0CTYTV2kKtgHsm2GHN7DRLAKpKIzBKqZ0uvTxKezaT8XIspFVLBqtpRWmfsqm8o3qTWG57M0iw7D6CeyzAHMM9mwbo8BGZ3TaYHVX6xxsJedkJXNhO7G3ORqAyZ7sYGcHGGDrOJ+MGVmG5Rf5iS3OS0fTSS3DhthUARhgvwN2isKuKBFfL094LcAGnrj/eucerB8EXO9fniUBBphWWFi2rddy92A6A4waYNQ0fSS5BxMH/qlfnT3Pq3VOwFoKkw1jFzovTAFGDTBqElY4BMv5vS8S87euC2eHaIXJ4T89lwW1wgrAaOmFFY7CuncSY+x+E0PEvkOwIXmRq1n2IOZg2fsV/xVg1ACjBhg1wKgBRs0E7HjtuzDGOWP0g+KU93fksXiUhYcCz8rFTzxj1CAo+/vVBkiyAUaZkiYLxCyEErCPA4waYNQAo/bbYf6O2vFsFhZI2JZcIa8ZHN8/xSLY3AD7MbCDOZjyDx5n1BqDrfxlGfgzRoSo/QEqVkbHPj+HsgAAAABJRU5ErkJggg=='),auto]">
          마우스 올려보세요!
        </div>
        <div className="h-45 bg-gray-50 cursor-[url('/cursor.png'),auto]">
          <p>마우스를 올려보세요</p>
        </div>
      </div>
    </>
  );
}

export default App;
