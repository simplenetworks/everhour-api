const request = require("superagent");
const Throttle = require('superagent-throttle')


module.exports = params => {
  const api_key = ["X-Api-Key", "API_KEY", "api_key", "apiKey"].reduce(
    (prev, key_opt) => (prev === undefined ? params[key_opt] : prev),
    undefined
  );

  if (api_key === undefined) {
    throw new Error("Missing required parameter for initialization: api_key.");
  }

  //This is necessary due to everhour API rate limit: https://everhour.docs.apiary.io/#introduction/rate-limiting
  let throttle = new Throttle({
    active: true, // set false to pause queue
    rate: 15, // how many requests can be sent every `ratePer`
    ratePer: 10000, // number of ms in which `rate` requests may be sent
    concurrent: 1 // how many requests can be sent concurrently
  })

  const process_url = url => `https://api.everhour.com/${url}`;

  return {
    get: url => request.get(process_url(url)).set("X-Api-Key", api_key).use(throttle.plugin()),
    post: url => request.post(process_url(url)).set("X-Api-Key", api_key).use(throttle.plugin()),
    put: url => request.put(process_url(url)).set("X-Api-Key", api_key).use(throttle.plugin()),
    delete: url => request.delete(process_url(url)).set("X-Api-Key", api_key).use(throttle.plugin())
  };
};