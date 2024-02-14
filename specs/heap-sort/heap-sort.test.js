/*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap
   
*/

const heapSort = (array) => {
  //create a max heap first
  createMaxHeap(array);
  for (let i = array.length - 1; i > 0; i--) {
    //first value is largest in the array, so swap with val at index i
    [array[0], array[i]] = [array[i], array[0]]
    //run heapify on the first element and ensure heap is only considered until i
    heapify(array, 0, i)
  }
    
  return array;
};

const createMaxHeap = (array) => {
  //loop over the first half of the array starting at the middle
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--){
    //call heapify on each element
    heapify(array, i, array.length);
  }
  return array;  
};

const heapify = (array, index, heapSize) => {
  //find the left and right children
  const leftInd = 2 * index + 1;
  const rightInd = 2 * index + 2;

  //initialize largest value index to index
  let largestValueIndex = index;

  //if left index is within considered heap and left child is larger than current val
  if (heapSize > leftInd && array[largestValueIndex] < array[leftInd]) {
    //reassign largest value index to leftInd
    largestValueIndex = leftInd;
  }

  //if right index is within considered heap and right child is larger than current val
  if (heapSize > rightInd && array[largestValueIndex] < array[rightInd]) {
    //reassign largest value index to rightInd
    largestValueIndex = rightInd;
  }

  //if the largest val index is not the current index
  if (largestValueIndex !== index) {
    //swap the values
    [array[index], array[largestValueIndex]] = [array[largestValueIndex], array[index]]
    //call heapify on the swapped element
    heapify(array, largestValueIndex, heapSize);
  }
};
const nums = [5, 3, 2, 10, 1, 9, 8, 6, 4, 7];
// unit tests
// do not modify the below code
test("heap sort", function () {
  const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
  heapSort(nums);
  expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
