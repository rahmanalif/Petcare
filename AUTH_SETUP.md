# Authentication Setup Guide

## Overview
This project now includes a complete authentication system with Redux state management and user roles.

## Features Implemented

### 1. **Redux Store Setup**
- Location: `store/authSlice.js` and `store/store.js`
- Manages authentication state globally
- Supports user roles (pet_owner, pet_sitter, admin, etc.)

### 2. **Auth Pages (Without Navbar/Footer)**
All authentication pages are in the `app/(global auth)/` directory:
- `/login` - Login page
- `/signup` - Registration page
- `/forgotpassword` - Password recovery page
- `/changepassword` - Reset password page

These pages automatically exclude the Navbar and Footer using the ConditionalLayout component (`components/ConditionalLayout.jsx`) that checks the URL pathname.

### 3. **Navigation Flow**
- **First-time visitors**: Land on the home page (`/`)
- **After login/signup**: Redirected to home page (`/`)
- **Unauthenticated users**: Can access all auth pages

### 4. **User Roles**
The auth system supports multiple roles:
- `pet_owner` - Pet owners looking for sitters
- `pet_sitter` - Pet sitters offering services
- `admin` - Admin users
- You can add more roles as needed

## How to Use

### Accessing Auth State in Components

```javascript
"use client";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

export default function YourComponent() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, role } = useSelector((state) => state.auth);

  // Check if user is authenticated
  if (isAuthenticated) {
    console.log('User:', user);
    console.log('Role:', role);
  }

  // Logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

### Login/Signup Flow

The demo login/signup in the pages currently:
1. Takes user input
2. Simulates an API call (500ms delay)
3. Dispatches `loginSuccess` with user data and role
4. Redirects to home page

**To integrate with a real backend:**
- Replace the demo code in `handleSubmit` functions
- Make actual API calls to your backend
- Handle errors appropriately

### Available Redux Actions

```javascript
import {
  loginStart,      // Set loading state
  loginSuccess,    // Set user and auth state
  loginFailure,    // Set error state
  logout,          // Clear auth state
  updateUserRole,  // Update user role
  clearError       // Clear error messages
} from './store/authSlice';
```

## File Structure

```
petcare/
├── app/
│   ├── (global auth)/          # Auth pages group
│   │   ├── layout.jsx          # Layout without Navbar/Footer
│   │   ├── login/
│   │   │   └── page.jsx
│   │   ├── signup/
│   │   │   └── page.jsx
│   │   ├── forgotpassword/
│   │   │   └── page.jsx
│   │   └── changepassword/
│   │       └── page.jsx
│   └── layout.js               # Root layout with Redux Provider
├── components/
│   └── providers/
│       └── ReduxProvider.jsx   # Redux store provider
├── component/
│   └── global/
│       └── Navbar.jsx          # Updated with auth state
└── store/
    ├── authSlice.js            # Auth state management
    └── store.js                # Redux store configuration
```

## Next Steps

1. **Connect to Backend API**
   - Update login/signup handlers to call your API
   - Store JWT tokens (localStorage/cookies)
   - Handle token refresh

2. **Protected Routes**
   - Create middleware to check authentication
   - Redirect unauthenticated users to login

3. **Role-Based Access**
   - Use the `role` state to show/hide features
   - Create role-specific pages and components

4. **Persistence**
   - Add Redux Persist to save auth state
   - Restore user session on page reload

## Example: Protected Route Component

```javascript
"use client";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <div>Protected Content</div>;
}
```

## Notes

- All auth pages are fully functional with navigation between them
- The Navbar shows different UI based on authentication state
- User role is stored and can be used for role-based features
- Demo mode uses simulated delays to mimic API calls
