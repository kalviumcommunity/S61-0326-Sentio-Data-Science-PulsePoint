"""Iteration milestone script: for/while loops and loop control in Python.

This script demonstrates:
- for loops over range and collections
- while loops with condition-based repetition
- break and continue for loop flow control
- safe handling to avoid infinite loops
"""


def for_loop_examples():
    """Show how for loops process known sequences."""
    print("\n1) FOR LOOP EXAMPLES")
    print("-" * 40)

    print("Iterating over a range of numbers (1 to 5):")
    for number in range(1, 6):
        print(f"Current number: {number}")

    pulse_scores = [72, 85, 90, 67, 78]
    print("\nIterating over a list of pulse scores:")
    for score in pulse_scores:
        print(f"Pulse score: {score}")

    employees = ["Asha", "Ravi", "Meera", "Karan"]
    print("\nUsing enumerate for meaningful loop variables:")
    for position, employee_name in enumerate(employees, start=1):
        print(f"{position}. {employee_name}")


def while_loop_examples():
    """Show condition-based iteration with while loops."""
    print("\n2) WHILE LOOP EXAMPLES")
    print("-" * 40)

    print("Countdown using while loop:")
    count = 5
    while count > 0:
        print(f"Count: {count}")
        count -= 1
    print("Loop ended because condition became False.")

    print("\nAccumulate values until threshold is reached:")
    progress = 0
    step = 3
    while progress < 12:
        progress += step
        print(f"Progress is now: {progress}")
    print("Stopped once progress reached target.")


def loop_flow_control_examples():
    """Show break and continue for safe loop control."""
    print("\n3) LOOP FLOW CONTROL (break and continue)")
    print("-" * 40)

    values = [5, 12, -1, 18, 20]
    print("Using break to stop when invalid data appears:")
    for value in values:
        if value < 0:
            print(f"Found invalid value {value}. Stopping loop with break.")
            break
        print(f"Processed value: {value}")

    print("\nUsing continue to skip low-priority values:")
    tasks = ["email", "break", "report", "break", "analysis"]
    for task in tasks:
        if task == "break":
            print("Skipping break entry with continue")
            continue
        print(f"Working on task: {task}")


def avoiding_infinite_loops_examples():
    """Explain common infinite-loop causes and demonstrate safe patterns."""
    print("\n4) AVOIDING INFINITE LOOPS")
    print("-" * 40)

    print("Common infinite-loop cause: condition never changes.")
    print("Example (DO NOT RUN):")
    print("while x < 5:")
    print("    print(x)  # x is never updated")

    print("\nSafe pattern with a changing variable:")
    x = 0
    while x < 5:
        print(f"x = {x}")
        x += 1
    print("Safe loop completed.")

    print("\nExtra safety with a guard counter:")
    sensor_value = 0
    guard = 0
    while sensor_value < 100:
        sensor_value += 15
        guard += 1
        print(f"sensor_value={sensor_value}, guard={guard}")
        if guard >= 10:
            print("Guard limit reached. Exiting to avoid runaway loop.")
            break


def main():
    print("Using for and while Loops for Iterative Data Processing")
    print("=" * 58)

    for_loop_examples()
    while_loop_examples()
    loop_flow_control_examples()
    avoiding_infinite_loops_examples()

    print("\nMilestone complete: You practiced safe and readable iteration logic.")


if __name__ == "__main__":
    main()
