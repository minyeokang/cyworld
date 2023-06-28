/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import miffyWalking from "../assets/imgs/miffywalking.png";
import miffyCursor from "../assets/imgs/bear.png";
import styled from "styled-components";

const RoomContainer = styled.div`
  width: 100%;
  height: 250rem;
  margin-top: 20rem;

  @media (max-width: 768px){
    height: 100%;
    max-height: 200rem;
  }

  @media (max-width: 540px){
    height: 100%;
    max-height: none;
  }

  img {
    display: none;
  }
`;

const Canvas = () => {
  const roomRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const room = roomRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    //initial dimension
    canvas.width = room.offsetWidth;
    canvas.height = room.offsetHeight;

    const miffy = {
      x: canvas.width / 2 - 21,
      y: canvas.height - 72,
      w: 42,
      h: 72,
      speed: 5,
      dx: 0,
      dy: 0,
    };

    const handleResize = () => {
      canvas.width = room.offsetWidth;
      canvas.height = room.offsetHeight;
    };

    const drawHouse = () => {
      //left wall
      ctx.fillStyle = "antiquewhite";
      ctx.strokeStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height * 0.6);
      ctx.lineTo(0, canvas.height);
      ctx.lineWidth = 1;
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      //right wall
      ctx.fillStyle = "antiquewhite";
      ctx.strokeStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(canvas.width, 0);
      ctx.lineTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height * 0.6);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      //bottom border
      ctx.strokeStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.stroke();
    };

    const drawPlayer = () => {
      drawHouse();
      const { x, y, w, h } = miffy;

      let img = imageRef.current;

      if (img) {
        ctx.drawImage(img, x, y, w, h);
      }

      //draw text blob
      ctx.font = "14px Arial";
      const text = "Move me!"; //can be changed by user
      const textWidth = ctx.measureText(text).width + 30;
      const textHeight =
        ctx.measureText(text).fontBoundingBoxAscent +
        ctx.measureText(text).fontBoundingBoxDescent +
        10;

      const textX = x - textWidth / 2 + w / 2;
      const textY = y - 50;

      //bg
      ctx.fillStyle = "#fff";
      ctx.fillRect(textX, textY, textWidth + 2, textHeight + 2);

      //text
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, textX + textWidth / 2, textY + textHeight / 2);

      //border
      ctx.strokeStyle = "black";
      ctx.lineWidth = 0.1;
      ctx.strokeRect(textX, textY, textWidth + 2, textHeight + 2);

      //triangle
      const triangleX = textX + textWidth / 2 - 10;
      const triangleY = textY + textHeight + 1;
      ctx.lineWidth = 0.2;
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(triangleX, triangleY);
      // ctx.lineWidth = 0.3
      ctx.lineTo(triangleX + 10, triangleY + 10);
      ctx.lineTo(triangleX + 20, triangleY);
      ctx.lineTo(triangleX + 20, triangleY);
      ctx.stroke();
      ctx.lineTo(triangleX, triangleY);
      ctx.fill();
    };

    const clear = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const newPos = () => {
      miffy.x += miffy.dx;
      miffy.y += miffy.dy;
      //left
      if (miffy.x < 30) {
        miffy.x = 30;
      }
      //right
      if (miffy.x > canvas.width - (miffy.w + 30)) {
        miffy.x = canvas.width - (miffy.w + 30);
      }
      //half
      if (miffy.y < canvas.height * 0.5) {
        miffy.y = canvas.height * 0.5;
      }

      //floor
      if (miffy.y > canvas.height - miffy.h) {
        miffy.y = canvas.height - miffy.h;
      }
    };

    const update = () => {
      clear();
      drawPlayer();
      newPos();
      requestAnimationFrame(update);
    };

    const handleMouseEvents = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      switch (e.type) {
        case "mouseenter":
          canvas.style.cursor = `url(${miffyCursor}), auto`;
          break;
        case "click":
          handleClick(clickX, clickY);
          break;
        case "mousedown":
          handleMouseDown(clickX, clickY);
          break;
        case "mousemove":
          handleMouseMove(clickX, clickY);
          break;
        case "mouseup":
          handleMouseUp();
          break;
        default:
          break;
      }
    };

    const handleClick = (clickX, clickY) => {
      miffy.x = clickX;
      if (
        clickX < canvas.width / 2 / 2 ||
        clickX > canvas.width / 2 + canvas.width / 2 / 2
      ) {
        miffy.y = canvas.height - miffy.h;
      } else {
        miffy.y = clickY;
      }
    };

    const handleMouseDown = (clickX, clickY) => {
      isDragging.current = true;
      offset.current = {
        x: clickX - miffy.x,
        y: clickY - miffy.y,
      };
    };

    const handleMouseMove = (clickX, clickY) => {
      if (isDragging.current) {
        const mouseX = clickX;
        const mouseY = clickY;

        miffy.x = mouseX - offset.current.x;
        miffy.y = mouseY - offset.current.y;

        // Keep miffy within the canvas bounds
        if (miffy.x < 0) {
          miffy.x = 0;
        } else if (miffy.x > canvas.width - miffy.w) {
          miffy.x = canvas.width - miffy.w;
        }

        if (miffy.y < 0) {
          miffy.y = 0;
        } else if (miffy.y > canvas.height - miffy.h) {
          miffy.y = canvas.height - miffy.h;
        }
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      offset.current = { x: 0, y: 0 };
    };

    //keyboard event
    const handleKeyDown = (e) => {
      if (e.key == "ArrowRight") {
        miffy.dx = miffy.speed;
        miffy.dy = miffy.speed / 2;
      }
      if (e.key == "ArrowLeft") {
        miffy.dx = -miffy.speed;
        miffy.dy = miffy.speed / 2;
      }
      if (e.key == "ArrowUp") {
        // //prevent passing the line
        if (
          miffy.x < canvas.width / 2 / 2 ||
          miffy.x > canvas.width / 2 + canvas.width / 2 / 2
        ) {
          return;
        }

        miffy.dy = miffy.speed * -1;
      }
      if (e.key == "ArrowDown") {
        miffy.dy = miffy.speed * 1;
      }
    };

    const handleKeyUp = (e) => {
      if (
        e.key == "ArrowRight" ||
        e.key == "ArrowLeft" ||
        e.key == "ArrowUp" ||
        e.key == "ArrowDown"
      ) {
        miffy.dx = 0;
        miffy.dy = 0;
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    canvas.addEventListener("click", handleMouseEvents);
    canvas.addEventListener("mousedown", handleMouseEvents);
    canvas.addEventListener("mousemove", handleMouseEvents);
    canvas.addEventListener("mouseup", handleMouseEvents);
    canvas.addEventListener("mouseenter", handleMouseEvents);
    update();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("click", handleMouseEvents);

      canvas.removeEventListener("mousedown", handleMouseEvents);
      canvas.removeEventListener("mousemove", handleMouseEvents);
      canvas.removeEventListener("mouseup", handleMouseEvents);
      canvas.removeEventListener("mouseenter", handleMouseEvents);
    };
  }, []);

  return (
    <RoomContainer ref={roomRef}>
      <canvas ref={canvasRef}></canvas>
      <img src={miffyWalking} alt="miffy" ref={imageRef} />
    </RoomContainer>
  );
};

export default Canvas;
