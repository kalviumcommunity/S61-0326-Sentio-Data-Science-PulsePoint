# Employee Survey Analysis

This project is organized as a clean, collaboration-ready data science workspace. The goal of this milestone is to show a clear separation between data, notebooks, reusable code, and generated outputs.

## Project Structure

```text
employee-survey-analysis/
|-- data/
|   |-- raw/
|   |-- interim/
|   `-- processed/
|-- notebooks/
|   |-- analysis.ipynb
|   `-- README.md
|-- scripts/
|-- outputs/
|   |-- figures/
|   `-- reports/
|-- references/
|   `-- README.md
|-- backend/
|-- frontend/
`-- docker-compose.yml
```

## Folder Purpose

- `data/raw/`: Original source files. These should never be edited directly.
- `data/interim/`: Temporary or partially cleaned files created during preparation.
- `data/processed/`: Final cleaned datasets ready for analysis or modeling.
- `notebooks/`: Jupyter notebooks for exploration, analysis, and experimentation.
- `scripts/`: Reusable Python scripts for data cleaning, feature engineering, or automation.
- `outputs/figures/`: Charts, plots, and exported visuals generated from notebooks or scripts.
- `outputs/reports/`: Final summaries, presentations, or exported result files.
- `references/`: Notes, milestone instructions, and supporting material.
- `frontend/`: Existing app work kept separate from the core data science workflow.
- `backend/`: FastAPI service for authentication and PostgreSQL-backed data access.

## Organization Principles

- Keep raw data separate from transformed data.
- Store notebooks away from reusable scripts.
- Save generated visuals and reports in `outputs/`, not inside `data/`.
- Use relative paths so notebooks remain portable across machines.
- Keep folder names lowercase and purpose-driven.

## Recommended Workflow

1. Add source files to `data/raw/`.
2. Clean or transform them into `data/interim/` and `data/processed/`.
3. Explore and analyze data in `notebooks/`.
4. Move reusable logic into `scripts/`, such as `scripts/first_data_analysis.py`.
5. Save charts and final deliverables to `outputs/`.
6. Run the frontend and backend separately so the app layer stays modular.

## Video Walkthrough Notes

Use this sequence for the 2-minute screen recording:

1. Open the root `employee-survey-analysis` folder.
2. Show `data/` and explain the difference between `raw`, `interim`, and `processed`.
3. Open `notebooks/` and mention that exploration stays separate from reusable scripts.
4. Open `scripts/` and explain that production-friendly code belongs there.
5. Open `outputs/` and show that figures and reports are stored away from source data.
6. Mention that the structure makes the project easier to debug, review, and collaborate on.

## Notes

- No dataset or completed analysis is required for this milestone.
- The current structure is intentionally simple so it can grow with the project.
- The app layer now includes a React frontend and a FastAPI backend backed by PostgreSQL.
- The scripts folder now includes a first standalone Python analysis script for command-line execution.
