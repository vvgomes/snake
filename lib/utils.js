Number.prototype.times = function(f) {
  for(var i = 0; i < this; i++)
    f(i);
};

Array.prototype.has = function(e) {
  for(var i = 0; i < this.length; i++)
    if((e.equals) ? e.equals(this[i]) : e === this[i])
      return true; 
  return false;
};