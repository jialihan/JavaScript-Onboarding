## Drag and Drop API

### 0. Preface

drag and drop api: ([mdn doc](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API))

```
element (draggable) --> Drag & Drop --> element (droppable)
```

| Element   | event name | description                                      |
| --------- | ---------- | ------------------------------------------------ |
| draggable | dragstart  | 在元素开始被拖动时候触发                         |
|           | drag       | 在元素被拖动时反复触发                           |
|           | dragend    | 在拖动操作完成时触发                             |
| droppable | dragenter  | 当被拖动元素进入目的地元素所占据的屏幕空间时触发 |
|           | dragover   | 当被拖动元素在目的地元素内时触发                 |
|           | drop       | 当元素或选中的文本在可释放目标上被释放时触发     |
|           | dragleave  | 当被拖动元素没有放下就离开目的地元素时触发       |

### 1. draggable element

#### 1.1 setup elements draggable

- Set the [draggable](<(https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/draggable)>) attribute to "true" on the element that you wish to make draggable.
  ```
  <div draggable="true" class="drag-item"><p>item1 - draggable</p></div>
  ```
- Add a listener for the [dragstart](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event) event.

#### 1.2 define drag's data

应用程序可以在拖拽操作中包含任意数量的数据项。每个数据项都是一个 string 类型，典型的 MIME 类型，如：text/html。
每个 `drag event` 都有一个`dataTransfer` 属性，其中保存着事件的数据。这个属性（[DataTransfer](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer) 对象）也有管理拖拽数据的方法。`setData()` 方法为拖拽数据添加一个项.

```javascript
ev.dataTransfer.setData("text/plain", ev.target.innerText);
ev.dataTransfer.setData("text/html", ev.target.outerHTML);
ev.dataTransfer.setData("text/uri-list", ev.target.ownerDocument.location.href);
```

#### 1.3 set drag default image

拖拽过程中，浏览器会在鼠标旁显示一张默认图片。当然，应用程序也可以通过 setDragImage() 方法自定义一张图片, see more in [set drag image](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#setting_the_drag_feedback_image).

```javascript
// create an customized element
e.dataTransfer.setDragImage(ghostEL, 0, 0);
```

#### 1.4 define drag effect

有 3 个效果可以定义：

- `copy` 表明被拖拽的数据将从它原本的位置拷贝到目标的位置。
- `move` 表明被拖拽的数据将被移动。
- `link` 表明在拖拽源位置和目标位置之间将会创建一些关系表格或是连接。

```

```

### 2. droppable element

#### 2.1 define a droppable zone

当拖拽一个项目到 HTML 元素中时，浏览器默认不会有任何响应。想要让一个元素变成可释放区域，**该元素必须设置 `ondragover` 和 `ondrop` 事件**处理程序属性.

```
target.ondrop = handle_on_drop;
target.ondragover = hanle_drag_over;
```

#### 2.2 Hanle drop effect

一般，程序调用 getData() 方法取出拖拽项目并按一定方式处理。程序意义根据 dropEffect 的值与/或可变更关键字的状态而不同

```javascript
function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}
function drop_handler(ev) {
  ev.preventDefault();
  // Get the id of the target and add the moved element to the target's DOM
  var data = ev.dataTransfer.getData("application/my-app");
  ev.target.appendChild(document.getElementById(data));
}
```

### 2.3 finish the drag (dragend)

拖拽操作结束时，在源元素（开始拖拽时的目标元素）上触发 `dragend`([link](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event)) 事件。不管拖拽是完成还是被取消这个事件都会被触发。dragend 事件处理程序可以检查 dropEffect 属性的值来确认拖拽成功与否。
If the dropEffect property has the value none during a dragend, then the drag was cancelled. Otherwise, the effect specifies which operation was performed. The source can use this information after a move operation to remove the dragged item from the old location.

```javascript
e.target.classList.remove("dragging"); // clean up classes during the drag
// detect whether drop successful
if (e.dataTransfer.dropEffect === "none") {
  console.log("drop canceled");
} else {
  console.log("drop success");
}
```

### Additional

#### 3.1 define background text

[doc link](https://www.geeksforgeeks.org/how-to-use-text-as-background-using-css/): use `absolute` position and center aligned.

#### helpful links

- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API
- https://juejin.cn/post/6844903513491767303
