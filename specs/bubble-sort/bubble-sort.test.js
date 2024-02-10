/*
  Write a bubble sort here
  Name the function bubbleSort
  Return the sorted array at the end
  
  To run the tests, change the `test.skip(…)` below to `test(…)`
  
  Bubble sort works by comparing two adjacent numbers next to each other and then
  swapping their places if the smaller index's value is larger than the larger
  index's. Continue looping through until all values are in ascending order
*/

function bubbleSort(nums) {
  //initialize variable to check if a sorting happened
  let didSort = true;

  //while didSort is true
  while (didSort){
    //set didSort to false
    didSort = false;
    //loop over the array
    for (let i = 0; i < nums.length - 1; i++){
      //if the current number is less than the next number
      if (nums[i] > nums[i+1]){
        //swap those numbers
        [nums[i], nums[i+1]] = [nums[i+1], nums[i]];

        //set didSort to true
        didSort = true;
      }
    }
  }
    
  //return nums
  return nums
}
// console.log(bubbleSort([1,4,3,5,2]))
// unit tests
// do not modify the below code
test("bubble sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const sortedNums = bubbleSort(nums);
  expect(sortedNums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
