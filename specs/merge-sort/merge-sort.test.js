/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const mergeSort = (nums) => {
  if (nums.length < 2) return nums;
  const left = nums.slice(0, Math.floor(nums.length / 2));
  const right = nums.slice(Math.floor(nums.length / 2));
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  return merge(sortedLeft, sortedRight);
};

const merge = (arr1, arr2) => {
  const merged = [];
  let counter1 = 0;
  let counter2 = 0;
  while (counter1 < arr1.length && counter2 < arr2.length){
    if (arr1[counter1] < arr2[counter2]){
      merged.push(arr1[counter1]);
      counter1++;
    }
    else {
      merged.push(arr2[counter2]);
      counter2++;
    }
  }
  return counter1 < arr1.length ? merged.concat(arr1.slice(counter1)) : merged.concat(arr2.slice(counter2));
}

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
