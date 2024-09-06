# Data-Table-
This React DataTable component allows users to add, edit, delete, and search through a list of data entries. The table is built with a flexible structure that can be easily customized and extended. Here are the main features:

Features:
Add Data: Users can input a name, age, and gender through the form fields, which then get added to the table as a new entry.
Edit Data: Each table cell is editable. By clicking the "Edit" button, users can make inline edits to the name, age, or gender directly in the table. Changes are saved once the cell loses focus.
Delete Data: Users can remove an entry from the table by clicking the "Delete" button.
Search: The search functionality allows users to filter the table entries by name, making it easier to find specific records.
Auto Focus for Editing: When an item is being edited, the respective cell gains focus for a better user experience.
Outside Click Handling: The component detects clicks outside the table to exit the editing mode.
State Management:
formData: Stores the current values for the name, age, and gender input fields.
data: Holds the list of entries displayed in the table.
editId: Tracks which row is currently being edited.
searchTerm: Controls the search input for filtering the table by name.
