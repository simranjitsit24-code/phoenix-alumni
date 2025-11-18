// Dashboard Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard features
    initializeMentorshipRequests();
    initializeSessionManagement();
    initializeActivityFeed();
    initializeStatsAnimations();
    initializeNotifications();
    
    // Auto-update features
    setInterval(updateActivityFeed, 30000); // Update every 30 seconds
    setInterval(updateStats, 60000); // Update stats every minute
});

// Mentorship Requests Management
function initializeMentorshipRequests() {
    const acceptButtons = document.querySelectorAll('.request-item .btn-primary');
    const declineButtons = document.querySelectorAll('.request-item .btn-secondary');
    
    acceptButtons.forEach(button => {
        button.addEventListener('click', handleAcceptRequest);
    });
    
    declineButtons.forEach(button => {
        button.addEventListener('click', handleDeclineRequest);
    });
}

function handleAcceptRequest(event) {
    const requestItem = event.target.closest('.request-item');
    const studentName = requestItem.querySelector('h4').textContent;
    
    // Show loading state
    event.target.disabled = true;
    event.target.textContent = 'Processing...';
    
    // Simulate API call
    setTimeout(() => {
        // Remove request from pending list
        requestItem.style.transform = 'translateX(100%)';
        requestItem.style.opacity = '0';
        
        setTimeout(() => {
            requestItem.remove();
            updateEmptyState();
        }, 300);
        
        // Add to activity feed
        addActivityItem({
            icon: 'fas fa-user-plus',
            content: `You accepted a mentorship request from <strong>${studentName}</strong>`,
            time: 'Just now'
        });
        
        // Update stats
        updateMentoredCount(1);
        
        // Show success notification
        showNotification('Mentorship request accepted successfully!', 'success');
        
    }, 1000);
}

function handleDeclineRequest(event) {
    const requestItem = event.target.closest('.request-item');
    const studentName = requestItem.querySelector('h4').textContent;
    
    // Show confirmation dialog
    if (confirm(`Are you sure you want to decline the mentorship request from ${studentName}?`)) {
        // Show loading state
        event.target.disabled = true;
        event.target.textContent = 'Processing...';
        
        setTimeout(() => {
            // Remove request from pending list
            requestItem.style.transform = 'translateX(-100%)';
            requestItem.style.opacity = '0';
            
            setTimeout(() => {
                requestItem.remove();
                updateEmptyState();
            }, 300);
            
            showNotification('Mentorship request declined', 'info');
        }, 500);
    }
}

// Session Management
function initializeSessionManagement() {
    const joinButtons = document.querySelectorAll('.session-item .btn-outline');
    
    joinButtons.forEach(button => {
        button.addEventListener('click', handleJoinSession);
    });
}

function handleJoinSession(event) {
    const sessionItem = event.target.closest('.session-item');
    const sessionTitle = sessionItem.querySelector('h4').textContent;
    
    // Show loading state
    event.target.disabled = true;
    event.target.textContent = 'Joining...';
    
    setTimeout(() => {
        // Simulate joining meeting
        event.target.textContent = 'In Meeting';
        event.target.style.background = '#28a745';
        event.target.style.color = 'white';
        event.target.style.border = '2px solid #28a745';
        
        // Add to activity feed
        addActivityItem({
            icon: 'fas fa-video',
            content: `Started session: <strong>${sessionTitle}</strong>`,
            time: 'Just now'
        });
        
        showNotification('Joined meeting successfully!', 'success');
        
        // Reset button after 5 seconds (simulate meeting end)
        setTimeout(() => {
            event.target.disabled = false;
            event.target.textContent = 'Join Meeting';
            event.target.style.background = 'transparent';
            event.target.style.color = '#667eea';
            event.target.style.border = '2px solid #667eea';
        }, 5000);
        
    }, 1500);
}

// Activity Feed Management
function initializeActivityFeed() {
    // Add click handlers for activity items (for future expansion)
    const activityItems = document.querySelectorAll('.activity-item');
    
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            item.style.background = '#e3f2fd';
            setTimeout(() => {
                item.style.background = '#f8f9ff';
            }, 200);
        });
    });
}

