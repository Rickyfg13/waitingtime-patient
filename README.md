# 🏥 Patient Queue Waiting Time Algorithm

## Overview
This algorithm calculates the **estimated waiting time for a patient** in a queue when multiple doctors are available.

It uses a **Greedy Algorithm** strategy that always assigns the next patient to the **doctor who will become available the earliest**.

---

# Algorithm Explanation

## Approach: Greedy Algorithm

The algorithm works by:

1. **Maintaining doctor availability**
   - Tracks when each doctor will finish treating their current patient.

2. **Optimal assignment**
   - Each new patient is assigned to the doctor who will become available the soonest.

3. **Tie-breaking rule**
   - If multiple doctors are available at the same time, the algorithm prefers the doctor with the **shorter consultation time**.

4. **Waiting time calculation**
   - For the target patient, the algorithm returns the time when the assigned doctor becomes available.

---

# Complexity Analysis

## Time Complexity

```
O(n × d × log d)
```

Where:

- `n` = patient position in the queue  
- `d` = number of doctors  

Sorting or priority queue operations happen during patient assignments.

## Space Complexity

```
O(d)
```

Used for storing the availability time of each doctor.

---

# Test Cases

## Test Case 1 – Case Study 1

| Input | Result |
|------|------|
John's waiting time | **15 minutes**

Expected result:

```
15 minutes
```

---

## Test Case 2 – Case Study 2, Question 1

| Input | Result |
|------|------|
John's waiting time | **16 minutes**

Note:

```
Result produced by the greedy algorithm
```

---

## Test Case 3 – Multiple Doctors with Same Consultation Time

Scenario:

- 3 doctors
- consultation time = 5 minutes
- Patient position = 10

Result:

```
Patient 10 waiting time: 15 minutes
```

Explanation:

```
9 patients / 3 doctors = 3 patients per doctor
3 × 5 minutes = 15 minutes
```

---

## Test Case 4 – Single Patient

Scenario:

- Patient position = 1

Result:

```
Waiting time = 0 minutes
```

Explanation:

The first patient is treated immediately.

---

## Test Case 5 – Many Doctors, Few Patients

Scenario:

- 5 doctors
- Patient position = 3

Result:

```
Waiting time = 0 minutes
```

Explanation:

Enough doctors are available immediately.

---

## Test Case 6 – Varied Consultation Times

Scenario:

Doctors have **different consultation durations**.

Result:

```
Patient 7 waiting time: 6 minutes
```

Explanation:

Doctors with **shorter consultation times handle more patients**, reducing waiting time.

---

# Detailed Trace Example

Patient assignment simulation:

```
Patient 1  → Doctor DrA (available at 0 min)
Patient 2  → Doctor DrB (available at 0 min)
Patient 3  → Doctor DrA (available at 3 min)
Patient 4  → Doctor DrB (available at 4 min)
Patient 5  → Doctor DrA (available at 6 min)
Patient 6  → Doctor DrB (available at 8 min)
Patient 7  → Doctor DrA (available at 9 min)
Patient 8  → Doctor DrA (available at 12 min)
Patient 9  → Doctor DrB (available at 12 min)
Patient 10 → Doctor DrA (available at 15 min)
Patient 11 → Doctor DrB (available at 16 min)
```

### Target Result

```
Target patient 11 will be called at 16 minutes
```

---

# Final Patient Distribution

```
Doctor DrB
Patients: [2, 4, 6, 9]
Total patients: 4
Finishes at: 16 minutes

Doctor DrA
Patients: [1, 3, 5, 7, 8, 10]
Total patients: 6
Finishes at: 18 minutes
```

---

# Key Insight

The greedy strategy works well because:

- The next patient always chooses the **doctor who becomes available first**
- Doctors with **shorter consultation times naturally receive more patients**
- This results in an **efficient load distribution**.
