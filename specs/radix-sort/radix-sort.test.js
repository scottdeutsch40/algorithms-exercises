/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/
//create helper function to get digit that accepts the number and place
function getDigit(number, place){
  //divide the number by its place and floor it
  //return the remainder of this number divided by 10
  return Math.floor(number / (10**place)) % 10;
}

//create helper function to get longest number
function getLongestNumber(arr){
  let max = Math.max(...arr);
  let counter = 0;
  while (max > 0){
    counter++;
    max = Math.floor(max / 10)
  }
  return counter;
}

function radixSort(array) {
  //find the longest number
  const longestNum = getLongestNumber(array)
  //loop over the array "longest number of times"
  for (let i = 0; i < longestNum; i++){
    //create an array of 10 arrays
    const buckets = new Array(10).fill(null).map(() => []);

    //populate the arrays by digit bucket
    for (let j = 0; j < array.length; j++){
      const digit = getDigit(array[j], i);
      buckets[digit].push(array[j])
    }
    //original array becomes the flattened array
    array = buckets.flat();
  }
    
  //return the array
  return array;
}
const nums2 = [
  20,
  51,
  3,
  801,
  415,
  62,
  4,
  17,
  19,
  11,
  1,
  100,
  1244,
  104,
  944,
  854,
  34,
  3000,
  3001,
  1200,
  633
];

// unit tests
// do not modify the below code
describe("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20,
      51,
      3,
      801,
      415,
      62,
      4,
      17,
      19,
      11,
      1,
      100,
      1244,
      104,
      944,
      854,
      34,
      3000,
      3001,
      1200,
      633
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1,
      3,
      4,
      11,
      17,
      19,
      20,
      34,
      51,
      62,
      100,
      104,
      415,
      633,
      801,
      854,
      944,
      1200,
      1244,
      3000,
      3001
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort((a,b) => a-b));
  });
});
