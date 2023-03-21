/* eslint-disable no-undef */
const db = require("../models");

const getJSDate = (days) => {
  if (!Number.isInteger(days)) {
    throw new Error("Need to pass an integer as days");
  }
  const today = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  return new Date(today.getTime() + days * oneDay);
};

describe("Test list of items", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Add overdue item main mon", async () => {
    const todo = await db.Todo.addTask({
      title: "This is a sample item",
      dueDate: getJSDate(-2),
      completed: false,
    });
    const items = await db.Todo.overdue();
    expect(items.length).toBe(1);
  });

  test("Add due today item yesterday tues", async () => {
    const dueTodayItems = await db.Todo.dueToday();
    const todo = await db.Todo.addTask({
      title: "This is a sample item",
      dueDate: getJSDate(0),
      completed: false,
    });
    const items = await db.Todo.dueToday();
    expect(items.length).toBe(dueTodayItems.length + 1);
  });

  test("Add due later item tommorow thurs", async () => {
    const dueLaterItems = await db.Todo.dueLater();
    const todo = await db.Todo.addTask({
      title: "This is a sample item",
      dueDate: getJSDate(2),
      completed: false,
    });
    const items = await db.Todo.dueLater();
    expect(items.length).toBe(dueLaterItems.length + 1);
  });

  test("Mark as to do complete friday", async () => {
    const overdueItems = await db.Todo.overdue();
    const asTodo = overdueItems[0];
    expect(asTodo.completed).toBe(false);
    await db.Todo.markAsComplete(asTodo.id);
    await asTodo.reload();

    expect(asTodo.completed).toBe(true);
  });

  test("Test completed 01 num", async () => {
    const overdueItems = await db.Todo.overdue();
    const asTodo = overdueItems[0];
    expect(asTodo.completed).toBe(true);
    const displayValue = asTodo.displayableString();
    expect(displayValue).toBe(
      `${asTodo.id}. [x] ${asTodo.title} ${asTodo.dueDate}`
    );
  });

  test("Test incomplete 01 num", async () => {
    const dueLaterItems = await db.Todo.dueLater();
    const asTodo = dueLaterItems[0];
    expect(asTodo.completed).toBe(false);
    const displayValue = asTodo.displayableString();
    expect(displayValue).toBe(
      `${asTodo.id}. [ ] ${asTodo.title} ${asTodo.dueDate}`
    );
  });

  test("Test incomplete in 02 tommorow", async () => {
    const dueToday = await db.Todo.dueToday();
    const asTodo = dueToday[0];
    expect(asTodo.completed).toBe(false);
    const displayComp = asTodo.displayableString();
    expect(displayComp).toBe(`${asTodo.id}. [ ] ${asTodo.title}`);
  });

  test("Test completed once 02 tommorow", async () => {
    const dueToday = await db.Todo.dueToday();
    const asTodo = dueToday[0];
    expect(asTodo.completed).toBe(false);
    await db.asTodo.markAsComplete(asTodo.id);
    await asTodo.reload();
    const displayComp = asTodo.displayableString();
    expect(displaycomp).toBe(`${asTodo.id}. [x] ${asTodo.title}`);
  });
});
