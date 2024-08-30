const partition = async (arr, setArray,speed,signal,setActiveBars,low,high) => {
    
  let pivot = arr[low];
  let i = low;
  let j = high;
  setActiveBars([i,j]); // Highlight the bars being compared
  await new Promise((resolve) => setTimeout(resolve,500-speed));
        
  while(i<j){
        if (signal.aborted) {
          setActiveBars([]);
          return i;
        }
        while(arr[i]<=pivot && i<high){
          if (signal.aborted) {
            setActiveBars([]);
            return i;
          }
          setActiveBars([i,j]); // Highlight the bars being compared
          await new Promise((resolve) => setTimeout(resolve,500-speed));
          i++;
          
        }
        while(arr[j]>pivot && j>low){
          if (signal.aborted) {
            setActiveBars([]);
            return i;
          }
          setActiveBars([i,j]); // Highlight the bars being compared
          await new Promise((resolve) => setTimeout(resolve,500-speed));
          j--;
        
        }
        if(i<j){
          if (signal.aborted) {
            setActiveBars([]);
            return i;
          }
          [arr[j], arr[i]] = [arr[i], arr[j]];
          setArray([...arr]);
          setActiveBars([i, j]); // Highlight the bars being compared
          await new Promise((resolve) => setTimeout(resolve,500-speed));
        }
        setActiveBars([]); // Highlight the bars being compared

  }
  if (signal.aborted) {
    setActiveBars([]);
    return i;
  }
  [arr[low] , arr[j]] = [arr[j] , arr[low]];
  setArray([...arr]);
  setActiveBars([low, j]); // Highlight the bars being compared
  await new Promise((resolve) => setTimeout(resolve,500-speed));
  setActiveBars([]);
  return j;
  };
  
  export const quickSort = async (arr, setArray,speed,signal,setActiveBars,low = 0, high = arr.length-1) => {
    if (low < high && !signal.aborted) {
      let pi = await partition(arr,  setArray,speed,signal,setActiveBars,low, high);
  
      await quickSort(arr, setArray,speed,signal,setActiveBars,low,pi-1);
      await quickSort(arr, setArray,speed,signal,setActiveBars,pi+1,high);
    }
  };
  