// Function to check if it's a market day (Monday-Friday, excluding major US holidays)
function isMarketDay(date) {
    const day = date.getDay();
    
    // Check if it's weekend
    if (day === 0 || day === 6) {
        return false;
    }
    
    // Check for major US market holidays (simplified)
    const year = date.getFullYear();
    const month = date.getMonth();
    const dateNum = date.getDate();
    
    // New Year's Day
    if (month === 0 && dateNum === 1) return false;
    
    // Independence Day
    if (month === 6 && dateNum === 4) return false;
    
    // Christmas
    if (month === 11 && dateNum === 25) return false;
    
    // Thanksgiving (4th Thursday in November)
    if (month === 10) {
        const firstDay = new Date(year, 10, 1).getDay();
        const fourthThursday = 1 + ((11 - firstDay) % 7) + 21;
        if (dateNum === fourthThursday) return false;
    }
    
    // Memorial Day (last Monday in May)
    if (month === 4) {
        const lastDay = new Date(year, 5, 0).getDate();
        const lastMonday = lastDay - ((new Date(year, 4, lastDay).getDay() + 6) % 7);
        if (dateNum === lastMonday) return false;
    }
    
    // Labor Day (first Monday in September)
    if (month === 8) {
        const firstDay = new Date(year, 8, 1).getDay();
        const firstMonday = 1 + ((8 - firstDay) % 7);
        if (dateNum === firstMonday) return false;
    }
    
    return true;
}

// Function to check if markets are currently open (9:30 AM - 4:00 PM ET)
function isMarketOpen(date) {
    // First check if it's a market day
    if (!isMarketDay(date)) {
        return false;
    }
    
    // Convert to ET timezone
    const etTime = new Date(date.toLocaleString("en-US", {timeZone: "America/New_York"}));
    const hours = etTime.getHours();
    const minutes = etTime.getMinutes();
    const timeInMinutes = hours * 60 + minutes;
    
    // Market hours: 9:30 AM (570 minutes) to 4:00 PM (960 minutes) ET
    const marketOpen = 9 * 60 + 30; // 9:30 AM
    const marketClose = 16 * 60; // 4:00 PM
    
    return timeInMinutes >= marketOpen && timeInMinutes < marketClose;
}

// Function to get market hours in local time
function getMarketHoursLocal(date) {
    // Market opens at 9:30 AM ET and closes at 4:00 PM ET
    const marketOpenET = new Date(date);
    const marketCloseET = new Date(date);
    
    // Set times in ET timezone
    const dateStr = date.toLocaleDateString('en-US', {timeZone: 'America/New_York'});
    const openTimeET = new Date(dateStr + ' 09:30:00 EST');
    const closeTimeET = new Date(dateStr + ' 16:00:00 EST');
    
    // Format in local timezone
    const openLocal = openTimeET.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    const closeLocal = closeTimeET.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    return { open: openLocal, close: closeLocal };
}

// Function to calculate days until next market day
function getDaysUntilNextMarketDay(date) {
    let daysCount = 0;
    let checkDate = new Date(date);
    
    do {
        daysCount++;
        checkDate.setDate(checkDate.getDate() + 1);
    } while (!isMarketDay(checkDate) && daysCount < 7);
    
    return daysCount;
}

// Function to update the time display
function updateTime() {
    const now = new Date();
    
    // Format time with seconds in 12-hour format
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    const timeString = `${hours12}:${minutes}:${seconds}`;
    
    // Format date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    
    // Get day of week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayString = daysOfWeek[now.getDay()];
    
    // Check market status - both if it's a market day and if market is currently open
    const isOpen = isMarketOpen(now);
    const isTradingDay = isMarketDay(now);
    
    let marketText;
    let statusClass;
    
    if (isOpen) {
        marketText = 'Market Open (Trading)';
        statusClass = 'open';
    } else if (isTradingDay) {
        // Check if it's before market open or after market close
        const etTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
        const hours = etTime.getHours();
        const minutes = etTime.getMinutes();
        const timeInMinutes = hours * 60 + minutes;
        const marketOpen = 9 * 60 + 30; // 9:30 AM
        const marketClose = 16 * 60; // 4:00 PM
        
        if (timeInMinutes < marketOpen) {
            marketText = 'Pre-Market';
            statusClass = 'after-hours';
        } else {
            // After market close, show closed
            marketText = 'Market Closed';
            statusClass = 'closed';
        }
    } else {
        marketText = 'Market Closed';
        statusClass = 'closed';
    }
    
    // Get market hours in local time
    let hoursText;
    if (isTradingDay) {
        const hours = getMarketHoursLocal(now);
        hoursText = `<strong>Market Hours (Local Time)</strong>${hours.open} - ${hours.close}`;
    } else {
        const daysUntilOpen = getDaysUntilNextMarketDay(now);
        if (daysUntilOpen === 1) {
            hoursText = '<strong>Market opens tomorrow</strong>';
        } else {
            hoursText = `<strong>Market opens in ${daysUntilOpen} days</strong>`;
        }
    }
    
    // Get India time (IST - Indian Standard Time)
    const indiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const indiaHours = indiaTime.getHours();
    const indiaMinutes = String(indiaTime.getMinutes()).padStart(2, '0');
    const indiaAmpm = indiaHours >= 12 ? 'PM' : 'AM';
    const indiaHours12 = indiaHours % 12 || 12;
    const indiaTimeString = `${indiaHours12}:${indiaMinutes} ${indiaAmpm}`;
    
    // Update DOM
    document.getElementById('time').textContent = timeString;
    document.getElementById('ampm').textContent = ampm;
    document.getElementById('date').textContent = dateString;
    document.getElementById('day').textContent = dayString;
    document.getElementById('marketText').textContent = marketText;
    document.getElementById('marketText').className = statusClass;
    document.getElementById('statusIndicator').className = `status-indicator ${statusClass}`;
    document.getElementById('hoursInfo').innerHTML = hoursText;
    document.getElementById('indiaTimeValue').textContent = indiaTimeString;
}

// Update time immediately and then every second
updateTime();
setInterval(updateTime, 1000);

// Optional: Add embedded class if in iframe
if (window !== window.top) {
    document.body.classList.add('embedded');
}

// Check URL parameters for compact mode
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('compact') === 'true') {
    document.body.classList.add('compact');
}

// Allow parent window to communicate
window.addEventListener('message', function(event) {
    // Handle messages from parent window if needed
    if (event.data.type === 'setCompact') {
        document.body.classList.toggle('compact', event.data.value);
    }
});
