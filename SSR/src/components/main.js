const React = require('react');

const Main = ({ value }) => {
    // createElement(type, props, ...children)
    return React.createElement('p', null, `This is Main page from react, props: ${value}.`);
}
Main.getProps = async () => {
    // mock data api fetch
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve({ value: 1000 });
        }, 2000);
    });
}
module.exports = Main;