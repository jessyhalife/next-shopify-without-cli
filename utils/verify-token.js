const crypto = require("crypto")
export  function verifyToken(data) {
    const {hmac} = data
    delete data.hmac

    const message = Object.keys(data).map(x => `${x}=${data[x]}`).join('&')
    const genHmac = crypto.createHmac('sha256', process.env.SHOPIFY_API_SECRET).update(message).digest('hex')
    return genHmac === hmac

}