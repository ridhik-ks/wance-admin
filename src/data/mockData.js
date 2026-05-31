export const dashboardStats = [
  { label: 'Total Clients', value: '1,284', change: '+4.2%', changeType: 'positive' },
  { label: 'Active Clients', value: '1,102', change: '85.8%', changeType: 'neutral' },
  { label: 'Platform Messages', value: '4.82M', change: '+12%', changeType: 'positive' },
  { label: 'Total Top-up', value: '₹28.4L', icon: 'trending', changeType: 'positive' },
  { label: 'MRR', value: '₹3.84L', change: 'Stable', changeType: 'neutral' },
];

export const recentClients = [
  { id: 1, name: 'Zomato Solutions', industry: 'Logistics', initials: 'ZS', plan: 'Enterprise', status: 'Active', joined: 'Oct 24, 2023', color: 'bg-primary/10 text-primary' },
  { id: 2, name: 'Bharat Tech', industry: 'SaaS', initials: 'BT', plan: 'Growth', status: 'Trial', joined: 'Oct 23, 2023', color: 'bg-secondary-container text-on-secondary-container' },
  { id: 3, name: 'Indi Hotels', industry: 'Hospitality', initials: 'IH', plan: 'Pro', status: 'Active', joined: 'Oct 23, 2023', color: 'bg-tertiary-fixed text-on-tertiary-fixed-variant' },
  { id: 4, name: 'Reliance Retail', industry: 'Ecommerce', initials: 'RV', plan: 'Enterprise', status: 'Suspended', joined: 'Oct 22, 2023', color: 'bg-error-container text-on-error-container' },
  { id: 5, name: 'Apollo Labs', industry: 'Healthcare', initials: 'AP', plan: 'Starter', status: 'Active', joined: 'Oct 21, 2023', color: 'bg-surface-container-highest text-on-surface-variant' },
];

export const topClients = [
  { name: 'HDFC Bank', msgs: '842k', pct: 95 },
  { name: 'Flipkart Marketplace', msgs: '720k', pct: 82 },
  { name: 'Ola Electric', msgs: '612k', pct: 68 },
  { name: 'Swiggy Instamart', msgs: '588k', pct: 62 },
  { name: 'ICICI Direct', msgs: '420k', pct: 48 },
];

export const clients = [
  { id: 1, shop: 'Mahfuzul Gadgets', phone: '+91 98765 43210', initials: 'MG', plan: 'Pro', status: 'Active', balance: 2450, messages: 12482, registered: 'Oct 12, 2023', owner: 'Mahfuzul Islam', color: 'bg-primary-container/10 text-primary' },
  { id: 2, shop: 'Green Basket Organics', phone: '+91 90123 45678', initials: 'GB', plan: 'Growth', status: 'Active', balance: 80, messages: 3921, registered: 'Jan 05, 2024', owner: 'Saritha Reddy', color: 'bg-status-active-bg text-status-active', lowBalance: true },
  { id: 3, shop: 'Fatima Fashion House', phone: '+91 88822 11000', initials: 'FF', plan: 'Starter', status: 'Suspended', balance: 0, messages: 156, registered: 'Feb 18, 2024', owner: 'Fatima Zahra', color: 'bg-plan-starter text-on-secondary-fixed-variant', suspended: true },
  { id: 4, shop: 'Reliance Luxe', phone: '+91 99999 88888', initials: 'RL', plan: 'Enterprise', status: 'Active', balance: 85000, messages: 450230, registered: 'Jun 01, 2023', owner: 'Arjun Ambani', color: 'bg-plan-enterprise text-white' },
  { id: 5, shop: 'The Cafe Corner', phone: '+91 77766 55443', initials: 'TC', plan: 'Starter', status: 'Churned', balance: 0, messages: 2104, registered: 'Mar 20, 2023', owner: 'Meera Nair', color: 'bg-surface-container-highest text-outline', churned: true },
];

export const clientStats = [
  { label: 'Active Subscriptions', value: '1,166', change: '+12.5%', icon: 'trending', color: 'text-status-active bg-status-active-bg' },
  { label: 'Low Balance Alerts', value: '14', icon: 'wallet', color: 'text-status-suspended bg-status-suspended-bg' },
  { label: 'Msgs Sent (24h)', value: '84,209', icon: 'chat', color: 'text-secondary bg-secondary-container/30' },
  { label: 'Churn Rate (MoM)', value: '2.4%', icon: 'userOff', color: 'text-error bg-error-container/40' },
];

