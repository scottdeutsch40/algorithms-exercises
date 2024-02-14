// in order to pass the unit tests, you will need to create a function called createTrie that accepts a list of strings
// as a parameter and returns an object with a method on it called "`complete`. complete is a method that when called
// with a string will return an array of up to length three that are autocompleted suggestions of how to finish that string.
// for the sake of this exercise, it does not matter which order these strings are returned in or if there are more than three
// possible suggestions, which three you choose
//
// feel free to see the dataset in cities.js
//
// I suggest working on one unit test at a time, use `test.skip` instead of `test` to not run unit tests
// the edge cases are for fun and for this exercise you don't necessarily need to pass them

const { CITY_NAMES } = require("./cities.js");
const _ = require("lodash"); // needed for unit tests

// Node class for trie implementation
class Node {
  constructor(string) {
    this.children = []; // Array to store child nodes
    this.terminus = false; // Indicates if the node marks the end of a word
    this.value = string[0] || ''; // Value of the node
    if (string.length > 1) {
      // If there are more characters in the string, create child nodes recursively
      this.children.push(new Node(string.substr(1)));
    } else {
      // If it's the last character of the string, mark it as terminus
      this.terminus = true;
    }
  }

  // Method to add a string to the trie
  add(string) {
    const value = string[0];
    const next = string.substr(1);
    for (let i = 0; i < this.children.length; i++){
      const child = this.children[i];
      // Traverse the tree until the matching character is found
      if (child.value === value) {
        if (next) {
          // If there are more characters in the string, continue adding recursively
          child.add(next);
        } else {
          // If it's the last character of the string, mark it as terminus
          child.terminus = true;
        }
        return;
      }
    }
    // If there's no matching child node, create a new one
    this.children.push(new Node(string));
  }

  // Method to complete a string based on the trie
  _complete(search, built, suggestions){
    if (suggestions.length >= 3 || (search && search[0] !== this.value)){
      // Limiting suggestions to 3 or when the search string doesn't match the node value
      return suggestions;
    }

    if (this.terminus) {
      // If it's a terminus node, add the built string to suggestions
      suggestions.push(built + this.value);
    }

    // Recursively complete the string
    for (let i = 0; i < this.children.length; i++){
      const child = this.children[i];
      suggestions = child._complete(search.substr(1), built + this.value, suggestions)
    }
    return suggestions;
  }

  // Method to find completions of a string
  complete(string) {
    let completions = [];
    
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      // Completing the string for each child node
      completions = completions.concat(child._complete(string, '', []))
    }
    return completions;
  }
}

// Function to create a trie from an array of words
const createTrie = (words) => {
  const root = new Node(""); // Creating root node

  // Adding each word to the trie
  for (let i = 0; i < words.length; i++){
    const word = words[i];
    root.add(word.toLowerCase());
  }

  return root;
};

// unit tests
// do not modify the below code
describe("tries", function () {
  test("dataset of 10 – san", () => {
    const root = createTrie(CITY_NAMES.slice(0, 10));
    const completions = root.complete("san");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, ["san antonio", "san diego", "san jose"])
        .length
    ).toBe(3);
  });

  test("dataset of 10 – philadelph", () => {
    const root = createTrie(CITY_NAMES.slice(0, 10));
    const completions = root.complete("philadelph");
    expect(completions.length).toBe(1);
    expect(_.intersection(completions, ["philadelphia"]).length).toBe(1);
  });

  test("dataset of 25 – d", () => {
    const root = createTrie(CITY_NAMES.slice(0, 25));
    const completions = root.complete("d");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, ["dallas", "detroit", "denver"]).length
    ).toBe(3);
  });

  test("dataset of 200 – new", () => {
    const root = createTrie(CITY_NAMES.slice(0, 200));
    const completions = root.complete("new");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, [
        "new york",
        "new orleans",
        "new haven",
        "newark",
        "newport news"
      ]).length
    ).toBe(3);
  });

  test("dataset of 200 – bo", () => {
    const root = createTrie(CITY_NAMES.slice(0, 200));
    const completions = root.complete("bo");
    expect(completions.length).toBe(2);
    expect(_.intersection(completions, ["boston", "boise city"]).length).toBe(
      2
    );
  });

  test("dataset of 500 – sal", () => {
    const root = createTrie(CITY_NAMES.slice(0, 500));
    const completions = root.complete("sal");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, ["salt lake city", "salem", "salinas"]).length
    ).toBe(3);
  });

  test("dataset of 925 – san", () => {
    const root = createTrie(CITY_NAMES);
    const completions = root.complete("san");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, [
        "san antonio",
        "san angelo",
        "san diego",
        "san jose",
        "san jacinto",
        "san francisco",
        "san bernardino",
        "san buenaventura",
        "san bruno",
        "san mateo",
        "san marcos",
        "san leandro",
        "san luis obispo",
        "san ramon",
        "san rafael",
        "san clemente",
        "san gabriel",
        "santa ana",
        "santa clarita",
        "santa clara",
        "santa cruz",
        "santa rosa",
        "santa maria",
        "santa monica",
        "santa barbara",
        "santa fe",
        "santee",
        "sandy",
        "sandy springs",
        "sanford"
      ]).length
    ).toBe(3);
  });
});

describe("edge cases", () => {
  test("handle whole words – seattle", () => {
    const root = createTrie(CITY_NAMES.slice(0, 30));
    const completions = root.complete("seattle");
    expect(completions.length).toBe(1);
    expect(_.intersection(completions, ["seattle"]).length).toBe(1);
  });

  test("handle no match", () => {
    const root = createTrie(CITY_NAMES.slice(0, 30));
    const completions = root.complete("no match");
    expect(completions.length).toBe(0);
  });

  test("handle words that are a subset of another string – salin", () => {
    const root = createTrie(CITY_NAMES.slice(0, 800));
    const completions = root.complete("salin");
    expect(completions.length).toBe(2);
    expect(_.intersection(completions, ["salina", "salinas"]).length).toBe(2);
  });
});
