const data = require('../data/json.json');

class AppService {
  
  getCategories() {
    return Object.keys(data);
  }

  getSubCategories(category) {
    return Object.keys(data[category]);
  }

  getUrls(category, subCategory, start) {
    return data[category][subCategory].slice(start, start + 10);
  }
}

export default AppService;

