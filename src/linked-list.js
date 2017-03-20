const Node = require('./node');

class LinkedList {
    constructor() {
        this.nodes = [];
        this.length = this.nodes.length;
        this._head;
        this._tail;
    }

    append(data) {
        var primaryNode = this._creatENodeUpdate(data);
        this.nodes.push(primaryNode);
        this.length = this.nodes.length;
        this._tail = primaryNode;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
       return this._tail.data;
    }

    at(index) {
        if(index >= this.length) {
            throw Error("Index out of bounds");
        }
        return this.nodes[index].data;
    }

    insertAt(index, data) {
        if(index > this.length) {
            throw Error("Index out of bounds");
        }

        this.nodes.splice(index, 0, this._creatENodeUpdate(data));
        
        this.length = this.nodes.length;

        if(index !== 0) {
            this.nodes[index - 1].next = this.nodes[index];
        }
        if(index !== this.length - 1) {
            this.nodes[index + 1].prev = this.nodes[index];
        }
        
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this.nodes = [];
        this.length = 0;
        this._head = null;
        this._tail = null;
        return this;
    }

    deleteAt(index) {
        var node = this._head,
      count = 0;
    if (this.length === 1) {
      return this.clear();
    }
    if (index === 0) {
      node.prev.next = null
      this._head = node.prev
      return this;
    }
    do {
      node = node.prev
      count++
    } while (count < index)
    node.prev.next = node.next;
    node.next.prev = node.prev;
    return node;
    }

    reverse() {
        this.nodes = this.nodes.reverse();
        this._head = this.nodes[0];
        this._tail = this.nodes[this.length - 1];
        
        this.nodes.map(function(node, index, array) {
            node.prev = index === 0 ? null : array[index - 1];
            node.next = index === array.length - 1 ? null : array[index + 1];
            return node;
        });
        
        return this;
    }

    indexOf(data) {
        return this.nodes.findIndex(x => x.data === data);
    }

    _creatENodeUpdate(data) {
        var prev = this.length ? this.nodes[this.length - 1] : null;
        var primaryNode = new Node(data, prev);

        if(this.isEmpty()) {
            this._head = primaryNode;
        } else {
            this.nodes[this.length - 1].next = primaryNode;
        }

        return primaryNode;
    }
}

module.exports = LinkedList;