function addActivityItem(activity) {
    const activityFeed = document.querySelector('.activity-feed');
    
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.style.opacity = '0';
    activityItem.style.transform = 'translateY(-20px)';
    
    activityItem.innerHTML = `
        <div class="activity-icon">
            <i class="${activity.icon}"></i>
        </div>
        <div class="activity-content">
            <p>${activity.content}</p>
            <span class="time">${activity.time}</span>
        </div>
    `;
    
    // Insert at the beginning
    activityFeed.insertBefore(activityItem, activityFeed.firstChild);
    
    // Animate in
    setTimeout(() => {
        activityItem.style.opacity = '1';
        activityItem.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove oldest items if more than 5
    const items = activityFeed.querySelectorAll('.activity-item');
    if (items.length > 5) {
        items[items.length - 1].remove();
    }
}

function updateActivityFeed() {
    // Simulate new activities (in real app, this would fetch from API)
    const activities = [
        {
            icon: 'fas fa-message',
            content: 'New message from <strong>Alex Chen</strong>',
            time: 'Just now'
        },
        {
            icon: 'fas fa-calendar-check',
            content: 'Session with <strong>John Doe</strong> completed',
            time: '2 minutes ago'
        }
    ];
    
    // Randomly add new activity (10% chance)
    if (Math.random() < 0.1) {
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        addActivityItem(randomActivity);
    }
}

// Stats Animations
function initializeStatsAnimations() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
    
    // Animate numbers on load
    animateStatsNumbers();
}

function animateStatsNumbers() {
    const statNumbers = document.querySelectorAll('.stat-content h3');
    
    statNumbers.forEach(number => {
        const finalValue = number.textContent;
        const isNumber = !isNaN(finalValue);
        
        if (isNumber) {
            const target = parseInt(finalValue);
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                number.textContent = Math.floor(current);
            }, 30);
        }
    });
}

function updateMentoredCount(increment) {
    const mentoredStat = document.querySelector('.stat-card:first-child .stat-content h3');
    const currentValue = parseInt(mentoredStat.textContent);
    const newValue = currentValue + increment;
    
    // Animate the change
    mentoredStat.style.transform = 'scale(1.2)';
    mentoredStat.style.color = '#28a745';
    
    setTimeout(() => {
        mentoredStat.textContent = newValue;
        setTimeout(() => {
            mentoredStat.style.transform = 'scale(1)';
            mentoredStat.style.color = '#333';
        }, 200);
    }, 100);
}

function updateStats() {
    // Simulate stat updates (in real app, fetch from API)
    const pointsStat = document.querySelector('.stat-card:nth-child(3) .stat-content h3');
    const currentPoints = parseInt(pointsStat.textContent.replace(',', ''));
    
    // Randomly add points (small chance)
    if (Math.random() < 0.05) {
        const newPoints = currentPoints + Math.floor(Math.random() * 50) + 10;
        pointsStat.textContent = newPoints.toLocaleString();
        
        // Visual feedback
        pointsStat.style.color = '#28a745';
        setTimeout(() => {
            pointsStat.style.color = '#333';
        }, 2000);
        
        showNotification(`+${newPoints - currentPoints} reward points earned!`, 'success');
    }
}

// Notifications System
function initializeNotifications() {
    // Create notification container if it doesn't exist
    if (!document.querySelector('.notifications-container')) {
        const container = document.createElement('div');
        container.className = 'notifications-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info') {
    const container = document.querySelector('.notifications-container');
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Utility Functions
function updateEmptyState() {
    const requestList = document.querySelector('.request-list');
    
    if (requestList.children.length === 0) {
        requestList.innerHTML = `
            <div class="empty-state" style="
                text-align: center;
                padding: 2rem;
                color: #666;
            ">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No pending requests</p>
                <small>New mentorship requests will appear here</small>
            </div>
        `;
    }
}

// Leaderboard interactions
document.addEventListener('DOMContentLoaded', function() {
    const leaderItems = document.querySelectorAll('.leader-item');
    
    leaderItems.forEach(item => {
        item.addEventListener('click', function() {
            if (!this.classList.contains('current-user')) {
                // Simulate viewing profile
                const name = this.querySelector('h4').textContent;
                showNotification(`Viewing ${name}'s profile...`, 'info');
            }
        });
    });
});

// Search and filter functionality (placeholder for future enhancement)
function addSearchFunctionality() {
    // This could be expanded to add search/filter capabilities
    console.log('Search functionality ready for implementation');
}

// Real-time updates simulation
setInterval(() => {
    // Simulate real-time updates like new messages, session reminders, etc.
    const now = new Date();
    const sessions = document.querySelectorAll('.session-item');
    
    sessions.forEach(session => {
        const timeElement = session.querySelector('.session-time .time');
        const sessionTime = timeElement.textContent;
        
        // Check if session is starting soon (this is just a demo)
        if (Math.random() < 0.01) { // Very low chance for demo
            showNotification(`Reminder: Session "${session.querySelector('h4').textContent}" starts in 15 minutes`, 'info');
        }
    });
}, 60000); // Check every minute