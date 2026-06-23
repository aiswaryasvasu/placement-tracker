function CompanyFilter() {
  return (
    <div className="card">
      <h3>Filter Companies</h3>

      <input
        type="number"
        placeholder="Minimum CGPA"
      />

      <br /><br />

      <select>
        <option>CSE</option>
        <option>ECE</option>
        <option>IT</option>
        <option>ME</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Minimum Package"
      />

      <br /><br />

      <button>Apply Filter</button>
    </div>
  );
}

export default CompanyFilter;