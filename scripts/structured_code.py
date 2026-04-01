# -----------------------------------
# 1. Imports (if needed)
# -----------------------------------

# (No imports needed for this task)


# -----------------------------------
# 2. Helper Functions
# -----------------------------------

def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total


def calculate_average(numbers):
    total = calculate_sum(numbers)
    return total / len(numbers)


def display_results(numbers):
    print("Numbers:", numbers)
    print("Sum:", calculate_sum(numbers))
    print("Average:", calculate_average(numbers))


# -----------------------------------
# 3. Main Execution
# -----------------------------------

def main():
    data = [10, 20, 30, 40, 50]
    display_results(data)


# -----------------------------------
# 4. Entry Point
# -----------------------------------

if __name__ == "__main__":
    main()