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

- Perception data: how employees feel (survey scores and comments)
- Outcome data: what happened (who left and when)
- Context data: possible drivers (workload, org changes, team structure)

Possible sources include the company HRIS, engagement survey platform, and anonymized feedback tools.

### Decision-useful insight

A useful insight would not be "average sentiment is 3.7." A better insight would be:

"Teams with repeated comments about workload unfairness and low manager-support scores show the highest 6-month resignation risk, especially among employees with 1-2 years tenure."

That kind of insight helps leaders decide concrete actions, such as:

- Prioritize manager coaching in specific departments
- Rebalance workload in teams with risk signals
- Launch retention check-ins for employees in the 1-2 year tenure band

## 3. Closing Note

The Question -> Data -> Insight lifecycle is a thinking framework, not just a project template. It keeps data science tied to decisions: ask a focused question, treat data as evidence, and produce insights that can change what a team does next.

---

# 📄 **README: Python & Anaconda Setup for Data Science**

---

## 🔧 Local Environment Setup for Data Science

This section documents the setup of Python and Anaconda on my local machine. The goal of this setup is to create a stable and reliable environment for performing data science tasks such as data analysis, machine learning, and application development.

---

## 🖥️ Operating System

* **OS:** Windows 11

---

## 🐍 Python Installation & Verification

### 🔹 Python Version

```
bash
python --version
```

### ✅ Output:

```
Python 3.x.x
```

### 🔹 Verification Steps

1. Opened terminal (Git Bash / Command Prompt)
2. Ran:

   ```
   bash
   python
   ```
3. Tested execution:

   ```
   python
   print("Hello")
   ```
4. Output confirmed:

   ```
   Hello
   ```
5. Exited using:

   ```
   bash
   exit()
   ```

### ✔️ Conclusion

Python is successfully installed and functioning correctly.

---

## 🧪 Anaconda Installation & Setup

### 🔹 Installation Steps

1. Downloaded Anaconda from the official website
2. Selected Python 3 version
3. Installed using default settings:

   * Kept installation path as default
   * Did not add Anaconda to PATH (recommended)
   * Registered Anaconda as default Python
4. Completed installation successfully

---

## 🔹 Conda Verification

Opened **Anaconda Prompt** and ran:

```
bash
conda --version
```

### ✅ Output:

```
conda x.x.x
```

---

## 🔹 Environment Activation

Anaconda Prompt automatically activates the base environment:

```
bash
(base) C:\Users\ishan>
```

This confirms that the Conda environment is active and ready.

---

## 🔹 Environment Validation

### Step 1: Launch Python

```
bash
python
```

### Step 2: Test Execution

```
python
print("Setup Successful")
```

### ✅ Output:

```
Setup Successful
```

### Step 3: Exit

```
bash
exit()
```

---


## ⚠️ Notes & Observations

* Conda commands do not work in Git Bash by default
* Anaconda Prompt should be used for all Conda-related operations
* The `(base)` environment indicates successful activation
* No additional libraries were installed at this stage to keep the environment clean

---

## 🎯 Conclusion

The local development environment is successfully set up with Python and Anaconda. The system is now ready for performing data science tasks such as data analysis, machine learning, and application development throughout the sprint.

---