export const planDistribution = [
  { label: 'Starter', value: 452, color: 'bg-plan-starter' },
  { label: 'Pro', value: 312, color: 'bg-plan-pro' },
  { label: 'Growth', value: 298, color: 'bg-plan-growth' },
  { label: 'Enterprise', value: 222, color: 'bg-plan-enterprise' },
];

export const subscriptions = [
  { id: 983214, shop: 'Kirana Plus', initials: 'K', plan: 'Enterprise', billing: 'Yearly', status: 'Active', amount: 45000, nextRenewal: 'Nov 12, 2023', daysLeft: 'In 14 days' },
  { id: 874321, shop: 'Apex Fashion', initials: 'A', plan: 'Pro', billing: 'Monthly', status: 'Past Due', amount: 3000, nextRenewal: 'Oct 30, 2023', daysLeft: 'Expires today', urgent: true },
  { id: 742190, shop: 'Techo Mobile', initials: 'T', plan: 'Growth', billing: 'Trial', status: 'Trial', amount: 0, nextRenewal: 'Nov 05, 2023', daysLeft: 'In 7 days' },
  { id: 556214, shop: 'Super Store', initials: 'S', plan: 'Starter', billing: 'Monthly', status: 'Active', amount: 200, nextRenewal: 'Dec 01, 2023', daysLeft: 'In 32 days' },
  { id: 441029, shop: 'Rustic Crafts', initials: 'R', plan: 'Pro', billing: 'Yearly', status: 'Cancelled', amount: 32000, nextRenewal: 'Expired', daysLeft: 'Oct 15, 2023' },
];

export const planSummary = [
  { name: 'Starter', users: '1,240', mrr: '₹ 2,48,000', icon: 'bolt', color: 'bg-plan-starter text-primary', border: 'border-primary/5' },
  { name: 'Growth', users: '856', mrr: '₹ 8,56,000', icon: 'rocket', color: 'bg-plan-growth text-status-trial', border: 'border-status-trial/5' },
  { name: 'Professional', users: '432', mrr: '₹ 12,96,000', icon: 'layers', color: 'bg-plan-pro text-secondary', border: 'border-secondary/5' },
  { name: 'Enterprise', users: '98', mrr: '₹ 44,10,000', icon: 'shield', color: 'bg-plan-enterprise text-white', border: 'border-none' },
];

export const topUpClients = [
  { shop: 'Blue Tokai Roasters', location: 'Gurugram Sector 44', initials: 'BT', balance: 42.5, totalToppedUp: 45000, lastDate: 'Oct 24, 2023', lastAmount: 2000, color: 'bg-primary-container/10 text-primary' },
  { shop: 'Zappos Pizza', location: 'Mumbai Central', initials: 'ZP', balance: 18.2, totalToppedUp: 112500, lastDate: 'Oct 22, 2023', lastAmount: 5000, color: 'bg-tertiary-container/10 text-tertiary' },
  { shop: 'Keventers Franchise', location: 'Delhi Airport T3', initials: 'KF', balance: 8440, totalToppedUp: 88000, lastDate: 'Oct 25, 2023', lastAmount: 10000, color: 'bg-secondary-container/30 text-secondary' },
  { shop: 'Mini Himalaya', location: 'Manali Mall Road', initials: 'MH', balance: 120, totalToppedUp: 12400, lastDate: 'Oct 10, 2023', lastAmount: 500, color: 'bg-surface-dim text-on-surface-variant' },
];

export const topUpTransactions = [
  { type: 'success', title: 'Top-up Successful', detail: 'Client: Zappos Pizza • Transaction ID: #TXN-88219', amount: '₹5,000.00', time: '12 mins ago' },
  { type: 'success', title: 'Top-up Successful', detail: 'Client: Blue Tokai • Transaction ID: #TXN-88215', amount: '₹2,000.00', time: '2 hours ago' },
  { type: 'failed', title: 'Top-up Failed', detail: 'Client: Urban Ladder • Insufficient Funds at Bank', amount: '₹10,000.00', time: '4 hours ago' },
];

