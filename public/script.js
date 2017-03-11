var plusOne;
this.cloneElement = function(subject, target) {
  var clone;
  clone = $(subject).clone();
  console.log(clone);
  console.log('11');
  showSetNameAndId(clone.children().children().children('textarea'), plusOne(bottomId(target)));
  clone.attr("class", "");
  clone.append(target);
  return clone;
};
this.bottomId = function(selector) {
  var bottomId;
  bottomId = /\d+$/.exec($(selector).children().children().children('textarea').last().attr("id"));
  if (bottomId) {
    return parseInt(bottomId);
  }
  return 0;
};
this.showSetNameAndId = function(selector, new_id) {
  var id, name;
  name = selector.attr("name").replace(/(\d+)\]$/, new_id);
  id = selector.attr("id").replace(/(\d+)$/, new_id);
  selector.attr("name", name);
  selector.attr("id", id);
};
this.populateListItem = function(text) {
  cloneElement(".clonee", ".list_items").children().children().children('textarea').val(text);
};
plusOne = function(str) {
  return (parseInt(str) + 1).toString();
};
