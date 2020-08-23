/**
 * 
* 第一个题目
* getNodeByClass(root, class a){ //className
* // return all nodes that have class a (string)
* }
* @param {*} className 
*/
function getNodesByClass(className) {
	const nodes = [];

	function crawl(node) {
		// if (node.classList && node.classList.value.indexOf(className) > -1) {
		if (node.classList && node.classList.value.includes(className)) {
			console.log(node.classList);
			nodes.push(node);
		}
		node.childNodes.forEach((child) => crawl(child));
	}
	crawl(document.body);

	return nodes;
}

// optimize: memo
function memo(fn) {
	let map = new Map();
	return function(...args) {
		const key = args[0];
		if (map.has(key)) {
			console.log('cache hit');
			return map.get(key);
		}
		// not hit
		const val = fn.apply(this, arguments);
		map.set(key, val);
		return val;
	};
}
getNodesByClass = memo(getNodesByClass);
const res = getNodesByClass('box1');
getNodesByClass('box1'); // cache hit
console.log('res:', res);

// 第二个题目
// getNodeByClassPath(root, classpath a){ //classNameHierarchy
// // return all nodes that match classpath  a (string), only return the lowest child
// // a>b>c， return all nodes that have class c (string) and match this query
// // 类似这样子，返回所有符合条件的node，数据结构参考native JS, node的方法和接口也是
// }
let result;

function getNodeByClassPath(root, classpath) {
	//classNameHierarchy
	const names = classpath.split('>');
	const level = names.length;
	let parent = root;
	function find(node, name) {
		for (var child of node.childNodes) {
			if (child.classList && child.classList.value.includes(name)) {
				result = child;
				return;
			} else {
				find(child, name);
			}
		}
	}

	for (let i = 0; i < level; i++) {
		find(parent, names[i]);

		if (!result) {
			// not found!
			console.log('not found!');
			return null;
		}
		console.log('result: ', result);
		parent = result;
	}

	console.log('found!');
	return result;
}

// getNodeByClassPath(document.body, 'box1>box1-1');
