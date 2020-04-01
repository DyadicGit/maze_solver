import { PriorityQueue } from "./queue.js"

class PriorityQueueSimple {
  constructor(){
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({val, priority});
    this.sort();
  };
  dequeue() {
    return this.values.shift();
  };
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  };
}


class WeightedGraph {
    constructor(adjacencyList = {}) {
        this.adjacencyList = adjacencyList;
    }
    addVertex(vertex){
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1,vertex2, weight){
        this.adjacencyList[vertex1].push({ node:vertex2, weight });
        this.adjacencyList[vertex2].push({ node:vertex1, weight });
    }
    addOneWayEdge(vertex1,vertex2, weight){
      this.adjacencyList[vertex1].push({ node:vertex2, weight });
    }
    shortestPath(start, finish){
        const priorityQ = new PriorityQueue();
        const distances = {};
        const road = {};
        let path = [] //to return at end

        //build up initial state
        for(const vertex in this.adjacencyList){
            if(vertex === start){
                distances[vertex] = 0;
                priorityQ.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                priorityQ.enqueue(vertex, Infinity);
            }
            road[vertex] = null;
        }

        let smallest;
        while(priorityQ.values.length){
            smallest = priorityQ.dequeue().val;

            if(smallest === finish){ //end of loop
                while(road[smallest]){
                    path.push(smallest);
                    smallest = road[smallest];
                }
                break;
            }

             // start
            if(smallest || distances[smallest] !== Infinity){
                for(const {weight: edgeWeight, node: edge} of this.adjacencyList[smallest]){
                    const candidate = distances[smallest] + edgeWeight;
                    if(candidate < distances[edge]){
                        distances[edge] = candidate;
                        road[edge] = smallest;
                        priorityQ.enqueue(edge, candidate);
                    }
                }
            }
        }

        return [...path, smallest].reverse().reduce((acc, v) => acc+' -> '+v);
    }
}

export { WeightedGraph };
