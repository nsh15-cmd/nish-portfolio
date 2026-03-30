import { useState, useEffect, useRef, useCallback } from "react";

// Defining the core types for our game
type GameState = "START" | "PLAYING" | "GAME_OVER" | "WON";
type Point = { x: number; y: number };

// Game Engine Constants
const GRID_SIZE = 10; // Each snake segment is 10x10 pixels
const COLS = 24; // 240px width / 10 = 24 columns
const ROWS = 40; // 400px height / 10 = 40 rows
const TOTAL_FOOD = 10;
const GAME_SPEED = 80; // Milliseconds per frame (lower is faster)

const INITIAL_SNAKE: Point[] = [
  { x: 12, y: 20 }, // Head
  { x: 12, y: 21 },
  { x: 12, y: 22 },
  { x: 12, y: 23 },
  { x: 12, y: 24 }, // Tail
];
const INITIAL_DIRECTION: Point = { x: 0, y: -1 }; // Moving UP (negative Y)

export default function SnakeGame() {
  // --- STATE ---
  const [gameState, setGameState] = useState<GameState>("START");
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 12, y: 10 });
  const [foodLeft, setFoodLeft] = useState(TOTAL_FOOD);

  // We use Refs for direction to avoid stale closures inside the setInterval loop
  const lastProcessedDir = useRef<Point>(INITIAL_DIRECTION);
  // --- HELPER: Generate random food ---
  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood: Point;
    while (true) {
      newFood = {
        // We add a +1 and -2 buffer so food never spawns exactly on the wall!
        x: Math.floor(Math.random() * (COLS - 2)) + 1,
        y: Math.floor(Math.random() * (ROWS - 2)) + 1,
      };
      // Make sure food doesn't spawn ON the snake
      const isOnSnake = currentSnake.some(
        (seg) => seg.x === newFood.x && seg.y === newFood.y,
      );
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  // --- ACTIONS ---
  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    lastProcessedDir.current = INITIAL_DIRECTION;
    setFoodLeft(TOTAL_FOOD);
    setFood(generateFood(INITIAL_SNAKE));
    setGameState("PLAYING");
  };

  // --- CONTROLS: Keyboard Listener ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      if (gameState !== "PLAYING") return;

      // Use the safely processed direction to prevent double-key suicide
      const currentDir = lastProcessedDir.current;

      switch (e.key) {
        case "ArrowUp":
          if (currentDir.y !== 1) lastProcessedDir.current = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (currentDir.y !== -1) lastProcessedDir.current = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (currentDir.x !== 1) lastProcessedDir.current = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (currentDir.x !== -1) lastProcessedDir.current = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  // --- GAME LOOP: The Engine ---
  useEffect(() => {
    if (gameState !== "PLAYING") return;

    const gameInterval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + lastProcessedDir.current.x,
          y: head.y + lastProcessedDir.current.y,
        };

        // 1. Check Collisions (Walls)
        if (
          newHead.x < 0 ||
          newHead.x >= COLS ||
          newHead.y < 0 ||
          newHead.y >= ROWS
        ) {
          setGameState("GAME_OVER");
          return prevSnake;
        }

        // 2. Check Collisions (Self)
        if (
          prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
        ) {
          setGameState("GAME_OVER");
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // 3. Check Food
        if (newHead.x === food.x && newHead.y === food.y) {
          const newFoodLeft = foodLeft - 1;
          setFoodLeft(newFoodLeft);

          if (newFoodLeft <= 0) {
            setGameState("WON");
          } else {
            setFood(generateFood(newSnake));
          }
        } else {
          // If no food eaten, remove the tail so the snake doesn't grow infinitely
          newSnake.pop();
        }

        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(gameInterval);
  }, [gameState, food, foodLeft, generateFood]);

  // --- UI RENDERING ---
  return (
    <div className="relative p-8 rounded-xl bg-gradient-to-br from-[#175553]/70 to-[#011627]/90 border border-[#0C3B43] shadow-2xl backdrop-blur-md flex gap-6">
      {/* Decorative Screws */}
      <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[#114944] shadow-inner flex items-center justify-center">
        <span className="text-[8px] text-[#011627]">x</span>
      </div>
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#114944] shadow-inner flex items-center justify-center">
        <span className="text-[8px] text-[#011627]">x</span>
      </div>
      <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-[#114944] shadow-inner flex items-center justify-center">
        <span className="text-[8px] text-[#011627]">x</span>
      </div>
      <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-[#114944] shadow-inner flex items-center justify-center">
        <span className="text-[8px] text-[#011627]">x</span>
      </div>

      {/* Main Game Board */}
      <div className="box-content w-[240px] h-[400px] bg-[#011627]/80 rounded-lg shadow-inner border border-border-line relative overflow-hidden flex flex-col items-center justify-end">
        <div className="absolute inset-0 bg-[#011627] opacity-50 z-0"></div>

        {/* Render Food */}
        {(gameState === "PLAYING" || gameState === "GAME_OVER") && (
          <div
            className="absolute bg-accent-green rounded-full shadow-[0_0_10px_#43D9AD] z-10"
            style={{
              width: `${GRID_SIZE}px`,
              height: `${GRID_SIZE}px`,
              left: `${food.x * GRID_SIZE}px`,
              top: `${food.y * GRID_SIZE}px`,
            }}
          />
        )}

        {/* Render Snake */}
        {(gameState === "PLAYING" || gameState === "GAME_OVER") &&
          snake.map((segment, i) => (
            <div
              key={i}
              className={`absolute z-10 ${i === 0 ? "bg-accent-green rounded-sm" : "bg-accent-green/60 rounded-sm"}`}
              style={{
                width: `${GRID_SIZE}px`,
                height: `${GRID_SIZE}px`,
                left: `${segment.x * GRID_SIZE}px`,
                top: `${segment.y * GRID_SIZE}px`,
              }}
            />
          ))}

        {/* Start Overlay */}
        {gameState === "START" && (
          <button
            onClick={startGame}
            className="z-20 bg-accent-orange text-primary-bg font-fira px-4 py-2 rounded-lg text-sm hover:bg-opacity-90 transition-all active:scale-95 mb-12"
          >
            start-game
          </button>
        )}

        {/* Game Over / Win Overlay */}
        {(gameState === "GAME_OVER" || gameState === "WON") && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-12 bg-[#011627]/40 backdrop-blur-[2px]">
            <div className="w-full bg-[#011627]/90 py-3 text-center mb-4 border-y border-border-line">
              <h3 className="text-2xl font-fira text-accent-green tracking-widest">
                {gameState === "WON" ? "WELL DONE!" : "GAME OVER!"}
              </h3>
            </div>
            <button
              onClick={startGame}
              className="text-text-comment hover:text-text-main font-fira text-sm transition-colors"
            >
              {gameState === "WON" ? "play-again" : "start-again"}
            </button>
          </div>
        )}
      </div>

      {/* Right Side Info Panel */}
      <div className="w-[180px] flex flex-col justify-between font-fira text-sm z-10">
        <div className="flex flex-col gap-6">
          <div className="bg-[#011423]/60 p-4 rounded-lg border border-border-line">
            <p className="text-text-main mb-2">// use keyboard</p>
            <p className="text-text-main mb-4">// arrows to play</p>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-8 bg-[#010C15] rounded border border-border-line flex items-center justify-center text-text-comment shadow-sm">
                ▲
              </div>
              <div className="flex gap-1">
                <div className="w-10 h-8 bg-[#010C15] rounded border border-border-line flex items-center justify-center text-text-comment shadow-sm">
                  ◀
                </div>
                <div className="w-10 h-8 bg-[#010C15] rounded border border-border-line flex items-center justify-center text-text-comment shadow-sm">
                  ▼
                </div>
                <div className="w-10 h-8 bg-[#010C15] rounded border border-border-line flex items-center justify-center text-text-comment shadow-sm">
                  ▶
                </div>
              </div>
            </div>
          </div>

          <div className="p-2">
            <p className="text-text-main mb-3">// food left</p>
            <div className="grid grid-cols-5 gap-y-3 gap-x-2">
              {Array.from({ length: TOTAL_FOOD }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i < foodLeft ? "bg-accent-green shadow-[0_0_8px_#43D9AD]" : "bg-[#114944] opacity-30"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Skip Button from Figma Design */}
        <div className="flex justify-end pr-2">
          <button className="px-3 py-1 border border-text-comment text-text-comment rounded-lg hover:text-text-main hover:border-text-main transition-colors">
            skip
          </button>
        </div>
      </div>
    </div>
  );
}
