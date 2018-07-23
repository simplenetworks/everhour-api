module.exports = api => {

    const create = (name, projects) =>
        api.post(`clients`).send({
            name: name,
            projects: projects
        });

    const update = (client_id, name, projects) =>
        api.put(`clients/${client_id}`).send({
            name: name,
            projects: projects
        });
    const remove = (client_id) =>
        api.delete(`clients/${client_id}`).send()

    // api.projects.list()
    const list = () => api.get("clients");
    return {
        create,
        update,
        list,
        remove
    };
};