## Requirement
###  1. Input element:
- support user input element (debounce)
- a clear button to clear input value

### 2. dropdown element:
- show dropdown whenever input is focused
- hide dropdown after submit or outside click (mount / unmount)
    * when **submitted**, unmount
    * **outside click**, input before submit, keep mounted with current data
- updates UI when hide/show dropdown, be consistent UI
- when value is empty, two ways:
    * show local search history in dropdown
    * OR make the initial network call to fetch default suggestion data
- render suggestion data from sever
- infinite scroll for more data in dropdown (Optional)

###  3. submit data:  enter key or search icon

### 4. Accessibility:
- arrow down key to select dropdown from input element at the first time
- arrow down / up key to select with keyboard
- auto complete when keyboard selected