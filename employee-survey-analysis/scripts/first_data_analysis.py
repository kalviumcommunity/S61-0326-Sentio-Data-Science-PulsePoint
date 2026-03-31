
# This script performs a basic analysis of employee survey responses.
# It demonstrates clear variable naming and meaningful comments per PEP 8.

from statistics import mean


survey_responses = [
    {"employee": "Asha", "department": "HR", "engagement_score": 8, "workload_score": 5},
    {"employee": "Ravi", "department": "Sales", "engagement_score": 6, "workload_score": 8},
    {"employee": "Meera", "department": "Engineering", "engagement_score": 9, "workload_score": 6},
    {"employee": "Karan", "department": "Support", "engagement_score": 5, "workload_score": 9},
]



def calculate_average_engagement(responses):
    """
    Calculate the average engagement score from survey responses.
    """
    return mean(response["engagement_score"] for response in responses)



def calculate_average_workload(responses):
    """
    Calculate the average workload score from survey responses.
    """
    return mean(response["workload_score"] for response in responses)



def find_at_risk_employees(responses):
    """
    Identify employees who may need attention based on low engagement or high workload.
    """
    return [
        response
        for response in responses
        if response["engagement_score"] <= 6 or response["workload_score"] >= 8
    ]



def print_department_breakdown(responses):
    """
    Print a breakdown of engagement and workload scores by department.
    """
    print("Department breakdown:")
    for response in responses:
        print(
            f"- {response['employee']} ({response['department']}): "
            f"engagement={response['engagement_score']}, workload={response['workload_score']}"
        )



def main():
    # Calculate summary statistics for the survey
    average_engagement_score = calculate_average_engagement(survey_responses)
    average_workload_score = calculate_average_workload(survey_responses)
    employees_needing_attention = find_at_risk_employees(survey_responses)

    print("PulsePoint: First Python Script for Data Analysis")
    print("=" * 48)
    print(f"Total responses analysed: {len(survey_responses)}")
    print(f"Average engagement score: {average_engagement_score:.2f}")
    print(f"Average workload score: {average_workload_score:.2f}")
    print(f"Employees needing attention: {len(employees_needing_attention)}")
    print()

    print_department_breakdown(survey_responses)
    print()

    print("Employees needing attention:")
    for employee in employees_needing_attention:
        print(
            f"- {employee['employee']} from {employee['department']} "
            f"(engagement={employee['engagement_score']}, workload={employee['workload_score']})"
        )


if __name__ == "__main__":
    main()

    # 1. Basic if statement
    print("\n--- Basic if statement example ---")
    score = 7
    if score > 5:
        print("Score is above 5!")
    # Observe what happens if the condition is false
    score = 3
    if score > 5:
        print("This will not print.")

    # 2. if-else for decision branching
    print("\n--- if-else example ---")
    engagement = 6
    if engagement >= 7:
        print("High engagement")
    else:
        print("Engagement could be improved")

    # 3. Multiple conditions with elif
    print("\n--- if-elif-else example ---")
    workload = 8
    if workload < 5:
        print("Low workload")
    elif workload < 8:
        print("Moderate workload")
    else:
        print("High workload")

    # 4. Logical operators
    print("\n--- Logical operators example ---")
    engagement = 8
    workload = 6
    if engagement > 7 and workload < 7:
        print("Employee is highly engaged and not overloaded.")
    if engagement < 6 or workload > 8:
        print("Employee may need support.")
    if not (workload > 8):
        print("Workload is not excessive.")

if __name__ == "__main__":
    main()
