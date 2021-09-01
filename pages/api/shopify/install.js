
export default function handler(req, res) {
  const {hmac, shop, timestamp} = req.query
  
  res.redirect(`https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SCOPES}&redirect_uri=${process.env.HOST}/api/shopify/auth&state=124124&grant_options[]=value`)
}