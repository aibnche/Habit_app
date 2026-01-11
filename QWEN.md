# React Native Expo Project - QWEN Context

## Project Overview

This is a React Native application built with Expo, created using `create-expo-app`. The project appears to be a financial management application with the tagline "Your Money, Your Control" and "Anytime, Anywhere". It uses Expo Router for file-based navigation and includes Firebase integration for authentication and database functionality.

### Key Technologies & Libraries

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **UI Components**: React Native Paper, Expo Vector Icons
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Styling**: React Native StyleSheet, with some web-style components
- **State Management**: React hooks
- **Language**: TypeScript

### Project Structure

```
app/
├── _layout.tsx           # Root layout with auth guard
├── auth.tsx              # Authentication screen (login/signup)
├── (tabs)/               # Tab-based navigation
│   ├── _layout.tsx       # Tab layout with Home and Login tabs
│   ├── index.tsx         # Home screen
│   └── login.tsx         # Login tab screen
├── components/           # Reusable components
│   ├── BackgroundLines.tsx
│   └── LandingScreen.tsx
```

### Key Features

1. **Authentication System**: Includes login/signup functionality with email/password
2. **Tab-based Navigation**: Home and Login tabs with icon navigation
3. **Firebase Integration**: Configured for authentication and Firestore database
4. **Responsive UI**: Uses React Native Paper components for consistent styling
5. **Landing Screen**: Attractive landing page with animated background elements

### File-based Routing

The app uses Expo Router's file-based routing system:
- `app/_layout.tsx` - Root layout with authentication guard
- `app/(tabs)/_layout.tsx` - Tab navigator layout
- `app/(tabs)/index.tsx` - Home screen
- `app/(tabs)/login.tsx` - Login tab
- `app/auth.tsx` - Standalone authentication screen

### Firebase Configuration

The project includes Firebase configuration with:
- Authentication (auth)
- Firestore database
- Analytics (optional)

**Note**: The Firebase config contains API keys that should be secured in production.

### Development Conventions

- TypeScript is used throughout the project
- React Native Paper is used for UI components
- Expo's development tools and ecosystem are leveraged
- Component styling is done with StyleSheet.create
- Authentication guard is implemented in the root layout

## Building and Running

### Prerequisites
- Node.js (v18 or newer recommended)
- Expo CLI tools
- iOS Simulator or Android Emulator (for native testing)

### Setup Commands
```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Alternative start commands
npm run android    # Run on Android emulator/device
npm run ios        # Run on iOS simulator/device
npm run web        # Run on web browser
npm run lint       # Lint the codebase
```

### Development Workflow
1. Edit files in the `app/` directory to modify screens
2. Components can be added to the `app/components/` directory
3. Routes are automatically created based on file structure in `app/`
4. Use React Native Paper components for consistent UI

## Testing

The project doesn't include explicit test configuration in the visible files, but standard React Native testing approaches can be implemented using Jest and React Native Testing Library.

## Important Files

- `app.json` - Expo project configuration
- `firebaseConfig.ts` - Firebase project configuration
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `app/_layout.tsx` - Root layout with authentication logic
- `app/auth.tsx` - Authentication screen implementation