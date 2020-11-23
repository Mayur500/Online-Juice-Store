const Menu = require("../../models/menu");
function homeController() {
  return {
    index: async (req, res) => {
      const juices = await Menu.find();
      req.flash("info ", "hello world");
      return res.render("home", {
        juices: juices,
      });
    },
  };
}
module.exports = homeController;
