/* eslint-disable no-undef */
const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
describe("Todolist Testing", () => {
  beforeAll(() => {
    add({
      title: "DAA algorithums",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Add new todo ", () => {
    let length = all.length;

    add({
      title: "node js learning",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toBe(length + 1);
  });

  test("Mark completed", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("retrive overdue", () => {
    let checked = overdue();

    expect(
      checked.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("retrive all todos that are dueToday", () => {
    let checked = dueToday();

    expect(
      checked.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("retrive dueLater", () => {
    let checked = dueLater();

    expect(
      checked.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});
