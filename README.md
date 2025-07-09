# ATTENDIFY
## Overview

The **Blockchain-Based Attendance Tracking System** is a decentralized application (DApp) built using Ethereum smart contracts. The system allows the owner to register student roll numbers, mark attendance for each student on a given date, and securely retrieve the attendance records. This ensures the immutability and transparency of the attendance records, making them tamper-proof.

---

## Features

### **1. Admin Controls**

- **Roll Number Registration**: Only the owner (usually an administrator or teacher) can register roll numbers for students. This ensures that each student can only register once.
- **Attendance Marking**: The owner can mark attendance for each registered roll number. The attendance record is stored securely on the blockchain.

### **2. Voter Registration**

- Only the owner can register roll numbers, ensuring that attendance is only recorded for valid, registered students.
- Once a roll number is registered, it cannot be registered again.

### **3. Secure Attendance Records**

- Attendance is recorded on the Ethereum blockchain, ensuring that it is immutable and transparent.
- Each attendance record is associated with a roll number, date, and presence status (`true` for present and `false` for absent).

### **4. Retrieve Attendance Records**

- Anyone can view the attendance records for a given roll number, but only if the roll number has been registered by the owner.
- Attendance records are returned for any roll number queried by its registered identifier.

---

