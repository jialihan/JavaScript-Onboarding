class Directory {
  constructor(name, children) {
    this.name = name;
    this.children = children;
  }
  // name;
  // children; // Array<File|Directory>
}
class File {
  // name;
  constructor(name) {
    this.name = name;
  }
}

const f1 = new File("Coffee");
const f2 = new File("Black Tea");
const f3 = new File("Green Tea");
const f4 = new File("Milk");
const obj1 = new Directory("Tea", [f2, f3]);
const data = [f1, obj1, f4];

/**
 * render each directory item recursively
 * @param {Directory} node
 */
function helper(node) {
  const cur = document.createElement("li");
  cur.textContent = node.name;

  // only render Directory instance
  if (node.children?.length > 0) {
    const subDirEL = document.createElement("ul");
    for (const obj of node.children) {
      //   if (obj instanceof File) {
      //     const fileEL = document.createElement("li");
      //     fileEL.textContent = obj.name;
      //     subDirEL.appendChild(fileEL);
      //   } else if (obj instanceof Directory) {
      //     const subEL = helper(obj);
      //     subDirEL.appendChild(subEL);
      //   }
      const subEL = helper(obj); // recursion
      subDirEL.appendChild(subEL);
    } // end for
    cur.appendChild(subDirEL);
  } // end if
  return cur;
}

function buildMenu(data) {
  const list = document.getElementById("menu");
  for (const dir of data) {
    const el = helper(dir);
    list.appendChild(el);
  }
}

buildMenu(data);
