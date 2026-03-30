import { VideoIcon, CheckIcon, PersonIcon, CheckCircledIcon } from '@radix-ui/react-icons';

const iconClass = "text-neutral/80 w-5 h-5 group-hover:text-[#5BB98B] transition-all duration-300 ease-in-out";

export const icon = {
  video: <VideoIcon className={iconClass}/>,
  check: <CheckIcon className={iconClass}/>,
  person: <PersonIcon className={iconClass}/>
}

export const status = [
  { 
    id: 1, 
    title: 'Ongoing Classes Right Now', 
    status: 12, 
    type: 'video', 
    details: `11 Instructors Present - 1 Unattended Class` 
  },
  { 
    id: 2, 
    title: 'Pending Approvals',
    status: 8, 
    type: 'check', 
    details: `4 Leave Requests - 4 Schedule Changes` 
  },
  { 
    id: 3, 
    title: "Today's Total Shifts", 
    status: 45, 
    type: 'person', 
    details: `Scheduled across 8 Departments` 
  }
]

export const sched = [
  { 
    id: 1, 
    time: '09:00 AM - 10:30 AM', 
    subject: 'CS-102: Data Structures', 
    professor: 'Prof. Sarah Jenkins' 
  },
  { 
    id: 2, 
    time: '10:00 AM - 11:30 AM', 
    subject: 'IT-201: Network Security', 
    professor: 'Dr. Alan Turing' 
  },
  { 
    id: 3, 
    time: '10:30 AM - 12:00 PM', 
    subject: 'CS-405: Artificial Intelligence', 
    professor: 'Prof. Grace Hopper' 
  },
  { 
    id: 4, 
    time: '11:00 AM - 12:30 PM', 
    subject: 'IT-303: Database Management', 
    professor: 'Dr. Edgar Codd' 
  },
  { 
    id: 5, 
    time: '11:30 AM - 01:00 PM', 
    subject: 'CS-202: Operating Systems', 
    professor: 'Prof. Linus Torvalds' 
  }
]

export const arrival = [
  { 
    id: 1, 
    name: 'Dr. Maria Santos', 
    subject: 'Discrete Math', 
    time: '1:00 PM', 
    status: 'Not Yet Clocked In'
  },
  { 
    id: 2, 
    name: 'Prof. James Wilson', 
    subject: 'Human Computer Interaction', 
    time: '1:30 PM', 
    status: 'Not Yet Clocked In'
  },
  { 
    id: 3, 
    name: 'Dr. Linda Chen', 
    subject: 'Mobile Dev', 
    time: '2:00 PM', 
    status: 'Not Yet Clocked In'
  },
  { 
    id: 4, 
    name: 'Prof. Robert Brown', 
    subject: 'Ethics in IT', 
    time: '2:00 PM', 
    status: 'Not Yet Clocked In'
  },
  { 
    id: 5, 
    name: 'Dr. Emily Davis', 
    subject: 'Cloud Computing', 
    time: '2:30 PM', 
    status: 'Not Yet Clocked In'
  }
]

export const weekly = [
  {
    id: 1,
    icon: CheckCircledIcon,
    label: "Attendance Rate",
    value: "97.8% this week"
  },
  {
    id: 2,
    icon: PersonIcon,
    label: "Substitution Pool",
    value: "5 Faculty available"
  }
]