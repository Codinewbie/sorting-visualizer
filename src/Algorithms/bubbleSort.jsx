export const bubbleSort = async (array, setArray,speed,signal,setActiveBars) => {
    
    let arr = array.slice();
    for (let i = 0; i < arr.length; i++) {
      let ans = false;
      for (let j = 0; j < arr.length - i - 1; j++) {
        if(signal.aborted){
          setActiveBars([]); 
          return;
        } 

        setActiveBars([j, j + 1]); // Highlight the bars being compared
        await new Promise((resolve) => setTimeout(resolve, 500 - speed));

        if (arr[j] > arr[j + 1]) {
          ans = true;
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 500-speed));
        }

        setActiveBars([]); 
      }
      if(ans ===false){
        setActiveBars([]); 
          return;

      }
    }
  };
  