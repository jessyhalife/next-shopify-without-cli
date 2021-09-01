const {verifyToken} = require("../../../utils/verify-token")

export default async function handler(req, res) {
    if (!req.query.hmac) return res.status(400).send("Missing hmac")
        console.log(verifyToken)
    if (!verifyToken(req.query)) return res.status(401).send("Cannot verify request")
        console.log({
            client_id: process.env.SHOPIFY_API_KEY,
            client_secret: process.env.SHOPIFY_API_SECRET,
            code: req.query.code
        })
        const response = await fetch(`https://${req.query.shop}/admin/oauth/access_token`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                client_id: process.env.SHOPIFY_API_KEY,
                client_secret: process.env.SHOPIFY_API_SECRET,
                code: req.query.code
            })
        })

        console.log(`https://${req.query.shop}/admin/oauth/access_token`)
        if (!response.ok) return res.status(response.status).json({error: response.statusText})

        const {access_token} = await response.json()


        res.status(200).json({access_token})     
}

