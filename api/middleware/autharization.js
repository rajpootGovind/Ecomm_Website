const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  // const token = req.headers["x-access-token"];
  // const token = req.cookies.access_token;
  const tokenHeader = req.headers["authorization"];
  const token = tokenHeader && tokenHeader.split(" ")[1];

  if (!token) {
    console.log("Can't finf token");
    res.status(200).send({
      message: "token not found",
    });
  }

  jwt.verify(token, "iam Govind", (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized! Error in token verification",
      });
    }
    req.authenticatedUserEmail = decoded.email;
    req.authenticatedUserId = decoded.id;
    next();
  });
};
