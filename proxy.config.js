
const PROXY_CONFIG = [
    {
        "context": [
            "/user"
        ],
        "target": "http://localhost:4000",
        "secure": false
    }
]

module.exports = PROXY_CONFIG;