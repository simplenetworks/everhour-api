const moment = require("moment");

module.exports = api => task_id => {
  const estimate = {
    // api.task(id).estimate.set(estimate_in_seconds)
    set: body =>
      typeof estimate === "number" ?
      api
      .post(`tasks/${task_id}/estimate`)
      .send({
        total: estimate,
        type: "overall"
      }) : Array.isArray(estimate) ?
      api
      .post(`tasks/${task_id}/estimate`)
      .send({
        users: estimate,
        type: "users"
      }) : api.post(`tasks/${task_id}/estimate`).send(estimate),

    // api.task(id).estimate.delete()
    delete: () => api.delete(`tasks/${task_id}/estimate`)
  };

  const time = {
    // api.task(id).time.add()
    add: (amount, date, user) =>
      api
      .post(`tasks/${task_id}/time`)
      .send({
        time: amount,
        user: user,
        date: moment(date).format("YYYY-MM-DD")
      }),

    // api.task(id).time.update(amount_in_seconds, date \\ today)
    update: (amount, date) =>
      api
      .put(`tasks/${task_id}/time`)
      .send({
        time: amount,
        date: moment(date).format("YYYY-MM-DD")
      }),

    // api.task(id).time.delete(amount_in_seconds, date \\ today)
    delete: (amount, date) =>
      api
      .delete(`tasks/${task_id}/time`)
      .send({
        time: amount,
        date: moment(date).format("YYYY-MM-DD")
      })
  };

  const create = (project_id, section_id, task_name) =>
    api.post(`projects/${project_id}/tasks`).send({
      name: task_name,
      section: section_id
    });


  time.add_on = time.add;
  time.update_on = time.update;
  time.delete_on = time.delete;

  // api.task(id).start_timer()
  const start_timer = () => api.post("timers").send({
    task: task_id
  });

  return {
    estimate,
    create,
    time,
    start_timer
  };
};