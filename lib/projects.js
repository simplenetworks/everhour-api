const moment = require("moment");

module.exports = api => {

    //api.prjects.create()
    const create = (name, type, users, archived) =>
        api.post(`projects`).send({
            name: name,
            type: type || "list",
            status: archived ? "archived" : "open",
            users: users
        });

    const update = (project_id, name, type, users, archived) =>
        api.put(`projects/${project_id}`).send({
            name: name,
            tiype: type || "list",
            status: archived ? "archived" : "open",
            users: users

        });

    const remove = (project_id) =>
        api.delete(`projects/${project_id}`).send()


    // const section = {
    //     list: (project_id) => {
    //         api.post(`projects/${project_id}/sections`).send()
    //     },

    //     create: (project_id, name) => {
    //         api.post(`projects/${project_id}/sections`).send({
    //             name: name
    //         })
    //     },

    //     update: (section_id, name) => {
    //         api.put(`sections/${section_id}`).send({
    //             name: name
    //         })
    //     },

    //     remove: (section_id) => {
    //         api.delete(`sections/${section_id}`).send()
    //     }

    // }

    section_create = (project_id, name) =>
        api.post(`projects/${project_id}/sections`).send({
            name: name
        });

    // api.projects.list()
    const list = () => api.get("projects");
    return {
        create,
        update,
        list,
        remove,
        section_create
    };
};