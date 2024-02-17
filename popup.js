document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['comebacksData'], function(result) {
        document.getElementById('comebacksList').innerHTML = result.comebacksData || 'No data available';
    });
});
