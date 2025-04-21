import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import "./index.css";

const fieldTypes = [
  { label: "Text", value: "text" },
  { label: "Dropdown", value: "dropdown" },
  { label: "Checkbox", value: "checkbox" },
];

const DynamicFormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [selectedType, setSelectedType] = useState("text");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const addField = () => {
    const newField = {
      id: uuidv4(),
      type: selectedType,
      label: `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Field`,
      value: selectedType === "checkbox" ? false : "",
    };
    setFields([...fields, newField]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleChange = (id, value) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, value } : field)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = fields.reduce((acc, field) => {
      acc[field.label] = field.value;
      return acc;
    }, {});
    console.log("Submitted Form Data:", formData);
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div className={`container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Floating Cartoon Images */}
      <img src="/cloud.jpeg" alt="cloud" className="cartoon cartoon1" />
      <img src="/star.png" alt="star" className="cartoon cartoon2" />

      <Card className="glassy-card p-6">
        <CardContent className="space-y-6">
          <div className="flex gap-4 items-center">
            <select
              className="text-base"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {fieldTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <Button onClick={addField} className="glow-btn">
              Add Field
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <motion.div
                key={field.id}
                className="p-4 rounded-xl bg-white shadow-md flex items-center justify-between gap-4 fancy-field"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label className="flex-1">
                  <span className="block text-sm font-semibold text-gray-700 mb-1">
                    {field.label}
                  </span>
                  {field.type === "text" && (
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                  )}
                  {field.type === "dropdown" && (
                    <select
                      value={field.value}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                    >
                      <option value="">Select an option</option>
                      <option value="Option 1">Option 1</option>
                      <option value="Option 2">Option 2</option>
                    </select>
                  )}
                  {field.type === "checkbox" && (
                    <input
                      type="checkbox"
                      className="w-5 h-5 mt-1"
                      checked={field.value}
                      onChange={(e) => handleChange(field.id, e.target.checked)}
                    />
                  )}
                </label>
                <Button className="remove-btn" onClick={() => removeField(field.id)}>
                  Remove
                </Button>
              </motion.div>
            ))}
            {fields.length > 0 && (
              <Button type="submit" className="w-full submit-btn">
                Submit Form
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicFormBuilder;
