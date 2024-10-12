import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./faq.css";

const Faq1 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is your turnaround time?",
      answer:
        "We offer the fastest turnaround times in the industry. The standard turnaround time for most products is 15 business days. Select products offer a 10 business day rush turnaround option, which adds 50% to the unit price. Your turnaround time starts the first business day after your digital proof/sample photo approval is received.",
    },
    {
      question: "How is the price of my label determined?",
      answer:
        "In general, your price is determined by the size and quantity of your selected product. We can provide a custom price quote based on your exact artwork and specifications for bulk quantity orders of 10,000pcs or more. Contact our sales team for a custom quote and we will reply with pricing and an estimated delivery date within 1 business day.",
    },
    {
      question: "Are there any setup costs or other hidden fees for my order?",
      answer:
        "No! Your order includes free graphic artwork and unlimited revisions. You will receive a free digital proof for approval within 1 business day of placing your order. The pricing on our website is complete, only add shipping. Sales tax only applies to orders shipped within NY.",
    },
    {
      question:
        "Will I be able to see what my label will look like before proceeding with my full order?",
      answer:
        "Yes! All custom orders receive a free digital proof for approval within 1 business day. You will be able to review your exact label specifications and make any changes if necessary before we manufacture the full order.",
    },
    {
      question: "What is the minimum quantity I can order?",
      answer:
        "We offer the industry’s lowest minimum order quantity of just 5 pieces for most products. Select products such as leather patches and pvc patches have a higher minimum quantity due to the setup costs associated with those products.",
    },
  ];

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
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div
                  className="faq-question"
                  onClick={() => toggleAnswer(index)}
                >
                  {faq.question}
                  <span className="faq-toggle-icon">
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
                {openIndex === index && (
                  <div className="faq-answer">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq1;
