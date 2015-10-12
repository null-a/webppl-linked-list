'use strict';

module.exports = function(env) {

  var cons = function(head, tail) {
    return { head: head, tail: tail, inspect: inspect };
  };

  var inspect = function(flag) {

    var _inspect = function(list) {
      if (list.tail === EmptyList) {
        return show(list.head);
      } else {
        return [show(list.head), _inspect(list.tail)].join(', ');
      }
    };

    return ['list(', _inspect(this), ')'].join('');
  };

  var show = function(x) {
    if (x.inspect) {
      return x.inspect();
    } else {
      return JSON.stringify(x);
    }
  };

  var EmptyList = { inspect: function() { return 'list()'; } };

  var $cons = function(s, k, a, head, tail) {
    return k(s, cons(head, tail));
  };

  var $head = function(s, k, a, x) { return k(s, x.head); };
  var $tail = function(s, k, a, x) { return k(s, x.tail); };

  var $fromArray = function(s, k, a, array) {
    var list = EmptyList;
    array.reverse().forEach(function(x) {
      list = cons(x, list);
    });
    return k(s, list);
  };

  var $toArray = function(s, k, a, list) {
    var array = [];
    while (list !== EmptyList) {
      array.push(list.head);
      list = list.tail;
    }
    return k(s, array);
  };

  return {
    $cons: $cons,
    EmptyList: EmptyList,
    $head: $head,
    $tail: $tail,
    $fromArray: $fromArray,
    $toArray: $toArray
  };

};
