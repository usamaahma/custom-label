import React from "react";
import "./numbers.css";

const Number1 = () => {
  const data = [
    {
      number: "14 Global Offices",
      label: " ",
      image: "../images/office.svg",
    },
    {
      number: "8,000+ Employees",
      label: " ",
      image: "../images/employee.svg",
    },
    {
      number: "228,000+ Customers",
      label: " ",
      image: "../images/customers.svg",
    },
  ];

  return (
    <div>
      <section className="project-history">
        <h2 className="section-title1">Custom Woven Labels By the Numbers</h2>
        <div className="projects2">
          <div className="row-number">
            {data.map((item, index) => (
              <div className="col-md1" key={index}>
                <div className="stat-card">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="number-image"
                  />
                  <div className="water-animation"></div>
                  <h3 className="stat-number">{item.number}</h3>
                  <p className="stat-label">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Number1;
