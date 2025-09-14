# Abuki Learning Platform 🇪🇹

A comprehensive online learning platform designed specifically for Ethiopian students and instructors, supporting both English and Amharic languages.

## 🚀 Features

### Public Pages
- **Landing Page/Home** - Hero section with featured courses
- **Course Catalog** - Browse all available courses with filters
- **Search Results** - Advanced course search functionality
- **Course Details** - Detailed course information and preview
- **About Us** - Platform information and mission
- **Contact Us** - Support and inquiry forms
- **Authentication** - Login and registration system

### Student Dashboard
- **Student Dashboard** - Learning progress and overview
- **My Courses** - Enrolled courses management
- **Course Player** - Video lessons and content delivery
- **Assignments & Quizzes** - Interactive assessments
- **Certificates** - Course completion certificates
- **Wishlist** - Save courses for later
- **Profile Settings** - Account management
- **Payment History** - Transaction records
- **Notifications** - System alerts and updates
- **Messages** - Communication with instructors

### Instructor Portal
- **Instructor Dashboard** - Teaching analytics and overview
- **Course Creation** - Build and publish courses
- **Course Management** - Edit and update existing courses
- **Analytics** - Detailed performance metrics
- **Student Discussions** - Q&A and forum management
- **Messages** - Communication with students
- **Earnings & Payouts** - Revenue tracking and withdrawals

### Admin Panel
- **Admin Dashboard** - Platform overview and metrics
- **User Management** - Student and instructor administration
- **Course Management** - Platform-wide course oversight
- **Transactions** - Payment and financial management
- **Reports & Analytics** - Comprehensive platform insights

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Authentication**: NextAuth.js (planned)
- **Database**: PostgreSQL/MongoDB (planned)
- **Payment**: TeleBirr, CBE Birr integration (planned)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/yourusername/abuki-learning-platform.git
cd abuki-learning-platform
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Run the development server**
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
abuki-learning-platform/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                 # Landing page
│   │   ├── courses/                 # Course catalog
│   │   ├── search/                  # Search results
│   │   ├── about/                   # About page
│   │   ├── contact/                 # Contact page
│   │   └── auth/                    # Authentication
│   ├── (student)/
│   │   ├── dashboard/               # Student dashboard
│   │   ├── my-courses/              # Enrolled courses
│   │   ├── learn/                   # Course player
│   │   ├── assignments/             # Quizzes & assignments
│   │   ├── certificates/            # Certificates
│   │   ├── wishlist/                # Saved courses
│   │   ├── profile/                 # Profile settings
│   │   ├── payments/                # Payment history
│   │   ├── notifications/           # Notifications
│   │   └── messages/                # Messages
│   ├── (instructor)/
│   │   ├── dashboard/               # Instructor dashboard
│   │   ├── courses/                 # Course management
│   │   ├── analytics/               # Performance metrics
│   │   ├── discussions/             # Student Q&A
│   │   ├── messages/                # Communication
│   │   └── earnings/                # Revenue & payouts
│   └── (admin)/
│       ├── dashboard/               # Admin dashboard
│       ├── users/                   # User management
│       ├── courses/                 # Course oversight
│       ├── transactions/            # Financial management
│       └── reports/                 # Analytics & reports
├── components/
│   ├── ui/                          # shadcn/ui components
│   ├── navigation.tsx               # Main navigation
│   └── ...                         # Other components
├── lib/
│   └── utils.ts                     # Utility functions
└── public/
    └── ...                          # Static assets
\`\`\`

## 🌟 Key Features

### Multi-language Support
- **English** and **Amharic** interface
- Course content in both languages
- RTL support for Amharic text

### Ethiopian Payment Integration
- **TeleBirr** payment gateway
- **CBE Birr** digital payments
- Local currency (ETB) support

### Mobile-First Design
- Responsive design for all devices
- Progressive Web App (PWA) capabilities
- Offline course content (planned)

### Advanced Learning Features
- Interactive video player
- Progress tracking
- Quizzes and assignments
- Discussion forums
- Certificate generation
- Instructor-student messaging

## 🚧 Development Status

### ✅ Completed
- [x] Landing page and navigation
- [x] Course catalog and search
- [x] Course detail pages
- [x] Student dashboard
- [x] Instructor dashboard
- [x] Profile management
- [x] Course builder
- [x] Analytics dashboard

### 🔄 In Progress
- [ ] Video player component
- [ ] Quiz and assignment system
- [ ] Payment integration
- [ ] Real-time messaging
- [ ] Certificate generation

### 📋 Planned
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] AI-powered recommendations
- [ ] Live streaming classes
- [ ] Offline content sync

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Ethiopian Ministry of Education for inspiration
- Local tech community for feedback and support
- All contributors and beta testers

## 📞 Support

For support, email support@abuki.et or join our Telegram channel.

---

**Built with ❤️ for Ethiopian learners**
