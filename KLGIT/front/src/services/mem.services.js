import http from "../http-common";

class MemDataService {
  getAll() {
    return http.get("/mems");
  }

  get(id) {
    return http.get(`/mems/${id}`);
  }

  create(data) {
    return http.post("/mems", data);
  }

}

export default new MemDataService();