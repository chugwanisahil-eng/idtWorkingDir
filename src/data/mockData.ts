export interface Project {
  id: string;
  name: string;
  department: string;
  type: 'Road' | 'Water' | 'Electricity' | 'Health';
  budget: number;
  startDate: string;
  endDate: string;
  contractor: string;
  contractorId: string;
  progress: number;
  status: 'On-track' | 'Delayed' | 'Completed';
  description: string;
  delayReason?: string;
  images: string[];
  documents: string[];
  location: string;
}

export interface Contractor {
  id: string;
  name: string;
  email: string;
  company: string;
  projects: string[];
  rating: number;
}

export interface Complaint {
  id: string;
  projectId: string;
  projectName: string;
  citizenId: string;
  category: 'Road issue' | 'Delay issue' | 'Service problem' | 'Quality concern' | 'Other';
  description: string;
  status: 'Submitted' | 'Under Review' | 'Assigned' | 'Resolved';
  createdAt: string;
  image?: string;
  assignedTo?: string;
}

export const projects: Project[] = [
  {
    id: 'PRJ001',
    name: 'Highway NH-48 Expansion',
    department: 'Public Works Department',
    type: 'Road',
    budget: 125000000,
    startDate: '2024-01-15',
    endDate: '2025-06-30',
    contractor: 'BuildRight Infrastructure',
    contractorId: 'CON001',
    progress: 68,
    status: 'On-track',
    description: 'Expansion of National Highway 48 from 4 lanes to 6 lanes covering 25 km stretch with modern drainage systems and LED street lighting.',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    documents: ['Project_Plan.pdf', 'Environmental_Clearance.pdf'],
    location: 'Delhi-Gurgaon Sector',
  },
  {
    id: 'PRJ002',
    name: 'Smart Water Grid Installation',
    department: 'Water Supply Board',
    type: 'Water',
    budget: 45000000,
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    contractor: 'AquaTech Solutions',
    contractorId: 'CON002',
    progress: 42,
    status: 'Delayed',
    description: 'Installation of smart water meters and automated distribution system across 15 residential zones.',
    delayReason: 'Supply chain disruption for smart meters due to import delays',
    images: ['/placeholder.svg', '/placeholder.svg'],
    documents: ['Technical_Specs.pdf'],
    location: 'Central District',
  },
  {
    id: 'PRJ003',
    name: 'Solar Power Grid Phase-2',
    department: 'Energy Department',
    type: 'Electricity',
    budget: 89000000,
    startDate: '2023-09-01',
    endDate: '2024-08-31',
    contractor: 'GreenEnergy Corp',
    contractorId: 'CON003',
    progress: 100,
    status: 'Completed',
    description: 'Installation of 50MW solar power capacity with grid integration and battery storage systems.',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    documents: ['Completion_Report.pdf', 'Quality_Audit.pdf'],
    location: 'Industrial Zone East',
  },
  {
    id: 'PRJ004',
    name: 'District Hospital Upgrade',
    department: 'Health Ministry',
    type: 'Health',
    budget: 67000000,
    startDate: '2024-02-15',
    endDate: '2025-02-14',
    contractor: 'MediBuild Associates',
    contractorId: 'CON001',
    progress: 55,
    status: 'On-track',
    description: 'Modernization of district hospital including new ICU wing, diagnostic center, and emergency facilities.',
    images: ['/placeholder.svg', '/placeholder.svg'],
    documents: ['Architectural_Plan.pdf', 'Equipment_List.pdf'],
    location: 'South District',
  },
  {
    id: 'PRJ005',
    name: 'Underground Cable Network',
    department: 'Energy Department',
    type: 'Electricity',
    budget: 34000000,
    startDate: '2024-04-01',
    endDate: '2024-10-31',
    contractor: 'PowerLine Industries',
    contractorId: 'CON004',
    progress: 78,
    status: 'On-track',
    description: 'Conversion of overhead power lines to underground cables in heritage zone covering 8 km.',
    images: ['/placeholder.svg'],
    documents: ['Route_Map.pdf'],
    location: 'Heritage Zone',
  },
  {
    id: 'PRJ006',
    name: 'Ring Road Construction',
    department: 'Public Works Department',
    type: 'Road',
    budget: 250000000,
    startDate: '2023-06-01',
    endDate: '2025-12-31',
    contractor: 'BuildRight Infrastructure',
    contractorId: 'CON001',
    progress: 35,
    status: 'Delayed',
    description: '45 km ring road with 6 interchanges, service roads, and pedestrian overpasses.',
    delayReason: 'Land acquisition delays in sector 7 and 8',
    images: ['/placeholder.svg', '/placeholder.svg'],
    documents: ['Master_Plan.pdf', 'Land_Survey.pdf'],
    location: 'City Periphery',
  },
];

export const contractors: Contractor[] = [
  {
    id: 'CON001',
    name: 'BuildRight Infrastructure',
    email: 'contact@buildright.com',
    company: 'BuildRight Infrastructure Pvt Ltd',
    projects: ['PRJ001', 'PRJ004', 'PRJ006'],
    rating: 4.5,
  },
  {
    id: 'CON002',
    name: 'AquaTech Solutions',
    email: 'info@aquatech.com',
    company: 'AquaTech Solutions Ltd',
    projects: ['PRJ002'],
    rating: 4.2,
  },
  {
    id: 'CON003',
    name: 'GreenEnergy Corp',
    email: 'support@greenenergy.com',
    company: 'GreenEnergy Corporation',
    projects: ['PRJ003'],
    rating: 4.8,
  },
  {
    id: 'CON004',
    name: 'PowerLine Industries',
    email: 'contact@powerline.com',
    company: 'PowerLine Industries Pvt Ltd',
    projects: ['PRJ005'],
    rating: 4.0,
  },
];

export const complaints: Complaint[] = [
  {
    id: 'CMP001',
    projectId: 'PRJ001',
    projectName: 'Highway NH-48 Expansion',
    citizenId: 'CIT001',
    category: 'Road issue',
    description: 'The temporary road diversion near sector 5 has too many potholes causing vehicle damage.',
    status: 'Under Review',
    createdAt: '2024-11-28',
    assignedTo: 'CON001',
  },
  {
    id: 'CMP002',
    projectId: 'PRJ002',
    projectName: 'Smart Water Grid Installation',
    citizenId: 'CIT001',
    category: 'Delay issue',
    description: 'The project deadline has been extended twice. When will our area get the smart meters?',
    status: 'Assigned',
    createdAt: '2024-11-25',
    assignedTo: 'CON002',
  },
  {
    id: 'CMP003',
    projectId: 'PRJ006',
    projectName: 'Ring Road Construction',
    citizenId: 'CIT002',
    category: 'Service problem',
    description: 'Construction noise continues past 10 PM violating noise pollution norms.',
    status: 'Resolved',
    createdAt: '2024-11-20',
    assignedTo: 'CON001',
  },
  {
    id: 'CMP004',
    projectId: 'PRJ004',
    projectName: 'District Hospital Upgrade',
    citizenId: 'CIT003',
    category: 'Quality concern',
    description: 'The newly constructed waiting area has visible cracks on the ceiling.',
    status: 'Submitted',
    createdAt: '2024-12-01',
  },
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
