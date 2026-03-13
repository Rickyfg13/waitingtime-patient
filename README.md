# waitingtime-patient
=== Test Case 1: Case Study 1 ===
John's waiting time: 15 minutes
Expected: 15 minutes

=== Test Case 2: Case Study 2, Question 1 ===
John's waiting time: 16 minutes
Note: Greedy algorithm result

=== Test Case 3: Multiple doctors with same consultation time ===
Patient 10's waiting time: 15 minutes
Expected: 15 minutes (9 patients / 3 doctors = 3 patients each, 3 * 5 = 15)

=== Test Case 4: Single patient (first in queue) ===
Patient 1's waiting time: 0 minutes
Expected: 0 minutes (doctor is immediately available)

=== Test Case 5: Many doctors, few patients ===
Patient 3's waiting time: 0 minutes
Expected: 0 minutes (3rd patient, 5 doctors available)

=== Test Case 6: Varied consultation times ===
Patient 7's waiting time: 6 minutes
Expected: Fast doctor gets more patients due to shorter time


============================================================
DETAILED TRACE EXAMPLE
============================================================

=== Assignment Trace ===
Patient 1 → Doctor DrA (available at 0 min)
Patient 2 → Doctor DrB (available at 0 min)
Patient 3 → Doctor DrA (available at 3 min)
Patient 4 → Doctor DrB (available at 4 min)
Patient 5 → Doctor DrA (available at 6 min)
Patient 6 → Doctor DrB (available at 8 min)
Patient 7 → Doctor DrA (available at 9 min)
Patient 8 → Doctor DrA (available at 12 min)
Patient 9 → Doctor DrB (available at 12 min)
Patient 10 → Doctor DrA (available at 15 min)
Patient 11 → Doctor DrB (available at 16 min)

** Target patient 11 will be called at 16 minutes **

Final patient distribution:
  Doctor DrB: 4 patients [2, 4, 6, 9] → finishes at 16 min
  Doctor DrA: 6 patients [1, 3, 5, 7, 8, 10] → finishes at 18 min



## Algorithm Explanation
Approach: Greedy Algorithm
The algorithm uses a greedy strategy that assigns each patient to the doctor who will be available soonest. This approach:

Maintains doctor availability: Tracks when each doctor will finish with their current patient
Assigns optimally: For each new patient, finds the doctor who will be free earliest
Handles tie-breaking: When multiple doctors are equally available, prefers the one with shorter consultation time
Returns waiting time: For the target patient, returns the time when they will be called (when a doctor becomes available)

# Time Complexity
O(n × d × log d) where:
n = patient position in queue
d = number of doctors
Sorting happens for each patient assignment

# Space Complexity
O(d) for tracking doctor availability