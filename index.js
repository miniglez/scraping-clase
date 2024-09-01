const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const PORT = 3000;

const url = "https://miniglez.github.io/ProjectBreak1/"

app.get("/", (req, res) => {
    axios.get(url).then((response)=> {
        if(response.status === 200){
            const html = response.data
            const $ = cheerio.load(html)

            const pageTitle =$('title').text()

            const links = []
            const imgs = []

            $("a").each((index, element) => {
                const link = $(element).attr("href")
                links.push(link)
            })

            $("img").each((index, element) => {
                const img = $(element).attr("src")
                imgs.push(img)
            })

            console.log(links)
            res.send(`
                <h1>${pageTitle}</h1>
                <h2>Enlaces</h2>
                <ul>
                ${links.map(link => `<li><a href="${url+link}">${url+link}</a></li>`).join("")}
                </ul>
                <h2>Imagenes</h2>
                <ul>
                ${imgs.map(img => `<li><img src="${url+img}"</li>`).join("")}
                </ul>
            `)
        }
    })
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`)
})