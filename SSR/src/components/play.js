// const React = typeof module !== 'undefined' ? require('react') : window.React;
const React = require('react');

const Play = ({ value }) => {
    // createElement(type, props, ...children)
    const [count, setCount] = React.useState(value);
    return React.createElement(
        'p',
        null,
        React.createElement(
            'button',
            {
                onClick: () => {
                    setCount(count + 1);
                }
            },
            `count:${count}`
        )
    );
}
Play.getProps = async () => {
    // mock data api fetch
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve({ value: 1 });
        }, 2000);
    });
}
// if (typeof module !== 'undefined') {
module.exports = Play;
// }