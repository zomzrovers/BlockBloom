// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attendance {
    struct AttendanceRecord {
        string rollNumber;  
        string date;
        bool isPresent;
    }

    mapping(string => AttendanceRecord[]) private attendanceRecords; 
    mapping(string => bool) private registeredRollNumbers; 
    address private owner;

    event RollNumberRegistered(string rollNumber);
    event AttendanceMarked(string rollNumber, string date, bool isPresent);

    constructor() {
        owner = msg.sender; 
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Access Denied: Only the owner can perform this action.");
        _;
    }

    function registerRollNumber(string memory _rollNumber) public onlyOwner {
        require(!registeredRollNumbers[_rollNumber], "Roll number is already registered.");
        registeredRollNumbers[_rollNumber] = true;
        
        emit RollNumberRegistered(_rollNumber);
    }

    function markAttendance(string memory _rollNumber, string memory _date, bool _isPresent) public onlyOwner {
        require(registeredRollNumbers[_rollNumber], "Roll number is not registered.");
        attendanceRecords[_rollNumber].push(AttendanceRecord({
            rollNumber: _rollNumber,
            date: _date,
            isPresent: _isPresent
        }));

        emit AttendanceMarked(_rollNumber, _date, _isPresent);
    }

    function getAttendance(string memory _rollNumber) public view returns (AttendanceRecord[] memory) {
        require(registeredRollNumbers[_rollNumber], "Roll number is not registered.");
        return attendanceRecords[_rollNumber];
    }

    function isRollNumberRegistered(string memory _rollNumber) public view returns (bool) {
        return registeredRollNumbers[_rollNumber];
    }
}