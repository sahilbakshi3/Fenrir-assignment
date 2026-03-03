export const orgStats = {
  org: 'Project X',
  owner: 'Nammagiri',
  totalScans: 100,
  scheduled: 1000,
  rescans: 100,
  failedScans: 100,
  lastUpdated: '10 mins ago',
};

export const severityStats = [
  { label: 'Critical Severity', count: 86, change: '+2%', direction: 'up', color: 'critical' },
  { label: 'High Severity', count: 16, change: '+0.9%', direction: 'up', color: 'high' },
  { label: 'Medium Severity', count: 26, change: '+0.9%', direction: 'down', color: 'medium' },
  { label: 'Low Severity', count: 16, change: '+0.9%', direction: 'up', color: 'low' },
];

export const scans = [
  { id: 1, name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 2, name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 3, name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 4, name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 5, name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 6, name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 7, name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 8, name: 'Web App Servers', type: 'Greybox', status: 'Scheduled', progress: 100, vuln: { critical: 5, high: 12, medium: null, low: null }, lastScan: '4d ago' },
  { id: 9, name: 'Web App Servers', type: 'Greybox', status: 'Scheduled', progress: 100, vuln: { critical: 5, high: 12, medium: null, low: null }, lastScan: '4d ago' },
  { id: 10, name: 'IoT Devices', type: 'Blackbox', status: 'Failed', progress: 10, vuln: { critical: 2, high: 4, medium: 8, low: 1 }, lastScan: '3d ago' },
  { id: 11, name: 'Temp Data', type: 'Blackbox', status: 'Failed', progress: 10, vuln: { critical: 2, high: 4, medium: 8, low: 1 }, lastScan: '3d ago' },
  { id: 12, name: 'API Gateway', type: 'Blackbox', status: 'Completed', progress: 100, vuln: { critical: 3, high: 7, medium: 15, low: 9 }, lastScan: '2d ago' },
  { id: 13, name: 'Mobile Backend', type: 'Greybox', status: 'Scheduled', progress: 60, vuln: { critical: 1, high: 3, medium: null, low: null }, lastScan: '1d ago' },
  { id: 14, name: 'Cloud Storage', type: 'Whitebox', status: 'Completed', progress: 100, vuln: { critical: 0, high: 2, medium: 11, low: 22 }, lastScan: '5d ago' },
  { id: 15, name: 'Auth Service', type: 'Greybox', status: 'Completed', progress: 100, vuln: { critical: 7, high: 9, medium: 4, low: 2 }, lastScan: '6d ago' },
];

export const activeScan = {
  id: 'scan-001',
  name: 'New Scan',
  breadcrumb: ['Private Assets', 'New Scan'],
  progress: 0,
  status: 'In Progress',
  steps: ['Spidering', 'Mapping', 'Testing', 'Validating', 'Reporting'],
  activeStep: 0,
  scanType: 'Grey Box',
  targets: 'google.com',
  startedAt: 'Nov 22, 09:00AM',
  credentials: '2 Active',
  files: 'Control.pdf',
  checklists: '40/350',
};

export const activityLogs = [
  {
    id: 1,
    time: '09:00:00',
    text: "I'll begin a systematic penetration test on ",
    highlights: [{ text: 'helpdesk.democorp.com', type: 'url' }],
    suffix: '. Let me start with reconnaissance and enumeration.',
  },
  {
    id: 2,
    time: '09:01:00',
    text: 'Good! target is online. Now let me perform port scanning to identify running services.',
  },
  {
    id: 3,
    time: '09:02:00',
    text: 'Excellent reconnaissance results:\n  - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure.',
  },
  {
    id: 4,
    time: '09:03:00',
    text: 'Great! I found a login page for a Help Desk Platform. I can see a useful comment: ',
    highlights: [{ text: '"TODO: Delete the testing account (test:test)"', type: 'string' }],
    suffix: '. Let me test this credential. The login redirects to ',
    highlights2: [{ text: '/password/test', type: 'path' }],
    suffix2: '. Let me follow that path and explore it.',
  },
  {
    id: 5,
    time: '09:04:00',
    text: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to ",
    highlights: [{ text: "'#'", type: 'string' }],
    suffix: ' which means the current page. Let me try a different approach.',
  },
  {
    id: 6,
    time: '09:05:00',
    text: "It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the ",
    highlights: [{ text: 'test:test', type: 'url' }],
    suffix: ' password directly on other endpoints.',
  },
  {
    id: 7,
    time: '09:06:00',
    text: "Great! I can access the dashboard using the ",
    highlights: [{ text: "'X-UserId: 10032'", type: 'path' }],
    suffix: ' header. The dashboard shows "Welcome, John Doe". This suggests an ',
    highlights2: [{ text: '**IDOR vulnerability**', type: 'bold' }],
    suffix2: " - I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application...",
  },
];

export const verificationLogs = [
  { id: 1, time: '09:10:00', text: 'Starting verification loop for SQL injection findings...' },
  { id: 2, time: '09:11:00', text: 'Confirmed: payload `\' OR 1=1--` returns 200 with all users listed.', highlights: [{ text: "' OR 1=1--", type: 'path' }] },
  { id: 3, time: '09:12:00', text: 'Time-based blind injection verified. Response delay: 5.2s with SLEEP(5).' },
  { id: 4, time: '09:13:00', text: 'IDOR validation: Accessed user IDs 10001 through 10050 successfully.', highlights: [{ text: '10001 through 10050', type: 'url' }] },
  { id: 5, time: '09:14:00', text: 'Rate limit bypass confirmed. 500 requests/minute with no throttling detected.' },
];

export const findings = [
  {
    id: 1,
    severity: 'Critical',
    time: '10:45:23',
    title: 'SQL Injection in Authentication Endpoint',
    endpoint: '/api/users/profile',
    description: 'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.',
  },
  {
    id: 2,
    severity: 'High',
    time: '10:45:23',
    title: 'Unauthorized Access to User Metadata',
    endpoint: '/api/auth/login',
    description: 'Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.',
  },
  {
    id: 3,
    severity: 'Medium',
    time: '10:45:23',
    title: 'Broken Authentication Rate Limiting',
    endpoint: '/api/search',
    description: 'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.',
  },
  {
    id: 4,
    severity: 'High',
    time: '10:46:01',
    title: 'Reflected XSS in Search Parameter',
    endpoint: '/api/search?q=',
    description: 'User-supplied input in the search parameter is reflected without sanitization, allowing script execution.',
  },
  {
    id: 5,
    severity: 'Low',
    time: '10:46:45',
    title: 'Verbose Error Messages Exposed',
    endpoint: '/api/internal/debug',
    description: 'Stack traces and internal paths are returned in 500 error responses, leaking implementation details.',
  },
];
