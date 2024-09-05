import React, { useState, useEffect , useRef} from 'react';
import { bubbleSort } from './Algorithms/bubbleSort';
import { mergeSort } from './Algorithms/mergeSort';
import { selectionSort } from './Algorithms/selectionSort';
import { insertionSort } from './Algorithms/insertionSort';
import { quickSort } from './Algorithms/quickSort';
import ArraySizeSlider from './size-and-speed/ArraySizeSlider';
import SpeedSlider from './size-and-speed/SpeedSlider';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(250);
  const abortControllerRef = useRef(null); 
  const [activeBars, setActiveBars] = useState([]);
  const [isSorting, setIsSorting] = useState(false);  // New state to track sorting
 // const [isSortingCompleted, setIsSortingCompleted] = useState(false);  // New state to track sorting completion
  const [notificationVisible, setNotificationVisible] = useState(false);
  //const [notificationAfterSoritng, setNotificationAfterSorting] = useState(false);
  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();  // Abort any ongoing sorting operation
    }
    abortControllerRef.current = new AbortController();
    

    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 450) + 10);
    }
    setArray(newArray);
    setIsSorting(false);
    //setNotificationAfterSorting(false);
  };

  const handleSort = async (sortFunction) => {
    if (isSorting) {
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 2000); // Hide notification after 2 seconds
      return;
    }
    else{
      setIsSorting(true);
      let arr = array.slice();
      try{
       let sorted = await sortFunction(arr, setArray, speed,abortControllerRef.current.signal, setActiveBars);
        if(sorted ){
          setNotificationVisible(true);
          setTimeout(() => setNotificationVisible(false), 2000); // Hide notification after 2 seconds
        }
      } catch(error){
        if (error.name !== 'AbortError') {
          console.error("Error during sorting:", error);
        }
      } finally {
        setIsSorting(false);
      }
      
      
    
    }
  };

  const barWidth = 800/arraySize;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      
      <div className="w-full flex space-x-2 justify-center p-4 text-white fixed top-0 z-10">
      <ArraySizeSlider
        min={10}
        max={100}
        value={arraySize}
        onChange={(newSize) => setArraySize(newSize)}
        disabled = {isSorting}
      />
        <button onClick={resetArray} className="px-4 py-2 bg-blue-500 text-white rounded  hover:bg-blue-600 active:bg-blue-700 focus:outline-none">Generate New Array</button>
        <button onClick={() => handleSort(bubbleSort)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 focus:outline-none" >Bubble Sort</button>
        <button onClick={() => handleSort(selectionSort)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 focus:outline-none" >Selection Sort</button>
        <button onClick={() => handleSort(insertionSort)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 focus:outline-none" >Insertion Sort</button>
        <button onClick={() => handleSort(mergeSort)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 focus:outline-none" >Merge Sort</button>
        <button onClick={() => handleSort(quickSort)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 focus:outline-none" >Quick Sort</button>
        <SpeedSlider
        min={0}
        max={499.99}
        value={speed}
        onChange={(newSpeed) => setSpeed(newSpeed)}
        disabled = {isSorting}
      />
      </div>
      <div className="flex items-end space-x-1 justify-center flex-grow w-full px-4 pb-8 mt-16">
       
        {array.map((value, idx) => (
          <div>
            {/* <div className=""> {value}</div> */}
         <div
          key={idx}
          className={`${activeBars.includes(idx) ? 'bg-yellow-500' : 'bg-red-500'}`}
          style={{ height: `${value}px`,
                   width: `${barWidth}px` }}
       ></div>
       </div>
        ))}
      </div>
      {notificationVisible && (
        <div className="fixed bottom-8 right-9 bg-black text-white text-sm px-4 py-2 rounded-lg opacity-80 z-10 transition-opacity duration-300">
            {isSorting ? "Sorting in progress... Please wait!" : "Array is Sorted!"}
        </div>
      )}
    </div>
  );
};

export default SortingVisualizer;
