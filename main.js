/**
 * Doctor class representing a doctor with their average consultation time
 */
class Doctor {
  constructor(id, averageConsultationTime) {
    this.id = id; // Unique identifier for the doctor
    this.averageConsultationTime = averageConsultationTime; // in minutes
  }
}

/**
 * Calculate the estimated waiting time for a patient in the queue
 * Uses a greedy algorithm that assigns each patient to the doctor who will be available soonest
 * 
 * @param {Doctor[]} doctors - Array of Doctor objects
 * @param {number} patientPosition - Position of the patient in the queue (1-indexed)
 * @returns {number} Estimated waiting time in minutes
 */
function calculateWaitingTime(doctors, patientPosition) {
  // Input validation
  if (!doctors || doctors.length === 0) {
    throw new Error("At least one doctor is required");
  }
  
  if (patientPosition < 1) {
    throw new Error("Patient position must be at least 1");
  }
  
  // Track when each doctor will be available
  // Initially all doctors are available at time 0 (not seeing any patient)
  const doctorAvailability = doctors.map((doctor, index) => ({
    doctorId: doctor.id,
    doctorIndex: index,
    availableAt: 0, // Time when doctor will be free (in minutes)
    consultationTime: doctor.averageConsultationTime
  }));
  
  // Simulate assigning patients 1 through patientPosition to doctors
  for (let currentPatient = 1; currentPatient <= patientPosition; currentPatient++) {
    // Find the doctor who will be available soonest using greedy approach
    // Sort by availability time, with tie-breaking by consultation time
    doctorAvailability.sort((a, b) => {
      if (a.availableAt !== b.availableAt) {
        return a.availableAt - b.availableAt; // Earlier availability first
      }
      // Tie-breaker: prefer doctor with shorter consultation time
      // This helps balance the load when multiple doctors are equally available
      return a.consultationTime - b.consultationTime;
    });
    
    const nextAvailableDoctor = doctorAvailability[0];
    
    // If this is the target patient, return their waiting time
    // (the time when they will be called, which is when the doctor is available)
    if (currentPatient === patientPosition) {
      return nextAvailableDoctor.availableAt;
    }
    
    // Otherwise, assign this patient to the next available doctor
    // and update when that doctor will be free next
    nextAvailableDoctor.availableAt += nextAvailableDoctor.consultationTime;
  }
}

// ============================================================================
// TEST CASES
// ============================================================================

console.log("=== Test Case 1: Case Study 1 ===");
// 1 doctor, 3 min consultation, John is 6th patient
const doctors1 = [new Doctor("DrA", 3)];
const johnWaitTime1 = calculateWaitingTime(doctors1, 6);
console.log(`John's waiting time: ${johnWaitTime1} minutes`);
console.log(`Expected: 15 minutes\n`);

console.log("=== Test Case 2: Case Study 2, Question 1 ===");
// 2 doctors (3 min and 4 min), John is 11th patient
const doctors2 = [
  new Doctor("DrA", 3),
  new Doctor("DrB", 4)
];
const johnWaitTime2 = calculateWaitingTime(doctors2, 11);
console.log(`John's waiting time: ${johnWaitTime2} minutes`);
console.log(`Note: Greedy algorithm result\n`);

console.log("=== Test Case 3: Multiple doctors with same consultation time ===");
// 3 doctors, all with 5 min consultation, patient is 10th
const doctors3 = [
  new Doctor("Dr1", 5),
  new Doctor("Dr2", 5),
  new Doctor("Dr3", 5)
];
const waitTime3 = calculateWaitingTime(doctors3, 10);
console.log(`Patient 10's waiting time: ${waitTime3} minutes`);
console.log(`Expected: 15 minutes (9 patients / 3 doctors = 3 patients each, 3 * 5 = 15)\n`);

console.log("=== Test Case 4: Single patient (first in queue) ===");
const doctors4 = [new Doctor("DrA", 3)];
const waitTime4 = calculateWaitingTime(doctors4, 1);
console.log(`Patient 1's waiting time: ${waitTime4} minutes`);
console.log(`Expected: 0 minutes (doctor is immediately available)\n`);

console.log("=== Test Case 5: Many doctors, few patients ===");
// 5 doctors with different consultation times, patient is 3rd
const doctors5 = [
  new Doctor("DrA", 2),
  new Doctor("DrB", 3),
  new Doctor("DrC", 4),
  new Doctor("DrD", 5),
  new Doctor("DrE", 6)
];
const waitTime5 = calculateWaitingTime(doctors5, 3);
console.log(`Patient 3's waiting time: ${waitTime5} minutes`);
console.log(`Expected: 0 minutes (3rd patient, 5 doctors available)\n`);

console.log("=== Test Case 6: Varied consultation times ===");
// Test with doctors having significantly different consultation times
const doctors6 = [
  new Doctor("Fast", 2),
  new Doctor("Medium", 5),
  new Doctor("Slow", 10)
];
const waitTime6 = calculateWaitingTime(doctors6, 7);
console.log(`Patient 7's waiting time: ${waitTime6} minutes`);
// Fast doctor handles patients 1,4,7 (0,4,8) -> patient 7 at 8 min
// Medium doctor handles patients 2,5 (0,5) 
// Slow doctor handles patients 3,6 (0,10)
console.log(`Expected: Fast doctor gets more patients due to shorter time\n`);

// ============================================================================
// SIMULATION TRACE HELPER (for debugging/visualization)
// ============================================================================

/**
 * Extended version that shows the assignment trace
 */
function calculateWaitingTimeWithTrace(doctors, patientPosition) {
  if (!doctors || doctors.length === 0) {
    throw new Error("At least one doctor is required");
  }
  
  if (patientPosition < 1) {
    throw new Error("Patient position must be at least 1");
  }
  
  const doctorAvailability = doctors.map((doctor, index) => ({
    doctorId: doctor.id,
    doctorIndex: index,
    availableAt: 0,
    consultationTime: doctor.averageConsultationTime,
    patientsAssigned: []
  }));
  
  console.log("\n=== Assignment Trace ===");
  
  for (let currentPatient = 1; currentPatient <= patientPosition; currentPatient++) {
    doctorAvailability.sort((a, b) => {
      if (a.availableAt !== b.availableAt) {
        return a.availableAt - b.availableAt;
      }
      return a.consultationTime - b.consultationTime;
    });
    
    const nextAvailableDoctor = doctorAvailability[0];
    
    console.log(
      `Patient ${currentPatient} → Doctor ${nextAvailableDoctor.doctorId} ` +
      `(available at ${nextAvailableDoctor.availableAt} min)`
    );
    
    if (currentPatient === patientPosition) {
      console.log(`\n** Target patient ${patientPosition} will be called at ${nextAvailableDoctor.availableAt} minutes **\n`);
      
      // Show final distribution
      console.log("Final patient distribution:");
      doctorAvailability.forEach(doc => {
        console.log(
          `  Doctor ${doc.doctorId}: ${doc.patientsAssigned.length} patients ` +
          `[${doc.patientsAssigned.join(', ')}] → finishes at ${doc.availableAt} min`
        );
      });
      
      return nextAvailableDoctor.availableAt;
    }
    
    nextAvailableDoctor.patientsAssigned.push(currentPatient);
    nextAvailableDoctor.availableAt += nextAvailableDoctor.consultationTime;
  }
}

console.log("\n" + "=".repeat(60));
console.log("DETAILED TRACE EXAMPLE");
console.log("=".repeat(60));
const traceResult = calculateWaitingTimeWithTrace(doctors2, 11);