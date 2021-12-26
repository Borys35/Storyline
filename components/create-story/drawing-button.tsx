import { FC, useEffect, useRef, useState } from "react";
import Button from "../button";
import Modal from "../modal";

interface Props {
  setDrawingURL: (arg0: string) => void;
}

const DrawingButton: FC<Props> = ({ children, setDrawingURL }) => {
  const [open, setOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    setOpen(true);
  }

  useEffect(() => {
    if (!canvasRef.current || !open) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const position = { x: 0, y: 0 };
    let drawing = false;

    function setPosition(e: MouseEvent) {
      if (!canvas) return;

      position.x = e.clientX - canvas.offsetLeft;
      position.y = e.clientY - canvas.offsetTop;
    }

    function draw(e: MouseEvent) {
      if (!ctx || !drawing || e.buttons !== 1) return;

      ctx.beginPath();

      ctx.lineCap = "round";
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#000000";

      ctx.moveTo(position.x, position.y);
      setPosition(e);
      ctx.lineTo(position.x, position.y);

      ctx.stroke();
      ctx.closePath();
    }

    function handleMouseDown(e: MouseEvent) {
      drawing = true;
      setPosition(e);
      draw(e);
    }

    function handleMouseUp(e: MouseEvent) {
      drawing = false;
    }

    window.addEventListener("mousemove", draw);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", draw);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      // SAVE THE DRAWING
      setDrawingURL(canvas.toDataURL());
    };
  }, [open, setDrawingURL]);

  return (
    <>
      <Button primary onClick={(e) => handleClick(e)}>
        {children}
      </Button>
      <Modal isOpen={open} setOpen={setOpen}>
        <div className="flex flex-col items-center gap-4">
          <canvas
            ref={canvasRef}
            className="bg-red-50 element"
            width={300}
            height={200}
          ></canvas>
          <p>
            Be careful! You will <strong>NOT</strong> be able to make changes
            when you close the window.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default DrawingButton;
