"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/LoveQuestion.module.css";

interface Position {
  x: number;
  y: number;
}

export default function LoveQuestion() {
  const [noButtonPosition, setNoButtonPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Cập nhật kích thước container khi cửa sổ thay đổi
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleYesClick = (): void => {
    router.push("/contract"); // Chuyển hướng đến trang contract-love
  };

  const handleNoHover = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!containerSize.width || !containerSize.height) return;

    const buttonWidth = 150; // Chiều rộng nút No
    const buttonHeight = 50; // Chiều cao nút No
    const maxX = containerSize.width - buttonWidth - 30; // Giới hạn ngang
    const maxY = containerSize.height / 2 - buttonHeight - 30; // Giới hạn dọc: nửa trên

    const newX = Math.random() * maxX - maxX / 2; // Di chuyển trong khoảng -maxX/2 đến maxX/2
    const newY = Math.random() * maxY; // Di chuyển từ 0 đến maxY (nửa trên)

    setNoButtonPosition({ x: newX, y: newY });
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <h1 className={styles.title}>
        <span className={styles.heart}>❤️</span> Do You Love Me?
      </h1>
      <div className={styles.buttons}>
        <button className={styles.yesButton} onClick={handleYesClick}>
          Yes
        </button>
        <button
          className={styles.noButton}
          style={{
            transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
          }}
          onMouseEnter={handleNoHover}
        >
          No
        </button>
      </div>
    </div>
  );
}
