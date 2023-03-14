const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

let today = new Date().toLocaleDateString("en-CA");
  
  const overdue = () => {
    const overdue_item = all.filter(
      (item) => item.dueDate < today
    );
    return overdue_item;
  };

  const dueToday = () => {
    const duelate_item = all.filter(
      (item) => item.dueDate === today
    );
    return duelate_item;
  };

  const dueLater = () => {
    const duelater_item = all.filter(
      (item) => item.dueDate > today
    );
    return duelater_item;
  };

  const toDisplayableList = (list) => {
    const final_result = list.map(
      (item) =>
        `${item.completed ? "[x]" : "[ ]"} ${item.title} ${
          item.dueDate.split("-")[2] === String(new Date().getDate())
            ? ""
            : item.dueDate
        }`
    );

    return final_result.join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};
module.exports = todoList;
