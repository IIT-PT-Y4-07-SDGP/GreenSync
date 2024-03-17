const AuthService = require("../Services/authService");

class AuthController {
  static async login(req, res) {
    try {
      const { userIdentity, password } = req.body;
      const cookies = req.cookies;
      const response = await AuthService.login(userIdentity, password, cookies, res);
      res.cookie("jwt", response.account.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  static async logout(req, res) {
    try {
      const cookies = req.cookies;
      await AuthService.logout(cookies);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async handleRefreshToken(req, res) {
    try {
      await AuthService.handleRefreshToken(req, res);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;