const links = [

    {
        href: "/", text: "Home",
    },
    { href: "/manga", text: "Manga", },
    {
        href: "/genres", text: "Genres"
    }
]

async function getIndex(req, res) {
    res.render("index", { links: links });
}

module.exports = { getIndex };