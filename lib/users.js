module.exports = api => {

    const list = () => api.get("team/users");
    return {
        list
    };
};