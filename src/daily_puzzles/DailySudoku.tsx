import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const initialBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const solution = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];

const DailySudoku: React.FC = () => {
  const [board, setBoard] = useState(initialBoard.map(row => [...row]));
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    if (initialBoard[row][col] === 0) setSelected([row, col]);
  };

  const handleNumberInput = (num: number) => {
    if (!selected) return;
    const [row, col] = selected;
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = num;
    setBoard(newBoard);
    setSelected(null);
    setError(false);
    // Check for completion
    if (JSON.stringify(newBoard) === JSON.stringify(solution)) {
      setCompleted(true);
    }
  };

  const handleClear = () => {
    if (!selected) return;
    const [row, col] = selected;
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = 0;
    setBoard(newBoard);
    setSelected(null);
    setError(false);
  };

  const handleCheck = () => {
    if (JSON.stringify(board) !== JSON.stringify(solution)) {
      setError(true);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <div className="max-w-lg w-full">
        <Link to="/puzzles">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </Link>
        <Badge className="mb-4 px-4 py-2 bg-gradient-puzzle text-white">Daily Sudoku</Badge>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sudoku</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-9 gap-1 bg-gray-800 p-2 rounded-lg">
                {board.map((row, rIdx) =>
                  row.map((cell, cIdx) => (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className={`w-8 h-8 flex items-center justify-center text-lg font-mono rounded cursor-pointer select-none
                        ${selected && selected[0] === rIdx && selected[1] === cIdx ? 'bg-blue-400 text-white' : cell === 0 ? 'bg-gray-200 text-gray-500' : 'bg-white text-black'}
                        ${error && selected && selected[0] === rIdx && selected[1] === cIdx ? 'border-2 border-red-500' : ''}
                        ${((rIdx+1)%3===0 && rIdx!==8 ? 'border-b-2 border-gray-400' : '')}
                        ${((cIdx+1)%3===0 && cIdx!==8 ? 'border-r-2 border-gray-400' : '')}
                      `}
                      onClick={() => handleCellClick(rIdx, cIdx)}
                    >
                      {cell !== 0 ? cell : ''}
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-2 mt-4">
                {[1,2,3,4,5,6,7,8,9].map(num => (
                  <Button key={num} size="sm" variant="outline" onClick={() => handleNumberInput(num)}>{num}</Button>
                ))}
                <Button size="sm" variant="destructive" onClick={handleClear}>Clear</Button>
              </div>
              <div className="mt-4 flex gap-2">
                <Button onClick={handleCheck} variant="secondary">Check</Button>
                {completed && <span className="text-green-600 font-bold ml-2">Congratulations! Puzzle Complete.</span>}
                {error && <span className="text-red-600 font-bold ml-2">Incorrect. Try again!</span>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailySudoku;
