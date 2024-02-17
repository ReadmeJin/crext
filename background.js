// Assuming the API returns data in a similar format to the local JSON files used in the original project
async function fetchComebacks() {
    const apiURL = 'https://kpop-comebacks.heismauri.com/api'; // Adjust if you have a specific endpoint
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const comebacks = await response.json();
        // Process and store the comebacks data for use in the popup
        const processedData = processComebacksData(comebacks);
        chrome.storage.local.set({comebacksData: processedData}, () => {
            console.log('The comebacks data has been updated.');
        });
    } catch (error) {
        console.error('Failed to fetch comebacks:', error);
    }
}

// Mock-up processing function, adjust according to the actual data structure
function processComebacksData(comebacks) {
    // Implement data processing based on the structure of your API response
    // This is a placeholder function that directly passes the data through
    return JSON.stringify(comebacks); // Assuming 'comebacks' is an array or object that can be directly stringified
}

// Fetch comebacks data when the extension is installed/updated
chrome.runtime.onInstalled.addListener(() => {
    fetchComebacks();
    // Set up an alarm to regularly update the data
    chrome.alarms.create('refreshData', {periodInMinutes: 1440}); // Refresh daily
});

// Listen for the alarm and fetch comebacks data when it triggers
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'refreshData') {
        fetchComebacks();
    }
});

// Example: Fetch comebacks data when the extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
    fetchComebacks();
});
