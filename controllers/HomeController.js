class HomeController {
  async index(req, res) {
    res.send('APP EXPRESS! - Vinicius lima');
  }
}

module.exports = new HomeController();