export const messageStats = [
  { label: 'Total Messages', value: '1,284,502', change: '+12.4% vs last period', icon: 'chat', color: 'bg-primary-fixed text-primary' },
  { label: 'Messages this Month', value: '342,108', change: '+4.2% vs last month', icon: 'calendar', color: 'bg-secondary-fixed text-secondary' },
  { label: 'Avg per Client', value: '2,842', change: 'Stable across periods', icon: 'analytics', color: 'bg-tertiary-fixed text-tertiary' },
];

export const messageClients = [
  { shop: 'LuxeModa Store', id: '#WNC-8821', initials: 'LM', plan: 'Enterprise', msgPeriod: '24,512', msgAllTime: '142,900', topUpSpent: '$1,250.00', lastActivity: '2 mins ago', status: 'Active' },
  { shop: 'Organic Bloom', id: '#WNC-4410', initials: 'OB', plan: 'Growth', msgPeriod: '8,290', msgAllTime: '34,102', topUpSpent: '$420.50', lastActivity: '15 mins ago', status: 'Active' },
  { shop: 'TechGear Hub', id: '#WNC-1205', initials: 'TG', plan: 'Pro', msgPeriod: '1,402', msgAllTime: '4,550', topUpSpent: '$0.00', lastActivity: '2 hours ago', status: 'Low Credit' },
  { shop: 'Vintage Soul', id: '#WNC-9921', initials: 'VS', plan: 'Starter', msgPeriod: '452', msgAllTime: '1,200', topUpSpent: '$0.00', lastActivity: '1 day ago', status: 'Inactive' },
  { shop: 'Neon Cloud', id: '#WNC-7762', initials: 'NC', plan: 'Enterprise', msgPeriod: '42,190', msgAllTime: '880,450', topUpSpent: '$4,120.00', lastActivity: 'Just now', status: 'Active' },
];

export const teamMembers = [
  { name: 'Alex Vance', email: 'alex@wance.admin', initials: 'AV', role: 'Super Admin', status: 'Active', color: 'bg-secondary-container text-on-secondary-container' },
  { name: 'Sarah Lane', email: 'sarah.l@wance.admin', initials: 'SL', role: 'Support Tier 1', status: 'Active', color: 'bg-plan-growth text-primary' },
  { name: 'Mark Kovak', email: 'm.kovak@wance.admin', initials: 'MK', role: 'Support Tier 2', status: 'Pending', color: 'bg-surface-container-high text-outline' },
  { name: 'Riley Thompson', email: 'riley@wance.admin', initials: 'RT', role: 'Compliance Officer', status: 'Deactivated', color: 'bg-error-container text-error' },
];

export const planConfigs = [
  { name: 'Starter', price: '$29', period: '/mo', limit: 'Limited to 5,000 requests/mo', features: ['Basic Analytics', '2 Team Members'], color: 'bg-plan-starter', text: 'text-primary-container', border: 'border-outline-variant' },
  { name: 'Growth', price: '$99', period: '/mo', limit: 'Limited to 25,000 requests/mo', features: ['Advanced Monitoring', '10 Team Members'], color: 'bg-plan-growth', text: 'text-primary', border: 'border-outline-variant' },
  { name: 'Pro', price: '$249', period: '/mo', limit: 'Limited to 100,000 requests/mo', features: ['Priority Support', 'Unlimited Members'], color: 'bg-plan-pro', text: 'text-secondary', border: 'border-outline-variant' },
  { name: 'Enterprise', price: 'Custom', period: '', limit: 'Unlimited scale', features: ['Dedicated Infrastructure', 'SLA Guarantees'], color: 'bg-plan-enterprise', text: 'text-sidebar-text', border: 'border-sidebar-bg', dark: true },
];

export const notificationSettings = [
  { icon: 'userPlus', title: 'New client signup', description: 'Notify when a new organization registers on the platform.', checked: true, color: 'bg-primary-container/10 text-primary' },
  { icon: 'warning', title: 'Low balance warning', description: 'Alert when a client\'s credit balance falls below $50.', checked: true, color: 'bg-status-suspended-bg text-status-suspended' },
  { icon: 'cancel', title: 'Plan cancellation', description: 'Immediate notification for any downgraded or cancelled plans.', checked: false, color: 'bg-status-churned-bg text-status-churned' },
];
