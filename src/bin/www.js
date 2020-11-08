#!/snap/bin/node

const app = require("../apps/app");
const config = require("config");

// Lấy port từ trong config
const port = config.get("app.port");

// Lắng nghe các yêu cầu trên port

const server = app.listen(port, function () {
  console.info(`Server listening on port ${port}`);
});

require("../apps/chat")(server);
