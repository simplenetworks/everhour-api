module.exports = params => {
  const api = require("./lib/api")(params);
  const tasks = require("./lib/tasks")(api);
  const task = require("./lib/task")(api);
  const timer = require("./lib/timer")(api);
  const projects = require("./lib/projects")(api);
  const clients = require("./lib/clients")(api);
  const users = require("./lib/users")(api);

  return {
    api,
    tasks,
    task,
    timer,
    projects,
    clients,
    users
  };
};