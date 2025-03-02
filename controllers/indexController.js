const { navigationLinks } = require('../utils/constants');


async function getIndex(req, res) {
    res.render("index", { links: navigationLinks });
}

module.exports = { getIndex };