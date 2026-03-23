# README: Question -> Data -> Insight in Data Science

## 1. Explaining the Lifecycle

In practice, data science is not a straight line from dataset to dashboard. It is a reasoning cycle:

1. Start with a question worth answering.
2. Gather and understand data that can act as evidence.
3. Explore that evidence until you can produce an insight that supports a decision.

Each step shapes the next one. If the question is vague, data collection becomes random. If data is poorly understood, insights are fragile. If insights are not tied back to the question, analysis becomes interesting but not useful.

### Start with a clear question

A clear question defines the decision context. It tells us:

- Who needs the answer
- What action might change based on the answer
- What success looks like

For example, "How can we improve employee experience in the next quarter?" is clearer than "Analyze employee sentiment." The first version points to a timeline, an audience, and possible interventions. The second only asks for description.

This is critical because the question sets boundaries. It prevents us from collecting irrelevant data and over-analyzing metrics that do not affect real decisions.

### Data is evidence, not just a file

After defining the question, data becomes the evidence we use to test explanations. But before any modeling or charting, we need to understand what the data actually means.

Understanding data includes:

- Source: where it came from and how it was collected
- Structure: what each field represents and at what level (employee-level, department-level, monthly summary, etc.)
- Quality: missing values, duplicates, inconsistent labels, sampling bias, timing issues
- Relevance: whether this data can truly answer the question

This step matters because analysis quality is limited by evidence quality. Clean plots cannot fix misaligned or biased data.

### Insights emerge from exploration

Insights are not automatic outputs from tools. They emerge when patterns are interpreted in context.

An exploration might show that negative sentiment spikes in two departments. That is a finding. It becomes an insight only when we connect it to operational reality, such as workload peaks, manager turnover, or policy changes during the same period.

Useful insights have three properties:

- They answer the original question
- They explain "why this matters"
- They suggest a decision or next action

So the lifecycle is connected: question focuses the evidence, evidence supports exploration, and exploration produces actionable insight.

## 2. Applying the Lifecycle to a Project Context

### Project Context: Employee Pulse and Retention Risk

### Question

"Which workplace factors are most strongly linked to early signs of resignation risk, and where should HR intervene first?"

This question is decision-oriented because HR cannot fix everything at once. They need to prioritize departments and issues with the highest impact.

### Data needed

To answer it, we would combine several internal data sources:

- Monthly pulse survey responses (ratings + text comments)
- Attrition records (voluntary exits, exit dates, department)
- HR operational data (tenure, role level, manager changes, overtime hours)

What this data represents:

# **Python, Conda, and Jupyter Environment Verification**

---

## Local Data Science Environment Verification

This section documents the verification of Python, Conda, and Jupyter Notebook/Lab setup on my local machine, as required for the Data Science sprint hygiene milestone. This ensures a reliable, reproducible environment for all project work.

---

### **Operating System**

- **OS:** Windows 11

---

## 1. Python Verification

- **Command:**
  ```
  python --version
  ```
- **Output:**
  ```
  Python 3.x.x
  ```
- **REPL Test:**
  1.  Launched Python in terminal:
      ```
      python
      ```
  2.  Ran:
      ```
      print("Hello, Python!")
      ```
  3.  Output:
      ```
      Hello, Python!
      ```
  4.  Exited with:
      ```
      exit()
      ```

**Conclusion:** Python is installed and working correctly.

---

## 2. Conda Environment Verification

- **Command:**
  ```
  conda --version
  ```
- **Output:**
  ```
  conda x.x.x
  ```
- **List Environments:**
  ```
  conda env list
  ```
- **Activate Environment:**
  ```
  conda activate base
  ```
- **Prompt shows active environment:**
  ```
  (base) C:\Users\lokes>
  ```

**Conclusion:** Conda is installed, environments are listed, and activation works as expected.

---

## 3. Jupyter Notebook/Lab Verification

- **Command:**
  ```
  jupyter notebook
  ```
  or
  ```
  jupyter lab
  ```
- **Behavior:**
  - Jupyter launches in browser without errors
  - Created a new notebook
  - Ran a Python cell:
    ```python
    print("Jupyter is working!")
    ```
  - Output:
    ```
    Jupyter is working!
    ```

**Conclusion:** Jupyter Notebook/Lab is functional and can execute Python code in the selected environment.

---

## 4. Verification Summary Table

| Component | Command              | Output/Result                |
| --------- | -------------------- | ---------------------------- |
| Python    | python --version     | Python 3.x.x                 |
| Conda     | conda --version      | conda x.x.x                  |
| Conda Env | conda activate base  | (base) prompt shown          |
| Jupyter   | jupyter notebook/lab | Notebook launches, runs code |

---

## 5. Notes & Best Practices

- Use **Anaconda Prompt** for all Conda and Jupyter operations (not Git Bash)
- The `(base)` prefix in the prompt confirms the active environment
- No extra libraries installed at this stage (clean baseline)
- All commands run without errors

---

## 6. Video Walkthrough

- A short screen-capture video demonstrates:
  - Python version check
  - Conda version and environment activation
  - Jupyter Notebook/Lab launching and running a cell
  - Walkthrough of this README verification section

---

## 7. Conclusion

The local machine is fully verified for Data Science work. Python, Conda, and Jupyter are all functional and ready for use throughout the sprint. This baseline ensures a smooth workflow and early detection of environment issues.

---

### Step 3: Exit

```
bash
exit()
```

---

## Notes & Observations

- Conda commands do not work in Git Bash by default
- Anaconda Prompt should be used for all Conda-related operations
- The `(base)` environment indicates successful activation
- No additional libraries were installed at this stage to keep the environment clean

---

## Conclusion

The local development environment is successfully set up with Python and Anaconda. The system is now ready for performing data science tasks such as data analysis, machine learning, and application development throughout the sprint.

---
