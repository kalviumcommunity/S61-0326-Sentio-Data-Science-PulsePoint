import { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { LoginPage, SignupPage } from "../features/auth";

const DEPT_STATS = [
  {dept:"IT",count:1227,avg_satisfaction:0.618,avg_last_eval:0.717,avg_hours:202.2,avg_tenure:3.47,avg_projects:3.82,accidents:164,promotions:3},
  {dept:"R&D",count:787,avg_satisfaction:0.620,avg_last_eval:0.712,avg_hours:200.8,avg_tenure:3.37,avg_projects:3.85,accidents:134,promotions:27},
  {dept:"Accounting",count:767,avg_satisfaction:0.582,avg_last_eval:0.718,avg_hours:201.2,avg_tenure:3.52,avg_projects:3.83,accidents:96,promotions:14},
  {dept:"HR",count:739,avg_satisfaction:0.599,avg_last_eval:0.709,avg_hours:198.7,avg_tenure:3.36,avg_projects:3.66,accidents:89,promotions:15},
  {dept:"Mgmt",count:630,avg_satisfaction:0.621,avg_last_eval:0.724,avg_hours:201.2,avg_tenure:4.30,avg_projects:3.86,accidents:103,promotions:69},
  {dept:"Marketing",count:858,avg_satisfaction:0.619,avg_last_eval:0.716,avg_hours:199.4,avg_tenure:3.57,avg_projects:3.69,accidents:138,promotions:43},
  {dept:"Product",count:902,avg_satisfaction:0.620,avg_last_eval:0.715,avg_hours:200.0,avg_tenure:3.48,avg_projects:3.81,accidents:132,promotions:0},
  {dept:"Sales",count:4140,avg_satisfaction:0.614,avg_last_eval:0.710,avg_hours:200.9,avg_tenure:3.53,avg_projects:3.78,accidents:587,promotions:100},
  {dept:"Support",count:2229,avg_satisfaction:0.618,avg_last_eval:0.723,avg_hours:200.8,avg_tenure:3.39,avg_projects:3.80,accidents:345,promotions:20},
  {dept:"Technical",count:2720,avg_satisfaction:0.608,avg_last_eval:0.721,avg_hours:202.5,avg_tenure:3.41,avg_projects:3.88,accidents:381,promotions:28}
];

const MONTHLY = [
  {m:"Jan '25",submissions:1026,satisfaction:62.1,hours:202.4},
  {m:"Feb '25",submissions:893,satisfaction:60.8,hours:201.0},
  {m:"Mar '25",submissions:934,satisfaction:60.1,hours:201.1},
  {m:"Apr '25",submissions:926,satisfaction:62.3,hours:201.3},
  {m:"May '25",submissions:1010,satisfaction:60.8,hours:201.3},
  {m:"Jun '25",submissions:954,satisfaction:60.6,hours:200.9},
  {m:"Jul '25",submissions:960,satisfaction:61.5,hours:201.7},
  {m:"Aug '25",submissions:993,satisfaction:62.3,hours:199.7},
  {m:"Sep '25",submissions:968,satisfaction:59.9,hours:199.0},
  {m:"Oct '25",submissions:941,satisfaction:62.0,hours:203.8},
  {m:"Nov '25",submissions:1052,satisfaction:62.6,hours:202.4},
  {m:"Dec '25",submissions:1008,satisfaction:61.1,hours:201.5},
  {m:"Jan '26",submissions:962,satisfaction:61.0,hours:199.0},
  {m:"Feb '26",submissions:881,satisfaction:61.1,hours:201.5},
  {m:"Mar '26",submissions:1018,satisfaction:61.3,hours:200.9},
  {m:"Apr '26",submissions:473,satisfaction:60.5,hours:197.3}
];

const SAT_DIST = [
  {range:"0–20%",count:1478,color:"#EF4444"},
  {range:"20–40%",count:1646,color:"#F97316"},
  {range:"40–60%",count:3605,color:"#F59E0B"},
  {range:"60–80%",count:4268,color:"#3B82F6"},
  {range:"80–100%",count:4002,color:"#10B981"}
];

const SALARY_DIST = [
  {name:"Low",value:7316,color:"#94A3B8"},
  {name:"Medium",value:6446,color:"#3B82F6"},
  {name:"High",value:1237,color:"#7C3AED"}
];

const SALARY_DEPT = [
  {dept:"IT",High:83,Low:609,Medium:535},
  {dept:"R&D",High:51,Low:364,Medium:372},
  {dept:"Accounting",High:74,Low:358,Medium:335},
  {dept:"HR",High:45,Low:335,Medium:359},
  {dept:"Mgmt",High:225,Low:180,Medium:225},
  {dept:"Marketing",High:80,Low:402,Medium:376},
  {dept:"Product",High:68,Low:451,Medium:383},
  {dept:"Sales",High:269,Low:2099,Medium:1772},
  {dept:"Support",High:141,Low:1146,Medium:942},
  {dept:"Technical",High:201,Low:1372,Medium:1147}
];

const FEEDBACK = [
  {id:1,name:"Sunita Kumar",dept:"sales",salary:"low",satisfaction:0.38,feedback:"Satisfactory performance overall. Minor improvements needed in documentation practices."},
  {id:2,name:"Deepak Iyer",dept:"sales",salary:"medium",satisfaction:0.80,feedback:"Completed assigned projects ahead of schedule. Received appreciation from the client."},
  {id:3,name:"Kavitha Singh",dept:"sales",salary:"medium",satisfaction:0.11,feedback:"Outstanding contribution to the new product launch. Awarded spot recognition bonus."},
  {id:4,name:"Sunita Mehta",dept:"sales",salary:"low",satisfaction:0.72,feedback:"High performer with excellent problem-solving skills. Proactively contributes to team goals."},
  {id:5,name:"Rajesh Das",dept:"sales",salary:"low",satisfaction:0.37,feedback:"Showed strong teamwork and collaboration. Needs improvement in time management and meeting deadlines."},
  {id:6,name:"Divya Sharma",dept:"sales",salary:"low",satisfaction:0.41,feedback:"Good communication skills and leadership potential. Suggested for leadership training program."},
  {id:7,name:"Arun Reddy",dept:"sales",salary:"low",satisfaction:0.10,feedback:"Positive attitude and willingness to learn. Enrolled in upskilling program for career growth."},
  {id:8,name:"Suresh Iyer",dept:"sales",salary:"low",satisfaction:0.92,feedback:"Employee has been disengaged lately. HR intervention recommended to understand concerns."},
  {id:9,name:"Harish Sinha",dept:"sales",salary:"low",satisfaction:0.89,feedback:"Satisfactory performance overall. Minor improvements needed in documentation practices."},
  {id:10,name:"Arun Mehta",dept:"sales",salary:"low",satisfaction:0.42,feedback:"Team player with consistent output. No major concerns noted during the review period."},
  {id:11,name:"Suresh Mehta",dept:"sales",salary:"low",satisfaction:0.45,feedback:"Frequent absenteeism observed. Counseling session scheduled with HR and manager."},
  {id:12,name:"Divya Iyer",dept:"sales",salary:"low",satisfaction:0.11,feedback:"Employee expressed interest in internal transfer. Request under review by department head."},
  {id:13,name:"Kiran Das",dept:"sales",salary:"low",satisfaction:0.84,feedback:"Frequent absenteeism observed. Counseling session scheduled with HR and manager."},
  {id:14,name:"Deepak Kumar",dept:"sales",salary:"low",satisfaction:0.41,feedback:"Employee raised concerns about workload and stress. Work-life balance support to be provided."},
  {id:15,name:"Meena Naidu",dept:"sales",salary:"low",satisfaction:0.36,feedback:"Positive attitude and willingness to learn. Enrolled in upskilling program for career growth."},
  {id:16,name:"Ravi Gupta",dept:"sales",salary:"low",satisfaction:0.38,feedback:"Outstanding contribution to the new product launch. Awarded spot recognition bonus."},
  {id:17,name:"Vikram Nair",dept:"sales",salary:"low",satisfaction:0.45,feedback:"Excellent client handling and communication. Considered for promotion to senior role."},
  {id:18,name:"Ravi Patel",dept:"sales",salary:"low",satisfaction:0.78,feedback:"Frequent absenteeism observed. Counseling session scheduled with HR and manager."},
  {id:19,name:"Rajesh Pillai",dept:"sales",salary:"low",satisfaction:0.45,feedback:"Showed strong teamwork and collaboration. Needs improvement in time management and meeting deadlines."},
  {id:20,name:"Sunita Mishra",dept:"sales",salary:"low",satisfaction:0.76,feedback:"Needs improvement in technical skills. Enrolled in internal training for skill enhancement."},
  {id:21,name:"Lakshmi Sinha",dept:"sales",salary:"low",satisfaction:0.11,feedback:"Employee submitted resignation. Exit interview conducted and feedback documented."},
  {id:22,name:"Deepak Sharma",dept:"sales",salary:"low",satisfaction:0.38,feedback:"Satisfactory performance overall. Minor improvements needed in documentation practices."},
  {id:23,name:"Kiran Mehta",dept:"sales",salary:"low",satisfaction:0.09,feedback:"Satisfactory performance overall. Minor improvements needed in documentation practices."},
  {id:24,name:"Sunita Pillai",dept:"sales",salary:"low",satisfaction:0.46,feedback:"High performer with excellent problem-solving skills. Proactively contributes to team goals."},
  {id:25,name:"Rajesh Mehta",dept:"sales",salary:"low",satisfaction:0.40,feedback:"Excellent client handling and communication. Considered for promotion to senior role."},
  {id:26,name:"Anitha Sinha",dept:"sales",salary:"low",satisfaction:0.89,feedback:"Good communication skills and leadership potential. Suggested for leadership training program."},
  {id:27,name:"Lakshmi Das",dept:"sales",salary:"low",satisfaction:0.82,feedback:"Reported conflict with team members. Mediation session conducted by HR."},
  {id:28,name:"Suresh Reddy",dept:"sales",salary:"low",satisfaction:0.40,feedback:"Exceptional work quality and dedication. Nominated for employee of the quarter."},
  {id:29,name:"Priya Iyer",dept:"accounting",salary:"low",satisfaction:0.41,feedback:"High performer with excellent problem-solving skills. Proactively contributes to team goals."},
  {id:30,name:"Anitha Reddy",dept:"accounting",salary:"low",satisfaction:0.38,feedback:"High performer with excellent problem-solving skills. Proactively contributes to team goals."},
  {id:31,name:"Kavitha Patel",dept:"accounting",salary:"low",satisfaction:0.09,feedback:"Satisfactory performance overall. Minor improvements needed in documentation practices."},
  {id:32,name:"Mohan Gupta",dept:"hr",salary:"low",satisfaction:0.45,feedback:"Needs improvement in technical skills. Enrolled in internal training for skill enhancement."},
  {id:33,name:"Kiran Mishra",dept:"hr",salary:"low",satisfaction:0.40,feedback:"Employee expressed interest in internal transfer. Request under review by department head."},
  {id:34,name:"Meena Mishra",dept:"hr",salary:"low",satisfaction:0.45,feedback:"Team player with consistent output. No major concerns noted during the review period."},
  {id:35,name:"Lakshmi Nair",dept:"hr",salary:"low",satisfaction:0.84,feedback:"Satisfactory performance overall. Minor improvements needed in documentation practices."},
  {id:36,name:"Deepak Reddy",dept:"technical",salary:"low",satisfaction:0.10,feedback:"Excellent client handling and communication. Considered for promotion to senior role."},
  {id:37,name:"Swathi Rao",dept:"technical",salary:"low",satisfaction:0.38,feedback:"Employee has been disengaged lately. HR intervention recommended to understand concerns."},
  {id:38,name:"Pooja Iyer",dept:"technical",salary:"low",satisfaction:0.45,feedback:"Completed assigned projects ahead of schedule. Received appreciation from the client."},
  {id:39,name:"Meena Bhat",dept:"technical",salary:"low",satisfaction:0.11,feedback:"Employee submitted resignation. Exit interview conducted and feedback documented."},
  {id:40,name:"Mohan Gupta",dept:"technical",salary:"low",satisfaction:0.41,feedback:"Excellent client handling and communication. Considered for promotion to senior role."},
  {id:41,name:"Pooja Iyer",dept:"technical",salary:"low",satisfaction:0.87,feedback:"Showed strong teamwork and collaboration. Needs improvement in time management."},
  {id:42,name:"Ravi Sharma",dept:"technical",salary:"low",satisfaction:0.45,feedback:"Employee has been disengaged lately. HR intervention recommended to understand concerns."},
  {id:43,name:"Kavitha Sharma",dept:"technical",salary:"low",satisfaction:0.40,feedback:"Reported conflict with team members. Mediation session conducted by HR."},
  {id:44,name:"Ravi Pillai",dept:"technical",salary:"low",satisfaction:0.10,feedback:"Showed strong teamwork and collaboration. Needs improvement in time management."},
  {id:45,name:"Deepak Reddy",dept:"technical",salary:"low",satisfaction:0.09,feedback:"Showed strong teamwork and collaboration. Needs improvement in time management."},
  {id:46,name:"Suresh Das",dept:"technical",salary:"low",satisfaction:0.84,feedback:"Excellent client handling and communication. Considered for promotion to senior role."},
  {id:47,name:"Ravi Nair",dept:"support",salary:"low",satisfaction:0.40,feedback:"Employee raised concerns about workload and stress. Work-life balance support to be provided."},
  {id:48,name:"Sonal Pillai",dept:"support",salary:"low",satisfaction:0.57,feedback:"Positive attitude and willingness to learn. Enrolled in upskilling program for career growth."},
  {id:49,name:"Kiran Singh",dept:"support",salary:"low",satisfaction:0.40,feedback:"Employee demonstrates consistent performance and meets all KPIs."},
  {id:50,name:"Deepak Singh",dept:"support",salary:"low",satisfaction:0.43,feedback:"Good communication skills and leadership potential. Suggested for leadership training program."},
  {id:51,name:"Kavitha Mehta",dept:"support",salary:"low",satisfaction:0.13,feedback:"Needs improvement in technical skills. Enrolled in internal training for skill enhancement."},
  {id:52,name:"Pooja Gupta",dept:"support",salary:"low",satisfaction:0.44,feedback:"Needs improvement in technical skills. Enrolled in internal training for skill enhancement."},
  {id:53,name:"Nitin Naidu",dept:"support",salary:"low",satisfaction:0.38,feedback:"Employee submitted resignation. Exit interview conducted and feedback documented."},
  {id:54,name:"Nitin Pillai",dept:"support",salary:"low",satisfaction:0.39,feedback:"Showed strong teamwork and collaboration. Needs improvement in time management."},
  {id:55,name:"Lakshmi Iyer",dept:"support",salary:"low",satisfaction:0.10,feedback:"Employee has been disengaged lately. HR intervention recommended to understand concerns."},
  {id:56,name:"Vikram Shah",dept:"support",salary:"low",satisfaction:0.37,feedback:"Good communication skills and leadership potential. Suggested for leadership training program."},
  {id:57,name:"Sonal Reddy",dept:"support",salary:"low",satisfaction:0.11,feedback:"Average performance with scope for improvement. Quarterly review set for further evaluation."},
  {id:58,name:"Priya Patel",dept:"technical",salary:"low",satisfaction:0.10,feedback:"Employee has been disengaged lately. HR intervention recommended to understand concerns."},
  {id:59,name:"Vikram Rao",dept:"technical",salary:"low",satisfaction:0.38,feedback:"Employee submitted resignation. Exit interview conducted and feedback documented."},
  {id:60,name:"Divya Sinha",dept:"technical",salary:"low",satisfaction:0.85,feedback:"Good communication skills and leadership potential. Suggested for leadership training program."},
  {id:61,name:"Rajesh Pillai",dept:"management",salary:"medium",satisfaction:0.85,feedback:"Performance has declined over the last quarter. PIP (Performance Improvement Plan) initiated."},
  {id:62,name:"Mohan Sinha",dept:"IT",salary:"medium",satisfaction:0.11,feedback:"Employee expressed interest in internal transfer. Request under review by department head."},
  {id:63,name:"Kiran Shah",dept:"IT",salary:"medium",satisfaction:0.10,feedback:"Excellent client handling and communication. Considered for promotion to senior role."},
  {id:64,name:"Deepak Mehta",dept:"IT",salary:"medium",satisfaction:0.36,feedback:"High performer with excellent problem-solving skills. Proactively contributes to team goals."},
  {id:65,name:"Arun Patel",dept:"IT",salary:"medium",satisfaction:0.11,feedback:"Employee demonstrates consistent performance and meets all KPIs."},
  {id:66,name:"Pooja Gupta",dept:"IT",salary:"medium",satisfaction:0.81,feedback:"Showed strong teamwork and collaboration. Needs improvement in time management."},
  {id:67,name:"Ravi Patel",dept:"product_mng",salary:"medium",satisfaction:0.43,feedback:"Employee demonstrates consistent performance and meets all KPIs."},
  {id:68,name:"Anitha Naidu",dept:"product_mng",salary:"medium",satisfaction:0.90,feedback:"Exceptional work quality and dedication. Nominated for employee of the quarter."},
  {id:69,name:"Meena Bhat",dept:"product_mng",salary:"medium",satisfaction:0.76,feedback:"Employee submitted resignation. Exit interview conducted and feedback documented."},
  {id:70,name:"Arun Gupta",dept:"product_mng",salary:"medium",satisfaction:0.43,feedback:"Completed assigned projects ahead of schedule. Received appreciation from the client."},
  {id:71,name:"Harish Rao",dept:"IT",salary:"medium",satisfaction:0.74,feedback:"Reported conflict with team members. Mediation session conducted by HR."},
  {id:72,name:"Harish Patel",dept:"product_mng",salary:"medium",satisfaction:0.09,feedback:"Excellent client handling and communication. Considered for promotion to senior role."},
  {id:73,name:"Anitha Shah",dept:"product_mng",salary:"high",satisfaction:0.45,feedback:"Employee expressed interest in internal transfer. Request under review by department head."},
  {id:74,name:"Swathi Nair",dept:"product_mng",salary:"low",satisfaction:0.09,feedback:"Positive attitude and willingness to learn. Enrolled in upskilling program for career growth."},
  {id:75,name:"Vikram Mishra",dept:"product_mng",salary:"medium",satisfaction:0.11,feedback:"Average performance with scope for improvement. Quarterly review set for further evaluation."},
  {id:76,name:"Meena Mehta",dept:"product_mng",salary:"medium",satisfaction:0.11,feedback:"Satisfactory performance overall. Minor improvements needed in documentation practices."},
  {id:77,name:"Harish Kumar",dept:"product_mng",salary:"medium",satisfaction:0.10,feedback:"Employee expressed interest in internal transfer. Request under review by department head."},
  {id:78,name:"Swathi Joshi",dept:"marketing",salary:"medium",satisfaction:0.40,feedback:"Average performance with scope for improvement. Quarterly review set for further evaluation."},
  {id:79,name:"Sonal Kumar",dept:"sales",salary:"low",satisfaction:0.43,feedback:"Reported conflict with team members. Mediation session conducted by HR."},
  {id:80,name:"Sunita Mishra",dept:"accounting",salary:"low",satisfaction:0.39,feedback:"Employee raised concerns about workload and stress. Work-life balance support to be provided."},
  {id:81,name:"Anitha Iyer",dept:"support",salary:"low",satisfaction:0.45,feedback:"Needs improvement in technical skills. Enrolled in internal training for skill enhancement."},
  {id:82,name:"Priya Iyer",dept:"technical",salary:"low",satisfaction:0.38,feedback:"High performer with excellent problem-solving skills. Proactively contributes to team goals."},
  {id:83,name:"Nitin Reddy",dept:"management",salary:"low",satisfaction:0.79,feedback:"Reported conflict with team members. Mediation session conducted by HR."},
  {id:84,name:"Rajesh Hegde",dept:"marketing",salary:"low",satisfaction:0.84,feedback:"Employee raised concerns about workload and stress. Work-life balance support to be provided."},
  {id:85,name:"Rajesh Mehta",dept:"marketing",salary:"low",satisfaction:0.11,feedback:"Excellent client handling and communication. Considered for promotion to senior role."},
  {id:86,name:"Vikram Singh",dept:"marketing",salary:"low",satisfaction:0.11,feedback:"Team player with consistent output. No major concerns noted during the review period."},
  {id:87,name:"Sonal Mehta",dept:"sales",salary:"low",satisfaction:0.17,feedback:"High performer with excellent problem-solving skills. Proactively contributes to team goals."},
  {id:88,name:"Meena Gupta",dept:"sales",salary:"low",satisfaction:0.44,feedback:"Employee submitted resignation. Exit interview conducted and feedback documented."},
  {id:89,name:"Harish Sinha",dept:"sales",salary:"low",satisfaction:0.37,feedback:"Average performance with scope for improvement. Quarterly review set for further evaluation."},
  {id:90,name:"Divya Nair",dept:"sales",salary:"low",satisfaction:0.10,feedback:"Showed strong teamwork and collaboration. Needs improvement in time management."},
  {id:91,name:"Pooja Nair",dept:"sales",salary:"low",satisfaction:0.40,feedback:"Frequent absenteeism observed. Counseling session scheduled with HR and manager."},
  {id:92,name:"Anitha Pillai",dept:"sales",salary:"low",satisfaction:0.89,feedback:"Employee has been disengaged lately. HR intervention recommended to understand concerns."},
  {id:93,name:"Lakshmi Bhat",dept:"sales",salary:"low",satisfaction:0.42,feedback:"Frequent absenteeism observed. Counseling session scheduled with HR and manager."},
  {id:94,name:"Harish Bhat",dept:"sales",salary:"low",satisfaction:0.46,feedback:"Satisfactory performance overall. Minor improvements needed in documentation practices."},
  {id:95,name:"Sunita Iyer",dept:"sales",salary:"low",satisfaction:0.09,feedback:"High performer with excellent problem-solving skills. Proactively contributes to team goals."},
  {id:96,name:"Kavitha Reddy",dept:"sales",salary:"low",satisfaction:0.37,feedback:"Reported conflict with team members. Mediation session conducted by HR."},
  {id:97,name:"Ravi Kumar",dept:"sales",salary:"low",satisfaction:0.10,feedback:"Frequent absenteeism observed. Counseling session scheduled with HR and manager."},
  {id:98,name:"Nitin Mehta",dept:"sales",salary:"low",satisfaction:0.10,feedback:"Exceptional work quality and dedication. Nominated for employee of the quarter."},
  {id:99,name:"Kavitha Das",dept:"sales",salary:"low",satisfaction:0.11,feedback:"Completed assigned projects ahead of schedule. Received appreciation from the client."},
  {id:100,name:"Kavitha Kumar",dept:"sales",salary:"medium",satisfaction:0.90,feedback:"Exceptional work quality and dedication. Nominated for employee of the quarter."}
];

const C = {
  blue:"#2563EB", indigo:"#4F46E5", violet:"#7C3AED",
  teal:"#0D9488", emerald:"#059669", amber:"#D97706",
  orange:"#EA580C", red:"#DC2626", rose:"#E11D48",
  gray:"#64748B", slate:"#475569",
  bg:"#F1F5F9", card:"#FFFFFF", border:"#E2E8F0",
  text:"#0F172A", muted:"#64748B"
};

const DEPT_COLOR_MAP = {
  "IT":C.blue,"R&D":C.violet,"Accounting":C.teal,"HR":C.amber,
  "Mgmt":C.rose,"Marketing":C.orange,"Product":C.indigo,
  "Sales":C.emerald,"Support":C.gray,"Technical":C.slate
};

const METRICS = [
  {key:"avg_satisfaction",label:"Avg Satisfaction",fmt:v=>(v*100).toFixed(1)+"%"},
  {key:"avg_hours",label:"Avg Monthly Hours",fmt:v=>v.toFixed(0)+"h"},
  {key:"avg_tenure",label:"Avg Tenure (yrs)",fmt:v=>v.toFixed(1)},
  {key:"avg_projects",label:"Avg Projects",fmt:v=>v.toFixed(1)},
  {key:"accidents",label:"Work Accidents",fmt:v=>v},
  {key:"promotions",label:"Promotions",fmt:v=>v}
];

const satColor = s => s >= 0.7 ? C.emerald : s >= 0.4 ? C.amber : C.red;
const satLabel = s => s >= 0.7 ? "High" : s >= 0.4 ? "Medium" : "Low";

const card = {background:C.card,borderRadius:"12px",border:`1px solid ${C.border}`,padding:"20px"};
const smallCard = {background:C.card,borderRadius:"10px",border:`1px solid ${C.border}`,padding:"14px 18px"};

const CustomTooltip = ({active,payload,label,fmt}) => {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:"#1E293B",borderRadius:"8px",padding:"10px 14px",boxShadow:"0 4px 16px rgba(0,0,0,0.2)"}}>
      <p style={{color:"#CBD5E1",fontSize:"12px",marginBottom:"6px"}}>{label}</p>
      {payload.map((p,i)=>(
        <p key={i} style={{color:p.color||"#F8FAFC",fontSize:"13px",fontWeight:500,margin:"2px 0"}}>
          {p.name}: {fmt?fmt(p.value):p.value}
        </p>
      ))}
    </div>
  );
};

