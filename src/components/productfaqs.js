import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./faq.css";

const ProductFaq = ({ Faq }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq">
      <div className="faq-header">
        <div className="faq-columns">
          <div className="faq-heading-col">
            FAQs
            <p className="frequently">
              <span className="span">Frequently</span> Asked Questions
            </p>
            <p className="faq-heading-col1">
              Discover FAQs, Your Key to Clarity
            </p>
          </div>
          <div className="faq-questions-col">
            {Faq.map((faq, index) => (
              <div key={index} className="faq-item">
                <div
                  className="faq-question"
                  onClick={() => toggleAnswer(index)}
                >
                  {faq.title} {/* Use the title from the faq array */}
                  <span className="faq-toggle-icon">
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
                {openIndex === index && (
                  <div className="faq-answer">{faq.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFaq;
