export default {
  "publicPath": "/static/",
  "proxy": {
    "/api": {
      "target": "http://127.0.0.1:5000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
}
