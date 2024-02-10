import React from "react";
import "./tree.css";
import { TreeViz } from "./tree-visualizer";
import _ from "lodash";

class Tree {
  constructor() {
    this.root = null;
  }
  add(value) {
    const node = new Node(value);
    //some logic if this is the root
    if (!this.root){
      this.root = node;
    }

    //find the correct place to add
    else{
      let leaf = this.root;
      while (true){
        if (value > leaf.value){
          if (leaf.right){
            leaf = leaf.right;
            continue;
          } else {
            leaf.right = node;
            break;
          }
        } else {
          if (leaf.left){
            leaf = leaf.left;
            continue;
          } else {
            leaf.left = node;
            break;
          }
        }
      }
    }
  }
  toObject () {
    return this.root;
  }
}

// you might consider using a Node class too
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default function TreeComponent() {
  const nums = _.shuffle(_.range(10));
  const tree = new Tree();
  nums.map((num) => tree.add(num));
  const objs = tree.toObject();
  return <TreeViz root={objs} />;
}
