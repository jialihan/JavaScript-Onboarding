const express = require('express');
const app = express();
const port = 8080;

// react server render
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const MainComponent = require('./components/main');
const PlayComponent = require('./components/play');

app.get("/", async function (req, res) {
    res.send("Hello world!");
});

app.get("/main", async function (req, res) {
    const props = await MainComponent.getProps();
    const html = ReactDOMServer.renderToString(React.createElement(MainComponent, props));
    res.send(html);
});

app.get("/components/play.js", async function (req, res) {
    res.sendFile(__dirname + "/components/bundle.js");
});

app.get("/play", async function (req, res) {
    const props = await PlayComponent.getProps();
    const html = '<div id="root">' + ReactDOMServer.renderToString(React.createElement(PlayComponent, props)) + '</div>';
    // res.send(html);
    res.write(html);
    res.write(`<script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js"></script>`);
    res.write(`<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js"></script>`);
    res.write(`<script src="/components/play.js"></script>`);
    // hydrate
    res.write(`<script>
        const props = ${JSON.stringify(props)};
        ReactDOM.hydrate(React.createElement(${PlayComponent}, props), 
            document.getElementById('root')
        );
    </script>`);
    res.end();

});

app.listen(port, function () {
    console.log("server running on 8080...");
});

