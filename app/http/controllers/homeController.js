const Menu = require("../../models/menu");
function homeController() {
  return {
    index: async (req, res) => {
      const juices = await Menu.find();
     // console.log(juices);
      //req.flash("info ", "hello world");
      return res.render("home", {
        juices: juices,
      });
    },
  };
}
module.exports = homeController;