function KpiCard({label,value,sub,accent,icon}){
  return(
    <div style={{...smallCard,borderTop:`3px solid ${accent||C.blue}`}}>
      <p style={{fontSize:"11px",fontWeight:600,color:C.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:"6px"}}>{label}</p>
      <p style={{fontSize:"26px",fontWeight:700,color:C.text,lineHeight:1,marginBottom:"4px"}}>{value}</p>
      {sub&&<p style={{fontSize:"12px",color:C.muted,marginTop:"2px"}}>{sub}</p>}
    </div>
  );
}

function SectionHeader({title,sub}){
  return(
    <div style={{marginBottom:"16px"}}>
      <h3 style={{fontSize:"15px",fontWeight:600,color:C.text,margin:0}}>{title}</h3>
      {sub&&<p style={{fontSize:"12px",color:C.muted,marginTop:"3px"}}>{sub}</p>}
    </div>
  );
}

function Overview(){
  const totalAcc = DEPT_STATS.reduce((a,d)=>a+d.accidents,0);
  const totalProm = DEPT_STATS.reduce((a,d)=>a+d.promotions,0);
  const totalEmp = DEPT_STATS.reduce((a,d)=>a+d.count,0);

  const kpis=[
    {label:"Total Employees",value:"15,787",sub:"Across 10 departments",accent:C.blue},
    {label:"Avg Satisfaction",value:"61.3%",sub:"Scale 0–100%",accent:C.emerald},
    {label:"Avg Monthly Hours",value:"201.1h",sub:"Per employee",accent:C.indigo},
    {label:"Work Accidents",value:"2,169",sub:`${((2169/15787)*100).toFixed(1)}% of workforce`,accent:C.amber},
    {label:"Promotions (5yr)",value:"319",sub:`${((319/15787)*100).toFixed(1)}% promoted`,accent:C.violet},
    {label:"Avg Projects",value:"3.79",sub:"Active projects/employee",accent:C.teal}
  ];

  return(
    <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
      {/* KPI Row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"12px"}}>
        {kpis.map(k=><KpiCard key={k.label} {...k}/>)}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1.4fr 0.6fr",gap:"20px"}}>
        {/* Satisfaction Distribution */}
        <div style={card}>
          <SectionHeader title="Satisfaction Level Distribution" sub="Number of employees by satisfaction band"/>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={SAT_DIST} margin={{top:5,right:10,left:0,bottom:5}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
              <XAxis dataKey="range" tick={{fontSize:12,fill:C.muted}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false} width={45}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Bar dataKey="count" radius={[4,4,0,0]} name="Employees">
                {SAT_DIST.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Salary Distribution */}
        <div style={card}>
          <SectionHeader title="Salary Bands" sub="Workforce composition"/>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={SALARY_DIST} cx="50%" cy="50%" innerRadius={52} outerRadius={80}
                dataKey="value" paddingAngle={3}>
                {SALARY_DIST.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip formatter={(v,n)=>[v.toLocaleString(),n]}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{display:"flex",flexDirection:"column",gap:"6px",marginTop:"8px"}}>
            {SALARY_DIST.map(s=>(
              <div key={s.name} style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:C.muted}}>
                  <span style={{width:10,height:10,borderRadius:"2px",background:s.color,display:"inline-block"}}/>
                  {s.name}
                </span>
                <span style={{fontSize:"12px",fontWeight:600,color:C.text}}>{s.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Headcount */}
      <div style={card}>
        <SectionHeader title="Department Headcount" sub="Total employees per department"/>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={[...DEPT_STATS].sort((a,b)=>b.count-a.count)} layout="vertical"
            margin={{top:0,right:20,left:60,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false}/>
            <XAxis type="number" tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/>
            <YAxis type="category" dataKey="dept" tick={{fontSize:12,fill:C.text}} axisLine={false} tickLine={false} width={70}/>
            <Tooltip content={<CustomTooltip/>}/>
            <Bar dataKey="count" radius={[0,4,4,0]} name="Employees">
              {DEPT_STATS.sort((a,b)=>b.count-a.count).map((d,i)=>(
                <Cell key={i} fill={DEPT_COLOR_MAP[d.dept]||C.blue}/>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Department({metric,setMetric}){
  const metricDef = METRICS.find(m=>m.key===metric)||METRICS[0];
  const sortedDepts = [...DEPT_STATS].sort((a,b)=>b[metric]-a[metric]);

  return(
    <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
      {/* Metric Selector */}
      <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
        <span style={{fontSize:"13px",color:C.muted,fontWeight:500}}>Compare by:</span>
        {METRICS.map(m=>(
          <button key={m.key} onClick={()=>setMetric(m.key)}
            style={{
              padding:"6px 14px",borderRadius:"20px",border:`1px solid ${metric===m.key?C.blue:C.border}`,
              background:metric===m.key?C.blue:"transparent",
              color:metric===m.key?"#fff":C.muted,
              fontSize:"12px",fontWeight:500,cursor:"pointer",transition:"all 0.15s"
            }}>
            {m.label}
          </button>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:"20px"}}>
        {/* Bar Chart */}
        <div style={card}>
          <SectionHeader title={`${metricDef.label} by Department`} sub="Click metric buttons above to switch view"/>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={sortedDepts} margin={{top:5,right:10,left:10,bottom:30}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
              <XAxis dataKey="dept" tick={{fontSize:11,fill:C.muted,angle:-30,textAnchor:"end"}} axisLine={false} tickLine={false} interval={0}/>
              <YAxis tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false} width={40}/>
              <Tooltip content={<CustomTooltip fmt={metricDef.fmt}/>}/>
              <Bar dataKey={metric} radius={[4,4,0,0]} name={metricDef.label}>
                {sortedDepts.map((d,i)=><Cell key={i} fill={DEPT_COLOR_MAP[d.dept]||C.blue}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Salary Stacked */}
        <div style={card}>
          <SectionHeader title="Salary Mix by Department" sub="Low / Medium / High breakdown"/>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={SALARY_DEPT} layout="vertical" margin={{top:0,right:10,left:55,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false}/>
              <XAxis type="number" tick={{fontSize:10,fill:C.muted}} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="dept" tick={{fontSize:11,fill:C.text}} axisLine={false} tickLine={false} width={65}/>
              <Tooltip/>
              <Bar dataKey="Low" stackId="a" fill="#94A3B8" name="Low"/>
              <Bar dataKey="Medium" stackId="a" fill={C.blue} name="Medium"/>
              <Bar dataKey="High" stackId="a" fill={C.violet} name="High" radius={[0,3,3,0]}/>
            </BarChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:"12px",marginTop:"8px",justifyContent:"center"}}>
            {[{c:"#94A3B8",n:"Low"},{c:C.blue,n:"Medium"},{c:C.violet,n:"High"}].map(s=>(
              <span key={s.n} style={{display:"flex",alignItems:"center",gap:"4px",fontSize:"11px",color:C.muted}}>
                <span style={{width:10,height:10,borderRadius:"2px",background:s.c,display:"inline-block"}}/>
                {s.n}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Department Table */}
      <div style={card}>
        <SectionHeader title="Department Summary Table" sub="All metrics at a glance"/>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"13px"}}>
            <thead>
              <tr style={{borderBottom:`2px solid ${C.border}`}}>
                {["Department","Employees","Avg Satisfaction","Avg Hours","Avg Tenure","Projects","Accidents","Promotions"].map(h=>(
                  <th key={h} style={{textAlign:"left",padding:"8px 12px",color:C.muted,fontWeight:600,fontSize:"11px",letterSpacing:"0.04em",textTransform:"uppercase"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEPT_STATS.map((d,i)=>(
                <tr key={d.dept} style={{borderBottom:`1px solid ${C.border}`,background:i%2===0?"transparent":"#FAFAFA"}}>
                  <td style={{padding:"10px 12px",fontWeight:600,color:C.text}}>
                    <span style={{display:"flex",alignItems:"center",gap:"8px"}}>
                      <span style={{width:8,height:8,borderRadius:"50%",background:DEPT_COLOR_MAP[d.dept]||C.blue,display:"inline-block"}}/>
                      {d.dept}
                    </span>
                  </td>
                  <td style={{padding:"10px 12px",color:C.text}}>{d.count.toLocaleString()}</td>
                  <td style={{padding:"10px 12px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                      <div style={{width:60,height:6,borderRadius:3,background:"#E2E8F0"}}>
                        <div style={{width:`${d.avg_satisfaction*100}%`,height:"100%",borderRadius:3,background:satColor(d.avg_satisfaction)}}/>
                      </div>
                      <span style={{fontSize:"12px",color:satColor(d.avg_satisfaction),fontWeight:600}}>{(d.avg_satisfaction*100).toFixed(1)}%</span>
                    </div>
                  </td>
                  <td style={{padding:"10px 12px",color:C.muted}}>{d.avg_hours.toFixed(0)}h</td>
                  <td style={{padding:"10px 12px",color:C.muted}}>{d.avg_tenure.toFixed(1)} yrs</td>
                  <td style={{padding:"10px 12px",color:C.muted}}>{d.avg_projects.toFixed(1)}</td>
                  <td style={{padding:"10px 12px",color:C.muted}}>{d.accidents}</td>
                  <td style={{padding:"10px 12px",color:C.muted}}>{d.promotions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Trends(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
      {/* KPI Trend Row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"12px"}}>
        <div style={{...smallCard,borderTop:`3px solid ${C.blue}`}}>
          <p style={{fontSize:"11px",fontWeight:600,color:C.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:"4px"}}>Peak Submissions Month</p>
          <p style={{fontSize:"22px",fontWeight:700,color:C.text,margin:0}}>Nov '25</p>
          <p style={{fontSize:"12px",color:C.muted,marginTop:"2px"}}>1,052 forms submitted</p>
        </div>
        <div style={{...smallCard,borderTop:`3px solid ${C.emerald}`}}>
          <p style={{fontSize:"11px",fontWeight:600,color:C.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:"4px"}}>Peak Satisfaction Month</p>
          <p style={{fontSize:"22px",fontWeight:700,color:C.text,margin:0}}>Nov '25</p>
          <p style={{fontSize:"12px",color:C.muted,marginTop:"2px"}}>62.6% avg satisfaction</p>
        </div>
        <div style={{...smallCard,borderTop:`3px solid ${C.amber}`}}>
          <p style={{fontSize:"11px",fontWeight:600,color:C.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:"4px"}}>Peak Hours Month</p>
          <p style={{fontSize:"22px",fontWeight:700,color:C.text,margin:0}}>Oct '25</p>
          <p style={{fontSize:"12px",color:C.muted,marginTop:"2px"}}>203.8 avg monthly hours</p>
        </div>
      </div>

      {/* Submission Volume */}
      <div style={card}>
        <SectionHeader title="Monthly Form Submission Volume" sub="Total attrition forms submitted per month (Jan 2025 – Apr 2026)"/>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={MONTHLY} margin={{top:5,right:20,left:0,bottom:5}}>
            <defs>
              <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.blue} stopOpacity={0.15}/>
                <stop offset="95%" stopColor={C.blue} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
            <XAxis dataKey="m" tick={{fontSize:10,fill:C.muted}} axisLine={false} tickLine={false} interval={1}/>
            <YAxis tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false} width={40} domain={[600,1200]}/>
            <Tooltip content={<CustomTooltip/>}/>
            <Area type="monotone" dataKey="submissions" stroke={C.blue} strokeWidth={2.5}
              fill="url(#subGrad)" name="Submissions" dot={{r:3,fill:C.blue,strokeWidth:0}}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"}}>
        {/* Satisfaction Trend */}
        <div style={card}>
          <SectionHeader title="Average Satisfaction Trend" sub="Monthly satisfaction score (%)"/>
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={MONTHLY} margin={{top:5,right:20,left:0,bottom:5}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
              <XAxis dataKey="m" tick={{fontSize:9,fill:C.muted}} axisLine={false} tickLine={false} interval={2}/>
              <YAxis tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false} width={35} domain={[58,65]}/>
              <Tooltip content={<CustomTooltip fmt={v=>v.toFixed(1)+"%"}/>}/>
              <Line type="monotone" dataKey="satisfaction" stroke={C.emerald} strokeWidth={2.5} name="Satisfaction %"
                dot={{r:3,fill:C.emerald,strokeWidth:0}} activeDot={{r:5}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Hours Trend */}
        <div style={card}>
          <SectionHeader title="Average Monthly Hours Trend" sub="Avg hours worked per employee per month"/>
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={MONTHLY} margin={{top:5,right:20,left:0,bottom:5}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
              <XAxis dataKey="m" tick={{fontSize:9,fill:C.muted}} axisLine={false} tickLine={false} interval={2}/>
              <YAxis tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false} width={40} domain={[195,207]}/>
              <Tooltip content={<CustomTooltip fmt={v=>v.toFixed(1)+"h"}/>}/>
              <Line type="monotone" dataKey="hours" stroke={C.amber} strokeWidth={2.5} name="Avg Hours"
                dot={{r:3,fill:C.amber,strokeWidth:0}} activeDot={{r:5}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function FeedbackExplorer({search,setSearch,deptFilter,setDeptFilter,salaryFilter,setSalaryFilter}){
  const allDepts = [...new Set(FEEDBACK.map(f=>f.dept))].sort();

  const filtered = useMemo(()=>{
    const q = search.toLowerCase();
    return FEEDBACK.filter(f=>{
      const matchQ = !q || f.name.toLowerCase().includes(q) || f.feedback.toLowerCase().includes(q) || f.dept.toLowerCase().includes(q);
      const matchD = deptFilter==="all" || f.dept===deptFilter;
      const matchS = salaryFilter==="all" || f.salary===salaryFilter;
      return matchQ && matchD && matchS;
    });
  },[search,deptFilter,salaryFilter]);

  const avgSat = filtered.length ? (filtered.reduce((a,f)=>a+f.satisfaction,0)/filtered.length) : 0;

  return(
    <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
      {/* Filter Bar */}
      <div style={{...card,padding:"14px 18px"}}>
        <div style={{display:"flex",gap:"10px",alignItems:"center",flexWrap:"wrap"}}>
          <div style={{position:"relative",flex:"1",minWidth:"200px"}}>
            <span style={{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",fontSize:"14px",color:C.muted,pointerEvents:"none"}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search by name, feedback, or department…"
              style={{width:"100%",padding:"9px 12px 9px 36px",borderRadius:"8px",border:`1px solid ${C.border}`,
                background:"#F8FAFC",fontSize:"13px",outline:"none",boxSizing:"border-box",color:C.text}}/>
          </div>
          <select value={deptFilter} onChange={e=>setDeptFilter(e.target.value)}
            style={{padding:"9px 12px",borderRadius:"8px",border:`1px solid ${C.border}`,background:"#F8FAFC",fontSize:"13px",color:C.text,cursor:"pointer",outline:"none"}}>
            <option value="all">All Departments</option>
            {allDepts.map(d=><option key={d} value={d}>{d.charAt(0).toUpperCase()+d.slice(1)}</option>)}
          </select>
          <select value={salaryFilter} onChange={e=>setSalaryFilter(e.target.value)}
            style={{padding:"9px 12px",borderRadius:"8px",border:`1px solid ${C.border}`,background:"#F8FAFC",fontSize:"13px",color:C.text,cursor:"pointer",outline:"none"}}>
            <option value="all">All Salary Levels</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div style={{display:"flex",gap:"10px",marginLeft:"auto"}}>
            <div style={{textAlign:"center",padding:"6px 14px",borderRadius:"8px",background:"#EEF2FF",border:"1px solid #C7D2FE"}}>
              <p style={{fontSize:"11px",color:"#4338CA",fontWeight:600,margin:0}}>SHOWING</p>
              <p style={{fontSize:"16px",fontWeight:700,color:"#312E81",margin:0}}>{filtered.length}</p>
            </div>
            <div style={{textAlign:"center",padding:"6px 14px",borderRadius:"8px",background:"#F0FDF4",border:"1px solid #BBF7D0"}}>
              <p style={{fontSize:"11px",color:"#15803D",fontWeight:600,margin:0}}>AVG SAT</p>
              <p style={{fontSize:"16px",fontWeight:700,color:"#14532D",margin:0}}>{(avgSat*100).toFixed(0)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length===0 ? (
        <div style={{...card,textAlign:"center",padding:"48px",color:C.muted}}>
          <p style={{fontSize:"32px",margin:"0 0 8px"}}>🔍</p>
          <p style={{fontSize:"15px",fontWeight:500}}>No records match your search</p>
          <p style={{fontSize:"13px"}}>Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:"12px",maxHeight:"580px",overflowY:"auto",paddingRight:"4px"}}>
          {filtered.map(f=>{
            const sc = satColor(f.satisfaction);
            const sl = satLabel(f.satisfaction);
            const initials = f.name.split(" ").map(n=>n[0]).join("").slice(0,2);
            const deptColor = Object.entries(DEPT_COLOR_MAP).find(([k])=>k.toLowerCase()===f.dept.toLowerCase())?.[1]||C.blue;
            return(
              <div key={f.id} style={{background:C.card,borderRadius:"10px",border:`1px solid ${C.border}`,padding:"14px 16px",transition:"box-shadow 0.15s"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:"10px",marginBottom:"10px"}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:`${deptColor}18`,display:"flex",
                    alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"12px",fontWeight:700,color:deptColor}}>
                    {initials}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{fontSize:"14px",fontWeight:600,color:C.text,margin:"0 0 2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.name}</p>
                    <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                      <span style={{fontSize:"10px",fontWeight:600,padding:"2px 8px",borderRadius:"10px",background:`${deptColor}15`,color:deptColor}}>
                        {f.dept.charAt(0).toUpperCase()+f.dept.slice(1)}
                      </span>
                      <span style={{fontSize:"10px",fontWeight:600,padding:"2px 8px",borderRadius:"10px",background:"#F1F5F9",color:C.muted}}>
                        {f.salary.charAt(0).toUpperCase()+f.salary.slice(1)} salary
                      </span>
                    </div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <p style={{fontSize:"16px",fontWeight:700,color:sc,margin:"0 0 2px"}}>{(f.satisfaction*100).toFixed(0)}%</p>
                    <span style={{fontSize:"10px",fontWeight:600,padding:"2px 8px",borderRadius:"10px",
                      background:`${sc}15`,color:sc}}>{sl}</span>
                  </div>
                </div>
                {/* Satisfaction Bar */}
                <div style={{width:"100%",height:4,borderRadius:2,background:"#E2E8F0",marginBottom:"10px"}}>
                  <div style={{width:`${f.satisfaction*100}%`,height:"100%",borderRadius:2,background:sc,transition:"width 0.3s"}}/>
                </div>
                <p style={{fontSize:"12px",color:C.muted,lineHeight:"1.6",margin:0}}>{f.feedback}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}



export default function App() {
  // All hooks at the top level (always called in the same order)
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"
  const [session, setSession] = useState(null); // { user, access_token }
  const [notice, setNotice] = useState("");
  const [tab, setTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [salaryFilter, setSalaryFilter] = useState("all");
  const [metric, setMetric] = useState("avg_satisfaction");

  const tabs = [
    { id: "overview", label: "Overview", icon: "◈" },
    { id: "department", label: "Department", icon: "◉" },
    { id: "trends", label: "Trends", icon: "◇" },
    { id: "feedback", label: "Feedback Explorer", icon: "◎" }
  ];

  function handleLogout() {
    setSession(null);
    setAuthMode("login");
    setNotice("You have been signed out.");
  }

  // Conditional rendering only, not conditional hooks
  if (!session) {
    if (authMode === "signup") {
      return (
        <SignupPage
          onSwitch={() => { setAuthMode("login"); setNotice(""); }}
          onSignupSuccess={(response) => {
            setSession({ user: response.user, access_token: response.access_token });
            setNotice("");
          }}
        />
      );
    }
    return (
      <LoginPage
        onSwitch={() => { setAuthMode("signup"); setNotice(""); }}
        notice={notice}
        onLoginSuccess={(response) => {
          setSession({ user: response.user, access_token: response.access_token });
          setNotice("");
        }}
      />
    );
  }

  return (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", background: C.bg, minHeight: "100vh", padding: "24px 28px" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } *::-webkit-scrollbar{width:6px;height:6px} *::-webkit-scrollbar-track{background:#F1F5F9} *::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:3px}`}</style>

      {/* Top Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px", flexWrap: "wrap", gap: "12px" }}>
        {/* Left: Title and subtitle */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 700, color: C.text, letterSpacing: "-0.3px", marginBottom: 2 }}>Employee Attrition Analytics</h1>
            <p style={{ fontSize: "12px", color: C.muted, marginTop: "3px" }}>15,787 employees · Jan 2025 – Apr 2026</p>
          </div>
        </div>
        {/* Center: Search bar */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: 300 }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: C.muted, pointerEvents: "none" }}>⌕</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search records…"
              style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: 8, border: `1px solid ${C.border}`,
                background: C.card, fontSize: 13, outline: "none", color: C.text }} />
            {search && <button onClick={() => setSearch("")}
              style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 14 }}>×</button>}
          </div>
        </div>
        {/* Right: Sign Out button */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <button onClick={handleLogout} style={{ background: C.red, color: "#fff", border: "none", borderRadius: 6, padding: "8px 18px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Sign Out</button>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ display: "flex", gap: "2px", background: C.card, padding: "4px", borderRadius: "10px",
        border: `1px solid ${C.border}`, marginBottom: "22px", width: "fit-content" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 18px", borderRadius: "8px", border: "none", cursor: "pointer",
              fontSize: "13px", fontWeight: tab === t.id ? 600 : 400, transition: "all 0.15s",
              background: tab === t.id ? C.blue : "transparent",
              color: tab === t.id ? "#fff" : C.muted
            }}>
            <span style={{ fontSize: "10px" }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Dashboard Content */}
      {tab === "overview" && <Overview />}
      {tab === "department" && <Department metric={metric} setMetric={setMetric} />}
      {tab === "trends" && <Trends />}
      {tab === "feedback" && (
        <FeedbackExplorer
          search={search} setSearch={setSearch}
          deptFilter={deptFilter} setDeptFilter={setDeptFilter}
          salaryFilter={salaryFilter} setSalaryFilter={setSalaryFilter}
        />
      )}
    </div>
  );
}