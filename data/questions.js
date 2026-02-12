import csv from "jquery-csv";

/**
 * Loads questions from CSV and converts them
 * to the same structure your app already uses.
 */
export const loadQuestionsFromCSV = async (csvContent) => {
  let csvText = csvContent;
  
  if (!csvText) {
    try {
      const response = await fetch("./questions.csv");
      if (!response.ok) {
        throw new Error("Failed to fetch default questions.csv");
      }
      csvText = await response.text();
    } catch (error) {
      console.warn("Could not load default questions:", error);
      // If we can't load the default, we return empty so the UI can prompt for a file
      return [];
    }
  }

  const rows = csv.toObjects ? csv.toObjects(csvText) : (csv.csvToObjects ? csv.csvToObjects(csvText) : []);

  return rows.map((row) => {
    const options = [];

    if (row.Question_Type === 'toggle') {
      if (row.Option_A) options.push({ id: String(row.Option_A).toLowerCase(), text: row.Option_A });
      if (row.Option_B) options.push({ id: String(row.Option_B).toLowerCase(), text: row.Option_B });
    } else {
      if (row.Option_A) options.push({ id: "a", text: row.Option_A });
      if (row.Option_B) options.push({ id: "b", text: row.Option_B });
      if (row.Option_C) options.push({ id: "c", text: row.Option_C });
      if (row.Option_D) options.push({ id: "d", text: row.Option_D });
      if (row.Option_E) options.push({ id: "e", text: row.Option_E });
    }

    let correctAnswer = row.Correct_Answer_1;

    // Checkbox → array of answers
    if (row.Question_Type === "checkbox") {
      correctAnswer = [row.Correct_Answer_1, row.Correct_Answer_2].filter(Boolean)
        .map((a) => a.toLowerCase());
    } else if (row.Question_Type === 'radio' || row.Question_Type === 'toggle') {
      // Normalize single-choice identifiers (CSV uses uppercase letters/words)
      correctAnswer = row.Correct_Answer_1 ? row.Correct_Answer_1.toString().toLowerCase() : row.Correct_Answer_1;
    } else if (row.Question_Type === 'color') {
      correctAnswer = row.Correct_Answer_1 ? row.Correct_Answer_1.toString().toLowerCase() : row.Correct_Answer_1;
    }

    return {
      id: Number(row.Q_No),
      type: row.Question_Type,
      text: row.Question_Text,
      options,
      correctAnswer,
      
      placeholder: row.Placeholder || row['Placeholder / Description'] || "",
      description: row.Description || row['Placeholder / Description'] || ""
    };
  });
};
