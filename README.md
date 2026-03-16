# select-tree
日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A custom HTML element for creating a multi-level dropdown tree from CSV data.

## Features
- Dynamically creates a multi-level dropdown tree from CSV data
- Supports optional parameters such as showing labels and required fields
- Allows setting and retrieving the selected value programmatically

## Usage
To use the `select-tree` element, follow these steps:

1. Include the `select-tree.js` file in your HTML:

   ```html
   <script type="module" src="./select-tree.js"></script>
   ```

2. Add the `select-tree` element to your HTML, specifying the CSV data source:

   ```html
   <select-tree id="sel" src="./sample.csv"></select-tree>
   ```

3. Optionally, you can set additional attributes on the `select-tree` element, such as `required="required"` to make the field required.

4. Interact with the `select-tree` element using JavaScript:

   ```javascript
   const selectTree = document.getElementById('sel');

   // Get the selected value
   console.log(selectTree.value);

   // Set the selected value
   selectTree.value = 'A2';

   // Listen for changes
   selectTree.onchange = () => {
     console.log('Value changed:', selectTree.value);
   };
   ```

## Data / API
The `select-tree` element uses CSV data to populate the multi-level dropdown. The CSV data should have the following structure:

- The first row is the header, which defines the column names.
- Each subsequent row represents a single option in the dropdown tree.
- The columns represent the hierarchy, with the first column being the top-level, and the last column being the leaf-level option label.

An example CSV file (`sample.csv`) is provided in the repository.

## License
This project is licensed under the [MIT License](LICENSE).
