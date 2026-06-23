import CompanyFilter from "./CompanyFilter";

function CompanyList() {
  const companies = [
    { id: 1, name: "TCS", package: "7 LPA", cgpa: 6.5 },
    { id: 2, name: "Infosys", package: "8 LPA", cgpa: 7.0 },
    { id: 3, name: "Wipro", package: "6 LPA", cgpa: 6.0 }
  ];

  return (
    <div className="page">
      <h2>Available Companies</h2>

      <CompanyFilter />

      {companies.map((company) => (
        <div className="card" key={company.id}>
          <h3>{company.name}</h3>

          <p><strong>Package:</strong> {company.package}</p>

          <p><strong>Minimum CGPA:</strong> {company.cgpa}</p>

          <button>Apply Now</button>
        </div>
      ))}
    </div>
  );
}

export default CompanyList;