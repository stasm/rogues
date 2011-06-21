// Create a new object which can be used as a prototype for a constructor.
//
// Create an object with the specified object as the prototype.  The function 
// is intended to be called on a constructor function, e.g.:
//
//     var Dog = function Dog(name) {
//       this.name = name;
//     }
//
//     Dog.prototype = Dog.delegate(Animal.prototype);
//
//     // You can extend the prototype freely now
//     Dog.prototype.bark = function...
//
// @param {Object} proto
// @return {Object}
Function.prototype.delegate = exports = function(proto) {
  return Object.create(proto, {
    constructor: { value: this },
    _super: { value: proto }
  })
}
