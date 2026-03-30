# Scripts

This folder stores reusable Python scripts once notebook exploration becomes stable enough to run outside Jupyter.

## Milestone Script

- `first_data_analysis.py`: A beginner-friendly standalone script that analyses a small sample of employee pulse survey data.
- `iterative_data_processing.py`: A milestone script that demonstrates `for` loops, `while` loops, `break`, `continue`, and safe loop termination.

## How to Run

From the `employee-survey-analysis` folder:

```bash
python scripts/first_data_analysis.py
python scripts/iterative_data_processing.py
```

## What the Script Demonstrates

- Variables and lists of dictionaries
- Basic calculations with Python
- Printing readable console output
- Top-to-bottom script execution
- The difference between script-based workflows and notebooks
- Iterating with `for` loops and `while` loops
- Controlling loop flow with `break` and `continue`
- Avoiding infinite loops using variable updates and guard conditions

## Suggested Video Walkthrough

1. Open `scripts/first_data_analysis.py` and explain that this is a standalone Python script.
2. Point out the sample employee survey data and simple analysis functions.
3. Run `python scripts/first_data_analysis.py` in the terminal.
4. Explain the printed output: average engagement, average workload, and employees needing attention.
5. End by noting that scripts are useful for repeatable, reusable, and automation-friendly workflows.

For `iterative_data_processing.py`, a short walkthrough can cover:

1. Show the `for` loop section (range and list iteration).
2. Show the `while` loop section (condition-based repetition).
3. Explain `break` and `continue` examples.
4. Point out the infinite-loop warning and safe guard pattern.
5. Run `python scripts/iterative_data_processing.py` and explain each section of output.
