import { createLink, registerView } from "./db";
import { logger } from "./logger";
const express = require( "express" );
const app = express();


async function run() {
    const to = "https://www.gymkro.org"
    //const newLink = await createLink(to);

    const foundView = await registerView(3);
}

app.post("/redirects/new", async (req: any, res: any) => {
    let to = req.query.to;
    let id = await createLink(to);

    res.status(200).send({ id });
})

app.listen(8000, () => {
    logger.info("The server is running!")
})