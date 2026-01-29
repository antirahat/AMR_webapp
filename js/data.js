// ========================================
// AMR Pharmacovigilance Dashboard - Mock Data
// ========================================

// Statistics Data
const statisticsData = {
    totalAntibioticSales: {
        value: '1.24M',
        change: '+5.2%',
        changeType: 'positive',
        changeLabel: 'vs last month'
    },
    confirmedAMRCases: {
        value: '14,205',
        change: '+1.8%',
        changeType: 'neutral',
        changeLabel: 'active tracking'
    },
    avgResistanceRate: {
        value: '18.4%',
        change: '+0.5%',
        changeType: 'negative',
        changeLabel: 'critical threshold 20%'
    },
    highRiskAlerts: {
        value: '243',
        change: '+12%',
        changeType: 'neutral',
        changeLabel: 'pending review'
    }
};

// AI Risk Detection Alerts
const riskAlerts = [
    {
        id: 1,
        title: 'Spike in Azithromycin Sales',
        description: 'Uttara Sector 4 detected 400% above normal daily volume.',
        time: '2m ago',
        type: 'critical'
    },
    {
        id: 2,
        title: 'Cross-Border Anomaly',
        description: 'Unusual procurement patterns in Sylhet border pharmacies.',
        time: '14m ago',
        type: 'warning'
    },
    {
        id: 3,
        title: 'Resistance Pattern Alert',
        description: 'Increased Ciprofloxacin resistance detected in Mirpur area.',
        time: '32m ago',
        type: 'critical'
    }
];

// Recent Sales Registry Data
const salesRegistryData = [
    {
        id: 1,
        medication: 'Azithromycin 500mg',
        pharmacy: 'Popular Pharma',
        location: 'Dhanmondi',
        quantity: 10,
        unit: 'tabs',
        risk: 'low'
    },
    {
        id: 2,
        medication: 'Ciprofloxacin',
        pharmacy: 'HealthPlus',
        location: 'Mirpur',
        quantity: 14,
        unit: 'tabs',
        risk: 'med'
    },
    {
        id: 3,
        medication: 'Amoxicillin/Clav',
        pharmacy: 'Green City Meds',
        location: 'Gulshan',
        quantity: 21,
        unit: 'tabs',
        risk: 'high'
    },
    {
        id: 4,
        medication: 'Doxycycline',
        pharmacy: 'Lazz Pharma',
        location: 'Dhaka',
        quantity: 10,
        unit: 'tabs',
        risk: 'low'
    },
    {
        id: 5,
        medication: 'Ceftriaxone Inj',
        pharmacy: 'Apex General',
        location: 'Savar',
        quantity: 5,
        unit: 'vials',
        risk: 'crit'
    }
];

// Location Data for Map
const locationData = [
    { name: 'Dhaka', active: true },
    { name: 'Chittagong', active: false },
    { name: 'Sylhet', active: false },
    { name: 'Rajshahi', active: false }
];

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        statisticsData,
        riskAlerts,
        salesRegistryData,
        locationData
    };
}
