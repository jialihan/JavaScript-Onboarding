### Problem Statement

Expected output menu:

```
- dir1
  - file1
  - dir2
    - file2
    - file3
  - file4
```

### Solution

**1. Nested List**: Write the correct HTML structure first before coding:

```html
<ul>
  <li>Coffee</li>
  <li>
    Tea
    <ul>
      <li>Black tea</li>
      <li>Green tea</li>
    </ul>
  </li>
  <li>Milk</li>
</ul>
```

**2. Data Model**

```js
class File {}
class Directory {}
```

**3. Recursion Rnder Directory component**

```js
/**
 * render each directory item recursively
 * @param {Directory} node
 */
function helper(node) {
  const cur = document.createElement("li");
  cur.textContent = node.name; // render TextNode

  // only render children under Directory
  if (node.children?.length > 0) {
    const subDirEL = document.createElement("ul");
    for (const obj of node.children) {
      const subEL = helper(obj); // recursion each child
      subDirEL.appendChild(subEL);
    }
    cur.appendChild(subDirEL);
  }
  return cur;
}
```
