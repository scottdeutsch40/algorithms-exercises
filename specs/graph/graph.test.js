// you work for a professional social network. in this social network, a professional
// can follow other people to see their updates (think Twitter for professionals.)
// write a function that finds the job `title` that shows up most frequently given
// a set of degree of separation from you. count the initial id's own job title in the total

/*
  parameters:
  myId                - number    - the id of the user who is the root node
  
  degreesOfSeparation - number   - how many degrees of separation away to look on the graph
*/

/*
  getUser  - function - a function that returns a user's object given an ID

  example

  {
    id: 308,
    name: "Beatrisa Lalor",
    company: "Youtags",
    title: "Office Assistant II",
    connections: [687, 997, 437]
  }
*/
const { max } = require("lodash");
const { getUser } = require("./jobs");

const findMostCommonTitle = (myId, degreesOfSeparation) => {
  
  //initialize an id set to check for duplicates with myId's connections
  const idSet = new Set([myId]);
  
  //initialize a hashMap that will store frequencies of each job title
  const hashMap = {};
  
  //initialize a maxJobOccurence value
  let maxJobOccurence = 0;
  
  //initialize a maxFrequentJob
  let maxFrequentJob;
  
  //intialize a queue with myId's connnections
  const queue = [myId];
  
  //loop through the queue degreesOfSeparation times
  for (let i = 0; i <= degreesOfSeparation; i++){
    
    //record the current queue length
    const queueLength = queue.length;
    
    //loop over the queue to its starting length
    for (let j = 0; j < queueLength; j++){
      
      //initialize curr value as first element of queue
      const curr = getUser(queue.shift());
      
      //store their job in hashmap
      hashMap[curr.title] = hashMap[curr.title] ? hashMap[curr.title] + 1 : 1;
      
      //check if the job frequence value exceeds maxJobOccurence
      if (hashMap[curr.title] > maxJobOccurence){
        
        //if it is, overwrite maxFrequentJob
        maxFrequentJob = curr.title;
        
        //increment maxJobOccurence
        maxJobOccurence++;
      }

      //loop through curr's connections
      for (let k = 0; k < curr.connections.length; k++){
        //if the connection id is not in the set
        if (!idSet.has(curr.connections[k])){
          //add it to the set
          idSet.add(curr.connections[k]);
          //add their id to the queue
          queue.push(curr.connections[k])
        }
      }
    }
  }
  //return maxFrequentJob
  return maxFrequentJob;
};
console.log(findMostCommonTitle(30, 2))
console.log(findMostCommonTitle(11, 3))
console.log(findMostCommonTitle(306, 4))
console.log(findMostCommonTitle(1, 7))
// unit tests
// do not modify the below code
// test("findMostCommonTitle", function () {
//   // the getUser function and data comes from this CodePen: https://codepen.io/btholt/pen/NXJGwa?editors=0010
//   test("user 30 with 2 degrees of separation", () => {
//     expect(findMostCommonTitle(30, 2)).toBe("Librarian");
//   });

//   test("user 11 with 3 degrees of separation", () => {
//     expect(findMostCommonTitle(11, 3)).toBe("Graphic Designer");
//   });

//   test("user 307 with 4 degrees of separation", () => {
//     // if you're failing here with "Clinical Specialist, you're probably not filtering users who
//     // appear more than once in people's connections
//     expect(findMostCommonTitle(306, 4)).toBe("Pharmacist");
//   });
// });

// test("extra credit", function () {
//   test("user 1 with 7 degrees of separation – this will traverse every user that's followed by someone else. five users are unfollowed", () => {
//     expect(findMostCommonTitle(1, 7)).toBe("Geological Engineer");
//   });
// });
