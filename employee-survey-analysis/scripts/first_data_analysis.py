"""A first standalone Python script for simple employee pulse analysis."""

from statistics import mean


SURVEY_RESPONSES = [
    {"employee": "Asha", "department": "HR", "engagement_score": 8, "workload_score": 5},
    {"employee": "Ravi", "department": "Sales", "engagement_score": 6, "workload_score": 8},
    {"employee": "Meera", "department": "Engineering", "engagement_score": 9, "workload_score": 6},
    {"employee": "Karan", "department": "Support", "engagement_score": 5, "workload_score": 9},
]


def average_engagement(responses):
    return mean(item["engagement_score"] for item in responses)


def average_workload(responses):
    return mean(item["workload_score"] for item in responses)


def find_at_risk_employees(responses):
    return [
        item
        for item in responses
        if item["engagement_score"] <= 6 or item["workload_score"] >= 8
    ]


def print_department_breakdown(responses):
    print("Department breakdown:")
    for item in responses:
        print(
            f"- {item['employee']} ({item['department']}): "
            f"engagement={item['engagement_score']}, workload={item['workload_score']}"
        )


def main():
    avg_engagement = average_engagement(SURVEY_RESPONSES)
    avg_workload = average_workload(SURVEY_RESPONSES)
    at_risk_employees = find_at_risk_employees(SURVEY_RESPONSES)

    print("PulsePoint: First Python Script for Data Analysis")
    print("=" * 48)
    print(f"Total responses analysed: {len(SURVEY_RESPONSES)}")
    print(f"Average engagement score: {avg_engagement:.2f}")
    print(f"Average workload score: {avg_workload:.2f}")
    print(f"Employees needing attention: {len(at_risk_employees)}")
    print()

    print_department_breakdown(SURVEY_RESPONSES)
    print()

    print("Employees needing attention:")
    for item in at_risk_employees:
        print(
            f"- {item['employee']} from {item['department']} "
            f"(engagement={item['engagement_score']}, workload={item['workload_score']})"
        )


if __name__ == "__main__":
    main()
