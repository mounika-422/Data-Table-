import { useEffect, useState, useRef } from "react";

const DataTable = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
  });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(false);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const outsideClick = useRef(false);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const filteredData = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);
  const handleAddClick = () => {
    if (formData.name && formData.age && formData.gender) {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
      };
      setData([...data, newItem]);
      setFormData({ name: "", age: "", gender: "" });
    }
  };
  const handleDelete = (id) => {
    const updatedList = data.filter((item) => item.id !== id);
    setData(updatedList);
  };
  const handleEdit = (id, updatedData) => {
    if (!editId || editId !== id) return;
    const updatedList = data.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );
    setData(updatedList);
  };
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        outsideClick.current &&
        !outsideClick.current.contains(event.target)
      ) {
        setEditId(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);
  useEffect(() => {
    if (!editId) return;
    let selectedItem = document.querySelector(`[data-id="${editId}"`);
    if (selectedItem) {
      selectedItem.focus();
    }
  }, [editId]);
  return (
    <div className="container">
      <div className="add-container">
        <div className="info-container">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="age"
            placeholder="age"
            value={formData.age}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
        </div>
        <button className="add" onClick={handleAddClick}>
          ADD
        </button>
      </div>
      <div className="search-table-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchTerm}
          className="search-input"
        />
        <table ref={outsideClick}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((element, i) => (
              <tr key={element.id}>
                <td
                  data-id={element.id}
                  contentEditable={editId === element.id}
                  onBlur={(e) =>
                    handleEdit(element.id, { name: e.target.innerText })
                  }
                >
                  {element.name}
                </td>
                <td
                  data-id={element.id}
                  contentEditable={editId === element.id}
                  onBlur={(e) =>
                    handleEdit(element.id, { gender: e.target.innerText })
                  }
                >
                  {element.gender}
                </td>
                <td
                  data-id={element.id}
                  contentEditable={editId === element.id}
                  onBlur={(e) =>
                    handleEdit(element.id, { age: e.target.innerText })
                  }
                >
                  {element.age}
                </td>
                <td className="actions">
                  <button
                    className="edit"
                    onClick={() => setEditId(element.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(element.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(data.length / itemsPerPage) },
            (_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
