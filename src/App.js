import React from "react";
import DepartmentList from "./Components/department";

import { Route, Routes } from "react-router-dom";
// import AdminLayout from "./Layout/AdminLayout.js";
// import { Route } from "lucide-react";
import SubDepartmentList from "./Components/subdepartment.js";
import Position from "./Employee/Position.js";
// import AdminLayout from "./Layout/AdminLayout.jsx";
import AdminLayout from "./Layout/AdminLayout.jsx";
import AttendanceForm from "./Pages/AttendanceForm.js";
import Dashboard from "./Pages/Dashboard.jsx";
import Holiday from "./Pages/Holiday.js";
import LeaveApplication from "./Pages/LeaveApplication.js";
import LeaveApproval from "./Pages/LeaveApproval";
import Leaves from "./Pages/Leaves.js";
import MissingAttendance from "./Pages/MissingAttendance.js";
import MonthlyAttendance from "./Pages/MonthlyAttendance.js";
import WeeklyHoliday from "./Pages/WeeklyHoliday.js";
// import Performance from "./Employee/Performance.js";
import Recruitment from "./Components/recruitment.js";
import Employees from "./Employee/Employees.js";
import Manageemployeesalary from "./Employee/Manageemployeesalary.js";
import Performance from "./Employee/Performance.js";
import SalaryAdvance from "./Employee/SalaryAdvance.js";
import SalaryGenerate from "./Employee/SalaryGenerate.js";
import AwardList from "./Pages/Awardlist.js";
import BackupReset from "./Pages/BackupReset.js";
import LanguageSetup from "./Pages/LanguageSetup.js";
import MessagesTable from "./Pages/Message.js";
import NoticeList from "./Pages/Noticelist.js";
import SentMessagesTable from "./Pages/Sent.js";
import Setting from "./Pages/Setting";
import SetupRulesTable from "./Pages/Setup.js";
import CandidateShortlist from "./Pages/CandidateShortlist.js";
import InterviewList from "./Pages/InterviewList.js";
import CandidateSelection from "./Pages/CandidateSelection.js";
import ClientsTable from "./Pages/ClientsTable.js";
import ProjectsTable from "./Pages/ProjectsTable.js";
import ProjectTasksTable from "./Pages/ProjectTasksTable.js";
import ManageProjects from "./Pages/ManageProject.js";
import EmployeeTracking from "./Employee/EmployeeTracking.js";
import TrackingTable from "./Employee/TrackingTable.js";
import ScreenActivityTracker from "./Employee/ScreenActivityTracker.js";
import DailyWorkTable from "./Employee/DailyWorkTable.js";
import EmployeeWorkUpdate from "./Employee/EmployeeWorkUpdate.js";
import EmployeeTrackingTable from "./Employee/EmployeeTrackingTable.js";
import BreakTrackingTable from "./Employee/BreakTrackingTable.js";
import AdminBreakTrackingTable from "./Employee/AdminBreakTrackingTable.js";
import Delivery from './Employee/Delivery.js'
import ComingSoon from "./Pages/ComingSoon.js";




function App() {
  return (
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/" element={<Delivery/>}/>
        <Route path="/department" element={<DepartmentList/>}/>
        <Route path="/subdepartment" element={<SubDepartmentList/>}/>
        <Route path="/position" element={<Position/>}/>
        <Route path="/attendanceform" element={<AttendanceForm />} />
        <Route path="/monthlyattendance" element={<MonthlyAttendance />} />
        <Route path="/missingattendance" element={<MissingAttendance />} />
        <Route path="/weeklyholiday" element={<WeeklyHoliday />} />
        <Route path="/holiday" element={<Holiday />} />
        <Route path="/leaveapplication" element={<LeaveApplication />} />
        <Route path="/leaves" element={<Leaves />} />
        <Route path="/leaveapproval" element={<LeaveApproval />} />
        <Route path="/performance" element={<Performance/>}/>
        <Route path="/position" element={<Position/>}/>
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/languagesetup" element={<LanguageSetup />} />
        <Route path="/backupreset" element={<BackupReset />} />
        <Route path="/awardlist" element={<AwardList/>} />
        <Route path="/message" element={<MessagesTable/>} />
        <Route path="/deliverydetails-list" element={<NoticeList/>} />
        <Route path="/sentlist" element={<SentMessagesTable/>} />
        <Route path="/setuplist" element={<SetupRulesTable/>} />
        <Route path="/salaryadvance" element={<SalaryAdvance />} />
        <Route path="/salarygenerate" element={<SalaryGenerate />} />
        <Route path="/manageemployeesalary" element={<Manageemployeesalary />} />
        <Route path="/candidate-shortlist" element={<CandidateShortlist />} />
        <Route path="/interviewlist" element={<InterviewList />} />
        <Route path="/selectedcandidates" element={<CandidateSelection />} />
        <Route path="/clients" element={<ClientsTable />} />
        <Route path="/projects" element={<ProjectsTable />} />
        <Route path="/task" element={<ProjectTasksTable />} />
        <Route path="/manage-project" element={<ManageProjects />} />
        <Route path="/track-employee" element={<EmployeeTracking />} />
        <Route path="/track-table" element={<TrackingTable />} />
        <Route path="/track" element={<ScreenActivityTracker />} />
        <Route path="/daily-workupload" element={<DailyWorkTable />} />
        <Route path="/employee-work" element={<EmployeeWorkUpdate />} />
        <Route path="/employee-track" element={<EmployeeTrackingTable />} />
        <Route path="/break" element={<BreakTrackingTable />} />
        <Route path="/employee-break" element={<AdminBreakTrackingTable />} />
        <Route path="/coming-soon" element={<ComingSoon />} />






      </Routes>    
  );
}

export default App;


