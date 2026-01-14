// User State Management
let currentUser = null;
const ANONYMOUS_AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=campus&backgroundColor=8b5fbf";
const ANONYMOUS_NAME = "VU_Student";
// Sample Courses Data
const sampleCourses = [
    {
        id: 1,
        title: "Web Development Bootcamp",
        description: "Learn HTML, CSS, JavaScript in 4 sessions. Perfect for beginners. Build real projects and deploy your first website.",
        price: 50,
        sessions: 4,
        category: "tech",
        rating: 4.8,
        badge: "Trending",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop"
    },
    {
        id: 2,
        title: "Graphic Design Mastery",
        description: "Photoshop and Canva training. Create stunning designs for your projects, social media, and professional work.",
        price: 70,
        sessions: 3,
        category: "design",
        rating: 4.9,
        badge: "Popular",
        image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=250&fit=crop"
    },
    {
        id: 3,
        title: "Python for Data Science",
        description: "Learn Python programming and data analysis with pandas, numpy. Perfect for research and academic projects.",
        price: 60,
        sessions: 5,
        category: "tech",
        rating: 4.7,
        badge: "New",
        image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=250&fit=crop"
    },
    {
        id: 4,
        title: "English Communication Skills",
        description: "Improve your spoken English and presentation skills. Build confidence for interviews and professional communication.",
        price: 40,
        sessions: 4,
        category: "language",
        rating: 4.6,
        badge: "",
        image: "https://images.unsplash.com/photo-1581093458791-8a6b6d47d0b7?w=400&h=250&fit=crop"
    },
    {
        id: 5,
        title: "Business Presentation Mastery",
        description: "Learn to create compelling business presentations and pitch decks that impress professors and clients.",
        price: 55,
        sessions: 3,
        category: "business",
        rating: 4.8,
        badge: "Popular",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
    },
    {
        id: 6,
        title: "Photography Basics",
        description: "Learn composition, lighting, and editing with your smartphone camera. No expensive equipment needed.",
        price: 45,
        sessions: 4,
        category: "creative",
        rating: 4.5,
        badge: "",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop"
    }
];
// Sample Posts Data
let posts = [
    {
        id: 1,
        type: "skill",
        title: "Web Development Bootcamp",
        description: "Learn HTML, CSS, JavaScript in 4 sessions. Perfect for beginners. Build real projects and deploy your first website.",
        price: 50,
        category: "tech",
        user: "VU_Student",
        avatar: ANONYMOUS_AVATAR,
        timestamp: "2 hours ago",
        likes: 12,
        comments: 5,
        liked: false,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop"
    },
    {
        id: 2,
        type: "help",
        title: "Need help with Calculus assignment",
        description: "Struggling with integration problems for MATH 101. Anyone available to help explain the concepts?",
        price: 0,
        category: "academic",
        user: "VU_Student",
        avatar: ANONYMOUS_AVATAR,
        timestamp: "1 hour ago",
        likes: 8,
        comments: 3,
        liked: false
    },
    {
        id: 3,
        type: "skill",
        title: "Graphic Design Mastery",
        description: "Photoshop and Canva training. Create stunning designs for your projects, social media, and professional work.",
        price: 70,
        category: "design",
        user: "VU_Student",
        avatar: ANONYMOUS_AVATAR,
        timestamp: "3 hours ago",
        likes: 15,
        comments: 7,
        liked: false,
        image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=250&fit=crop"
    },
    {
        id: 4,
        type: "help",
        title: "Looking for study group - Data Structures",
        description: "Forming a study group for CSE 202. Let's solve problems together and prepare for upcoming exams.",
        price: 0,
        category: "academic",
        user: "VU_Student",
        avatar: ANONYMOUS_AVATAR,
        timestamp: "4 hours ago",
        likes: 6,
        comments: 4,
        liked: false
    }
];
// User's posts
let userPosts = [];
// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}
// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});
// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    initializeAnonymousProfiles();
    loadMarketplaceCourses();
    initializeEventListeners();
    updateCommission(); // Initialize commission preview
    initializeDepartmentSelection(); // Initialize department selection
    // Show home section by default
    showSection('home');
});
function initializeEventListeners() {
    // Step 1: Student Verification
    const verificationForm = document.getElementById('verificationForm');
    if (verificationForm) {
        verificationForm.addEventListener('submit', handleVerification);
    }
    // Step 2: Profile Setup
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSetup);
    }
    // Step 4: Upload Section
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleUpload);
    }
    // Image upload preview - FIXED
    const imageUpload = document.getElementById('itemImage');
    if (imageUpload) {
        imageUpload.addEventListener('change', handleImageUpload);
    }
    // Interest tags selection
    document.querySelectorAll('.interest-tag').forEach(tag => {
        tag.addEventListener('click', function () {
            this.classList.toggle('selected');
        });
    });
    // Marketplace filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b =>
                b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            filterMarketplace(filter);
        });
    });
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            searchCourses(this.value);
        });
    }
    // Chatbot functionality
    const sendMessageBtn = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    if (sendMessageBtn && chatInput) {
        sendMessageBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    // Real-time price calculation - FIXED
    const priceInput = document.getElementById('itemPrice');
    if (priceInput) {
        priceInput.addEventListener('input', updateCommission);
    }
    // AI description feedback
    const descriptionInput = document.getElementById('itemDescription');
    const aiFeedback = document.querySelector('.ai-feedback span');
    if (descriptionInput && aiFeedback) {
        descriptionInput.addEventListener('input', function () {
            if (this.value.length > 20) {
                aiFeedback.textContent = 'Description looks great! Engaging and informative.';
            } else if (this.value.length > 10) {
                aiFeedback.textContent = 'Good start! Consider adding more details to stand out.';
            } else if (this.value.length > 0) {
                aiFeedback.textContent = 'Add more details to make your listing clearer and more helpful.';
            } else {
                aiFeedback.textContent = 'AI is checking description clarity...';
            }
        });
    }

    // Newsfeed search
    const newsfeedSearch = document.getElementById('newsfeedSearch');
    if (newsfeedSearch) {
        newsfeedSearch.addEventListener('input', function () {
            filterNewsfeedPosts(this.value);
        });
    }
    // Filter tags
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', function () {
            document.querySelectorAll('.filter-tag').forEach(t =>
                t.classList.remove('active'));
            this.classList.add('active');
            filterNewsfeedByType(this.dataset.filter);
        });
    });
    // Help post form
    const helpPostForm = document.getElementById('helpPostForm');
    if (helpPostForm) {
        helpPostForm.addEventListener('submit', handleHelpPost);
    }
    // Quick post input
    const postInput = document.getElementById('postInput');
    if (postInput) {
        postInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' && this.value.trim()) {
                createQuickPost(this.value.trim());
                this.value = '';
            }
        });
    }
}
// Step 1: Student Verification
function handleVerification(e) {
    e.preventDefault();
    const studentId = document.getElementById('studentId').value;
    const batch = document.getElementById('batch').value;
    const department = document.getElementById('department').value;
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AI Verifying...';
    submitBtn.disabled = true;
    setTimeout(() => {
        currentUser = {
            studentId: studentId,
            batch: batch,
            department: department,
            isVerified: true,
            avatar: ANONYMOUS_AVATAR,
            username: ANONYMOUS_NAME
        };
        showSuccess('Verification successful! Welcome to CampusSkill.');
        showSection('profileSetup');
        setAnonymousProfile();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}
// Step 2: Profile Setup
function handleProfileSetup(e) {
    e.preventDefault();

    const profileType = document.querySelector('input[name="profileType"]:checked').value;
    const bio = document.getElementById('bio').value;
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Finalizing Profile...';
    submitBtn.disabled = true;

    setTimeout(() => {
        currentUser.profileType = profileType;
        currentUser.bio = bio;

        showSuccess('Profile setup complete! Welcome to CampusSkill Newsfeed.');

        // Go directly to newsfeed after profile setup
        showSection('newsfeed');
        loadNewsfeedPosts();
        updateUserStats();
        enableMarketplaceAccess();

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Department selection functionality
function initializeDepartmentSelection() {
    const allDepartmentsCheckbox =
        document.querySelector('input[name="targetDepartments"][value="all"]');
    const departmentCheckboxes =
        document.querySelectorAll('input[name="targetDepartments"]:not([value="all"])');
    if (allDepartmentsCheckbox) {
        allDepartmentsCheckbox.addEventListener('change', function () {
            if (this.checked) {
                departmentCheckboxes.forEach(checkbox => {
                    checkbox.checked = false;
                    checkbox.disabled = true;
                });
            } else {
                departmentCheckboxes.forEach(checkbox => {
                    checkbox.disabled = false;
                });
            }
        });
        // Initialize state
        departmentCheckboxes.forEach(checkbox => {
            checkbox.disabled = true;
        });
    }
    // If any specific department is checked, uncheck "All Departments"
    departmentCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                allDepartmentsCheckbox.checked = false;
            }
        });
    });
}
// Helper function to get selected departments
function getSelectedDepartments() {
    const allDepartmentsCheckbox =
        document.querySelector('input[name="targetDepartments"][value="all"]');
    if (allDepartmentsCheckbox && allDepartmentsCheckbox.checked) {
        return ['all'];
    }
    const selected = [];
    const departmentCheckboxes =
        document.querySelectorAll('input[name="targetDepartments"]:checked');
    departmentCheckboxes.forEach(checkbox => {
        selected.push(checkbox.value);
    });
    return selected;
}
// Step 4: Upload Section - FIXED with Department Selection
function handleUpload(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AI Checking Content...';
    submitBtn.disabled = true;
    // Get form data
    const title = document.getElementById('itemTitle').value;
    const description = document.getElementById('itemDescription').value;
    const price = parseInt(document.getElementById('itemPrice').value) || 0;
    const category = document.getElementById('itemCategory').value;
    const imageFile = document.getElementById('itemImage').files[0];
    // Get selected departments
    const selectedDepartments = getSelectedDepartments();
    // Validate required fields
    if (!title || !description || price <= 0 || selectedDepartments.length ===
        0) {
        showSuccess('Please fill all required fields correctly!');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
    }
    setTimeout(() => {
        let imageUrl = '';
        // Handle image upload - FIXED
        if (imageFile) {
            imageUrl = URL.createObjectURL(imageFile);
        } else {
            // Use default image based on category
            imageUrl = getDefaultImage(category);
        }
        // Create new skill post
        const newPost = {
            id: posts.length + 1,
            type: "skill",
            title: title,
            description: description,
            price: price,
            category: category,
            departments: selectedDepartments, // Add departments to post
            user: ANONYMOUS_NAME,
            avatar: ANONYMOUS_AVATAR,
            timestamp: "Just now",
            likes: 0,
            comments: 0,
            liked: false,
            image: imageUrl
        };
        // Add to posts arrays
        posts.unshift(newPost);
        userPosts.unshift(newPost);
        // Also add to marketplace courses
        const newCourse = {
            id: sampleCourses.length + 1,
            title: title,
            description: description,
            price: price,
            sessions: 4, // Default sessions
            category: category,
            departments: selectedDepartments, // Add departments to course
            rating: 4.5, // Default rating
            image: imageUrl
        };
        sampleCourses.unshift(newCourse);
        showSuccess('Listing published successfully! Now available in marketplace and newsfeed.');
        showSection('newsfeed');
        // Reload marketplace and newsfeed
        loadMarketplaceCourses();
        loadNewsfeedPosts();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        this.reset();
        updateCommission();
        // Reset image preview - FIXED
        const imagePreview = document.getElementById('imagePreview');
        if (imagePreview) {
            imagePreview.innerHTML = '<i class="fas fa-image"></i><span>Image Preview</span>';
            imagePreview.style.backgroundImage = 'none';
            imagePreview.style.backgroundColor = '#f8f9fa';
        }
        // Reset department selection
        initializeDepartmentSelection();
    }, 2000);
}
// Handle image upload preview - FIXED
function handleImageUpload(e) {
    const file = e.target.files[0];
    const imagePreview = document.getElementById('imagePreview');
    if (file && imagePreview) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.innerHTML = '';
            imagePreview.style.backgroundImage = `url(${e.target.result})`;
            imagePreview.style.backgroundSize = 'cover';
            imagePreview.style.backgroundPosition = 'center';
            imagePreview.style.backgroundRepeat = 'no-repeat';
        };
        reader.readAsDataURL(file);
    }
}
// Get default image based on category
function getDefaultImage(category) {
    const defaultImages = {
        'tech': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
        'design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
        'academic': 'https://images.unsplash.com/photo-158172670744575cbe4efc586?w=400&h=250&fit=crop',
        'business': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
        'creative': 'https://images.unsplash.com/photo-1513475382585d06e58bcb0e0?w=400&h=250&fit=crop',
        'language': 'https://images.unsplash.com/photo-15235804948636f3031224c94?w=400&h=250&fit=crop'
    };
    return defaultImages[category] ||
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=250&fit=crop';
}
// Set Anonymous Profile for All Users
function setAnonymousProfile() {
    const avatarPreview = document.getElementById('avatarPreview');
    const userAvatar = document.getElementById('currentUserAvatar');
    const username = document.getElementById('profileUsername');
    if (avatarPreview) avatarPreview.src = ANONYMOUS_AVATAR;
    if (userAvatar) userAvatar.src = ANONYMOUS_AVATAR;
    if (username) username.textContent = ANONYMOUS_NAME;
    updateAllSellerProfiles();
}
function updateAllSellerProfiles() {
    document.querySelectorAll('.seller-info').forEach(seller => {
        const img = seller.querySelector('img');
        const name = seller.querySelector('h4');
        if (img) img.src = ANONYMOUS_AVATAR;
        if (name) name.textContent = ANONYMOUS_NAME;
    });
}
// Initialize with anonymous profiles
function initializeAnonymousProfiles() {
    document.querySelectorAll('.seller-info img').forEach(img => {
        img.src = ANONYMOUS_AVATAR;
    });
    document.querySelectorAll('.seller-info h4').forEach(name => {
        name.textContent = ANONYMOUS_NAME;
    });
}
// Marketplace Access Control
function enableMarketplaceAccess() {
    const marketplaceAccess = document.getElementById('marketplaceAccess');
    const marketplaceContent = document.getElementById('marketplaceContent');
    if (marketplaceAccess && marketplaceContent) {
        if (currentUser && currentUser.isVerified) {
            marketplaceAccess.classList.add('hidden');
            marketplaceContent.classList.remove('hidden');
        }
    }
}
function checkMarketplaceAccess() {
    if (!currentUser || !currentUser.isVerified) {
        const marketplaceAccess = document.getElementById('marketplaceAccess');
        const marketplaceContent =
            document.getElementById('marketplaceContent');
        if (marketplaceAccess) marketplaceAccess.classList.remove('hidden');
        if (marketplaceContent) marketplaceContent.classList.add('hidden');
        return false;
    }
    return true;
}
// Section Navigation
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
    // Update navigation
    updateNavigation(sectionName);
    // Load specific content for sections
    if (sectionName === 'newsfeed') {
        loadNewsfeedPosts();
    } else if (sectionName === 'myProfile') {
        updateUserStats();
    } else if (sectionName === 'marketplace') {
        loadMarketplaceCourses();
    }
}
function updateNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSection}`) {
            link.classList.add('active');
        }
    });
}
// Dashboard Functions
function showUploadSection() {
    showSection('uploadSection');
}
function showMarketplace() {
    if (!checkMarketplaceAccess()) {
        showSection('marketplace');
        return;
    }
    showSection('marketplace');
    const marketplaceAccess = document.getElementById('marketplaceAccess');
    const marketplaceContent = document.getElementById('marketplaceContent');
    if (marketplaceAccess) marketplaceAccess.classList.add('hidden');
    if (marketplaceContent) marketplaceContent.classList.remove('hidden');
}
function showLoginSection() {
    showSection('login');
}
// Marketplace Functions
function loadMarketplaceCourses() {
    const marketplaceGrid = document.getElementById('marketplaceGrid');
    if (!marketplaceGrid) return;
    marketplaceGrid.innerHTML = sampleCourses.map(course => `
        <div class="skill-card" data-category="${course.category}" data-title="$
{course.title.toLowerCase()}">
            ${course.badge ? `<div class="skill-badge">${course.badge}</div>` :
            ''}
            <div class="skill-image" style="background-image: url('$
{course.image}')"></div>
            <div class="skill-content">
                <div class="skill-header">
                    <div class="seller-info">
                        <img src="${ANONYMOUS_AVATAR}" alt="Seller">
                        <div>
                            <h4>${ANONYMOUS_NAME}</h4>
                            <div class="rating">
                                <i class="fas fa-star"></i>
                                <span>${course.rating}</span>
                            </div>
                        </div>
                    </div>
                    <i class="far fa-heart"></i>
                </div>
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="skill-meta">
                    <span class="price">${course.price} à§³</span>
                    <span class="sessions">${course.sessions} sessions</span>
                </div>
                <div class="skill-actions">
                    <button class="book-btn" onclick="bookCourse(${course.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Book Now
                    </button>
                    <button class="info-btn" onclick="showCourseDetails($
{course.id})">
                        <i class="fas fa-info-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    // Add favorite button functionality
    document.querySelectorAll('.fa-heart').forEach(heart => {
        heart.addEventListener('click', function () {
            this.classList.toggle('fas');
            this.classList.toggle('far');
            this.classList.toggle('active');
        });
    });
}
function filterMarketplace(filter) {
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
        } else {
            const category = card.dataset.category;
            card.style.display = category === filter ? 'block' : 'none';
        }
    });
}
function searchCourses(query) {
    const cards = document.querySelectorAll('.skill-card');
    const lowerQuery = query.toLowerCase();
    cards.forEach(card => {
        const title = card.dataset.title;
        if (title.includes(lowerQuery) || query === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
function bookCourse(courseId) {
    if (!checkMarketplaceAccess()) {
        showSuccess('Please complete verification first!');
        return;
    }
    const course = sampleCourses.find(c => c.id === courseId);
    if (course) {
        showSuccess(`Booked: ${course.title} for ${course.price}à§³`);
    }
}
function showCourseDetails(courseId) {
    const course = sampleCourses.find(c => c.id === courseId);
    if (course) {
        showSuccess(`Course: ${course.title}\nRating: 
${course.rating}/5\nSessions: ${course.sessions}\nPrice: ${course.price}à§³`);
    }
}
// AI Chatbot Functions
function showChatbot() {
    document.getElementById('aiChatbot').classList.remove('hidden');
}
function hideChatbot() {
    document.getElementById('aiChatbot').classList.add('hidden');
}
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    if (message === '') return;
    addMessage(message, 'user');
    chatInput.value = '';
    setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        addMessage(aiResponse, 'ai');
    }, 1000);
}
function addMessage(content, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message fade-in`;
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    if (sender === 'ai') {
        contentDiv.innerHTML = formatAIResponse(content);
    } else {
        contentDiv.textContent = content;
    }
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
function askQuickQuestion(question) {
    const chatInput = document.getElementById('chatInput');
    chatInput.value = question;
    sendMessage();
}
function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    if (message.includes('trend') || message.includes('popular')) {
        return `Based on current data, these skills are trending at Varendra 
University:
ð
 **High Demand Skills:**
â ¢ Web Development (MERN stack)
â ¢ Python Programming
â ¢ Graphic Design (Canva, Photoshop)
â ¢ Data Analysis with Python
â ¢ Content Writing & Blogging
â ¢ Digital Marketing
â ¢ English Communication
ð ¡ **Tip:** Consider learning these to increase your earning potential!`;
    } else if (message.includes('sell') || message.includes('course') ||
        message.includes('teach')) {
        return `**How to Sell Your Skills/Courses:**
1. **Complete Verification** - First, verify your student status
2. **Create Listing** - Go to Dashboard â Sell Skill
3. **Set Fair Price** - AI will suggest optimal pricing (50-100à§³ recommended)
4. **Add Clear Description** - Explain what students will learn
5. **Upload Demo** - Add images/videos to showcase your work
ð ° **Commission:** Only 15% per successful transaction!
ð ¯ **Popular Categories:** Programming, Design, Language, Business`;
    } else if (message.includes('campus') || message.includes('event')) {
        return `**Upcoming Campus Events:**
ð ï¸ **This Week:**
â ¢ Tech Seminar: AI in Education (Tomorrow 3 PM)
â ¢ Midterm Exams Begin (Next Week)
â ¢ Coding Competition (Friday)
â ¢ Career Fair (Next Month)
ð ¯ **Club Activities:**
â ¢ Programming Club - Web Dev Workshop
â ¢ Business Club - Startup Pitch Session
â ¢ Cultural Club - Music Practice
â ¢ Sports Club - Tournament
ð
 **Academic:**
â ¢ Library extended hours during midterms
â ¢ Research paper submission deadline approaching`;
    } else if (message.includes('buy') || message.includes('purchase') ||
        message.includes('book')) {
        return `**Buying Guide:**
ð
 **How to Buy:**
1. Browse marketplace skills/courses
2. Click "Book Now" on desired item
3. Complete secure payment
4. Schedule session with seller
5. Leave rating after completion
ð
 **Safety Features:**
â ¢ Verified students only
â ¢ AI harassment detection
â ¢ Secure payment system
â ¢ Anonymous profiles
â ¢ Rating system for quality assurance
ð ¡ **Tip:** Look for courses with high ratings and detailed descriptions!`;
    } else if (message.includes('hello') || message.includes('hi') ||
        message.includes('hey')) {
        return `Hello! I'm your Campus AI Assistant. I can help you with:
ð ¤ **Buying/Selling Skills**
ð
 **Marketplace Guidance** 
ð
 **Campus Information**
ð ¡ **Skill Recommendations**
ð
 **Safety & Verification**
What would you like to know today?`;
    } else {
        return `I understand you're asking about "${userMessage}". 
As your Campus AI Assistant, I can help you with:
ð ¯ **Learning & Teaching:**
â ¢ Find the right courses to learn
â ¢ Set up your own skill sessions
â ¢ Get pricing recommendations
ð ± **Platform Help:**
â ¢ How to verify your account
â ¢ How to buy/sell safely
â ¢ Understanding commissions
ð « **Campus Info:**
â ¢ Upcoming events
â ¢ Academic schedules
â ¢ Club activities
Could you be more specific about what you need help with?`;
    }
}
function formatAIResponse(text) {
    return text.split('\n\n').map(paragraph => {
        if (paragraph.includes('**') && paragraph.includes(':**')) {
            return `<strong>${paragraph.replace(/\*\*(.*?)\*\*/g,
                '$1')}</strong>`;
        } else if (paragraph.includes('â ¢')) {
            const items = paragraph.split('â ¢').filter(item => item.trim());
            return items.map(item => `<div style="margin: 2px 0;">â ¢ $
{item.trim()}</div>`).join('');
        } else if (paragraph.includes('ð ¯') || paragraph.includes('ð ') ||
            paragraph.includes('ð ') || paragraph.includes('ð ï¸ ') ||
            paragraph.includes('ð ') || paragraph.includes('ð ¡') ||
            paragraph.includes('ð ') || paragraph.includes('ð ') ||
            paragraph.includes('ð ±') || paragraph.includes('ð «') ||
            paragraph.includes('ð ¤ ')) {
            return `<strong>${paragraph}</strong>`;
        } else {
            return `<p>${paragraph}</p>`;
        }
    }).join('');
}
// Close chatbot when clicking outside
document.getElementById('aiChatbot')?.addEventListener('click', function (e) {
    if (e.target === this) {
        hideChatbot();
    }
});
// Newsfeed Functions
function loadNewsfeedPosts() {
    const postsContainer = document.getElementById('postsContainer');
    if (!postsContainer) return;

    postsContainer.innerHTML = posts.map(post => `
        <div class="post-card" data-type="${post.type}" data-category="${post.category}">
            <div class="post-header">
                <img src="${post.avatar}" alt="User" class="post-avatar">
                <div class="post-user-info">
                    <h4>${post.user}</h4>
                    <p class="post-time">${post.timestamp}</p>
                </div>
                <span class="post-type ${post.type}">
                    ${post.type === 'skill' ? 'Skill' : 'Help Request'}
                </span>
            </div>

            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.description}</p>

                ${post.image ? `
                    <div class="post-image" style="background-image: url('${post.image}')"></div>
                ` : ''}

                <div class="post-meta">
                    ${post.type === 'skill'
            ? `<span class="post-price">${post.price} ৳</span>`
            : `<span class="post-price">Help Needed</span>`
        }
                    <span class="post-category">${getCategoryName(post.category)}</span>
                </div>
            </div>

            <div class="post-actions-footer">
                <button class="post-action ${post.liked ? 'active' : ''}" onclick="toggleLike(${post.id})">
                    <i class="fas fa-heart"></i>
                    <span>${post.likes}</span>
                </button>

                <button class="post-action" onclick="showComments(${post.id})">
                    <i class="fas fa-comment"></i>
                    <span>${post.comments}</span>
                </button>

                <button class="post-action" onclick="sharePost(${post.id})">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </button>

                ${post.type === 'skill'
            ? `<button class="post-action book-now" onclick="bookCourse(${post.id})">
                               <i class="fas fa-shopping-cart"></i>
                               <span>Book Now</span>
                           </button>`
            : `<button class="post-action help-now" onclick="offerHelp(${post.id})">
                               <i class="fas fa-hands-helping"></i>
                               <span>Offer Help</span>
                           </button>`
        }
            </div>
        </div>
    `).join('');

    updateUserStats();
}

function filterNewsfeedPosts(query) {
    const posts = document.querySelectorAll('.post-card');
    const lowerQuery = query.toLowerCase();
    posts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        const description = post.querySelector('p').textContent.toLowerCase();
        const category = post.querySelector('.post-category').textContent.toLowerCase();
        if (title.includes(lowerQuery) || description.includes(lowerQuery) ||
            category.includes(lowerQuery) || query === '') {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}
function filterNewsfeedByType(filter) {
    const posts = document.querySelectorAll('.post-card');
    posts.forEach(post => {
        if (filter === 'all') {
            post.style.display = 'block';
        } else {
            const type = post.dataset.type;
            const category = post.dataset.category;
            if (filter === type || filter === category) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        }
    });
}
// Post Interaction Functions
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        loadNewsfeedPosts();
        showSuccess(post.liked ? 'Post liked!' : 'Post unliked');
    }
}
function showComments(postId) {
    showSuccess('Comments feature coming soon!');
}
function sharePost(postId) {
    showSuccess('Post shared!');
}
function offerHelp(postId) {
    if (!checkMarketplaceAccess()) {
        showSuccess('Please complete verification first!');
        return;
    }
    showSuccess('Help offered successfully! The user will be notified.');
}
// Help Post Functions
function showHelpModal() {
    document.getElementById('helpModal').classList.remove('hidden');
}
function closeHelpModal() {
    document.getElementById('helpModal').classList.add('hidden');
    document.getElementById('helpPostForm').reset();
}
function handleHelpPost(e) {
    e.preventDefault();
    const title = document.getElementById('helpTitle').value;
    const description = document.getElementById('helpDescription').value;
    const category = document.getElementById('helpCategory').value;
    const newPost = {
        id: posts.length + 1,
        type: "help",
        title: title,
        description: description,
        category: category,
        user: ANONYMOUS_NAME,
        avatar: ANONYMOUS_AVATAR,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        liked: false
    };
    posts.unshift(newPost); // Add to beginning
    userPosts.unshift(newPost); // Add to user's posts
    loadNewsfeedPosts();
    updateUserStats();
    closeHelpModal();
    showSuccess('Help post created successfully!');
}
function createQuickPost(content) {
    const newPost = {
        id: posts.length + 1,
        type: "skill",
        title: "Quick Skill Share",
        description: content,
        price: 0,
        category: "general",
        user: ANONYMOUS_NAME,
        avatar: ANONYMOUS_AVATAR,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        liked: false
    };
    posts.unshift(newPost);
    userPosts.unshift(newPost);
    loadNewsfeedPosts();
    updateUserStats();
    showSuccess('Post created successfully!');
}
// Profile Functions
function updateUserStats() {
    const postsCount = document.getElementById('postsCount');
    const skillsCount = document.getElementById('skillsCount');
    const ratingScore = document.getElementById('ratingScore');
    if (postsCount) postsCount.textContent = userPosts.length;
    if (skillsCount) skillsCount.textContent = userPosts.filter(post =>
        post.type === 'skill').length;
    if (ratingScore) ratingScore.textContent = '4.8';
    loadUserPosts();
}
function loadUserPosts() {
    const userPostsContainer = document.getElementById('userPostsContainer');
    if (!userPostsContainer) return;
    if (userPosts.length === 0) {
        userPostsContainer.innerHTML = `
        < div class="empty-state" >
                <i class="fas fa-edit"></i>
                <h5>No posts yet</h5>
                <p>Share your first skill or ask for help to get started!</p>
            </div >
        `;
        return;
    }
    userPostsContainer.innerHTML = userPosts.map(post => `
        < div class="post-card" >
            <div class="post-header">
                <img src="${post.avatar}" alt="User" class="post-avatar">
                <div class="post-user-info">
                    <h4>You</h4>
                    <p class="post-time">${post.timestamp}</p>
                </div>
                <span class="post-type ${post.type}">
                    ${post.type === 'skill' ? 'Your Skill' : 'Your Help Request'}
                </span >
            </div >
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                ${post.image ? `<div class="post-image" style="background-image: 
url('${post.image}')"></div>` : ''}
                <div class="post-meta">
                    ${post.type === 'skill' && post.price > 0 ?
            `<span class="post-price">${post.price} à§³</span>` :
            `<span class="post-price">${post.type === 'skill' ?
                'Free' : 'Help Request'}</span>`
        }
                    <span class="post-category">$
{getCategoryName(post.category)}</span>
                </div>
            </div>
            <div class="post-actions-footer">
                <span class="post-action">
                    <i class="fas fa-heart"></i>
                    <span>${post.likes}</span>
                </span>
                <span class="post-action">
                    <i class="fas fa-comment"></i>
                    <span>${post.comments}</span>
                </span>
                <button class="post-action" onclick="editPost(${post.id})">
                    <i class="fas fa-edit"></i>
                    <span>Edit</span>
                </button>
                <button class="post-action" onclick="deletePost(${post.id})">
                    <i class="fas fa-trash"></i>
                    <span>Delete</span>
                </button>
            </div>
        </div >
        `).join('');
}
function getCategoryName(category) {
    const categories = {
        'tech': 'Technology',
        'design': 'Design',
        'academic': 'Academic',
        'business': 'Business',
        'creative': 'Creative',
        'language': 'Language',
        'general': 'General'
    };
    return categories[category] || category;
}
function editPost(postId) {
    showSuccess('Edit feature coming soon!');
}
function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        posts = posts.filter(post => post.id !== postId);
        userPosts = userPosts.filter(post => post.id !== postId);
        loadNewsfeedPosts();
        updateUserStats();
        showSuccess('Post deleted successfully!');
    }
}
// Utility Functions
function showSuccess(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--success);
    color: white;
    padding: 15px 20px;
    border - radius: 10px;
    box - shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z - index: 10000;
    animation: slideIn 0.3s ease;
    max - width: 300px;
    `;
    notification.innerHTML = `< i class="fas fa-check" ></i > ${message} `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
// Real-time price calculation with 15% commission - FIXED
function updateCommission() {
    const priceInput = document.getElementById('itemPrice');
    const earningsAmount = document.getElementById('earningsAmount');
    const totalAmount = document.getElementById('totalAmount');
    const commissionAmount = document.getElementById('commissionAmount');
    if (priceInput && earningsAmount && totalAmount && commissionAmount) {
        const price = parseInt(priceInput.value) || 0;
        const commission = Math.round(price * 0.15); // 15% commission
        const earnings = Math.max(0, price - commission);
        earningsAmount.textContent = earnings + ' à§³';
        totalAmount.textContent = price + ' à§³';
        commissionAmount.textContent = commission + ' à§³';
        // Update commission message
        const commissionMessage = document.querySelector('.commission-message');
        if (commissionMessage) {
            commissionMessage.textContent = `Platform fee: 15 % (${commission}
    à§³) will be deducted`;
        }
    }
}
// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        showSection(targetId);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
console.log('Campus Skill Hub initialized successfully!');